# INTEGRATIONS-ARCHITECTURE — Arquitetura de Integrações (Proposta)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSTA — **nenhuma integração existe, nenhuma conta criada, nenhum serviço configurado.** Implementação exige autorização expressa.

---

## 1. ETAPA 1 — Auditoria técnica (inspecionado, não presumido)

| Item | Estado verificado (2026-11-23) |
|------|-------------------------------|
| Framework | Next.js 15.5 (App Router) + React 19 + TypeScript strict + Tailwind v4 |
| Backend | Server Actions + módulos `src/modules/*` (Zod → service → action); **nenhuma rota HTTP** (`src/app/api` inexiste) |
| Banco | Supabase/Postgres + RLS multi-tenant (migrações `0001`, `0002`); PostGIS **planejado** no `0005`, não habilitado |
| Autenticação | Supabase Auth (SSR cookies, `middleware.ts`) |
| Armazenamento | Supabase Storage **não utilizado ainda** (sem upload implementado) |
| Mapas | **Não implementados**; MapLibre GL JS + Turf.js aprovados, **não instalados** |
| Bibliotecas geográficas | Nenhuma instalada (só Turf/MapLibre aprovados) |
| APIs existentes | **Nenhuma** (zero rotas `/api`) |
| Integrações existentes | **Nenhuma** (auditoria Skill 06: zero serviços externos) |
| Serviços externos | Apenas Supabase (BaaS: auth/banco/storage) |
| Variáveis de ambiente | Só `.env.example` (nenhum `.env` real no repositório); sem chaves de terceiros |
| Pontos de extensão futuros | Camada `src/lib/`, módulos por domínio, migrações `0003`–`0008`, rota `/api/v1/*` prevista nos ADRs (Skill 02) |

**Nada da Skill 09 está instalado** — MapLibre, OSM, MapTiler, DJI, AirData etc. são **candidatos**, não tecnologias em uso.

---

## 2. Princípios

1. **Adaptadores, não dependências espalhadas** — cada fornecedor vira um adaptador atrás de uma interface interna; trocar provedor não toca nas features.
2. **Integração é opcional** — o produto funciona sem nenhuma integração; falha de terceiro degrada, nunca derruba.
3. **Nenhum ato regulado via integração** — nada de automação em sistemas governamentais sem autorização expressa documentada.
4. **Credencial nunca no navegador** e nunca em repositório.
5. **Org sempre da sessão** — dados de terceiros só entram escopados à organização do usuário.
6. **Contrato versionado** — toda integração nasce com versão (`v1`), limites e tratamento de erro definidos.

---

## 3. Camada proposta (não implementada)

```
[src/integrations/]                     ← camada nova (futura)
  ├── core/
  │   ├── types.ts        ← interfaces: IntegrationResult<T>, IntegrationError
  │   ├── config.ts       ← endpoints/limits lidos de env de servidor
  │   ├── http.ts         ← fetch blindado: timeout, limites, allowlist de hosts
  │   ├── retry.ts        ← retry idempotente com backoff (máx. N tentativas)
  │   ├── rate-limit.ts   ← limitação por org/fornecedor
  │   ├── idempotency.ts  ← chave por operação (evita efeito duplicado)
  │   ├── logging.ts      ← requestId, org, fornecedor, status, latência (sem segredos)
  │   └── metering.ts     ← contagem de chamadas por org (custo/limite)
  ├── providers/          ← um adaptador por fornecedor (ex.: maptiler/, dji/, airdata/)
  └── webhooks/           ← receptor assinado (validação de assinatura + replay)
```

### 3.1 Interfaces padronizadas
```ts
// Conceitual — não implementado
interface IntegrationProvider {
  readonly name: string;            // "maptiler", "dji", ...
  readonly contractVersion: string; // "v1"
  health(): Promise<HealthStatus>;
}
// Todo resultado: { ok: true, data } | { ok: false, code, retryable, message }
```
- Erros **nunca** viram exceção vazia: código tipado (`TIMEOUT`, `RATE_LIMITED`, `AUTH_FAILED`, `INVALID_RESPONSE`, `SSRF_BLOCKED`).

