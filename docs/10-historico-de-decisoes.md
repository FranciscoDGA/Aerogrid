# 10 — Histórico de Decisões Estratégicas

**Projeto:** AeroGrid Brasil
**Versão:** 0.1
**Última atualização:** 2026-11-23

---

> Registro cronológico das decisões de produto e estratégia. Toda mudança de escopo, preço ou direção deve aparecer aqui.

## D-001 — Direção inicial: SaaS de gestão de operações com drones
- **Data:** 2026-11-23
- **Decisão:** Construir o AeroGrid como plataforma SaaS de gestão e planejamento de operações com drones, começando pelo Pará.
- **Justificativa:** Foco em um mercado inicial geograficamente definido permite validação mais rápida; arquitetura preparada para expansão futura.
- **Alternativas descartadas:** começar pela operação de voos (serviço, não produto); começar por funcionalidades aeronáuticas reguladas.

## D-002 — MVP restrito a gestão empresarial
- **Data:** 2026-11-23
- **Decisão:** O MVP limita-se a: empresas/usuários/permissões/clientes, drones, operadores, missões, planejamento geográfico básico e documentação (checklists, anexos, relatórios, auditoria).
- **Justificativa:** Funcionalidades de gestão resolvem problemas verificáveis sem risco regulatório; funcionalidades aeronáuticas carregam risco legal e de responsabilidade.
- **Condicional:** inclusão definitiva de cada recurso depende de validação técnica e comercial.

## D-003 — Proibição de funcionalidades reguladas no MVP
- **Data:** 2026-11-23
- **Decisão:** Vetado desenvolver: autorização automática de voo, controle remoto/autopiloto, rastreamento em tempo real, controle de espaço aéreo, USS/SDSP, integrações presumidas com DECEA/ANAC/SARPAS/BR-UTM e IA que declare operação segura.
- **Justificativa:** Princípios inegociáveis 3, 4, 6 e 7. Risco regulatório e de reputação.
- **Reavaliação:** apenas após estudo regulatório, técnico e comercial específico.

## D-004 — Preços como hipóteses
- **Data:** 2026-11-23
- **Decisão:** Adotar provisoriamente: Inicial gratuito, Profissional R$ 59/mês, Equipe R$ 149/mês, Empresarial sob proposta — **todos como hipóteses de teste**.
- **Justificativa:** Sem pesquisa de mercado, preços são chute. O objetivo é testar disposição de pagamento, não fixar tabela.
- **Condicional:** nenhum preço é definitivo sem pesquisa e testes comerciais (H-P3, P4, P5 no documento 09).

## D-005 — Documentação obrigatória como base de trabalho
- **Data:** 2026-11-23
- **Decisão:** Manter os 10 documentos obrigatórios (ver docs/README.md) atualizados desde o início do projeto.
- **Justificativa:** Separa fatos de hipóteses, preserva rastreabilidade de decisões e evita escopo inflado sem justificativa.

## D-006 — Início pela documentação fundacional
- **Data:** 2026-11-23
- **Decisão:** Primeira entrega do projeto: documentos fundacionais (visão, requisitos, matriz de funcionalidades, hipóteses, decisões) antes de código.
- **Justificativa:** O fundador não é especialista aeronáutico; a base documental orienta as demais skills (engenharia, segurança, UX) e evita construir errado.
- **Decisor:** fundador + Skill 01.

---

**Formato para novas entradas:** `D-XXX — Título` / Data / Decisão / Justificativa / Alternativas descartadas / Condicional (se houver).
