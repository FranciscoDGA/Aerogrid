# MULTITENANT-TEST-PLAN — Plano de Testes de Isolamento entre Organizações

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** ⛔ **NENHUM teste executado** — Docker + Supabase CLI ausentes na máquina. Este plano é o roteiro obrigatório para quando o ambiente existir.
**Por quê é o plano mais crítico:** "Uma plataforma que separa incorretamente os dados de empresas não está pronta para comercialização" (Skill 06 §18).

---

## 1. Cenário de duas organizações (ETAPA 5)

```
Org A ("Construtora Pará Norte")          Org B ("Agro Baixo Tocantins")
  ├── user_a@exemplo.com (owner)            ├── user_b@exemplo.com (owner)
  ├── client_a1, drone_a1, operator_a1      ├── client_b1, drone_b1
  └── membership em A                        └── membership em B
```

**Ambiente controlado:** banco local (Supabase CLI) ou CI com Postgres; dados sintéticos; **nunca** produção; nenhum dado real excluído.

## 2. Testes de backend e banco (prioridade máxima — não apenas UI)

### 2.1 Leitura (SELECT via RLS)
| ID | Teste | Como | Esperado | Status |
|----|-------|-----|----------|--------|
| MT-01 | `user_a` lista `clients` | Query autenticada como A | Só registros de A | ⛔ |
| MT-02 | `user_a` busca `client` por **UUID de B** | `select().eq('id', <uuid_b>)` | **0 linhas** | ⛔ |
| MT-03 | `user_a` acessa `drones`, `operators`, `maintenance_records`, `operator_documents` | Query | Só dados de A | ⛔ |
| MT-04 | Usuário **sem membership** em nenhuma org | Query | 0 linhas | ⛔ |
| MT-05 | `is_member_of` com uuid de org alheia | Função | `false` | ⛔ |

### 2.2 Escrita (INSERT/UPDATE/DELETE via RLS)
| ID | Teste | Como | Esperado | Status |
|----|-------|-----|----------|--------|
| MT-06 | `user_a` insere `client` com `organization_id` de **B** | Insert forjando org | **Bloqueado** (RLS/check) | ⛔ |
| MT-07 | `user_a` atualiza registro de B por UUID | `update().eq('id', uuid_b)` | 0 linhas afetadas | ⛔ |
| MT-08 | `user_a` exclui registro de B | `delete()` | 0 linhas afetadas | ⛔ |
| MT-09 | Soft-delete (`deleted_at`) só na org certa | Update | 0 linhas para org alheia | ⛔ |
| MT-10 | Insert com org válida mas usuário não-membro | Insert | Bloqueado | ⛔ |

### 2.3 Camada de aplicação (services/actions)
| ID | Teste | Como | Esperado | Status |
|----|-------|-----|----------|--------|
| MT-11 | Service recebe id de B vindo do **payload** | Chamar `getClient(id_b)` sessão A | Não encontrado — **org vem da sessão, nunca do payload** | ⬜ (unit com mock) |
| MT-12 | Server Action com `organization_id` forjado no FormData | Invocar action | Campo ignorado | ⬜ |
| MT-13 | Papel `member` de A tenta ação de admin | Invocar action | Negado no servidor | ⬜ |
| MT-14 | Sessão expirada chama action | Invocar | Erro de auth visível | ⬜ |

### 2.4 Segurança-definer e funções
| ID | Teste | Como | Esperado | Status |
|----|-------|-----|----------|--------|
| MT-15 | `create_organization` só cria org do chamador | RPC | Org criada com membership do chamador | ⛔ |
| MT-16 | Função `is_member_of` não pode ser usada para espiar | Grant/REVOKE revisado | Sem permissão indevida | ⛔ |
| MT-17 | `service_role` **não** é usada por nenhuma query do app | grep + revisão | Só em contexto server/documentado | ✅ grep (0 usos) |

## 3. Testes de interface (suplementares, não substituem §2)

| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| MT-20 | `user_a` abre URL `/clientes/<uuid_de_b>` | 404/sem acesso — **sem vazar nome/dados** | ⬜ (E2E) |
| MT-21 | Busca de A não retorna resultados de B | Lista só de A | ⬜ |
| MT-22 | Exclusão em A não afeta B | B permanece intacto | ⬜ |

## 4. Como executar quando o ambiente existir

1. Instalar Docker + Supabase CLI (**decisão do usuário**) **ou** usar CI com serviço Postgres+PostGIS.
2. `supabase start` → aplicar `0001` e `0002`.
3. Criar 2 usuários + 2 orgs via fluxo real (RPC `create_organization`).
4. Rodar MT-01..MT-10 com tokens de cada usuário (SQL autenticado ou cliente JS).
5. Registrar saída real de cada caso neste documento (coluna Status → ✅/❌ com data).
6. **Regra:** qualquer ❌ em MT-01..MT-10 é **bloqueio de release** (ver gates).

## 5. O que NÃO fazer

- ❌ Não testar em produção com dados reais.
- ❌ Não desabilitar RLS "para o teste passar".
- ❌ Não usar `service_role` nos testes para simular sucesso de isolamento (só para montar cenário, com registro).
- ❌ Não declarar aprovado sem execução — status continua ⛔ até saída real.

## 6. Resumo honesto

| Bloco | Status |
|-------|--------|
| Leitura/escrita por RLS (MT-01..10, 15–16) | ⛔ **Não executados** (sem banco) |
| Camada de aplicação (MT-11..14) | ⬜ Planejados (MT-11/12 podem rodar com mock já) |
| Interface (MT-20..22) | ⬜ Planejados (E2E) |
| `service_role` no app (MT-17) | ✅ grep: 0 usos |

**Conclusão:** isolamento é o maior risco do produto e hoje está **implementado mas não comprovado**. Homologação não deve ser aprovada antes de MT-01..MT-10 com evidência.
