# 03 — Catálogo de Fontes de Dados Geográficos

**Versão:** 0.1 · **Data de pesquisa:** 2026-11-23 · **Regra:** para cada fonte: instituição, origem, atualização, cobertura, resolução, licença, limitações, condições comerciais (Skill 05 §11)

> Nenhuma fonte abaixo é aeronáutica. Nenhuma será tratada como informação aeronáutica oficial (§13).

## 1. Base de mapa (tiles de exibição)

### 1.1 OpenStreetMap Foundation (tile.openstreetmap.org) — **DESCARTADO**
| Campo | Valor |
|-------|-------|
| Instituição | OpenStreetMap Foundation (voluntária, doada) |
| Origem | Dados OpenStreetMap; tiles servidos pela OSMF |
| Cobertura | Global |
| Licença dos **dados** | ODbL 1.0 (uso comercial do dado permitido com atribuição) |
| Política dos **tiles** | Tile Usage Policy: serviço "best-effort", pode bloquear uso pesado/inadequado; a própria OSMF orienta empresas a usarem provedores comerciais |
| Condição comercial | **Não recomendado para SaaS comercial** — pesquisa de 2026-11-23 (fórum da comunidade OSM + política oficial) |
| Decisão | Não utilizar tiles OSMF em produção |

### 1.2 MapTiler Cloud — **candidato, verificação PENDENTE**
| Campo | Valor |
|-------|-------|
| Instituição | MapTiler AG (Suíça) |
| Origem | Tiles vetoriais/raster derivados de OSM e fontes próprias |
| Cobertura | Global (com opções de estilo) |
| Página de preços consultada (2026-11-23) | Plano **Free** listado com "Commercial use" e "No MapTiler logo required" |
| Conflito identificado | Comparativos terceiros (mesma data) afirmam que o Free é **não-comercial** com logo obrigatório |
| Limitação | Sem SLA no Free; quota mensal; sem offline |
| **Pendência** | **Ler os Termos de Serviço vigentes antes de qualquer uso em produção** e registrar a conclusão neste doc. Se o Free não permitir uso comercial → plano Flex (US$ 30/mês, cotação de 2026-11-23) ou outro provedor |
| Status | Não integrado; decisão de implementação pendente |

### 1.3 Stadia Maps — **alternativa paga**
| Campo | Valor |
|-------|-------|
| Instituição | Stadia Maps (EUA) |
| Condição comercial | Uso comercial começa no plano Starter (US$ 20/mês — cotação de 2026-11-23) |
| Nota | Ecossistema MapLibre (troca por URL de estilo) |
| Status | Reserva, se MapTiler não for viável |

### 1.4 Imagens de satélite — **fora do MVP**
Nenhuma camada de imagem de satélite no MVP: exigiria licença própria verificada (ex.: MapTiler Satellite, Maxar, Planet) e não há requisito aprovado (Skill 01 — sem escopo inflado).

## 2. Dados de referência (vetoriais)

### 2.1 IBGE — bases cartográficas
| Campo | Valor |
|-------|-------|
| Instituição | Instituto Brasileiro de Geografia e Estatística (IBGE) |
| Origem | Base Cartográfica Contínua (BC250/BC1000), malhas municipais, setores censitários — download no portal de Geociências do IBGE |
| Cobertura | Brasil (Pará incluso); escalas 1:25.000 a 1:1.000.000 conforme produto |
| Atualização | Ciclos regulares (ex.: edição da base municipal de 2022/2025 — verificar data vigente por produto) |
| Sistema de referência | SIRGAS 2000 (EPSG:4674) — ver doc 02 |
| Licença | **PENDENTE de verificação** — termos oficiais de uso não foram confirmados na pesquisa de 2026-11-23; não presumir redistribuição livre |
| Uso pretendido | Fronteiras administrativas como camada de referência (futuro) — apenas após verificação de licença e transformação 4674→4326 |
| Status | Não integrado |

### 2.2 Dados do próprio usuário (GeoJSON)
| Campo | Valor |
|-------|-------|
| Origem | Upload/importação do usuário ou desenho na interface |
| Sistema de referência | WGS 84 (RFC 7946) — contrato no doc 06 |
| Licença/propriedade | Do usuário/organização; preservar metadados de origem |
| Limitações | Só válidos se passarem na validação do doc 06 |

## 3. Fontes AERONÁUTICAS

**Nenhuma.** O AeroGrid não consome, exibe nem simula dados aeronáuticos (SARPAS, DECEA, ANAC, BR-UTM, zonas, restrições). Qualquer fonte futura exige: fonte oficial, data de atualização, cobertura, limitações e validação técnica **e** regulatória antes de qualquer implementação (Skill 05 §13).

## 4. Pendências do catálogo

- [ ] Verificar Termos de Serviço vigentes do MapTiler (uso comercial no Free).
- [ ] Verificar termos oficiais de uso de dados do IBGE (redistribuição e uso comercial).
- [ ] Definir provedor de tiles antes da implementação de mapas.
- [ ] Registrar data de atualização real de cada fonte efetivamente integrada.
