# TEST-CASES — Casos de Teste (matriz executável)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** `✅` executado com evidência · `⬜` planejado · `⛔` bloqueado.
**Nenhum ✅ sem evidência de execução nesta sessão.**

---

## 1. Suites executadas em 2026-11-23

### 1.1 Schemas — organizations (9) ✅ `npm test`
| Caso | Resultado |
|------|-----------|
| nome válido (2–160 chars) | ✅ passou |
| slug válido (regex) | ✅ passou |
| nome curto demais → erro pt-BR | ✅ passou |
| slug inválido (caracteres/acentos) | ✅ passou |
| slug muito longo (máx 48) | ✅ passou |
| slug maiúsculo → normalizado minúsculo | ✅ passou |
| slug com espaços nas pontas → trim | ✅ passou |
| updateSchema aceita campos parciais válidos | ✅ passou |
| entrada não-objeto → rejeitada | ✅ passou |

### 1.2 Schemas — clients (7) ✅
| Caso | Resultado |
|------|-----------|
| entrada completa válida | ✅ |
| apenas 1 canal de contato | ✅ |
| **nenhum contato → rejeitado** (regra doc 04) | ✅ |
| nome < 2 chars → rejeitado | ✅ |
| e-mail inválido → mensagem pt-BR exata | ✅ |
| campos vazios → `null` (normalização) | ✅ |
| observações > 4000 chars → rejeitado | ✅ |

### 1.3 Schemas — drones (18) ✅
| Caso | Resultado |
|------|-----------|
| entrada válida; sem nº série; nº série vazio → null | ✅ |
| status fora do enum → rejeitado | ✅ |
| fabricante vazio → rejeitado | ✅ |
| specs > 20 → rejeitado | ✅ |
| specs default `{}` | ✅ |
| manutenção válida; **custo "" → null (não vira 0)** | ✅ |
| custo negativo → rejeitado | ✅ |
| data futura → rejeitado (msg "futuro") | ✅ |
| data formato inválido → rejeitado | ✅ |
| descrição < 2 → rejeitado | ✅ |
| `parseSpecsText`: linhas chave:valor; sem separador → {}; `:x` → {}; trunca chave/valor; preserva `:` interno | ✅ (5 casos) |

### 1.4 Schemas — operators (10) ✅
| Caso | Resultado |
|------|-----------|
| entrada válida; sem observações → null | ✅ |
| nome < 2 / > 120 → rejeitado | ✅ |
| documento com datas válidas; sem datas | ✅ |
| validade < emissão → rejeitado (msg exata + path) | ✅ |
| data formato inválido → rejeitado | ✅ |
| tipo vazio → rejeitado | ✅ |
| datas vazias → null | ✅ |

---

## 2. Casos planejados por área (⬜ = não executados)

### 2.1 Autenticação (⬜)
| ID | Caso | Esperado |
|----|------|----------|
| AUTH-01 | Cadastro com e-mail já existente | Erro amigável, sem vazamento |
| AUTH-02 | Login com senha errada | Erro genérico (não "usuário inexistente") |
| AUTH-03 | Acesso a `/clientes` sem sessão | Redirect `/login` |
| AUTH-04 | Logout limpa cookies | Não acessa rota privada depois |
| AUTH-05 | Recuperação de senha | E-mail enviado; token único expira |

### 2.2 Services/Actions por módulo (⬜ — camada sem cobertura hoje)
| ID | Caso | Esperado |
|----|------|----------|
| SVC-01 | `createClient` com org da sessão A | Grava com org A |
| SVC-02 | `getClient` de org B por id da org A | Não encontrado (não vaza) |
| SVC-03 | `updateDrone` com org errada no payload | Ignorado — org vem da sessão |
| SVC-04 | `deleteClient` (soft) | `deleted_at` preenchido; some das listagens |
| SVC-05 | Ação sem sessão | Erro de autenticação visível |
| SVC-06 | Erro de banco (simulado) | Mensagem visível, log, **sem catch silencioso** |

### 2.3 Estados de UI por rota (⬜ — checklist manual/E2E)
Para `/clientes`, `/drones`, `/operadores` (+ `/novo`, `/[id]`, `/editar`):
| ID | Estado | Esperado |
|----|--------|----------|
| UI-01 | normal | Lista/detalhe com dados reais |
| UI-02 | loading | Skeleton visível (já existe `loading.tsx`) |
| UI-03 | vazio (sem busca) | CTA "Cadastrar primeiro…" |
| UI-04 | vazio (com busca) | "Nenhum resultado para …" |
| UI-05 | erro | Mensagem + tentar novamente |
| UI-06 | 404 | `notFound()` → página 404 |
| UI-07 | sem permissão | Mensagem apropriada (quando aplicável) |
| UI-08 | botão excluir | Confirmação em 2 passos |

### 2.4 Responsividade (⬜ manual)
| ID | Viewport | Esperado |
|----|----------|----------|
| RESP-01 | 360×640 | Sem overflow horizontal; alvo ≥ 44px |
| RESP-02 | 768×1024 | Layout ok; nav acessível |
| RESP-03 | 1280×800 | Desktop ok |
| RESP-04 | 1920×1080 | Sem distorção |
| RESP-05 | Teclado | Tab order lógico; foco visível |

### 2.5 Geoespacial (⛔ futuro) → ver `GEOSPATIAL-TEST-PLAN.md`
### 2.6 Multi-tenant (⛔ banco) → ver `MULTITENANT-TEST-PLAN.md`
### 2.7 Segurança (parcial ⬜) → ver `SECURITY-TEST-PLAN.md`

---

## 3. Defeitos conhecidos (registrados nesta auditoria)

| ID | Defeito | Sev. | Estado |
|----|---------|------|--------|
| **BUG-01** | Comentário de `vitest.config.ts` referencia `npm run test:integration` — **script inexistente** no `package.json` | Baixa (doc/rotina quebrada) | Aberto (sem alteração — Skill 10 não modifica código) |
| **BUG-02** | Pasta `tests/integration` referenciada **não existe** | Baixa | Aberto |
| **BUG-03** | `npm audit`: **6 vulnerabilidades** (2 críticas `tinypool`, 2 altas `postcss`/`zod`, 2 moderadas `@vitest/mocker`) | **Alta** | Aberto (correção exige upgrade com quebra — autorização) |
| **BUG-04** | Sem CI — nada roda automaticamente em push | Média | Aberto |
| **BUG-05** | Sem medição de cobertura | Média | Aberto |
| **BUG-06** | Testes de RLS nunca executados (Docker ausente) | **Crítica** (para homologação) | Aberto |
| ~~BUG-07~~ | `<button>` dentro de `<a>` (HTML inválido) | — | **Corrigido** nesta sessão (`LinkButton`) |
| ~~BUG-08~~ | Asserção "futura" vs "futuro" no teste de manutenção | — | **Corrigido** |
| ~~BUG-09~~ | `next-env.d.ts` quebrava lint | — | **Corrigido** (ignore no ESLint) |

---

## 4. Como executar (reprodução)

```powershell
npm run typecheck   # 0 erros esperados
npm run lint        # 0 problemas esperados
npm test            # 44/44 esperados (hoje)
```
RLS/integração: requer Docker + Supabase CLI (**não disponíveis** — ver `docs/arquitetura/09-desenvolvimento-local.md`).
