# AI-AGENTS-CATALOG — Catálogo dos 7 Agentes Propostos

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSTA — nenhum agente existe em produção.
**Aviso de custo:** todos os valores são **premissas de estimativa**, não preços confirmados — verificar tabela vigente do provedor antes de qualquer decisão (Skill 08 REGRAS).

**Dados reais disponíveis hoje:** clientes, drones (com manutenção), operadores (com documentos), organizações/usuários. **Não existem:** missões, documentos, mapas, histórico comercial, alertas.

---

## 1. Assistente AeroGrid

| Campo | Conteúdo |
|-------|----------|
| **Problema** | Usuário não sabe onde encontrar funcionalidades nem como preencher cadastros; suporte manual repetitivo |
| **Usuário** | Qualquer membro da org (member/owner/admin) |
| **Dados necessários** | Apenas **documentação do próprio produto** (`docs/*`) indexada localmente + navegação das telas. **Sem dados de clientes/missões** |
| **Ferramentas** | `search_docs` (busca em índice local), `open_screen` (link para rota) — somente-leitura |
| **Riscos** | Resposta errada sobre uso do produto; injection via pergunta do usuário; custo se houver uso abusivo. **Risco regulatório baixo** (não toca operação aeronáutica) |
| **Custo (premissa)** | ~500–2.000 tokens/interação; 1.000 consultas/mês ≈ baixo volume — valor em R$ **não confirmado** (depende do modelo escolhido) |
| **Complexidade** | **Baixa** — sem ferramentas de dados, sem RLS nova |
| **Dependências** | Provedor de modelo + chave; rota `/api/v1/ai/assist`; nenhum bloqueio de feature |
| **Critérios de aceitação** | Ver `AI-ACCEPTANCE-CRITERIA.md` (A-01 a A-08) |

## 2. Inteligência Documental

| Campo | Conteúdo |
|-------|----------|
| **Problema** | Organização de documentos de missão, checklists e relatórios ainda inexistente no produto |
| **Usuário** | member/owner |
| **Dados necessários** | Módulo de documentos/checklists (**migração 0006 — não implementada**) |
| **Ferramentas** | Busca semântica em documentos da org, resumo, extração de campos |
| **Riscos** | Vazamento entre orgs se o filtro falhar; alucinação em resumo de documento crítico; injeção via texto do documento (indireta) |
| **Custo (premissa)** | Alto por chamada (documentos longos) — estimar após modelo real; **não confirmado** |
| **Complexidade** | Média-alta (chunking, embeddings, RLS em nova tabela) |
| **Dependências** | Migração 0006 (documentos), storage de anexos, provavelmente busca vetorial |
| **Critérios de aceitação** | A-20 a A-27 |

## 3. Automação de Missões

| Campo | Conteúdo |
|-------|----------|
| **Problema** | Preenchimento manual e repetitivo de dados de missões |
| **Usuário** | member/owner |
| **Dados necessários** | Módulo de missões (**migração 0003 — não implementada**) |
| **Ferramentas** | Sugestão de campos, rascunhos de checklist, preenchimento assistido |
| **Riscos** | **Alto:** pode ser lido como "geração de plano de voo" (bloqueado na matriz da Skill 01) ou como autorização; precisa de rótulo permanente "sugestão — revisar" |
| **Custo (premissa)** | Médio; volume ligado ao nº de missões — **não confirmado** |
| **Complexidade** | Média, mas **maior carga de revisão regulatória** (Skill 07) |
| **Dependências** | Migração 0003 + 0004; classificação na matriz regulatória antes de qualquer design |
| **Critérios de aceitação** | A-30 a A-36 (+ parecer da Skill 07) |

## 4. Inteligência Gerencial

