# 08 — Mapa de Dependências

**Versão:** 0.1 · **Status:** proposto (pré-código) · **Data:** 2026-11-23

---

Regra: **nada de dependência por popularidade** (Skill 02, §3). Toda adição entra aqui com justificativa. Dependências novas exigem registro neste documento.

## 1. Dependências de produção (previstas)

| Pacote | Para quê | Justificativa | Alternativa descartada |
|--------|----------|---------------|------------------------|
| `next`, `react`, `react-dom` | framework/UI | stack preferencial da skill | — |
| `typescript` | tipagem estrita | ADR-004 | JS puro (sem tipagem) |
| `tailwindcss` | estilos | stack preferencial; rápido e consistente | CSS modules (mais lento p/ time) |
| `zod` | validação nas fronteiras | ADR-004 | valibot (menor ecossistema) |
| `@supabase/ssr` + `@supabase/supabase-js` | auth + cliente server | ADR-002 | auth próprio (reinventar) |
| `maplibre-gl` | renderização de mapa | ADR-005; open source, sem lock-in de vendor específico | leaflet (menor performance3D/tiles modernos), Google Maps (custo/licença) |
| `geojson` (tipos) | tipos TS GeoJSON | contrato do doc 05 | — |
| PostGIS (extensão no banco) | geometria, distância, índices espaciais | Skill 02, §9 | cálculo em JS (perde índice e precisão) |

**Evitar no MVP:** bibliotecas de estado globais pesadas, UI kits completos sem necessidade, ORMs pesados — usar SQL/Postgres direto via Supabase + repositórios pequenos (decisão provisória; revisar com Skill 04 se a produtividade exigir ORM leve).

## 2. Dependências de desenvolvimento

| Pacote | Para quê | Justificativa |
|--------|----------|---------------|
| `vitest` | testes de unidade/integração | rápido, mesmo ecossistema TS |
| `@testing-library/react` | testes de componentes | — |
| `playwright` | e2e dos fluxos principais (Skill 02, §12) | cobre navegador real |
| `eslint` + `prettier` | consistência | nomenclatura e estilo (§7) |
| `supabase` (CLI) | migrações e banco local | doc 07 e 09 |

## 3. Dependências externas (serviços)

| Serviço | Uso | Status | Risco |
|---------|-----|--------|-------|
| Supabase | banco, auth, storage | escolhido (ADR-002) | lock-in mitigado por SQL portável |
| Vercel | hospedagem do Next | previsto (stack da skill) | custo crescente — monitorar (Skill 02, §11) |
| Procedor de tiles de mapa | camada base do MapLibre | **não escolhido** | licença/atribuição devem ser verificadas antes (ADR-005) |
| Gateway de pagamento | assinaturas | adiado (ADR-009) | — |
| Qualquer órgão público (ANAC, DECEA, SARPAS, BR-UTM) | — | **não presumido** (ADR-010) | proibido simular |

## 4. Regras de mudança

1. Instalar dependência nova = justificativa + entrada neste doc + revisão de licença e manutenção.
2. Remover dependência = verificar usos e atualizar doc 05/09 se afetar contrato ou setup.
3. Dependência sem commit nos últimos 12 meses ou licença incompatível = não adotar sem avaliação.
4. Mapa atualizado a cada mudança relevante (Skill 02, §13.8).
