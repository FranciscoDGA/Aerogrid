# 10 — Critérios de Acessibilidade

**Versão:** 0.1 · **Data:** 2026-11-23 · **Meta:** WCAG 2.1 nível AA

---

## 1. Contraste

| Requisito | Mínimo | Onde verificar |
|-----------|--------|----------------|
| Texto normal | 4.5:1 | toda a UI |
| Texto grande (≥18.66px bold ou 24px) | 3:1 | títulos |
| Componentes de UI e bordas focáveis | 3:1 | inputs, botões, ícones de estado |
| Estados focados | 3:1 contra adjacente | anel de foco |

Medir tokens reais na implementação e **registrar as medições neste documento** (tabela do doc 03 §4 é estimativa inicial).

## 2. Navegação por teclado

- Todo elemento interativo alcançável por `Tab` em ordem lógica (sem `tabindex` arbitrário).
- Foco **sempre visível**: anel 2px `brand-500` + offset (nunca `outline: none` sem substituto).
- Modais/gavetas: **focus trap** + `Esc` fecha + devolve foco ao gatilho.
- Menu mobile/gaveta: navegação por setas onde usar padrão de menu ARIA.
- Skip-link "Pular para o conteúdo" no topo.
- Nenhum `div` clicável sem `role`/`tabindex`/`onKeyDown` — usar `<button>`/`<a>`.

## 3. Formulários

- `<label>` associado (`for/id`) em todo campo — placeholder não é label (doc 05 §5).
- Erros: `aria-invalid`, `aria-describedby` com mensagem; resumo de erros no submit com foco no primeiro campo inválido.
- Campos obrigatórios: `required` + indicação visual + texto.
- Ajuda contextual via `aria-describedby` (não só tooltip inacessível).
- Upload: progresso anunciado (`aria-live`), tipo/tamanho aceitos descritos antes.

## 4. Leitores de tela

- Landmarks: `header`, `nav`, `main`, `footer` (ou `aside` no painel lateral).
- Hierarquia de headings real (h1 por tela → h2 por seção), sem pular níveis.
- Tabelas com `<th scope>`; listas semânticas nos cards empilhados do mobile.
- Ícones decorativos: `aria-hidden="true"`; ícones únicos sem texto: `aria-label`.
- Regiões dinâmicas: toasts `aria-live="polite"` (erros `assertive`); loading `aria-busy`.
- Nomes acessíveis clares: "Editar missão Levantamento X", não "Editar".

## 5. Cor e estado (Skill 03, §10)

- **Nunca** comunicar estado só por cor: sempre ícone ou texto junto (status pills do doc 05 §5 já seguem).
- Gráficos/legenda de mapa: padrão/textura além de cor quando diferenciar camadas.
- Erros: cor + ícone + texto + localização do campo.

## 6. Movimento e animação

- Respeitar `prefers-reduced-motion: reduce` (desligar transições não essenciais).
- Animações ≤ 250ms, sem looping infinito (exceto indeterminado de loading, que deve ser discreto).
- Nada de autoplay de mídia.

## 7. Toque e zoom

- Alvos ≥ 44×44px no mobile; espaçamento ≥ 8px entre alvos adjacentes.
- Zoom do navegador até 200% sem perda de função; sem `user-scalable=no`.

## 8. Conteúdo e linguagem

- `lang="pt-BR"` no documento.
- Links com texto significativo ("Ver detalhes da missão", não "clique aqui").
- Títulos de página (`metadata.title`) descritivos por rota.
- Mensagens de erro compreensíveis: o que houve + o que fazer (doc 01 §6).

## 9. Validação e testes de acessibilidade

| Quando | O quê |
|--------|-------|
| Cada componente novo | checklist §2–§5 + inspeção manual por teclado |
| Cada tela entregue | contraste medido, teclado completo, leitor de tela (VoiceOver/NVDA) no fluxo principal |
| Antes do lançamento | auditoria completa AA + revisão com usuário com deficiência se viável |

Ferramentas auxiliares (Lighthouse/axe) apoiam, **não substituem** inspeção manual. Resultados registrados neste documento por versão.
