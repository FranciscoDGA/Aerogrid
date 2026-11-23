# AI-COST-CONTROL — Controle de Custos de IA (Proposta)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSTA.
**Aviso obrigatório:** nenhum valor abaixo é preço confirmado. São **premissas de planejamento** — a tabela vigente do provedor deve ser consultada na decisão de contratação (regra da Skill 08: não apresentar estimativa como preço confirmado).

---

## 1. Princípios

1. **Orçamento antes do botão:** sem teto definido por org, o agente não é habilitado.
2. **Medir tudo:** cada chamada gera `input_tokens`, `output_tokens`, `estimated_cost` em `ai_usage_logs`.
3. **Modelo certo para a tarefa:** tarefas simples (classificação, resumo curto) usam modelo menor/mais barato; raciocínio só quando necessário.
4. **Barato por padrão:** cache de perguntas repetidas, respostas curtas, contexto mínimo (nunca "dump" de dados ao modelo).
5. **Custo é visível:** owner/admin vê consumo da org (painel futuro; na fase 1, relatório extraído dos logs).

## 2. Modelo de orçamento

| Nível | Definição (proposta) | Comportamento ao atingir |
|-------|----------------------|--------------------------|
| **Org — teto mensal** | Definido pelo owner (default conservador, ex.: R$ X/mês — valor a calibrar) | IA desativada para a org com mensagem clara |
| **Org — teto diário** | Fração do mensal (evita estouro em 1 dia) | Pausa até o próximo dia |
| **Usuário — rate limit** | Ex.: N chamadas/minuto e M/dia por usuário | HTTP 429 com mensagem amigável |
| **Sessão — orçamento de tokens** | Máximo de tokens por interação (ex.: 8k–16k) | Encerra o laço do agente e responde com o que tem, marcando "resposta parcial" |

*Valores de exemplo acima são **parâmetros de projeto**, não custos de mercado — calibrar com dados reais na fase piloto.*

## 3. Estimativa de custo por agente (premissas — NÃO confirmadas)

> Fórmula usada: `custo = (tokens_entrada/1k × preço_entrada) + (tokens_saída/1k × preço_saída)`. Preços por 1k tokens **não foram consultados nesta auditoria** (nenhum provedor contratado) — por isso as faixas são em **volume de tokens**, que é o que controlamos.

| Agente | Tokens/interação (premissa) | Volume de referência (premissa) | Custo mensal relativo |
|--------|------------------------------|--------------------------------|----------------------|
| Assistente AeroGrid | 500–2.000 | 1.000 consultas | **Baixo** (1×) |
| Monitor de Prazos | 200–800 (+ regra de data sem LLM) | 30 execuções/mês | **Muito baixo** (≈0,1×) |
| Inteligência Gerencial | 1.000–4.000 | 100 análises/mês | Baixo-médio (≈3×) |
| Assistente Geográfico | 800–3.000 | 500 consultas/mês | Médio (≈3–5×) |
| Inteligência Documental | 3.000–15.000 (doc longo) | 200 processamentos/mês | **Alto** (≈15–30×) |
| Automação de Missões | 1.000–5.000 | Volume de missões | Médio (depende do 0003) |
| Inteligência Comercial | — | — | Indeterminado (sem requisito) |

**Regra de leitura:** estes são **múltiplos relativos**, não valores em reais. Multiplicar pela tabela real do provedor depois da escolha do modelo.

## 4. Alavancas de redução de custo (por ordem de efeito)

1. **Não chamar LLM quando dá para código puro** — Monitor de Prazos: filtro de datas em TypeScript; IA só para redigir a mensagem.
2. **Contexto mínimo** — ferramentas retornam só campos necessários.
3. **Cache semântico/exato** de perguntas repetidas (TTL curto, por org — cuidado: cache **nunca** cruza orgs).
4. **Modelo menor** para tarefas de baixo raciocínio; upgrade só em fallback.
5. **Respostas curtas** (limite de tokens de saída por tipo de pergunta).
6. **Desativar agente** quando não há demanda (feature flag por org).

## 5. Alertas e limites operacionais

- 80% do teto mensal → aviso ao owner.
- 100% → bloqueio com mensagem de "limite atingido" (sem tentativas de burla).
- Custo diário anômalo (ex.: 5× a média) → log de alerta para revisão manual.
- Falhas repetidas do provedor → desligamento automático do agente para não gerar custo sem valor.

## 6. Retenção e privacidade dos registros

| Dado | Retenção proposta | Observação |
|------|-------------------|------------|
| Metadados de uso (tokens, custo, org, agente, status) | 12 meses | Base de faturamento/auditoria |
| Conteúdo de prompt/resposta | **Não retido por padrão** | Se retido para debug: no máximo 30 dias e com acesso restrito |
| `requestId` | 12 meses | Correlação de incidentes |

*Períodos propostos — confirmar com a política de privacidade (Skill 06 doc 05) antes da ativação.*

## 7. Pendências de custo

- [ ] Consultar tabela de preços vigente do provedor escolhido e **registrar o valor com data** nesta doc (hoje: inexistente).
- [ ] Definir default de teto mensal por plano de assinatura (relaciona-se com ADR-004: sem gateway de pagamento no MVP — cobrança de IA pode exigir revogar/adaptar essa decisão).
- [ ] Calibrar limites com dados do piloto real (4 semanas de uso).
- [ ] Definir quem é notificado em caso de estouro (owner da org).
