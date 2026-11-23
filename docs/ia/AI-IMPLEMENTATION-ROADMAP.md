# AI-IMPLEMENTATION-ROADMAP — Roteiro de Implementação de IA

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSTA — nenhum passo executado; cada fase exige autorização expressa (Skills 04 §15 / 08).

---

## 0. Pré-condições obrigatórias (gate antes da Fase 1)

| # | Pré-condição | Status hoje |
|---|--------------|-------------|
| G1 | Autorização expressa do usuário para iniciar implementação de IA | ❌ Não concedida |
| G2 | Escolha de provedor de modelo + leitura/registro dos termos de uso (dados para treino, residência) | ❌ Não feito |
| G3 | Conta do provedor + chave em `.env` de servidor (nunca commitada; `.gitignore` já protege) | ❌ Não feito |
| G4 | Revisão conjunta com Skills 06 (segurança) e 07 (regulatório) | ❌ Pendente (docs 06/07 parcialmente prontos) |
| G5 | Decisão sobre ADR-004 (sem gateway de pagamento) vs. cobrança de uso de IA | ❌ Pendente |

---

## Fase 0 — Fundação (sem agente visível)

**Escopo:** plataforma mínima de IA.
- [ ] Módulo `src/modules/ai/`: interface de provedor (`generate`), Zod de entrada/saída, política de bloqueio (7 restrições), `metering`.
- [ ] Migração `ai_usage_logs` (seguindo ordem aprovada de migrações — Skill 02; **não** criar fora do plano sem autorização) com RLS negativa por padrão.
- [ ] Rate limit + orçamento por org (AI-COST-CONTROL §2).
- [ ] Rota `POST /api/v1/ai/assist` com streaming, autenticação e logs.
- [ ] Testes: política de recusa, isolamento de org, validação Zod, metering (proporcionais — Skill 04).
- [ ] Nenhuma UI pública nesta fase.

**Saída:** backend de IA testado, desativável por feature flag.

## Fase 1 — **Assistente AeroGrid** (primeiro agente)

**Por quê primeiro:** único agente sem dependência de feature inexistente (não há missões, documentos nem mapas); risco regulatório baixo (só documentação do produto); custo baixo; valida toda a Fase 0.
- [ ] Índice da documentação do produto (`docs/*`) versionado.
- [ ] Ferramentas `search_docs` e `open_screen` (somente-leitura).
- [ ] UI: painel de ajuda com identificação "gerado por IA" + rodapé obrigatório (AI-SECURITY-POLICY §6).
- [ ] Filtro de saída ativo + testes de tentativa de violação (A-01..A-08).
- [ ] Métricas iniciais (uso, custo, erros) por org.

**Saída:** agente em homologação → aprovação → produção.

## Fase 2 — Monitor de Prazos (copy sensível)

- [ ] Regra de datas em código (sem LLM) + IA só para redação do resumo.
- [ ] UX de alerta revisada: **nunca** "documento válido junto à ANAC" (Skill 04 condicionou esta funcionalidade).
- [ ] Ativação por org (owner/admin).

## Fase 3 — Inteligência Gerencial

- [ ] Ferramentas de consulta agregada somente-leitura já escopadas por org.
- [ ] Regra: todo número exibido vem da **mesma query do relatório do produto** (nunca número "inventado" pela IA).
- [ ] Pré-requisito de valor: ideal após existirem missões (0003) — senão, adiar.

## Fase 4 — Assistente Geográfico *(depende da Skill 05)*

- [ ] Só após: migração `0005`, mapas implementados, política de recusa geográfica testada ("área liberada" é bloqueio automático).
- [ ] Parecer da Skill 07 para o copy (matriz item 10/17).

## Fase 5 — Inteligência Documental *(depende da migração 0006)*

- [ ] Infra de documentos/anexos primeiro; depois busca/resumo com RLS em embeddings.
- [ ] Revisão de LGPD (dados de documentos de missões podem conter dados pessoais).

## Fase 6 — Automação de Missões *(depende da migração 0003 + parecer regulatório)*

- [ ] **Gate especial:** classificação na `MATRIZ-FUNCIONALIDADES-REGULATORIAS` (item 21 bloqueado para geração de rota; item 19 exige análise) + parecer da Skill 07 antes do design.
- [ ] Rótulo permanente de "sugestão — revisar humano"; nunca "plano gerado/aprovado".

## Fase 7 — Inteligência Comercial *(condicionada a requisito)*

- [ ] Só entra se a Skill 01 aprovar requisito de CRM — hoje **não existe** e não deve ser criado por inflação de escopo.

---

## Regras transversais do roteiro

1. Nada de Fase seguinte sem as gates da anterior (testes executados e reportados com evidência — nunca "passaram" sem execução).
2. Nenhuma dependência nova sem justificativa de licença/manutenção (Skill 02) — SDK de provedor avaliado na G2.
3. Nenhum push/deploy sem autorização expressa.
4. Cada fase atualiza `AI-ACCEPTANCE-CRITERIA.md` com o status real dos critérios.
5. Se qualquer fase violar as 7 restrições da ETAPA 4, a fase é **interrompida** e o caso vai para a `PENDENCIAS-DE-VALIDACAO-ESPECIALIZADA` da Skill 07.

---

## Riscos do roteiro

| Risco | Mitigação |
|-------|-----------|
| Fase 0 atrasar por dependência de migração fora de ordem | Respeitar plano aprovado (0003 → … → 0007); `ai_usage_logs` pode entrar como `0007`-anexo ou nova migração autorizada — decidir na autorização |
| Provedor mudar preços/termos | Interface de provedor trocável (AI-ARCHITECTURE §3.2) |
| Custos estourarem antes do piloto | Teto diário ativo desde o primeiro dia |
| Copy regulatório errar | Filtro de saída + revisão das Skills 06/07 |