### 3.2 Gerenciamento de credenciais
- Chaves em variáveis de ambiente de servidor (`.env` local + env do deploy); **nunca** no cliente, nunca em log, nunca em commit.
- Uma chave por ambiente (dev/homolog/prod) quando o fornecedor permitir.
- Rotação registrada em data (`docs/integracoes/INTEGRATION-PENDING-VALIDATION.md`).

### 3.3 Webhooks (quando existir fornecedor que envie)
- Endpoint dedicado `/api/v1/webhooks/[provider]`.
- **Assinatura verificada** (HMAC/token do fornecedor) antes de qualquer processamento.
- Idempotência por `event_id`; rejeição de replay; validação Zod do payload.
- Processamento assíncrono (nenhuma escrita crítica só no ciclo do webhook).

### 3.4 Filas
- MVP: sem broker — usar processamento pós-resposta/`after()` do Next + retry.
- Se volume justificar: fila dedicada (avaliação de dependência nova com justificativa — Skill 02).

### 3.5 Idempotência
- Operações de escrita em terceiro carregam chave determinística (`org + operação + payload-hash`).
- Reenvio seguro não duplica efeito (ex.: mesma requisição de cotação).

### 3.6 Logs e monitoramento
- Log estruturado por chamada: `requestId`, `provider`, `org`, `status`, `latencyMs`, `retryCount` — **sem corpo de resposta sensível, sem chaves**.
- Métricas: taxa de erro por fornecedor, latência p95, chamadas/org/dia.
- Alerta quando erro do fornecedor ultrapassar limiar (definir na implementação).

### 3.7 Tratamento de falhas
| Falha | Ação |
|-------|------|
| Timeout/5xx | Retry limitado com backoff; depois → estado "indisponível" na UI |
| 401/403 | Sem retry; alerta de credencial (rotação) |
| 429 | Respeitar `Retry-After`; backoff; não insistir |
| Payload inválido | Descartar + log; nunca persistir dado malformado |
| Fornecedor fora do prazo de SLA | Feature degrada com mensagem honesta |

### 3.8 Rate limiting
- Por usuário e por org nas rotas de integração; limite adicional por fornecedor (respeitar o do fornecedor).
- Nada de "empurrar" limites do terceiro para o usuário final.

### 3.9 Versionamento de contratos
- Rotas `/api/v1/...`; adaptadores com `contractVersion`; mudança incompatível = `/v2` (nunca quebrar cliente silenciosamente).
- Respostas de terceiro são **desnormalizadas** para o modelo interno — o resto do produto não depende do formato cru do fornecedor.

### 3.10 Isolamento multi-tenant
- Resultados de terceiro são materializados **sempre** com `organization_id` da sessão + RLS.
- Cache de terceiro, se houver, é **particionado por org** (ou global apenas para dados públicos não sensíveis — ex.: tiles).
- Credencial é do **fornecedor da plataforma**, não do cliente final; o cliente final nunca envia a própria chave para o AeroGrid sem revisão de política (fora do MVP).

---

## 4. Fronteiras regulatórias embutidas na arquitetura

- **Proibido** nesta camada: automação de login em site governamental, scraping de SARPAS/SISANT, qualquer "preenchimento" em sistema da ANAC/DECEA.
- Integração com sistema aeronáutico **só** com: documentação oficial de API + autorização expressa do órgão + auditoria das Skills 07/09 antes do primeiro `fetch`.
- Regra geral: se o fornecedor não documenta API, **não há integração** (ver `API-CATALOG.md`).

---

## 5. Pré-requisitos para implementar qualquer adaptador

1. Autorização expressa do usuário.
2. Linha em `API-CATALOG.md` com situação = **confirmado** (doc + termos + custo verificados).
3. Conta/credencial criada **pelo usuário** (não pelo agente, sem autorização).
4. Testes proporcionais (contrato + erro + isolamento de org) antes de uso real.
5. Registro em `INTEGRATION-PENDING-VALIDATION.md` do que ficou pendente.
