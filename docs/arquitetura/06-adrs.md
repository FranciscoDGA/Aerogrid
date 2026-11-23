# 06 — Registro de Decisões Arquiteturais (ADR)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Formato:** número, título, status (proposto/aceito/obsoleto), contexto, decisão, consequências.

---

## ADR-001 — Monólito modular (não microsserviços)
- **Status:** aceito (imposto pela Skill 02, §4)
- **Contexto:** produto em descoberta; time pequeno; custo de infraestrutura e manutenção precisa ser mínimo.
- **Decisão:** Next.js único com módulos de domínio isolados em `src/modules/`.
- **Consequências:** deploy único, refatorações locais; risco de acoplamento é mitigado por regra de import (módulos não importam uns dos outros diretamente — só via interfaces públicas).

## ADR-002 — Supabase como plataforma backend
- **Status:** aceito (stack preferencial da Skill 02, §3)
- **Contexto:** precisa de Postgres, auth, storage e RLS sem operar infra própria.
- **Decisão:** Supabase (Auth + Postgres/PostGIS + Storage), gerenciado; Vercel para o app.
- **Alternativas descartadas:** self-host (custo operacional alto para o estágio); Firebase (sem SQL/RLS relacional adequado ao modelo).
- **Consequências:** dependência de fornecedor; mitigável exportando dados e mantendo SQL portável.

## ADR-003 — Multi-tenancy compartilhado com RLS por `organization_id`
- **Status:** aceito (Skill 02, §5)
- **Contexto:** muitos tenants pequenos; schema por tenant inviabiliza consultas cruzadas de suporte e multiplica migrações.
- **Decisão:** schema único; **toda** tabela empresarial com `organization_id` + RLS; organização resolvida **da sessão no servidor** (helper `current_membership()`), jamais do payload.
- **Consequências:** política padrão negativa (skill 5.7); todo acesso passa por testes de isolamento; query esquecendo do filtro é barrada pelo banco — não pelo código.

## ADR-004 — TypeScript estrito + Zod nas fronteiras
- **Status:** aceito (Skill 02, §7)
- **Decisão:** `strict: true`; Zod valida toda entrada (Server Actions, API) e forma de saída de contratos; `any` proibido sem justificativa registrada.
- **Consequências:** modelagem inicial mais lenta; menos bugs em runtime e contratos estáveis p/ testes.

## ADR-005 — Mapas: MapLibre GL JS + tiles com licença verificada
- **Status:** aceito (Skill 02, §3 e §9)
- **Contexto:** UI precisa de mapa; proibido representar conteúdo genérico como aeronáutico oficial (doc 08, Skill 01).
- **Decisão:** MapLibre GL JS no cliente; provedor de tiles aberto/comercial **com licença e atribuição verificadas antes do uso** (registro do provedor escolhido neste ADR quando decidido); PostGIS para consultas.
- **Consequências:** nenhuma camada aeronáutica; se futuro projeto exigir dados oficiais, abre-se novo ADR com estudo regulatório.

## ADR-006 — Server Actions internas; Route Handlers para `/api/v1`
- **Status:** aceito (Skill 02, §3 e §8)
- **Decisão:** fluxos da interface usam Server Actions com schemas Zod compartilhados; `/api/v1` expõe o mesmo domínio para consumo externo/testes.
- **Consequências:** um único ponto de regra de negócio evita divergência; a API pública pode evoluir com versionamento sem quebrar a UI.

## ADR-007 — Arquivos no Supabase Storage com URLs assinadas
- **Status:** aceito (Skill 02, §10)
- **Decisão:** bucket privado; path prefixado por `organization_id`; upload validado (MIME, 10 MB); acesso só por URL assinada de curta duração; política de retenção registrada antes do lançamento.
- **Consequências:** sem links públicos; exclusão de org exige limpeza programada (checklist no doc 10).

## ADR-008 — Exclusão lógica para entidades empresariais
- **Status:** aceito (Skill 02, §6)
- **Decisão:** `deleted_at` em clients, drones, operators, missions; listagens filtram automaticamente; auditoria registra a exclusão. Física apenas para dados transitórios (sessões, tokens).
- **Consequências:** consultas precisam de filtro padrão (helper de repositório); preserva integridade referencial e histórico.

## ADR-009 — Faturamento sem provedor de pagamento no MVP
- **Status:** aceito (provisório)
- **Contexto:** preços são hipóteses (doc 01 §9); integrar gateway agora seria construir sobre hipótese não testada.
- **Decisão:** módulo `subscriptions` com planos e limites ativados **manualmente** durante piloto; gateway (Stripe/Pix) só após primeiros clientes pagantes — novo ADR na época.
- **Consequências:** sem cobrança automática no início; risco de atrito manual é aceitável com 3–5 clientes.

## ADR-010 — Integrações externas: avaliação obrigatória, nunca presumida
- **Status:** aceito (Skill 02, §8; doc 08 Skill 01)
- **Decisão:** qualquer integração futura (incluindo órgãos públicos) exige: documentação oficial, autorização/contrato, revisão de segurança e viabilidade — registradas em ADR específico antes de código.
- **Consequências:** zero código de integração "achado"; proibido mock sugerindo parceria oficial em UI/demo.

---

**Próximos ADRs previstos:** escolha do provedor de tiles (ADR-005), estratégia de testes (runner, cobertura mínima), política de cache, e definição de limites por plano (quando H-P2 tiver evidência).
