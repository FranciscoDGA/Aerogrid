# 07 — Plano de Migrações

**Versão:** 0.1 · **Status:** proposto (pré-código) · **Data:** 2026-11-23

---

## 1. Regras (Skill 02, §6)

Antes de **executar** qualquer migração:

1. Apresentar a alteração (tabelas, colunas, índices, policies).
2. Explicar impacto (leituras/escritas em produção, downtime).
3. Avaliar compatibilidade (migrações aplicadas em ordem; app antigo vs schema novo).
4. Definir estratégia de rollback.

Migrações são **versionadas, sequenciais e nunca editadas após aplicadas** — correção = nova migração.

## 2. Sequência inicial prevista

| # | Migração | Conteúdo | Impacto | Rollback |
|---|----------|----------|---------|----------|
| 0001 | `core-tenancy` | `organizations`, `users`, `memberships`, enums, RLS base + helper `current_membership()` | Novo schema | Reverter SQL (drop) — irrelevante antes do lançamento |
| 0002 | `clients-drones-operators` | tabelas de domínio + índices + RLS | Novo | Idem |
| 0003 | `missions` | `missions`, junções, `sequence_number` por org (sequence) | Novo | Idem |
| 0004 | `missions-integrity` | regra de coerência org↔client (constraint/trigger) | Novo | Idem |
| 0005 | `geo` | `mission_geometries` + extensão PostGIS + índice GiST + SRID 4326 | Novo | Idem |
| 0006 | `documents` | checklists, attachments, reports | Novo | Idem |
| 0007 | `audit-subscriptions` | `audit_logs`, `subscriptions` | Novo | Idem |
| 0008 | `maintenance-operator-docs` | manutenção e documentos de operadores (validade) | Novo | Idem |

> **Ordem pode mudar** conforme a Skill 04 desenvolver — apresentar cada migração antes de aplicar.

## 3. Checklist de cada migração

- [ ] Dicionário de dados (doc 04) atualizado no mesmo commit.
- [ ] ER (doc 03) atualizado se houve mudança relacional.
- [ ] RLS: habilitada em toda tabela nova; policies sem `USING (true)`.
- [ ] Índices em FKs, `(organization_id)` e busca prevista.
- [ ] Teste de isolamento: org A não lê/escreve dados de org B.
- [ ] Compatibilidade com versão anterior do app (migração expand-first quando houver dado vivo).
- [ ] Rollback documentado no corpo da migração (comentário `-- rollback:`).

## 4. Estratégia de expansão (quando houver produção)

- **Expand & contract:** adicionar coluna/tabela nova → deploy do app que usa as duas → remover antiga em migração posterior.
- Nunca reescrever coluna com dado em uso na mesma migração.
- Migrações de RLS: testar com as 3 personas (owner, member, não-membro) antes do deploy.

## 5. Ambientes

| Ambiente | Banco | Aplicação de migração |
|----------|-------|----------------------|
| Local | Supabase local (Docker) | `supabase db reset` / `db push` |
| Preview | Projeto Supabase de preview | automático no deploy (quando existir CI) |
| Produção | Supabase produção | **manual, com apresentação prévia (regra acima)** |

**Proibido:** alterar banco de produção durante planejamento ou testes (Skill 02, §14).
