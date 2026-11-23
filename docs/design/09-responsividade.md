# 09 — Regras de Responsividade

**Versão:** 0.1 · **Data:** 2026-11-23

---

## 1. Breakpoints

| Token | Largura | Contexto |
|-------|---------|----------|
| `sm` | ≥ 640px | smartphone landscape |
| `md` | ≥ 768px | tablet portrait — vira desktop compacto |
| `lg` | ≥ 1024px | notebook — layout desktop completo |
| `xl` | ≥ 1280px | desktop — respiro extra em tabelas/mapas |

**Mobile-first** na implementação CSS (estilos base = menor tela), com layout desktop como evolução.

## 2. Diretrizes por dispositivo (Skill 03, §9)

| Dis prioridade | Tarefas suportadas | Observação |
|----------------|--------------------|------------|
| **Desktop/lg** (prioridade 1) | tudo: cadastros, missões, mapa com ferramentas de desenho, configurações, relatórios | alvo primário do MVP |
| **Tablet/md** | tudo com ajustes; mapa com ferramentas maiores (alvos ≥ 44px) | sidebar vira gaveta |
| **Smartphone** | consulta, status, checklists em campo, visualização de mapa, anexos, operações simples | criação/edição complexa: telas dedicadas, não modais apertados |

**Regra:** nenhuma funcionalidade essencial pode ficar invisível sem alternativa de navegação equivalente (gaveta/bottom nav — doc 06 §3).

## 3. Padrões por componente

| Componente | Mobile | Tablet | Desktop |
|------------|--------|--------|---------|
| Sidebar | gaveta (hamburger) + bottom nav 4 itens | gaveta ou colapsada | fixa, colapsável |
| Tabela | lista de cards empilhados (colunas essenciais preservadas) | tabela com scroll horizontal + coluna pinada | tabela completa |
| Formulários | 1 coluna, inputs ≥ 16px (evita zoom iOS), ações fixas no rodapé | 1–2 colunas | 2 colunas quando relacionadas |
| Mapa | altura ≥ 60vh, ferramentas em barra flutuante, detalhes em bottom sheet | painel lateral | painel lateral fixo + legenda |
| Modais | bottom sheet / tela cheia | centralizado | centralizado (max-w/md–lg) |
| Tabelas de listagem | não usar table no DOM (acessibilidade: tabela→cards troca semântica corretamente) | tabela | tabela |

## 4. Regras de qualidade

1. **Nada de texto cortado** sem ellipsis intencional + tooltip/título acessível.
2. Zoom até 200% sem scroll horizontal inesperado (exceto tabela em md com scroll explícito).
3. Área de toque ≥ 44×44px (doc 05 §5 botões mobile).
4. Safe area em iPhone (notch) via `env(safe-area-inset-*)`.
5. Mapa: nunca encobrir controles pelo teclado/bottom sheet; testar com coordenadas longas.
6. Teste obrigatório em 360×800, 768×1024, 1280×800, 1920×1080 antes de "pronto".
7. Dialogs destrutivos precisam ser usáveis no mobile (botão perigoso nunca cortado).

## 5. Verificação (critério de aceitação das telas)

- [ ] 4 larguras de teste sem quebra (item 6).
- [ ] Navegação por teclado + touch coerente.
- [ ] Estados vazios/erro legíveis em 360px.
- [ ] Tabela vira cards sem perda de informação essencial (status, ação principal sempre visíveis).
