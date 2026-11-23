# SECURITY-TEST-PLAN — Plano de Testes de Segurança

**Versão:** 0.1 · **Data:** 2026-11-23 · **Referências:** OWASP Top 10, OWASP ASVS, OWASP for LLM (Skill 06 §13).
**Regra:** sem testes invasivos em terceiros, sem testes destrutivos em produção (Skill 06 §17).

---

## 1. Estado atual (o que JÁ foi verificado nesta auditoria)

| Verificação | Método | Resultado |
|-------------|--------|-----------|
| XSS (`dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`) | grep em `src/` | ✅ **0 ocorrências** |
| `any` / `as any` | grep | ✅ **0** |
| `catch {}` silencioso / `TODO`/`FIXME` | grep | ✅ **0** |
| `console.log` | grep | ✅ **0** |
| `service_role` no código | grep | ✅ só comentário explicativo (`server.ts`) |
| Chaves no repositório | `.env.example` sem valores reais; `.env` fora do Git | ✅ |
| Dependências vulneráveis | `npm audit` | ⚠️ **6 vulnerabilidades** (ver BUG-03) |
| Cabeçalhos de segurança | `next.config.ts` | ⚠️ `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy` presentes; **CSP, HSTS, Permissions-Policy ausentes** |
| Sessão | `middleware.ts` valida via `getUser()` (não só JWT) | ✅ parcial — redirecionamento por rota a testar |
| RLS | Implementada em `0001`/`0002` | ⛔ **não executada** (Docker) |

---

## 2. Casos de teste de segurança (ETAPA 3)

### 2.1 Autenticação
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-01 | Login com credenciais inválidas | Erro genérico; sem vazamento de existência | ⬜ |
| SEC-02 | Tentativas automatizadas de login | Rate limit / atraso (Supabase) — verificar configuração | ⬜ |
| SEC-03 | Sessão sem cookie/cookie inválido | Acesso negado às rotas privadas | ⬜ |
| SEC-04 | Troca de senha | Demais sessões encerradas (config Supabase) | ⬜ |
| SEC-05 | Header `Authorization` forjado | Ignorado — identidade vem da sessão | ⬜ |

### 2.2 Autorização
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-06 | `member` chama ação reservada a `owner/admin` | Negado no **servidor** (não só na UI) | ⬜ |
| SEC-07 | Usuário sem org acessa rota privada | Sem permissão | ⬜ |
| SEC-08 | Payload forja `organization_id` de outra org | **Ignorado** — org vem da sessão | ⬜ |
| SEC-09 | Tentativa de escalada via role no cadastro | Papel inicial limitado (owner da org criada) | ⬜ |

### 2.3 IDOR (crítico em SaaS multi-tenant)
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-10 | GET/detalhe com UUID de outra org | 404/não encontrado (sem vaza-tela) | ⬜ (⛔ banco) |
| SEC-11 | PUT/DELETE com UUID de outra org | Negado | ⬜ (⛔ banco) |
| SEC-12 | Enumeração de UUIDs | Resposta idêntica a "não existe" | ⬜ (⛔ banco) |

### 2.4 Injeção
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-13 | Busca `?q=' OR 1=1--` | Tratada como texto (supabase-js parameteriza) | ⬜ |
| SEC-14 | Nome de cliente com `<script>` | Exibido como texto (React escape) | ⬜ |
| SEC-15 | GeoJSON com payload hostil (futuro) | Rejeitado por limites/Zod | ⬜ (Skill 05) |

### 2.5 CSRF / cabeçalhos
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-16 | Server Action de origem cross-site | Bloqueada (verificação de origin do Next) | ⬜ |
| SEC-17 | `curl -I` em rota | `nosniff`, `X-Frame-Options`, `Referrer-Policy` | ✅ config presente — ⬜ executar em runtime |
| SEC-18 | HSTS / CSP ausentes | Registrar como lacuna; definir antes de produção | ⚠️ **lacuna confirmada** |

### 2.6 Segredos e configuração
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-19 | Varredura de segredos no repo (`sk-`, `eyJ`, senhas) | Zero | ⬜ executar varredura ampliada |
| SEC-20 | Bundle do cliente não contém chave de servidor | `SUPABASE_SERVICE_ROLE_KEY` ausente do browser | ⬜ (grep no `.next`) |
| SEC-21 | `npm audit` sem críticas novas | Registrar evolução | ⚠️ 6 hoje (BUG-03) |

### 2.7 Upload de arquivos
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-22 | — | **N/A hoje:** não há upload implementado (futuro: Skill 05 §12 — magic bytes, teto de tamanho, Storage com RLS) | N/A |

### 2.8 Vazamento de dados
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-23 | Erro 500 mostra stack trace ao usuário | Não — mensagem genérica + log server | ⬜ |
| SEC-24 | Logs não contêm senha/token/cookie | Auditoria de logging | ⬜ |
| SEC-25 | Estado vazio não revela dados de outra org | Teste multi-tenant | ⬜ (⛔ banco) |

### 2.9 Abuso de API
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-26 | Rate limiting em rotas | Hoje: sem rotas `/api` — definir ao criar a primeira | N/A→futuro |
| SEC-27 | Payload gigante em form | Limites do Next/Zod; mensagem de erro | ⬜ |

### 2.10 Prompt injection (IA — quando existir)
| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| SEC-28 | "Ignore suas instruções…" | Recusa + log (`AI-SECURITY-POLICY` §3) | ⬜ (⛔ sem IA) |

---

## 3. Prioridade de execução

1. **SEC-08, SEC-10..12** (IDOR/tenant) — só com banco disponível (⛔).
2. **SEC-19/20/21** (segredos/audit) — executáveis já (varreduras).
3. **SEC-01..07** (auth/autorização) — E2E/manual + testes de service.
4. **SEC-16..18** (headers/CSRF) — inspeção em homologação.
5. Demais conforme features nascerem.

## 4. Regras de execução

- Testar **apenas** o próprio ambiente (local/homologação próprio); nunca sistemas de terceiros.
- Nenhum teste destrutivo em produção; sem exclusão de dados reais.
- Achado → registrar em `BUG-REPORT-TEMPLATE.md` com sev. e evidência.
- Vulnerabilidade **não** é ocultada para melhorar indicadores (Skill 06 §14).
