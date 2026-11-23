# 01 — Visão do Produto

**Projeto:** AeroGrid Brasil
**Versão:** 0.1 (rascunho inicial — pendente de validação comercial)
**Última atualização:** 2026-11-23

---

## 1. O que é o AeroGrid Brasil

O AeroGrid Brasil é uma plataforma SaaS (software como serviço) para **gestão e planejamento de operações com drones**.

Em termos simples: é um sistema onde empresas que usam drones organizam seu dia a dia — clientes, equipamentos, pilotos, missões, documentos e relatórios — em um único lugar, com controle de acesso por empresa.

**O que o AeroGrid NÃO é:**

- Não é um sistema de controle de voo.
- Não autoriza voos.
- Não pilota drones.
- Não substitui sistemas oficiais de espaço aéreo.
- Não emite documentos oficiais junto a ANAC, DECEA ou SARPAS.

## 2. Missão

Tornar a operação com drones das empresas brasileiras mais organizada, rastreável e profissional, começando pelo mercado do Pará e evoluindo para outras regiões do país.

## 3. Mercado inicial

- **Região do MVP:** Pará (Brasil).
- **Expansão futura:** outras regiões brasileiras — a arquitetura multiempresa deve permitir isso desde o início, mas a expansão só ocorrerá após validação no mercado inicial.

## 4. Potenciais segmentos de clientes

Estes são **hipóteses de segmento**, não clientes validados:

- Empresas de topografia e agrimensura.
- Empresas de agricultura e agronegócio.
- Empresas de mineração.
- Empresas de engenharia.
- Empresas de inspeção.
- Consultorias ambientais.
- Operadores profissionais de drones.
- Prestadores de serviços especializados.
- Outras organizações que utilizem drones em atividades.

A ordem de prioridade entre esses segmentos será definida após a etapa de descoberta comercial (ver documento 9).

## 5. Problemas que o produto deve investigar

São **hipóteses de pesquisa** — nenhuma está comprovada até agora:

1. Dificuldade para controlar a frota de drones.
2. Dificuldade para organizar operadores e pilotos.
3. Dificuldade para administrar clientes.
4. Dificuldade para planejar e documentar missões.
5. Falta de histórico confiável de operações.
6. Dificuldade para controlar documentos e vencimentos.
7. Gestão informal de checklists.
8. Dificuldade para produzir relatórios.
9. Informação dispersa entre membros da equipe.
10. Informação geográfica desorganizada.
11. Dificuldade para demonstrar organização e rastreabilidade ao cliente final.

**Regra:** um problema só é considerado real quando houver evidência registrada no documento 9 (entrevistas, demonstração de pagamento, uso espontâneo etc.).

## 6. Proposta de valor (hipótese)

> "Uma única ferramenta para organizar clientes, drones, pilotos, missões e documentos de operações com drones — com histórico e relatórios que mostram profissionalismo ao cliente."

Esta proposta será testada nas entrevistas da etapa de validação. Se os potenciais clientes não reconhecerem esse problema como prioridade, a proposta será revista.

## 7. Escopo do MVP

Detalhamento completo no documento **02 — Requisitos**. Resumo:

- **Gestão empresarial:** empresas, usuários, permissões, clientes.
- **Gestão de equipamentos:** drones, fabricante, modelo, número de série, características, situação, manutenção.
- **Gestão de operadores:** cadastro, documentos, qualificações declaradas, validades, histórico de missões.
- **Gestão de missões:** cadastro, cliente, responsáveis, equipamentos, data, situação, objetivo, observações, histórico.
- **Planejamento geográfico:** mapas, coordenadas, origem/destino, waypoints, polígonos, distâncias, importação/exportação GeoJSON.
- **Documentação:** checklists configuráveis, anexos, relatórios, histórico de alterações.

A inclusão definitiva de cada recurso depende de validação técnica e comercial.

## 8. Fora do MVP (não desenvolver inicialmente)

- Autorização automática de voos.
- Controle remoto de drones, autopiloto, prevenção de colisões.
- Rastreamento aeronáutico em tempo real.
- Controle oficial do espaço aéreo ou emissão de autorizações oficiais.
- Gestão de corredores aéreos oficiais.
- Serviços USS ou SDSP sem requisitos e aprovações aplicáveis.
- Integrações oficiais presumidas com DECEA ou ANAC.
- Inteligência artificial que declare uma operação segura ou autorizada.

Reavaliação apenas após estudo regulatório, técnico e comercial específico (ver documento 8).

## 9. Modelo de negócio (hipóteses)

| Plano | Preço hipotético | Observação |
|-------|------------------|------------|
| Inicial | Gratuito | Limitado — definição dos limites pendente |
| Profissional | R$ 59/mês | Hipótese, não preço definido |
| Equipe | R$ 149/mês | Hipótese, não preço definido |
| Empresarial | Sob proposta | Hipótese |

Nenhum preço é definitivo sem pesquisa e testes comerciais (ver documento 9).

## 10. Indicadores a acompanhar

- Empresas cadastradas.
- Usuários ativos.
- Missões registradas.
- Frequência de utilização.
- Funcionalidades mais utilizadas.
- Conversão de gratuitos em pagantes.
- Cancelamentos.
- Receita recorrente mensal (MRR).
- Custo operacional por cliente.
- Solicitações de suporte.
- Satisfação dos clientes.

Métricas de vaidade (ex.: cadastros sem uso) não servem como prova isolada de viabilidade.

## 11. Princípios inegociáveis

1. Não inventar necessidades de mercado.
2. Não inventar dados de concorrentes.
3. Não afirmar que funcionalidade é legalmente permitida sem verificar requisitos aplicáveis.
4. Não prometer autorização de voo.
5. Não representar mapas genéricos como mapas aeronáuticos oficiais.
6. Não simular integração com ANAC, DECEA, SARPAS ou BR-UTM.
7. Não desenvolver funcionalidades reguladas sem análise especializada.
8. Não criar funcionalidades sem propósito comercial identificável.
9. Não aumentar o escopo do MVP sem justificativa registrada.
10. Não comprometer segurança, privacidade ou integridade dos dados para acelerar entregas.

## 12. Arquitetura multiempresa (requisito estratégico)

O AeroGrid é um SaaS multi-tenant. Cada empresa possui seus próprios usuários, clientes, drones, operadores, missões, documentos e relatórios. **O isolamento entre empresas é obrigatório** e deve ser validado pelas skills de Engenharia e Segurança.
