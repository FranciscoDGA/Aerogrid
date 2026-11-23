# TEST-PLAN — Plano de Testes (AeroGrid)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** executado = evidência registrada; planejado = ⬜; bloqueado = ⛔ (com motivo).
**Regra:** nenhum item é "aprovado" sem execução real.

---

## 1. Inventário das 15 áreas (ETAPA 2)

| # | Área | Testes existentes | Tipo faltante | Prioridade |
|---|------|-------------------|---------------|------------|
| 1 | Cadastro e autenticação | ❌ Nenhum automatizado | E2E (signup/login/logout/recuperação) + teste de redirecionamento | **Alta** |
| 2 | Empresas e usuários | 9 unit (schemas) | Service (criação via RPC, papéis) + E2E onboarding | **Alta** |
| 3 | Drones | 18 unit (schemas) | Service + UI (lista/detalhe/edição/exclusão) | Média |
| 4 | Operadores | 10 unit (schemas) | Service + datas (validade ≥ emissão) em UI | Média |
| 5 | Clientes | 7 unit (schemas) | Service + busca + estado vazio | Média |
| 6 | Missões | — | **Bloqueado:** feature não existe (migração 0003) | Futuro |
| 7 | Documentos | — | **Bloqueado:** feature não existe (migração 0006) | Futuro |
| 8 | Relatórios | — | **Bloqueado:** feature não existe | Futuro |
| 9 | Mapas | — | **Bloqueado:** feature não existe (Skill 05) | Futuro |
| 10 | GeoJSON | — | **Bloqueado:** importação/exportação não existe | Futuro |
| 11 | Cálculos geográficos | — | **Bloqueado:** ver `GEOSPATIAL-TEST-PLAN.md` (casos já definidos) | Futuro |
| 12 | IA | — | **Bloqueado:** sem agente (Skill 08 — critérios em `AI-ACCEPTANCE-CRITERIA.md`) | Futuro |
| 13 | Integrações externas | — | **Bloqueado:** sem integração (Skill 09) | Futuro |
| 14 | Isolamento multiempresa | ❌ Nenhum executável | Ver `MULTITENANT-TEST-PLAN.md` — ⛔ Docker ausente | **Crítica** |
| 15 | Responsividade | ❌ Nenhum automatizado | Checklist manual + emuladores (360/768/1280/1920) | Alta |

## 2. Escopo desta fase (o que pode ser executado HOJE)

### 2.1 Executado em 2026-11-23 (evidência)
| Suite | Resultado |
|-------|-----------|
| `npm test` | ✅ **44/44** — organizations 9, clients 7, drones 18, operators 10 |
| `npm run typecheck` | ✅ **0 erros** |
| `npm run lint` | ✅ **0 problemas** |
| `npm audit` | ⚠️ 6 vulnerabilidades (registradas) |

### 2.2 Planejado para executar assim que possível (autorização + ambiente)
| ID | Teste | Requisito |
|----|-------|-----------|
| INT-01..10 | RLS (ver `MULTITENANT-TEST-PLAN.md`) | Docker/Supabase CLI ou CI com Postgres |
| SEC-01..20 | Ver `SECURITY-TEST-PLAN.md` | Parcial sem banco |
| E2E-01..05 | Fluxos críticos | Playwright (dependência nova → justificativa + autorização) |
| UI-01..08 | Responsividade | Manual com devtools |

## 3. Fluxos E2E mínimos (quando houver ferramenta)

| ID | Fluxo | Passos resumidos | Resultado esperado |
|----|-------|------------------|--------------------|
| E2E-01 | Onboarding completo | Cadastro → criação de org → painel | Org criada; painel com dados reais |
| E2E-02 | CRUD cliente | Lista → novo → detalhe → editar → excluir (2 passos) | Estados vazio/loading/erro/404 funcionando |
| E2E-03 | Acesso negado | Usuário sem org tenta abrir `/clientes` | Redirecionamento/estado sem permissão |
| E2E-04 | Recuperação de senha | Esqueci a senha → e-mail → novo login | Fluxo completo sem erro |
| E2E-05 | Sessão expirada | Cookie inválido em rota privada | Redirect para `/login` |

## 4. Estados de UI (obrigatório por tela — Skill 03)

Para cada rota: **normal · loading (skeleton) · vazio · erro · sem permissão · 404** (quando aplicável).
Checklist em `TEST-CASES.md` §3.

## 5. Critérios de entrada para homologação

1. Gates de `RELEASE-QUALITY-GATES.md` verdes.
2. Testes de isolamento multi-tenant executados com evidência (hoje: **pendente**).
3. Zero erro de typecheck/lint; `npm audit` sem críticas novas.
4. Nenhum ⬜ crítico em `TEST-CASES.md` sem justificativa registrada.

## 6. Fora de escopo desta fase

- Testes invasivos em sistemas de terceiros (proibido — Skill 06 §17).
- Testes destrutivos em produção.
- Alteração de código/banco para "facilitar" teste.
