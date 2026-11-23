# 04 — Tipografia

**Versão:** 0.1 · **Data:** 2026-11-23 · **Fonte única de verdade para a Skill 04**

---

## 1. Família principal

**Inter** (licença SIL OFL — uso comercial livre; verificar versão no pacote `@fontsource/inter` ou `next/font`).

- Por quê: desenhada para interfaces, alta legibilidade em telas, excelentes números tabulares (tabelas de missões, séries de drones), pesos completos.
- Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

**Uso de `next/font`:** carregar localmente (privacidade — sem requisição a terceiros, alinhado à LGPD) com `display: swap`.

## 2. Família monoespaçada (dados)

**JetBrains Mono** ou `ui-monospace, SFMono-Regular, Menlo, monospace` — apenas para: coordenadas geográficas, números de série, IDs. Licença OFL.

## 3. Escala tipográfica

Base 16px. Escala racional ~1.25 (Major Third):

| Token | Tamanho / linha | Peso | Uso |
|-------|-----------------|------|-----|
| `display` | 30/36 | 700 | títulos de página de login/onboarding |
| `h1` | 24/32 | 600 | título da tela atual |
| `h2` | 20/28 | 600 | seções |
| `h3` | 18/24 | 600 | subtítulos de card |
| `body` | 16/24 | 400 | texto padrão |
| `body-sm` | 14/20 | 400 | tabelas, listas densas |
| `caption` | 12/16 | 400–500 | rótulos, legendas, metadados |
| `overline` | 12/16 | 600 + tracking 0.06em | rótulos de campo em formulários |
| `numeral` | 14/20 `tabular-nums` | 500 | valores em tabelas e KPIs |

## 4. Regras

1. **Máximo 2 pesos por tela** em geral (400 e 600); 700 só para display/h1.
2. Texto corrido nunca centralizado; largura máxima de leitura ~72ch.
3. `gray-900` para texto principal, `gray-500` secundário — nunca opacidade < 60% para texto.
4. Números em tabelas: sempre `font-variant-numeric: tabular-nums` (colunas alinhadas).
5. Coordenadas: monoespaçada + formato explícito (`-1.4550, -48.5030`), com rótulo de ordem (lat, lon) — nunca só cor para diferenciar.
6. Sem texto em caixa alta longa; `overline` e `caption` sim.

## 5. Hierarquia de exemplo (tela de lista)

```
H1  Missões                     (24/600, gray-900)
    12 missões neste mês         (14/400, gray-500)
── separador ──
overline  CLIENTE                (12/600, gray-500, tracking)
body-sm   Topografia Vale Norte  (14/400, gray-900)
caption   Atualizado há 2 h      (12/400, gray-500)
```

## 6. Acessibilidade vinculada

- Texto de corpo ≥ 14px em tabelas, ≥ 16px em formulários principais (mobile).
- Zoom do navegador até 200% sem quebra de layout (doc 10).
- Nunca comunicar estado só por peso/cor — combinação com ícone/texto.
