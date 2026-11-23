# RELEASE-QUALITY-GATES — Portões de Qualidade por Release

**Versão:** 0.1 · **Data:** 2026-11-23 · **Uso:** nenhuma release avança com gate vermelha. Gate não executada = **não passou** (nunca "assumida").
**Aplicação atual:** primeiro deploy (importação para Vercel) usa a seção "Gate de estreia".

---

## 1. Gates obrigatórias (toda release)

| # | Gate | Critério de verde | Como verificar | Status hoje |
|---|------|-------------------|----------------|-------------|
| G1 | Typecheck | `npm run typecheck` → 0 erros | Executar | ✅ **executado 2026-11-23: 0 erros** |
| G2 | Lint | `npm run lint` → 0 problemas | Executar | ✅ **executado 2026-11-23: 0 problemas** |
| G3 | Testes unitários | `npm test` → 100% passando | Executar | ✅ **executado 2026-11-23: 44/44** |
| G4 | Build | `npm run build` → sucesso | Executar | ✅ execução anterior nesta sessão: sucesso (17 rotas) |
| G5 | Segredos | Nenhuma chave em código/commit; `.env` fora do Git | grep + `.gitignore` | ✅ verificado (Skill 06) |
| G6 | Dependências | `npm audit` sem **críticas** pendentes **ou** justificativa registrada | `npm audit` | ⚠️ **6 vulns (2 críticas)** — justificativa: upgrade quebra versões (vitest 5); registrado como BUG-03 |
| G7 | Copy regulatório | Nenhum termo proibido ("área liberada", "voo aprovado", "autorizado pelo DECEA"…) em código/UI | grep na release | ✅ sem ocorrências conhecidas — ⬜ automatizar |
| G8 | Multi-tenant | Nenhum teste MT-01..10 falhando (quando executáveis) | `MULTITENANT-TEST-PLAN` | ⛔ **não executado** — bloqueia homologação completa |
| G9 | Erros de runtime | Sem erro novo em logs da homologação | Inspeção | ⬜ pós-deploy |

## 2. Gate de estreia (primeiro deploy — Vercel)

| # | Item | Status |
|---|------|--------|
| E1 | Build verde (G1–G4) | ✅ |
| E2 | Variáveis de ambiente definidas **no painel da Vercel** (não no Git): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server), `NEXT_PUBLIC_SITE_URL` | ⬜ **ação do usuário na Vercel** |
| E3 | Backend Supabase com migrações `0001`+`0002` aplicadas (e RLS ativa) | ⬜ ação do usuário (Supabase cloud) |
| E4 | Redirect URL do Supabase Auth apontando para o domínio da Vercel | ⬜ ação do usuário |
| E5 | Nenhum segredo commitado | ✅ |
| E6 | README/documentação coerente com o que foi enviado | ✅ docs atualizados |

> ⚠️ **Nota de segurança do deploy:** o `SUPABASE_SERVICE_ROLE_KEY` é de servidor — configurar **apenas** como env de servidor na Vercel (não expor em `NEXT_PUBLIC_*`). Sem ele a app funciona usando anon key (RLS), que é o comportamento desejado para o MVP.

## 3. Gates adicionais por tipo de release

| Tipo | Gates extras |
|------|--------------|
| Nova feature com dados | Testes proporcionais do módulo (Skill 04) + estados de UI completos |
| Migração de banco | Revisão do plano de migrações; rollback definido; **autorização expressa** |
| Feature geoespacial | `GEOSPATIAL-TEST-PLAN` executado; aviso de mapa de referência presente |
| Feature de IA | `AI-ACCEPTANCE-CRITERIA` T-01..T-12 ✅ com evidência |
| Integração externa | `INTEGRATION-PENDING-VALIDATION` sem pendência bloqueante |
| Release "regulatória" (qualquer copy sobre normas) | Revisão das Skills 07/10; fonte oficial citada com data |

## 4. Fluxo

```
código → G1..G5 (locais) → G6..G7 → homologação → G8 (quando ambiente existir)
        → autorização expressa de push/deploy → produção → G9 (pós-deploy)
```

## 5. Rejeição automática

A release é **impedida** se:
- qualquer teste falhar;
- typecheck/lint com erro;
- termo proibido encontrado sem revisão;
- segredo detectado;
- mudança de regra de segurança/RLS sem teste correspondente;
- gate registrada como "não executada" quando obrigatória.

## 6. Estado das gates hoje (resumo)

| Gate | Estado |
|------|--------|
| G1–G5 | ✅ verdes (executadas com evidência em 2026-11-23) |
| G6 | ⚠️ amarela — 6 vulns conhecidas, justificadas |
| G7 | ✅ (manual) / ⬜ automatizar |
| G8 | ⛔ vermelha para homologação completa (não bloqueia o **primeiro deploy de teste** se assumida formalmente) |
| G9 | ⬜ pós-deploy |
| E2–E4 | ⬜ dependem do usuário (Vercel/Supabase) |
