# 03 — Paleta de Cores (Design Tokens)

**Versão:** 0.1 · **Data:** 2026-11-23 · **Fonte única de verdade para a Skill 04**

---

## 1. Cores institucionais (marca)

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-900` | `#0A1F3D` | fundo escuro (login), textos sobre claro de alta ênfase |
| `brand-800` | `#0F2E5C` | símbolo da marca, cabeçalhos escuros |
| `brand-700` | `#14417F` | hover de ações primárias |
| `brand-600` | `#1B5A9E` | **cor primária** — botões primários, links ativos |
| `brand-500` | `#2E7BD6` | elementos tecnológicos, gráficos, foco |
| `brand-400` | `#5B9DE0` | destaques sobre escuro, waypoints |
| `brand-300` | `#8FBCEA` | bordas de destaque suave |
| `brand-200` | `#C3DAF3` | preenchimentos leves |
| `brand-100` | `#E4EEFA` | fundos de badge/tooltip, seleção de linha |
| `brand-50` | `#F3F7FC` | fundo de seção alternada |

## 2. Neutros

| Token | Hex | Uso |
|-------|-----|-----|
| `white` | `#FFFFFF` | superfície principal |
| `gray-50` | `#F7F8FA` | fundo da aplicação |
| `gray-100` | `#EEF0F3` | divisores de fundo, hover leve |
| `gray-200` | `#DDE1E6` | bordas de componentes |
| `gray-300` | `#C4CAD2` | bordas fortes, bordas de input |
| `gray-500` | `#6B7280` | texto secundário |
| `gray-700` | `#374151` | texto corpo forte |
| `gray-900` | `#111827` | texto principal |

## 3. Cores semânticas

| Token | Hex | Fundo suave | Uso |
|-------|-----|-------------|-----|
| `success` | `#16A34A` | `#ECFDF3` | concluído, disponível, salvamento OK |
| `warning` | `#D97706` | `#FEF6E7` | alerta, documento próximo do vencimento |
| `danger` | `#DC2626` | `#FEECEC` | erro, exclusão, situação crítica |
| `info` | `#1B5A9E` | `#E4EEFA` | informações (alias do primário) |

**Regras semânticas:**

1. Cor **nunca** é o único indicador de estado — sempre ícone ou texto junto (Skill 03, §10).
2. Verde/amarelo/vermelho **nunca** representam status de voo/área (proibido pela matriz — doc 08 da Skill 01). Semântica é exclusivamente de negócio (salvo, alerta, erro).
3. Proibido usar vermelho/verde de tráfego em qualquer elemento que sugira "liberado/proibido voar".

## 4. Contraste mínimo (WCAG AA — ver doc 10)

| Combinação | Razão | Mínimo exigido |
|------------|-------|----------------|
| `gray-900` sobre `white` | ~16:1 | 4.5:1 ✅ |
| `gray-700` sobre `white` | ~10:1 | 4.5:1 ✅ |
| `gray-500` sobre `white` | ~5.0:1 | 4.5:1 ✅ (verificar uso em textos pequenos) |
| `white` sobre `brand-600` | ~6.4:1 | 4.5:1 ✅ |
| `white` sobre `success/danger/warning` | testar por token na implementação | 4.5:1 |
| `brand-600` sobre `white` | ~6.4:1 | 4.5:1 ✅ |

> Valores aproximados; conferir com ferramenta de contraste na implementação (Skill 04) e registrar medição no doc 10.

## 5. Regras de aplicação

- **Área grande:** apenas branco, `gray-50`, `brand-900` (login). Sem gradientes decorativos.
- **Primário (`brand-600`):** 1 ação primária por tela/área; o resto é secundário (outline) ou texto.
- **Superfícies:** profundidade por borda (`gray-200`) antes de sombra.
- **Modo escuro:** fora do MVP (registrar como decisão futura; não construir agora).

## 6. Implementação (para a Skill 04)

Tokens como CSS variables em `globals.css`:

```css
:root {
  --brand-600: #1B5A9E;
  --success: #16A34A;
  /* ...todos os tokens acima... */
}
```

Tailwind mapeia para utilitários (`bg-brand-600`, `text-success`). **Proibido usar cores hardcoded fora do arquivo de tokens.**
