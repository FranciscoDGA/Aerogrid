# DATA-SOURCES-CATALOG — Catálogo de Fontes de Dados

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSITIVO — nenhuma fonte abaixo está integrada.
**Complementa:** `docs/geoprocessamento/03-catalogo-de-fontes.md` (Skill 05) e `docs/regulatorio/FONTES-OFICIAIS.md` (Skill 07).

---

## 1. Fontes geográficas (uso pretendido: exibição e referência)

| Fonte | Instituição | Tipo | Uso pretendido | Licença/termos | Situação |
|-------|-------------|------|----------------|----------------|----------|
| **OpenStreetMap (dados)** | Comunidade OSM / OSMF | Vetorial colaborativo | Base de exibição (se tiles comercial adquiridos) | **ODbL 1.0** — atribuição obrigatória; redistribuição com licença compatível | ⏳ Pendente de decisão de tiles (skill 05 doc 03/04) |
| **Tiles OSMF** | OSMF | Tiles servidos | — | Tile Usage Policy: não recomendado para SaaS comercial | ⛔ Descartado |
| **MapTiler** | MapTiler AG | Tiles + geocoding | Candidato principal de tiles | ToS em conflito (ver `API-CATALOG` 1.3) | ⏳ Pendente de leitura de ToS |
| **Stadia Maps** | Stadia Maps | Tiles | Reserva | Plano pago para uso comercial | ⏳ Pendente |
| **Google Maps** | Google | Tiles/geocoding | Reserva | Pay-as-you-go por SKU + conta de faturamento | ⏳ Pendente |
| **IBGE** (BC250, malhas municipais, setores) | IBGE | Vetorial oficial | Fronteiras administrativas (futuro) | **Não verificado** — não presumir redistribuição | ⏳ Bloqueado até licença |
| **INPE** | INPE | Imagens/raster, alertas | Futuro (imagens/monitoramento) | Não verificado | ⏳ Pendente |
| **ANA** | Agência Nacional de Águas | Hidrografia/bacias | Futuro (drenagem em geografia) | Não verificado | ⏳ Pendente |
| **INCRA** | INCRA | Módulos/terras | Futuro (referência fundiária) | Não verificado | ⏳ Pendente |
| **Fontes oficiais do Pará** (IEPA, portais estaduais/municipais) | Estadual/municipal | Diversos | Futuro (contexto regional) | Cada fonte com termos próprios — não pesquisado | ⏳ Pendente |
| **Imagens de satélite** (comerciais) | Diversos | Raster | **Fora do MVP** (Skill 05 §11) | Contrato próprio | ⛔ Fora do escopo atual |

## 2. Fontes de dados do próprio cliente

| Fonte | Origem | Regra |
|-------|--------|-------|
| GeoJSON importado/desenhado | Usuário da org | Contrato da Skill 05 doc 06; SRID declarado; validação; preservar metadados de origem |
| Cadastros (clientes/drones/operadores) | Usuário da org | RLS; sem enriquecimento automático com terceiros no MVP |
| Documentos de missão (futuro) | Usuário da org | Migração 0006; retenção e acesso conforme Skill 06 |

## 3. Fontes regulatórias (referência documental — nunca "dados de API")

| Fonte | Uso no produto | Situação |
|-------|----------------|----------|
| Publicações DECEA (ICA 100-40/2026, ICA 100-48) | Base de auditoria regulatória interna | ✅ Consultada (2026-11-23) — **não é integração**, é documentação |
| Legislação ANAC (RBAC 100 / Res. 805, 806) | Idem | ✅ Consultada |
| SARPAS/SISANT/BR-UTM | — | ⛔ Sem API; sem integração; sem automação |

## 4. Regras transversais de fonte de dados

1. **Procedência sempre visível:** instituição, data de atualização, cobertura, limitações.
2. **Nenhuma fonte aeronáutica** entra no produto sem validação técnica **e** regulatória (Skill 05 §13).
3. **Precisão não excede a fonte** (Skill 05 §8): resolução declarada nunca melhorada artificialmente.
4. **CRS declarado** por fonte (EPSG) com transformação explícita antes de uso (Skill 05 doc 02).
5. Dado público ≠ redistribuição livre: licença registrada **antes** de qualquer uso.
6. Cada ativação de fonte atualiza este catálogo com data e responsável.
