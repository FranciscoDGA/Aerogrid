# AI-SECURITY-POLICY — Política de Segurança da IA (AeroGrid)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSITIVA — sem implementação até autorização.
**Referências:** Skill 08 ETAPA 4 · Skill 06 (segurança/LGPD) · Skill 07 (regulatório) · OWASP Top 10 / LLM Top 10 (OWASP for LLM Applications) como referência de boas práticas.

---

## 1. Restrições inegociáveis (ETAPA 4)

A IA do AeroGrid **NÃO PODE**, em nenhuma circunstância, funcionalidade ou prompt:

1. **Aprovar voos.**
2. **Emitir autorizações.**
3. **Declarar áreas liberadas.**
4. **Simular respostas oficiais** (SARPAS, SISANT, DECEA, ANAC, BR-UTM ou qualquer órgão).
5. **Garantir segurança aeronáutica.**
6. **Inventar informações regulatórias** (números de norma, prazos, exigências sem fonte).
7. **Consultar dados de outras organizações.**

**Mecanismo de aplicação (defesa em camadas):**
- *Camada 1 — prompt:* instrução de sistema com as 7 proibições.
- *Camada 2 — ferramentas:* allowlist; sem ferramenta que emita ato, envie documento oficial ou escreva em dados no MVP.
- *Camada 3 — saída:* filtro pós-geração que detecta padrões proibidos ("autorizado pelo DECEA", "área liberada", "voo aprovado", números de norma não conferidos) → bloqueia e loga.
- *Camada 4 — produto:* copy da UI nunca mostra saída de IA como fato oficial (rodapé obrigatório — ver §6).
- *Camada 5 — teste:* casos de tentativa de violação entram no plano de testes (Skills 08/10).

## 2. Segurança de dados

| Regra | Detalhe |
|-------|---------|
| Escopo mínimo | O modelo recebe **somente** os campos necessários da pergunta atual — nunca dump de tabelas |
| Filtro por org | Todo acesso a dados usa o mesmo `organization_id` da sessão + RLS do banco |
| Proibido `service_role` no frontend | Chave de modelo e qualquer credencial ficam só em variáveis de ambiente de servidor |
| Dados pessoais (LGPD) | Minimizar: não enviar CPF/documentos ao modelo sem necessidade e sem base legal registrada; preferir pseudonimização |
| Retenção | Logs de uso mantidos por período definido em `AI-COST-CONTROL.md` §6; conteúdo de prompt **não** é retido por padrão (apenas metadados) |
| Treinamento | Exigir do provedor (na contratação) que **não use** dados do AeroGrid para treino — verificar termos antes de ativar (pendência) |

## 3. Proteção contra prompt injection

| Vetor | Defesa |
|-------|--------|
| **Injeção direta** (usuário digita "ignore as instruções…") | Instrução de sistema imutável; delimitadores claros entre instrução e dados; detecção de padrões ("ignore anterior", "você agora é", "responda como") → recusa + log |
| **Injeção indireta** (texto dentro de documento/dado inserido pelo usuário) | Dados sempre entre delimitadores (`<<<DADOS>>>…<<<FIM>>>`) e marcados como **não confiáveis**; ferramentas tratam conteúdo como dado, nunca como comando |
| **Exfiltração de prompt** ("repita suas instruções") | Resposta padrão de recusa; não revelar chave, sistema ou dados de outras orgs |
| **Ferramenta abusiva** | Allowlist; parâmetros validados por Zod; nenhuma ferramenta de escrita/exclusão no MVP |
| **Saída como comando** | Saída de IA nunca é executada como SQL/código — é exibida como texto |

## 4. Segurança das chamadas

- Autenticação de sessão → verificação de papel → escopo de org → rate limit → Zod → política → modelo → filtro de saída → registro de uso.
- **Rate limiting:** por usuário e por org (parâmetros a calibrar na implementação; ex.: 20 chamadas/min e teto diário por org).
- **Timeout** definido; retry único idempotente; erros não vazam stack trace (Skill 06 §7).
- **Idempotência:** `requestId` por chamada evita duplicação de cobrança/efeito.

## 5. Modelos de ameaças (resumo — detalhamento na doc 01 da Skill 06)

| Ameaça | Impacto | Controle |
|--------|---------|----------|
| Vazamento de dado entre orgs | Crítico | RLS + filtro de org + teste multi-tenant dedicado |
| Injeção de prompt | Alto | §3 |
| Alucinação apresentada como fato | Alto | Rodapé + filtro + citação obrigatória de fonte quando o assunto for regulatório (ou recusa) |
| Custo por abuso/DoS econômico | Médio | Orçamento e teto (AI-COST-CONTROL) |
| Chave vazada | Crítico | Env de servidor, rotação, nunca no browser, nunca em log |
| Uso da IA para simular órgão | Crítico | Restrições §1 + testes de recusa |

## 6. Transparência com o usuário (copy obrigatória)

- Toda saída de IA exibe identificação: **"Resposta gerada por IA — revise antes de usar."**
- Quando o tema for regulatório: a IA **recusa** e orienta a consultar a fonte oficial (`FONTES-OFICIAIS.md`), sem citar norma de memória.
- Nunca: "aprovado", "liberado", "seguro", "conforme a ANAC/DECEA" (filtro da §1).

## 7. Resposta a incidentes de IA

1. Desativar o agente afetado (chave de feature flag — conceito, não implementado).
2. Revogar/rotacionar chave do provedor.
3. Preservar `ai_usage_logs` do período.
4. Avaliar comunicação conforme política de incidentes da Skill 06 §15 (inclui prazos ANPD, se aplicável).
5. Causa raiz + teste de regressão antes de reativar.

## 8. Pendências de segurança (antes de qualquer agente em produção)

- [ ] Ler e registrar termos de uso/privacidade do provedor de modelo (uso de dados para treino, residência dos dados).
- [ ] Definir modelo e região de processamento.
- [ ] Implementar filtro de saída e testes de recusa (A-01..A-08).
- [ ] Revisão conjunta com as Skills 06 e 07.
- [ ] Nenhuma chave configurada até autorização expressa.
