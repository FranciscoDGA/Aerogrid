# GEOSPATIAL-TEST-PLAN — Plano de Testes Geográficos

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** ⛔ **nenhum executado** — features de mapa/cálculo não existem (Skill 05 ainda em documentação). Casos e tolerâncias definidos **antes** da implementação (TDD).
**Métodos de cálculo:** ver `docs/geoprocessamento/07-metodos-de-calculo.md`; CRS em `02-sistemas-de-referencia.md`.

---

## 1. Coordenadas e conversão

| ID | Caso | Método | Tolerância esperada | Status |
|----|------|--------|---------------------|--------|
| GEO-01 | Roundtrip `lon,lat → exibição → armazenamento` (5 decimais) | Ida/volta | ≤ 1,1 m de erro (5ª casa ≈ 1,11 m no equador) | ⬜ |
| GEO-02 | Ordem invertida (`lat,lon` onde `lon,lat` é esperado) | Validação | **Rejeitado** com mensagem pt-BR | ⬜ |
| GEO-03 | Fora de limites (lon 181, lat 91) | Validação | Rejeitado | ⬜ |
| GEO-04 | `NaN`/`Infinity`/string não numérica | Validação | Rejeitado | ⬜ |
| GEO-05 | Conversão SIRGAS 2000 (EPSG:4674) → WGS84 (4326) | `ST_Transform` | Diferença ≈ 0 na prática; **transformação declarada** obrigatória (nunca "renumerar") | ⬜ (⛔ PostGIS) |
| GEO-06 | Geometria com SRID diferente do declarado | Importação | Recusada | ⬜ |
| GEO-07 | Cálculo proibido em Web Mercator (3857) | Code review + teste | Função de distância **nunca** usa 3857 | ⬜ |

## 2. Distâncias (método geodésico WGS 84)

| ID | Caso | Valor de referência | Tolerância | Status |
|----|------|---------------------|------------|--------|
| GEO-10 | Dois pontos a 0,01° de longitude no equador (0,0)→(0,01,0) | ≈ **1 113,19 m** (circunferência equatorial 40 075 016,686 m ÷ 360 × 0,01) | ± 0,1% | ⬜ |
| GEO-11 | Dois pontos a 0,01° de latitude (0,0)→(0,0,01) | ≈ **1 105,74 m** (meridiano ≈ 40 008 km ÷ 360 × 0,01) | ± 0,1% | ⬜ |
| GEO-12 | Distância Belém–Manaus (aprox. 490 km — valor de referência a fixar com fonte na implementação) | Referência a calibrar | ± 0,5% | ⬜ |
| GEO-13 | Distância de uma aresta × soma do percurso em linha poligonal | Soma > reta (desigualdade triangular) | Asserção de desigualdade | ⬜ |
| GEO-14 | Distância entre pontos idênticos | 0 | 0 exato | ⬜ |
| GEO-15 | Distância em linha reta (plana) vs geodésica em trecho longo | Geodésica ≤ plano em escala global; **rótulos distintos na UI** | — | ⬜ |

## 3. Áreas

| ID | Caso | Valor de referência | Tolerância | Status |
|----|------|---------------------|------------|--------|
| GEO-20 | Quadrado 0,01° × 0,01° no equador | ≈ 1 113,19 m × 1 105,74 m ≈ **1 231 000 m² ≈ 123,1 ha** | ± 0,5% | ⬜ |
| GEO-21 | Polígono degenerado (área 0 — linha fechada) | 0 ou rejeição | Definir na implementação | ⬜ |
| GEO-22 | Polígono com anel externo e interno (buraco) | Área externa − interna | ± 0,5% | ⬜ |
| GEO-23 | Unidades: m² → ha → km² com limiares fixos | 1 ha = 10 000 m²; 1 km² = 100 ha | Exato (conversão) | ⬜ |
| GEO-24 | Polígono atravessando o antimeridiano (±180) | Caso extremo — definir comportamento | Rejeição ou cálculo correto (decidir na implementação) | ⬜ |

## 4. Perímetros

| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| GEO-30 | Retângulo 0,01° × 0,01° no equador | ≈ 2 × (1113,19 + 1105,74) ≈ **4 437,9 m** | ± 0,5% | ⬜ |
| GEO-31 | Perímetro não fecha o anel | Rejeição (ring não fechado) | ⬜ |

## 5. Polígonos e validação geométrica

| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| GEO-40 | Anel não fechado (primeiro ≠ último) | Rejeitado (RFC 7946 exige fechamento) | ⬜ |
| GEO-41 | Auto-interseção ("borracha"/bowtie) | Rejeitado (`ST_IsValid` = false) | ⬜ |
| GEO-42 | Menos de 4 posições no anel externo | Rejeitado | ⬜ |
| GEO-43 | Ordem de anéis invertida (interno/externo) | Rejeitado ou normalizado — definir | ⬜ |
| GEO-44 | `GeometryCollection` aninhada profundamente | Limitar profundidade/elementos | ⬜ |
| GEO-45 | Coordenada `z` presente | `z` ignorado em cálculo (MVP sem altitude) | ⬜ |

## 6. GeoJSON (importação/exportação)

| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| GEO-50 | Exportar FeatureCollection → reimportar | Roundtrip com perda ≤ 1e-9 graus | ⬜ |
| GEO-51 | Arquivo > limite de bytes (teto a definir, ex.: 5 MB) | Rejeitado com mensagem | ⬜ |
| GEO-52 | > limite de features | Rejeitado | ⬜ |
| GEO-53 | JSON malformado | Rejeitado com erro claro (sem crash) | ⬜ |
| GEO-54 | Membro `crs` presente (vedado pela RFC 7946) | Rejeitado/ignorado com aviso | ⬜ |
| GEO-55 | Propriedades com tipo inesperado (função/anel) | Preservar só tipos JSON válidos | ⬜ |
| GEO-56 | Feature sem `geometry` válida | Rejeitado por item, com mensagem **por item** (não some tudo) | ⬜ |
| GEO-57 | Arquivo com BOM/CRLF/acentuação UTF-8 | Aceito corretamente | ⬜ |

## 7. PostGIS (queries espaciais)

| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| GEO-60 | Índice GiST criado em `mission_geometries` | Plano de execução usa índice (`EXPLAIN`) | ⬜ (⛔ banco) |
| GEO-61 | Interseção/proximidade entre geometrias de orgs diferentes | **Vazio** (RLS) | ⬜ (⛔ banco) |
| GEO-62 | `ST_Distance` em `geography` vs `geometry` | geography em metros geodésicos | ⬜ |
| GEO-63 | Consulta espacial sem índice em tabela grande | Desempenho aceitável (definir nº de linhas de teste) | ⬜ |

## 8. Casos extremos geográficos

| ID | Caso | Esperado | Status |
|----|------|----------|--------|
| GEO-70 | Polo (lat ±90) | Validação aceita? decidir; cálculos sem erro | ⬜ |
| GEO-71 | Perto do equador (Pará: −1,4° a −9,9°) | Cálculos dentro das tolerâncias acima | ⬜ |
| GEO-72 | Coordenadas com muitas casas (15 decimais) | Normalizar/truncar conforme política (5 na UI) | ⬜ |
| GEO-73 | Lista de coordenadas duplicadas consecutivas | Tolerar ou rejeitar — definir | ⬜ |

---

## 9. Notas de método

1. **Nenhum caso acima foi executado** — declarar qualquer resultado como "aprovado" seria falso (Skill 10 REGRAS).
2. Valores de referência derivados de constantes geodésicas conhecidas (circunferência equatorial WGS 84 = 40 075 016,686 m; mérito ≈ 40 008 km) — calibrar contra **fonte primária** (ex.: página de constantes do projeto PROJ/PostGIS) na implementação e revisar tolerâncias.
3. Execução exige: implementação da Skill 05 + PostGIS (migração `0005`) + banco (⛔ Docker).
4. Precisão exibida nunca superior à fonte (Skill 05 §8) — teste GEO-01 cobre isso.
