# QA-STRATEGY — Estratégia de Qualidade e Testes (AeroGrid)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Escopo:** documental — nenhum teste destrutivo executado, nenhum ambiente alterado, nenhum código modificado.

---

## 1. ETAPA 1 — Auditoria do estado real (inspecionado, não presumido)

| Item | Estado verificado (2026-11-23) | Evidência |
|------|-------------------------------|-----------|
| Framework | Next.js 15.5.29 (App Router) + React 19 + TypeScript **strict** (`noUncheckedIndexedAccess`) | `package.json`, `tsconfig.json` |
| Estrutura | Módulos por domínio (`src/modules/*`: schema → service → action), UI em `src/components`, páginas em `src/app/(app)` | Inspeção de diretórios |
| Banco | Supabase/Postgres + RLS multi-tenant (migrations `0001`, `0002`) | `supabase/migrations/` |
| Autenticação | Supabase Auth + `middleware.ts` (valida sessão via `getUser()`) | `src/middleware.ts` |
| Políticas RLS | Negativa por padrão + `is_member_of()` security-definer | `0001`, `0002` |
| APIs | Nenhuma rota HTTP (`src/app/api` inexistente); Server Actions internas | Filesystem |
| Componentes | 12 UI reutilizáveis + 5 formulários + `DeleteButton` (2 passos) | `src/components` |
| Mapas | **Não implementados** (MapLibre/Turf aprovados, não instalados) | `package.json` |
| Cálculos geográficos | **Não existem** | — |
| Integrações | **Nenhuma** (só Supabase como BaaS) | Auditoria Skill 06 |
| **Testes existentes** | **44 testes unitários** (4 arquivos, só schemas Zod): organizations 9, clients 7, drones 18, operators 10 — **executados agora: 44/44 ✅** | `npm test` (09:35) |
| Scripts | `dev`, `build`, `start`, `lint`, `typecheck`, `test` | `package.json` |
| Pipeline de build | `next build` compila e gera 17 rotas (última execução nesta sessão) | Evidência anterior |
| CI/CD | **Nenhum** (sem pasta `.github`) | Filesystem |
| Cobertura | **Sem medição** (sem script `coverage`) | `package.json` |
| Ambientes | `.env.example` documentado; `.env` real não versionado; **Docker/Supabase CLI ausentes** → testes de RLS/integração não executáveis localmente | `docs/arquitetura/09` |

### Verificações executadas nesta auditoria (com saída real)

| Comando | Resultado |
|---------|-----------|
| `npm test` | ✅ **44/44 passed** (4 arquivos, 1,50 s) |
| `npm run typecheck` | ✅ **0 erros** |
| `npm run lint` | ✅ **0 problemas** |
| `npm audit` (Skill 06) | ⚠️ **6 vulnerabilidades** (2 moderadas, 2 altas, 2 críticas) |
| Testes de RLS/integração | ⚠️ **NÃO executados** (sem Docker — nunca declarados aprovados) |

---

## 2. Filosofia de qualidade

1. **Evidência > afirmação:** nenhum teste é "aprovado" sem execução registrada (Skill 04 §16).
2. **Pirâmide equilibrada:** unit (rápido, em massa) → integração (RLS/serviços, com banco) → E2E (poucos fluxos críticos) → manual (responsividade, acessibilidade visual).
3. **Segurança é qualidade:** gates de segurança em `RELEASE-QUALITY-GATES.md` têm o mesmo peso dos testes funcionais.
4. **Teste proporcional** à criticidade: isolamento multi-tenant e autorização recebem a maior densidade de testes.
5. **Honestidade de status:** cobertura baixa é dita como baixa; teste não executado é dito como não executado.

## 3. Níveis de teste

| Nível | Ferramenta | Estado | Meta |
|-------|-----------|--------|------|
| Unitário (schemas, lógica pura) | Vitest | ✅ Ativo (44) | Crescer por módulo novo (proporcional — Skill 04) |
| Integração (services + RLS) | Vitest + banco Supabase local | ⚠️ Bloqueado (Docker) | Rodar em CI com serviço Postgres+PostGIS |
| API/rotas | — (ainda sem rotas) | N/A até `/api/v1` | Conter quando rotas nascerem |
| E2E | Playwright (candidato) | ❌ Inexistente | 3–5 fluxos críticos antes da homologação |
| Segurança estática | ESLint + greps + `npm audit` | ⚠️ Parcial (Skill 06) | Automatizar greps + audit no CI |
| Responsividade | Manual + viewport | ❌ Sem teste automatizado | Checklist em `TEST-CASES.md` |
| Desempenho | — | ❌ Inexistente | Lighthouse em homologação (futuro) |

## 4. Cobertura atual (honestidade)

- **Medição numérica: inexistente** (sem `coverage` configurado).
- Estimativa qualitativa: schemas Zod de 4 módulos bem cobertos; **services, actions, componentes e páginas: sem testes automatizados**. Cobertura real provavelmente **baixa** — confirmar com `vitest --coverage` quando autorizado (não executado aqui para não alterar dependências: `@vitest/coverage-v8` não instalado).

## 5. Ambientes

| Ambiente | Uso | Estado |
|----------|-----|--------|
| Local (dev) | `npm run dev` + `.env.local` | Funcional (build/typecheck/lint/test) |
| Local com banco | Docker + Supabase CLI | ❌ Ausente — bloqueia RLS/integração |
| CI (futuro) | GitHub Actions | ❌ Inexistente |
| Produção (Vercel + Supabase cloud) | Deploy | Só com autorização; RLS é a última linha de defesa |

## 6. Estratégia por tipo de risco

| Risco | Estratégia |
|-------|------------|
| Vazamento entre orgs | Testes dedicados `MULTITENANT-TEST-PLAN.md` (backend + banco, não só UI) |
| Regressão de validação | Testes de schema por módulo (padrão já existente) |
| Copy regulatório errado | Greps de termos proibidos em gate de release |
| Dependência vulnerável | `npm audit` semanal registrado em relatório |
| Mapa/cálculo errado | `GEOSPATIAL-TEST-TEST-PLAN.md` com valores de referência |
| Deploy quebrado | Gates em `RELEASE-QUALITY-GATES.md` |

## 7. Prioridades de melhoria (ordem recomendada)

1. **CI mínimo** (typecheck + lint + test em push) — hoje não há nada.
2. **Bloquear dependências vulneráveis** (6 achados da Skill 06) — atualizar com testes.
3. **Testes de service/action dos CRUDs** (camada sem cobertura).
4. **Habilitar Docker/Supabase local ou CI com Postgres** → testes de RLS.
5. **E2E dos fluxos de auth/onboarding/CRUD** (Playwright, candidato — avaliar licença/dependência).
6. **Cobertura medida** (`@vitest/coverage-v8`) com piso declarado (ex.: 70% em `src/modules`).
7. **Gates automatizadas** (secrets scan, greps de termos, audit).
