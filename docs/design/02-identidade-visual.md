# 02 — Identidade Visual

**Versão:** 0.1 · **Status:** propostas iniciais · **Data:** 2026-11-23

---

## ⚠️ Aviso de marca (obrigatório — Skill 03, §4)

- **Não presumir disponibilidade jurídica do nome "AeroGrid" no Brasil.** Antes de qualquer uso comercial definitivo: pesquisa de anterioridade no INPI (classes relevantes: 09 — software, 42 — serviços de software) e, se viável, depósito de marca.
- A identidade visual foi construída para ser **ajustável** (símbolo e cores independentes do nome) caso a pesquisa de anterioridade exija mudança.

## 1. Marca

| Item | Definição |
|------|-----------|
| Nome | AeroGrid (uso comercial pendente de INPI) |
| Assinatura | "AeroGrid Brasil" — "Brasil" só em materiais institucionais, não no logo do produto |
| Símbolo | Grade + rota de voo (conceito "Grade em voo", doc 01) |
| Personalidade | precisa, técnica, confiável, moderna |

## 2. Propostas de símbolo

### Proposta A — "Waypoints na grade" (recomendada)

Três pontos de waypoint conectados formando uma rota em "A" sobre uma grade sutil. Lê bem pequeno (3 pontos + traço), comunica voo + organização.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="AeroGrid símbolo proposta A">
  <rect width="64" height="64" rx="14" fill="#0F2E5C"/>
  <g stroke="#2E7BD6" stroke-width="1.5" opacity="0.45">
    <line x1="10" y1="21" x2="54" y2="21"/>
    <line x1="10" y1="43" x2="54" y2="43"/>
    <line x1="21" y1="10" x2="21" y2="54"/>
    <line x1="43" y1="10" x2="43" y2="54"/>
  </g>
  <path d="M16 46 L32 16 L48 46" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="16" cy="46" r="4.5" fill="#5B9DE0"/>
  <circle cx="32" cy="16" r="4.5" fill="#FFFFFF"/>
  <circle cx="48" cy="46" r="4.5" fill="#5B9DE0"/>
</svg>
```

### Proposta B — "A grade"

Monograma "A" construído por linhas de grade com nó de waypoint no vértice. Mais geométrico, muito versátil em favicon.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="AeroGrid símbolo proposta B">
  <rect width="64" height="64" rx="14" fill="#0A1F3D"/>
  <path d="M32 12 L50 52 M32 12 L14 52 M22 36 L42 36" fill="none" stroke="#5B9DE0" stroke-width="5" stroke-linecap="round"/>
  <circle cx="32" cy="12" r="5" fill="#FFFFFF"/>
</svg>
```

### Proposta C — "Rota em grade"

Traço de rota serpenteando por uma grade (mais "mapa/geo"), menos "A". Boa para padrão gráfico auxiliar; menos forte como monograma.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="AeroGrid símbolo proposta C">
  <rect width="64" height="64" rx="14" fill="#0F2E5C"/>
  <g stroke="#2E7BD6" stroke-width="1.5" opacity="0.4">
    <line x1="12" y1="24" x2="52" y2="24"/><line x1="12" y1="40" x2="52" y2="40"/>
    <line x1="24" y1="12" x2="24" y2="52"/><line x1="40" y1="12" x2="40" y2="52"/>
  </g>
  <path d="M14 48 C26 48 22 20 34 20 C46 20 42 38 50 34" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
  <circle cx="14" cy="48" r="4" fill="#5B9DE0"/>
  <circle cx="50" cy="34" r="4" fill="#FFFFFF"/>
</svg>
```

**Recomendação:** Proposta A — reconhecível em 16px (3 pontos + traço), significado direto (voo entre pontos organizados), diferencial suficiente para não lembrar concorrentes.

## 3. Versões da marca

| Versão | Composição | Uso |
|--------|------------|-----|
| Horizontal | Símbolo + "AeroGrid" (peso semibold, tracking -1%) | Topo do app, cabeçalhos |
| Compacta | Símbolo + "AG" | espaços apertados, tabela de navegação colapsada |
| Símbolo isolado | só o glifo | favicon, app icon, avatar da organização |
| Fundo escuro | texto branco, símbolo com contorno | login (fundo navy), rodapé |

**Área de proteção:** margem mínima = 25% da largura do símbolo em todos os lados.
**Tamanho mínimo:** símbolo 16px (favicon); horizontal 120px de largura.

## 4. Ícone de aplicativo e favicon

- Fundo: navy `#0F2E5C`, cantos arredondados (ios: superellipse natural do sistema).
- Glifo: versão branca do símbolo Proposta A, ocupando ~70% da área.
- Favicon: mesma composição; testar legibilidade a 16×16 antes de aprovar.

## 5. Elementos gráficos auxiliares

| Elemento | Descrição | Uso |
|----------|-----------|-----|
| Grade de fundo | linhas 1px em `brand-100` a 40% opacidade, espaçamento 32px | cabeçalhos de estado vazio e login (com moderação) |
| Traço de rota | curva pontilhada `brand-400` | ilustrações de estado vazio, divisores temáticos |
| Waypoint | círculo 8px com anel | marcadores de lista/indicadores de etapa |
| Marca d'água de mapa | texto rotacionado "Mapa de referência — não é mapa oficial" em camada sutil | obrigatório em visualizações de mapa (doc 08) |

## 6. Próximos passos da marca

1. Escolher entre A/B/C com o fundador.
2. Pesquisa de anterioridade INPI (classe 09/42) — **antes** de investir em aplicação.
3. Aplicar paleta (doc 03) e tipografia (doc 04) nas versões finais.
4. Testar símbolo em 16px, impressão P&B e fundos claros/escuros.
