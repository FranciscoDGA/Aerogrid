# 05 — Design System

**Versão:** 0.1 · **Data:** 2026-11-23 · **Base:** tokens dos docs 03 e 04 · **Entrega para a Skill 04 implementar em `src/components/ui/`**

---

## 1. Escala de espaçamento (base 4px)

`space-1: 4` · `2: 8` · `3: 12` · `4: 16` · `5: 20` · `6: 24` · `8: 32` · `10: 40` · `12: 48` · `16: 64`

**Regra:** só valores da escala. Nada de 13px, 17px...

## 2. Raios

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | 4px | badges, chips |
| `radius-md` | 6px | inputs, botões |
| `radius-lg` | 8px | cards, modais |
| `radius-full` | 9999px | avatares, pills |

## 3. Sombras (moderação — borda antes de sombra)

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm` | `0 1px 2px rgba(17,24,39,.06)` | botão elevado, dropdown leve |
| `shadow-md` | `0 4px 12px rgba(17,24,39,.10)` | dropdown, modal |
| `shadow-lg` | `0 12px 32px rgba(17,24,39,.14)` | modal grande, drawer |

## 4. Ícones

- Biblioteca única a definir com a Skill 04 (candidato: Lucide — licença ISC, traço consistente com o estilo line do doc 01).
- Tamanhos: 16 (inline), 20 (botão), 24 (navegação).
- Todo ícone sem texto visível precisa de `aria-label`.
- Próibido ícone decorativo que não signifique nada (Skill 03, §12).

## 5. Componentes

Cada componente: **estados normal, loading, vazio (quando lista), erro, sem permissão** (Skill 03, §12).

### Botões
| Variant | Estilo | Uso |
|---------|--------|-----|
| primary | fundo `brand-600`, texto branco, hover `brand-700` | 1 ação principal por tela |
| secondary | borda `gray-300`, fundo branco | ações de suporte |
| danger | fundo `danger`, confirmação obrigatória | exclusões |
| ghost | texto `gray-700`, hover `gray-100` | ações em toolbar |
| sizes | sm (32px) / md (40px) / lg (48px) | md por padrão; alvo de toque ≥ 44px no mobile |

Loading: spinner + `aria-busy`, largura preservada (sem "pulo" de layout).

### Inputs / Selects / Textareas
- Altura 40px (md), borda `gray-300`, foco: borda `brand-500` + anel 2px `brand-200`.
- Label sempre visível (overline) — placeholder nunca substitui label.
- Erro: borda `danger` + ícone + mensagem abaixo (`caption`, `danger`), `aria-invalid` + `aria-describedby`.
- Obrigatório: asterisco + rótulo "(obrigatório)" acessível.

### Tabelas
- Cabeçalho `caption/600 gray-500`, linhas 40–48px, divisor `gray-100`.
- Hover `gray-50`; linha selecionada `brand-50` + borda esquerda `brand-600`.
- Ordenação por cabeçalho acessível (botão com `aria-sort`).
- Paginação sempre visível (cursor-based — doc 05 da arquitetura).
- **Mobile:** não esconder dados essenciais — tabela vira lista de cards empilhados (doc 09).

### Cards
- Fundo branco, borda `gray-200`, `radius-lg`, padding `space-5`.
- Título h3 + ação opcional no canto; corpo; rodapé de ações separado por divisor.
- Só existe se agrupar informação — nada de "card por card de KPI inflado" sem valor.

### Modais / Drawers
- Confirmações curtas e formularies pequenos (≤ 6 campos).
- Focus trap, Esc fecha, botão fechar acessível, backdrop com `aria-hidden`.
- Exclusões: modal de confirmação nomeando o item ("Excluir drone DJI Mavic 3 (SN …)?").

### Menus e navegação
- Sidebar desktop (doc 06); drawer/bottom-nav mobile.
- Item ativo: fundo `brand-50`, texto `brand-700`, indicador lateral `brand-600`.
- Agrupamento por seção com overline.

### Alertas / Notificações
| Tipo | Fundo | Ícone | Uso |
|------|-------|-------|-----|
| success | `success-bg` | check | ação concluída |
| warning | `warning-bg` | alert-triangle | atenção (ex.: documento perto do vencimento — se habilitado) |
| error | `danger-bg` | x-circle | falha |
| info | `brand-50` | info | contexto |

Toast: 4s, pausa no hover/foco, região `aria-live="polite"` (erros: `assertive`).

### Indicadores de status
- **Pill** com fundo suave + ícone + texto (ex.: `● Em andamento` azul, `✓ Concluída` verde, `✕ Cancelada` cinza, `○ Planejada` cinza-azulado).
- Estados de missão: planned, in_progress, completed, cancelled (espelha enum do banco).
- Estados de drone: disponível, em uso, manutenção, inativo.
- **Proibido:** qualquer status com semântica aeronáutica ("liberado", "autorizado", "área segura").

### Formulários (padrão único)
1. Título + descrição curta.
2. Campos em 1 coluna (2 em desktop quando relacionados).
3. Ações fixas no rodapé: Secundário (Cancelar) + Primário (Salvar).
4. Validação no blur + no submit (servidor é a verdade — Zod, doc 05 da arquitetura).
5. Erro de servidor em banner no topo do formulário.

## 6. Padrões de estados (obrigatório em toda tela)

| Estado | Padrão |
|--------|--------|
| Loading | skeleton coerente com o layout (nunca spinner centralizado genérico em listas) |
| Vazio | ilustração leve (waypoint/rota) + título + explicação + CTA ("Criar primeira missão") |
| Erro | mensagem do que houve + botão "Tentar novamente" |
| Sem permissão | tela 403 com explicação ("Você não tem permissão para esta área. Fale com o administrador da organização.") |

## 7. Microinterações (Skill 03, §11)

- Transições 150–200ms `ease-out` em hover/foco; nada acima de 250ms.
- Salvar: botão → spinner → check por 1.2s → normal.
- Exclusão: linha com fade-out 200ms + toast de sucesso com "Desfazer" quando aplicável.
- Upload: barra de progresso real (não fake).
- Reduzir respeitando `prefers-reduced-motion` (doc 10).

## 8. Fora do design system

- Bibliotecas de componentes prontas completas sem customização (vira "template genérico" — doc 01). candidato: construir sobre Radix/Primitivos acessíveis **semânticos** apenas (diálogo, dropdown, tooltip), estilização própria com tokens.
- Instalar qualquer biblioteca nova exige justificativa + atualização do mapa de dependências (Skill 02, doc 08).
