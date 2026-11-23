# Documentação de Geoprocessamento (Skill 05)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** documentação de base — implementação de mapas ainda não iniciada

> O AeroGrid oferece **ferramentas de planejamento geográfico**. Não emite autorizações de voo, não exibe informação aeronáutica oficial e não substitui SARPAS/DECEA/ANAC. Ver [08-limitacoes-conhecidas.md](08-limitacoes-conhecidas.md).

## Índice

| # | Documento | Conteúdo |
|---|-----------|----------|
| 01 | [Manual de geoprocessamento](01-manual-de-geoprocessamento.md) | Conceitos, fluxos de uso e semântica das ferramentas |
| 02 | [Sistemas de referência](02-sistemas-de-referencia.md) | EPSG:4326, SIRGAS 2000, Web Mercator, regras de conversão |
| 03 | [Catálogo de fontes de dados](03-catalogo-de-fontes.md) | Proveniência, cobertura, resolução, limitações |
| 04 | [Licenças das fontes](04-licencas-das-fontes.md) | ODbL, BSD-3, condições comerciais e pendências |
| 05 | [Modelo de armazenamento geográfico](05-modelo-de-armazenamento.md) | PostGIS, `mission_geometries`, índices, RLS |
| 06 | [Contratos de importação/exportação](06-contratos-importacao-exportacao.md) | Regras GeoJSON, limites, erros |
| 07 | [Métodos de cálculo](07-metodos-de-calculo.md) | Distância, área, precisão declarada |
| 08 | [Limitações conhecidas](08-limitacoes-conhecidas.md) | O que o módulo NÃO faz (obrigatório — Skill 05 §13) |
| 09 | [Testes de precisão](09-testes-de-precisao.md) | Casos de referência, tolerâncias, status de execução |
| 10 | [Histórico de alterações](10-historico-de-alteracoes.md) | Changelog do domínio geográfico |

## Decisões centrais (aprovadas)

1. **Bibliotecas:** MapLibre GL JS + Turf.js — ambas **BSD-3-Clause**, sem custo (aprovação do usuário em 2026-11-23). Ferramentas de desenho implementadas sem biblioteca adicional.
2. **Banco:** PostGIS no Supabase (extensão suportada — verificado na documentação do Supabase em 2026-11-23).
3. **Armazenamento:** SRID **4326** (WGS 84), tipo `geography` para cálculos geodésicos, índice GiST, RLS por organização.
4. **Base de mapa (tiles):** fornecedor **ainda não definido** — OSMF (`tile.openstreetmap.org`) descartado para uso comercial; pendência de verificação de Termos do provedor candidato (ver doc 03/04).
5. **Migração:** `0005_geo` conforme plano aprovado (Skill 02), dependente de `0003` (missões).

## Regras inegociáveis (Skill 05 §13)

- Nenhuma tela/funcionalidade declara área "liberada para voo".
- Mapa de referência **nunca** é apresentado como mapa aeronáutico oficial.
- Nenhum corredor/zona aeronáutica inventado; sem prevenção de colisões; sem autorização automática.
- Planejamento geométrico **nunca** é rotulado como rota autorizada.