| Campo | Conteúdo |
|-------|----------|
| **Problema** | Dono não enxerga padrões nos dados (frota parada, clientes inativos, custos) |
| **Usuário** | owner/admin |
| **Dados necessários** | Dados **já existentes**: clientes, drones, manutenções, operadores + missões quando existirem |
| **Ferramentas** | Consultas somente-leitura agregadas (SQL parameterizado já escopado por org) |
| **Riscos** | Números divergentes entre IA e relatório oficial do produto; vazamento entre orgs na montagem de contexto |
| **Custo (premissa)** | Baixo-médio (contexto pequeno, consultas agregadas) — **não confirmado** |
| **Complexidade** | Média (ferramentas de consulta + validação de números) |
| **Dependências** | Nenhuma de feature — pode usar dados atuais; preferível **após** missões para ter valor real |
| **Critérios de aceitação** | A-40 a A-47 |

## 5. Monitor de Prazos

| Campo | Conteúdo |
|-------|----------|
| **Problema** | Validade de documentos de operadores e manutenções vence sem aviso (hoje: **sem alertas** — decisão da Skill 04) |
| **Usuário** | owner/admin |
| **Dados necessários** | `operator_documents.expires_at`, `maintenance_records` — **já existentes** |
| **Ferramentas** | Consulta de vencimentos + redação de resumo diário |
| **Riscos** | Alerta interpretado como "documento válido junto à ANAC" (proibido); falsa sensação de conformidade |
| **Custo (premissa)** | Muito baixo (pode ser **sem LLM**: regra de data + LLM só para redação) — **não confirmado** |
| **Complexidade** | **Baixa** — dado já existe |
| **Dependências** | Definição de UX de alerta (funcionalidade "condicionada" pela Skill 04); nada técnico bloqueante |
| **Critérios de aceitação** | A-50 a A-56 |

## 6. Inteligência Comercial

| Campo | Conteúdo |
|-------|----------|
| **Problema** | Sem visão de pipeline/follow-up de propostas |
| **Usuário** | owner/admin |
| **Dados necessários** | **Não existem** — sem módulo comercial/CRM, sem histórico de propostas |
| **Ferramentas** | (futuras) resumo de interações, sugestão de follow-up |
| **Riscos** | Inventar dados de clientes (proibido); dependência de feature inexistente |
| **Custo (premissa)** | Médio — **não confirmado** |
| **Complexidade** | Média-alta (depende de novo módulo) |
| **Dependências** | Definir requisito de CRM primeiro (Skill 01: sem escopo inflado — pode nem entrar no produto) |
| **Critérios de aceitação** | A-60 a A-66 (só após requisito aprovado) |

## 7. Assistente Geográfico

| Campo | Conteúdo |
|-------|----------|
| **Problema** | Usuário tem dificuldade com coordenadas, GeoJSON e medições |
| **Usuário** | member/owner |
| **Dados necessários** | Geometrias do usuário (**migração 0005 — não implementada**; mapas ainda não existem) |
| **Ferramentas** | Validação de GeoJSON, explicação de erro de coordenada, formatação — **sem** sugerir rota, sem tocar em espaço aéreo |
| **Riscos** | **Alto:** tentação de virar "consultor de voo" (área liberada, rota segura) — proibido pelas regras da Skill 05 §13 e da ETAPA 4 |
| **Custo (premissa)** | Baixo-médio — **não confirmado** |
| **Complexidade** | Média (geometria + política rígida de recusa) |
| **Dependências** | Migração 0005 + implementação de mapas (Skill 05) |
| **Critérios de aceitação** | A-70 a A-77 |

---

## Resumo — ordem recomendada (justificada no roadmap)

| Prioridade | Agente | Por quê |
|------------|--------|---------|
| **1º** | **Assistente AeroGrid** | Único que **não depende de feature inexistente**, risco regulatório baixo, custo baixo, valida a plataforma de IA inteira |
| 2º | Monitor de Prazos | Dado já existe; baixa complexidade; exige copy cuidadosa |
| 3º | Inteligência Gerencial | Dado parcialmente existe; valor claro para owner |
| 4º | Assistente Geográfico | Depende de mapas (Skill 05) + política rígida |
| 5º | Inteligência Documental | Depende da migração 0006 |
| 6º | Automação de Missões | Depende de 0003 + parecer regulatório (Skill 07) |
| 7º | Inteligência Comercial | Requisito de produto ainda não existe |
