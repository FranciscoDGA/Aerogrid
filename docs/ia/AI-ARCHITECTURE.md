# AI-ARCHITECTURE — Arquitetura de Inteligência Artificial (Proposta)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSTA — nenhum código, dependência, chave ou agente foi criado. Implementação exige autorização expressa.

---

## 1. ETAPA 1 — Auditoria do estado real do projeto (inspecionado, não presumido)

| Item | Estado verificado (2026-11-23) |
|------|-------------------------------|
| Framework | Next.js 15.5 (App Router) + React 19 + TypeScript strict + Tailwind v4 |
| Backend | Server Actions (interno) + módulos `src/modules/*` (schemas Zod + services + actions) |
| API HTTP | **Nenhuma rota `src/app/api` existe** (verificado no sistema de arquivos) |
| Banco | Supabase/Postgres com RLS multi-tenant (`0001`, `0002`); PostGIS planejado no `0005` |
| Autenticação | Supabase Auth (cadastro, login, recuperação); `middleware.ts` + cookies via `@supabase/ssr` |
| Multi-tenancy | Shared schema + RLS; `is_member_of(uuid)` security-definer; org sempre da sessão, nunca do payload |
| Serviços externos | **Nenhum** (zero integrações; auditoria Skill 06) |
| Mapas | **Não implementados** — MapLibre + Turf aprovados, ainda não instalados |
| Funcionalidades implementadas | Auth, organizações, painel, CRUDs de clientes/drones/operadores (44 testes) |
| Funcionalidades NÃO existentes | Missões, documentos, relatórios, mapas, GeoJSON, auditoria, assinaturas |
| IA no projeto | **Nenhuma** — sem SDK de IA, sem chave de API, sem `.env` real (só `.env.example`) |
| Pontos de integração futuros | Server Actions/módulos existentes (dados), futuras rotas `/api/v1/ai/*` (streaming), migração futura para logs de uso |

**Consequência direta:** agentes que dependem de missões, documentos, mapas ou histórico comercial **não têm dados para consumir hoje**. Isso orienta a ordem de implementação (Skill 08 ETAPA 6).

---

## 2. Princípios da arquitetura proposta

1. **IA é auxiliar, nunca autoridade** — não aprova voos, não emite autorizações, não declara áreas liberadas, não simula respostas oficiais, não garante segurança aeronáutica, não inventa informação regulatória, não acessa dados de outra organização (Skill 08 ETAPA 4).
2. **Servidor manda** — toda chamada de modelo ocorre em backend (Route Handler/Server Action), com Zod na entrada e saída.
3. **Org vem da sessão** — `organization_id` sempre do usuário autenticado; nunca do corpo da requisição (regra da Skill 02).
4. **Modelo nunca vê dado que não precisa** — contexto montado por consulta explícita, com limite de escopo por organização.
5. **Tudo é registrado** — cada chamada gera registro de uso (tokens, custo estimado, agente, org, status).
6. **Falha é degradação, não engano** — erro do provedor vira mensagem honesta ("assistente indisponível"), nunca resposta inventada.
7. **Nenhuma promessa de precisão** — saídas de IA são sugestões revisáveis por humanos.

---

## 3. Componentes propostos

```
[UI do AeroGrid]
      │ (Server Action ou fetch para /api/v1/ai/*)
      ▼
[Camada de IA — src/modules/ai/]
  ├── schemas.ts        ← Zod: entrada/saída, limites de tamanho
  ├── policy.ts         ← bloqueios da ETAPA 4 + filtro de saída
  ├── orchestrator.ts   ← laço de agente: plano → ferramentas → resposta
  ├── tools/            ← ferramentas com autorização por org (somente-leitura no MVP)
  ├── providers/        ← adaptador de modelo (interface única, provedor substituível)
  ├── metering.ts       ← registro de uso + verificação de orçamento
  └── service.ts        ← autorização (papel + org) antes de qualquer chamada
      ▼
[Provedor de modelo externo]  ← chave SOMENTE em variável de ambiente de servidor
```

### 3.1 Orquestração
- **Padrão:** laço simples "pergunta → ferramentas (se necessárias) → resposta", com **máximo de N iterações** (ex.: 4) e orçamento de tokens por sessão.
- Sem frameworks de orquestração no MVP — começar com laço próprio pequeno e testável; avaliar framework só se a complexidade justificar (nova justificativa de dependência, regra da Skill 02).
- Agente não decide permissões: ferramentas já chegam filtradas pelo papel e pela org.

