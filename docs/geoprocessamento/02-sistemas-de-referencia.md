# 02 — Sistemas de Referência Espacial Utilizados

**Versão:** 0.1 · **Data:** 2026-11-23 · **Regra:** nunca misturar coordenadas de sistemas diferentes sem transformação declarada (Skill 05 §4)

---

## 1. Resumo

| Uso | Sistema | EPSG | Observação |
|-----|---------|------|------------|
| Armazenamento (PostGIS) | WGS 84 (geográfico, graus) | **4326** | Tipo `geography` — cálculos geodésicos em metros |
| Entrada/saída de dados (GeoJSON) | WGS 84, ordem **longitude, latitude** | 4326 | RFC 7946 exige WGS 84; proibido membro `crs` |
| Exibição no mapa (MapLibre) | Web Mercator | 3857 | Projeção do render — **nunca usada para cálculo** |
| Dados oficiais IBGE (futuro) | SIRGAS 2000 | **4674** | Exige transformação 4674 → 4326 antes de armazenar |
| GPS/GNSS embarcado | WGS 84 | 4326 | Já compatível |

## 2. Coordenadas: formato e ordem

- **Ordem no banco/GeoJSON:** `longitude, latitude` (X, Y) — padrão GeoJSON/PostGIS.
- **Ordem na interface:** exibir como `latitude, longitude` (como pessoas leem), com rótulo explícito `lat`/`lon` para eliminar ambiguidade.
- **Unidade:** graus decimais (nunca graus/minutos/segundos na interface técnica).
- **Precisão de exibição:** máximo **5 casas decimais** (~1,1 m). Mais casas do que isso declarem precisão que os dados não possuem (Skill 05 §8).
- **Limites válidos:** longitude ∈ [−180, 180], latitude ∈ [−90, 90]. Fora disso → rejeição na validação (doc 06).

## 3. Datum

- **WGS 84:** datum do sistema GPS; base do AeroGrid.
- **SIRGAS 2000:** datum oficial brasileiro (IBGE). Dados IBGE chegam em EPSG:4674.
- **Relação prática:** SIRGAS 2000 e WGS 84 são alinhados na prática (diferenças na ordem de centímetros na época atual). **Ainda assim:** importação de dados em 4674 deverá registrar transformação explícita 4674 → 4326 (mesmo que a operação seja praticamente identidade), porque a regra é declarar e versionar a conversão — nunca assumir silenciosamente (Skill 05 §4).
- **Implementação:** usar `ST_Transform(geom, 4326)` com SRID de origem declarado na importação. Recusar geometrias com SRID desconhecido ou diferente do declarado.

## 4. Projeções

- **Geográfico (4326):** armazenamento e fronteiras de dados. Graus não são unidades de distância — por isso `geography` no PostGIS.
- **Web Mercator (3857):** apenas renderização no cliente (MapLibre). Distorsão de escala cresce com a latitude; o **Pará fica próximo do equador** (≈ 0°–5° S), onde a distorsão é mínima (~1%), mas ainda assim: **nunca medir na projeção 3857**.
- **Projeções regionais (SIRGAS/UTM):** não usadas no MVP. Se necessárias no futuro (ex.: compatibilidade com dados locais), declarar fuso e transformação antes do uso.

## 5. Altitude

- O MVP **não trabalha com altitude**: sem DEM/MDT, sem cálculos de elevação.
- GeoJSON aceita coordenada `z` (terceiro valor); no MVP o `z` é **ignorado no cálculo** e pode ser preservado apenas como dado bruto.
- Proibido exibir ou sugerir: altitude elipsoidal × ortométrica × altura relativa como se fossem medidas confiáveis (Skill 05 §8). Nenhuma tela do MVP exibe altitude.

## 6. Regras de conversão (checklist)

1. Identificar o EPSG de origem antes de importar (declaração obrigatória do contrato — doc 06).
2. Transformar para 4326 com `ST_Transform` (nunca "renumerar" coordenadas).
3. Registrar no metadado da geometria: origem, EPSG declarado, método e data da conversão.
4. Geometrias sem origem declarada → tratadas como 4326 apenas quando o formato (GeoJSON RFC 7946) garantir; caso contrário, recusar.
5. Nunca misturar 3857 (tela) com 4326 (dados) em nenhum cálculo.

## 7. Situação das verificações

Este documento é **especificação**. Testes de conversão (doc 09) ainda **não foram executados** — sem ambiente PostGIS local (Docker ausente). Não declarar aprovado.
