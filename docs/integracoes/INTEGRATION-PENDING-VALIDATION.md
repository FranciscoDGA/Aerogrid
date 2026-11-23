# INTEGRATION-PENDING-VALIDATION — Pendências de Validação de Integrações

**Versão:** 0.1 · **Data:** 2026-11-23 · **Regra:** nada é tratado como aprovado enquanto a pendência não for fechada com evidência (URL consultada, termo lido, data registrada).

---

## 1. Pendências bloqueantes (travam implementação)

| ID | Pendência | Bloqueia | Como fechar |
|----|-----------|----------|-------------|
| **P-T01** | **Termos de Serviço do MapTiler** — conflito entre página de preços ("Free = comercial") e comparativos terceiros ("Free = não-comercial") | Escolha do tile provider (MVP da Skill 05) | Ler ToS vigentes em `maptiler.com/terms` (ou equivalente), citar cláusula de uso comercial, datar |
| **P-T02** | **Licença de uso de dados do IBGE** — redistribuição e uso comercial não verificados | Uso de camadas IBGE | Encontrar página oficial de termos/licença do produto específico (ex.: BC250), citar e datar |
| **P-T03** | **Conta e chave de tile provider** — não existe conta; o agente não cria conta nem contrata serviço | Qualquer mapa em produção | **Usuário** cria a conta/contrata; registra plano, custo e data aqui |
| **P-T04** | **Autorização expressa** para iniciar a Fase 0 da (`INTEGRATION-ROADMAP`) | Tudo | Confirmação do usuário |

## 2. Pendências de verificação de custo (não confirmado)

| ID | Pendência | Status atual |
|----|-----------|--------------|
| **P-T05** | MapTiler Flex — US$ 30/mês é dado de terceiro (2026-11-23), não da página oficial | ⏳ |
| **P-T06** | Stadia — US$ 20/mês comercial é dado de terceiro | ⏳ |
| **P-T07** | Google Maps — valores por SKU precisam de leitura da página oficial na data da contratação | ⏳ |
| **P-T08** | AirData — preço do plano com API access não coletado | ⏳ |
| **P-T09** | DJI Cloud API — condições de programa de desenvolvedor (custo, aprovação) não verificadas | ⏳ |

## 3. Pendências de fontes de dados

| ID | Pendência | Status |
|----|-----------|--------|
| **P-T10** | INPE — API/termos de uso não pesquisados | ⏳ |
| **P-T11** | ANA — serviços e licenças não pesquisados | ⏳ |
| **P-T12** | INCRA — dados e licença não pesquisados | ⏳ |
| **P-T13** | Fontes oficiais do Pará (IEPA, estaduais/municipais) — não pesquisadas | ⏳ |
| **P-T14** | Autel Robotics / DroneDeploy — existência de API **não confirmada** (não afirmar) | ⏳ |

## 4. Pendências regulatórias (cross-compliance com Skills 07/09)

| ID | Pendência | Regra |
|----|-----------|-------|
| **P-T15** | Nenhuma integração com ANAC/DECEA/SARPAS/BR-UTM/ECO-UTM sem: API documentada oficialmente + autorização expressa do órgão + nova auditoria | Proibição vigente |
| **P-T16** | Proibição de automatizar login/navegação/extração em sistema governamental sem autorização expressa documentada | Vigente |
| **P-T17** | Se qualquer integração enviar dados pessoais a terceiro: revisar base legal/contrato de operador (LGPD) com assessoria — **não declarar conformidade** | Pendente de avaliação jurídica |

## 5. Pendências técnicas (arquitetura)

| ID | Pendência |
|----|-----------|
| **P-T18** | Definir ambiente de homologação das integrações (hoje: sem Docker/Supabase CLI local — testes de RLS não executados) |
| **P-T19** | Definir métricas/limiares de alerta por fornecedor (latência, taxa de erro) |
| **P-T20** | Decidir necessidade de fila (broker) — MVP usa processamento assíncrono simples |
| **P-T21** | Pipeline de scan de segredos no CI (ainda não existe — CI/CD não configurado) |

## 6. Itens já FECHADOS nesta auditoria

| ID | Item | Evidência |
|----|------|-----------|
| ✅ C-01 | Nenhuma integração ativa, nenhum serviço externo além do Supabase | Inspeção de `package.json`, rotas e env (2026-11-23) |
| ✅ C-02 | MapLibre + Turf aprovados (BSD-3), não instalados | Aprovação do usuário 2026-11-23; `package.json` sem as libs |
| ✅ C-03 | Tiles OSMF descartados para produção | Política OSMF verificada (Skill 05) |
| ✅ C-04 | DJI Cloud API e AirData UAV têm documentação pública | URLs verificadas em 2026-11-23 |
| ✅ C-05 | SARPAS/SISANT/BR-UTM/ECO-UTM/ANAC/DECEA: sem API pública identificada | Pesquisa 2026-11-23 |

---

**Nenhuma pendência acima foi implementada, contatada ou contratada.** Fechamento de pendência ≠ autorização de implementação — esta é separada (§P-T04).