### 3.2 Integração com modelos
- Interface interna única (`generate(prompt, options) → {text, usage, model}`) para trocar provedor sem tocar nas features.
- **Modelos:** escolher por custo/privacidade na fase de implementação; nenhuma marca está contratada hoje (nenhuma chave existe).
- Temperatura baixa em tarefas factuais; **sempre** citar "não sei" quando o contexto não responder.

### 3.3 APIs backend
- Propostas (não criadas): rotas `POST /api/v1/ai/assist` (assistente), `POST /api/v1/ai/extract` (documental), etc., todas com:
  - autenticação de sessão → papel → org;
  - Zod de entrada (tamanho máx. de texto, campos permitidos);
  - rate limit por usuário e por org;
  - resposta com `usage` (tokens) e `requestId`.
- Server Actions continuam para o restante do produto; IA usa Route Handler para suportar streaming (SSE).

### 3.4 Permissões
| Papel | Uso de IA |
|-------|-----------|
| owner/admin | Habilita/desabilita IA na org, define orçamento, vê registros de uso |
| member | Usa agentes habilitados, dentro do escopo de dados que já pode ver |
| sem acesso | Nenhuma chamada (mesma regra das demais features) |

### 3.5 Isolamento multi-tenant
- Toda ferramenta de IA consulta dados **com o mesmo filtro de org dos services existentes** (RLS ativa — a chave de servidor de modelo **não** é `service_role` do banco).
- Tabela futura `ai_usage_logs` nasce com RLS negativa por padrão + `organization_id` (mesmo padrão das migrações 0001/0002).
- **Proibido:** passar dados de outra org ao modelo; concatenar contextos de orgs diferentes num mesmo prompt.

### 3.6 Registro de uso (metering)
Campos mínimos por chamada: `organization_id`, `user_id`, `agent`, `model`, `input_tokens`, `output_tokens`, `estimated_cost`, `status`, `created_at`, `request_id`. Retenção definida em `AI-COST-CONTROL.md`.

### 3.7 Controle de custo
Ver `AI-COST-CONTROL.md`: orçamento por org, teto diário, alertas, modelo mais barato por tarefa, cache de perguntas repetidas.

### 3.8 Tratamento de erros
| Falha | Comportamento |
|-------|---------------|
| Provedor fora do ar / timeout | Mensagem "Assistente indisponível no momento" + retry idempotente único |
| Cota excedida | "Limite de uso do assistente atingido" (sem tentar contornar) |
| Saída inválida (falha no Zod) | Descartar e reportar erro interno; **nunca** exibir texto não validado como fato |
| Conteúdo bloqueado pela política | Mensagem de recusa explícita, log do evento |
| Prompt injection detectado | Recusar + log; não executar a instrução injetada |

Nenhum `catch` silencioso (regra da Skill 04).

### 3.9 Observabilidade
- Logs estruturados: `requestId`, org, agente, latência, tokens, status (sem conteúdo sensível do prompt em log).
- Métricas: chamadas/dia, custo/dia, taxa de erro, taxa de recusa por política.
- Painel futuro para owner/admin (fora do MVP — registrar no roadmap).

### 3.10 Proteção contra prompt injection
Detalhada em `AI-SECURITY-POLICY.md` (resumo): separação instrução/dados, delimitadores, allowlist de ferramentas, filtro de saída, nenhuma ferramenta de escrita no MVP.

---

## 4. O que NÃO fará parte da arquitetura (linha vermelha)

- Aprovar voos · emitir autorizações · declarar áreas liberadas · simular respostas oficiais (SARPAS/SISANT/DECEA/ANAC) · garantir segurança aeronáutica · inventar normas · ler dados de outra org · executar ações de escrita (excluir/editar) via IA no MVP.

---

## 5. Pré-requisitos de implementação (nenhum executado)

1. Autorização expressa do usuário.
2. Definição de provedor de modelo + conta + chave em `.env` de servidor (nunca no navegador).
3. Migração de logs de uso (respeitando o plano de migrações aprovado — Skill 02).
4. Revisão das regras desta doc com as Skills 06 (segurança) e 07 (regulatório).
5. Testes proporcionais (Skill 04) antes de qualquer tela visível ao cliente.
