# API-CATALOG — Catálogo de Candidatos a Integração

**Versão:** 0.1 · **Data:** 2026-11-23 · **Situação:** `✅ confirmado` (doc oficial verificada nesta auditoria) · `⏳ pendente` (não verificado a fundo) · `⛔ não disponível` (sem API pública documentada)
**Regra:** nada de endpoints, preços ou permissões inventados — o que não foi verificado aparece como pendente.

---

## 1. Exibição cartográfica

### 1.1 MapLibre GL JS — ✅ confirmado (biblioteca, não API)
| Campo | Registro |
|-------|----------|
| Finalidade | Renderizar mapas vetoriais no navegador |
| API documentada | Sim — biblioteca open source (BSD-3-Clause) |
| Condições de acesso | Uso livre (licença permissiva) |
| Custos | Gratuita (biblioteca); **tiles** são fornecedor separado |
| Situação | **Aprovada pelo usuário** (2026-11-23) — **não instalada** |

### 1.2 OpenStreetMap (dados + tiles OSMF) — ✅ confirmado, uso comercial de tiles NÃO recomendado
| Campo | Registro |
|-------|----------|
| Finalidade | Dados geográficos (OSDbL) e tiles de exibição |
| API documentada | Sim — tiles por política de uso, não por contrato comercial |
| Condições | **Tile Usage Policy da OSMF**: serviço voluntário/best-effort; a OSMF orienta uso comercial a provedores pagos (pesquisa 2026-11-23) |
| Custos | Dados ODbL gratuitos com atribuição; tiles OSMF: sem garantia, bloqueio em uso pesado |
| Situação | **Descartado para tiles em produção** (decisão registrada na Skill 05 doc 03) |

### 1.3 MapTiler — ⏳ pendente (conflito de termos)
| Campo | Registro |
|-------|----------|
| Finalidade | Tiles vetoriais + geocodificação |
| API documentada | Sim — `https://www.maptiler.com` (documentação pública) |
| Condições | **Conflito:** página de preços (2026-11-23) lista uso comercial no plano Free; comparativos terceiros dizem que o Free é não-comercial |
| Custos | Flex reportado em US$ 30/mês (terceiro, **não confirmado**) |
| Pendência | **Ler os Termos de Serviço vigentes** antes de qualquer uso |
| Situação | Candidato principal — decisão travada na pendência |

### 1.4 Google Maps Platform — ⏳ pendente (custo)
| Campo | Registro |
|-------|----------|
| Finalidade | Mapas, geocoding, rotas |
| API documentada | Sim — página oficial de preços (pay-as-you-go por SKU) |
| Condições | Exige **conta de faturamento**; modelo por SKU (ex.: loads de mapa, geocoding) |
| Custos | Oficiais por SKU em `developers.google.com/maps/billing-and-pricing` (valores por 1.000 eventos a conferir na data da contratação) |
| Complexidade | Baixa técnica, média de custo escalável |
| Situação | Alternativa paga — avaliar só se tile provider falhar |

### 1.5 Stadia Maps — ⏳ pendente
| Campo | Registro |
|-------|----------|
| Finalidade | Tiles para ecossistema MapLibre |
| Custos | Uso comercial a partir de plano pago (US$ 20/mês reportado em 2026-11-23 — conferir) |
| Situação | Reserva |

## 2. Fontes de dados públicos

| # | Fonte | API doc. | Situação | Observação |
|---|-------|----------|----------|------------|
| 5 | **IBGE** (bases cartográficas, malhas) | Download por produto; sem API uniforme identificada | ⏳ pendente | **Licença de uso não verificada** — não presumir redistribuição (Skill 05 doc 03) |
| 6 | **INPE** (PRODES/BDQueimadas/imagens) | Parcial (alguns serviços públicos) | ⏳ pendente | Não pesquisado a fundo; termos a verificar |
| 7 | **ANA** (hidrografia, bacias) | Parcial (Hidroweb/etc.) | ⏳ pendente | Não pesquisado; licença a verificar |
| 8 | **INCRA** (módulos, terras) | Download/GIS | ⏳ pendente | Não pesquisado; licença a verificar |
| 9 | **Fontes oficiais do Pará** (IEPA, SIGA/Pará, prefeituras) | ⏳ pendente | ⏳ pendente | Não pesquisado; cada fonte tem termos próprios |

## 3. Fabricantes e plataformas de drones

| # | Candidato | API doc. | Situação | Condições/complexidade |
|---|-----------|----------|----------|------------------------|
| 10 | **DJI** (Cloud API) | **Sim** — `developer.dji.com/cloud-api` (verificado 2026-11-23) | ✅ confirmado (doc existe) | Requer **cadastro de desenvolvedor**, APP ID/APP Key/App License; protocolos MQTT/HTTPS/WebSocket; exige DJI Pilot 2/Dock; última release listada: Cloud API 1.14.0 (2025-04-15); modelos suportados: Matrice 350/300 RTK, Mavic 3E/3E series, Docks etc. **Complexidade alta; não é MVP** |
| 11 | **Autel Robotics** | ⏳ pendente | ⏳ pendente | Não pesquisado — não afirmar existência de API |
| 12 | **DroneDeploy** | ⏳ pendente | ⏳ pendente | Não pesquisado — não afirmar existência de API |
| 13 | **AirData UAV** | **Sim** — `app.airdata.com/docs/api/` (REST; verificado 2026-11-23) | ✅ confirmado (doc existe) | Importa voos de várias plataformas; acesso por API key; planos com "API access" (preço na página de planos — **não coletado**); **depende de dados de voo reais do cliente** (produto ainda sem missões) |

## 4. Órgãos e sistemas governamentais

| # | Candidato | API pública documentada | Situação |
|---|-----------|-------------------------|----------|
| 14 | **ANAC** | Não identificada (SISANT é sistema web de uso do operador) | ⛔ não disponível |
| 15 | **DECEA** | Não identificada nesta auditoria | ⛔ não disponível |
| 16 | **SARPAS** | Não identificada (sistema web oficial) | ⛔ não disponível — **e qualquer automação é proibida sem autorização expressa** |
| 17 | **BR-UTM** | Não identificada (portal de projeto) | ⛔ não disponível |
| 18 | **ECO-UTM** | Não identificada (arcabouço da ICA 100-48) | ⛔ não disponível |

> **Regra dura:** para 14–18 vale a proibição da Skill 09 §ETAPA 4: **não** automatizar login, navegação ou extração em sistema governamental sem autorização expressa e documentação que permita o uso.

## 5. Serviços empresariais relevantes

| # | Candidato | Situação | Observação |
|---|-----------|----------|------------|
| 19 | E-mail transacional (notificações) | ⏳ pendente | Requisito de produto a definir (Skill 01) — nenhum escolhido |
| 19b | CRM/faturamento (ex.: gateway de pagamento) | ⏳ pendente | ADR-004: **sem gateway no MVP** |
| 19c | Webhook/observabilidade | ⏳ pendente | Decisão de infra pendente |

---

## 6. Resumo por situação

| Situação | Qtde | Itens |
|----------|------|-------|
| ✅ confirmado | 4 | MapLibre (biblioteca), OSM (política verificada → descartado em produção), DJI Cloud API (doc), AirData (doc) |
| ⏳ pendente | 10+ | MapTiler (ToS), Google, Stadia, IBGE, INPE, ANA, INCRA, Pará, Autel, DroneDeploy, serviços empresariais |
| ⛔ não disponível | 5 | ANAC, DECEA, SARPAS, BR-UTM, ECO-UTM |

**Nenhum item acima está integrado ao produto.**
