# 07 — Wireframes

**Versão:** 0.1 · **Data:** 2026-11-23 · **Formato:** texto/ASCII (protótipo visual interativo: doc 08)

---

## 1. Login (desktop)

```
┌─────────────────────────┬──────────────────────────────────────┐
│  [logo] AeroGrid        │                                      │
│                         │         Bem-vindo de volta           │
│  (fundo brand-900 com   │         Entre na sua organização     │
│   grade sutil + rota)   │                                      │
│                         │  E-mail                              │
│  "Organize suas         │  [________________________]          │
│   operações com drones" │  Senha                               │
│                         │  [________________________] [👁]     │
│                         │  [      Entrar         ]             │
│                         │  Esqueci minha senha                  │
│                         │  ── ou ──                            │
│                         │  [Entrar com convite da organização] │
└─────────────────────────┴──────────────────────────────────────┘
```

## 2. Painel (dashboard) — desktop

```
┌──────────┬─────────────────────────────────────────────────────┐
│ SIDEBAR  │  Painel                          [12 nov] [Nova +]  │
│ (doc 06) │─────────────────────────────────────────────────────│
│          │  ▸ PRÓXIMAS MISSÕES (3)                              │
│          │   ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │
│          │   │ Hoje 14:00   │ │ Amanhã 08:00 │ │ 20/12 ...  │  │
│          │   │ Cliente X    │ │ Cliente Y    │ │ Cliente Z  │  │
│          │   │ ● Planejada  │ │ ● Planejada  │ │ ● Planejada│  │
│          │   └──────────────┘ └──────────────┘ └────────────┘  │
│          │  ▸ RECURSOS                                          │
│          │   Drones: 6 (1 em manutenção)   Operadores: 4       │
│          │  ▸ DOCUMENTOS COM ATENÇÃO                            │
│          │   ⚠ CNH de João vence em 30 dias  (se habilitado)   │
│          │  ▸ ATIVIDADES RECENTES                               │
│          │   • Missão #42 concluída por Ana — há 2 h            │
│          │   • Drone Mavic 3 adicionado — ontem                 │
│          │                                                      │
│          │  (sem dados → estado vazio com CTA, nunca número     │
│          │   fictício — Skill 03 §7)                            │
└──────────┴─────────────────────────────────────────────────────┘
```

## 3. Lista de missões (desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ Missões                          [+ Nova missão]            │
│ 12 missões · 3 planejadas · 1 em andamento                  │
│ [Buscar cliente/missão____] [Status ▾] [Data ▾]             │
│─────────────────────────────────────────────────────────────│
│ ☐  #  MISSÃO            CLIENTE        DATA      STATUS     │
│    42 Levantamento X    Vale Norte     12/12     ● Em and.  │
│    41 Inspeção ponte    Infra SA       10/12     ✓ Concluída│
│    40 Mapeamento N      Ambiental Ltda 08/12     ✕ Cancelada│
│─────────────────────────────────────────────────────────────│
│ Anterior  1 2 3  Próxima                    (cursor-based)  │
└─────────────────────────────────────────────────────────────┘
```

## 4. Detalhe da missão (desktop)

```
┌──────────┬──────────────────────────────────────────────────┐
│ SIDEBAR  │  Missões / Levantamento X                    [⋯] │
│          │  [Resumo] [Mapa] [Checklists] [Documentos] [Hist.]│
│          │──────────────────────────────────────────────────│
│          │  RESUMO                                          │
│          │  Cliente: Vale Norte · Data: 12/12 · ● Em andamento│
│          │  Responsável: Ana Souza                          │
│          │  Objetivo: ... (texto)                           │
│          │  ┌ EQUIPAMENTOS ┐   ┌ OPERADORES ┐               │
│          │  │ Mavic 3 (SN…)│   │ João (P1)  │ [+ Adicionar] │
│          │  └──────────────┘   └────────────┘               │
│          │  ANEXOS: [drag & drop] 1 arquivo · 24 MB/50 MB    │
└──────────┴──────────────────────────────────────────────────┘
```

## 5. Mapa (aba da missão / tela Mapas) — desktop

```
┌──────────┬────────────────────────────────────┬─────────────┐
│ SIDEBAR  │  Mapa da missão #42                │  DETALHES   │
│          │ [📍Ponto][📏Linha][⬠Polígono][⌫]  │  Waypoint 3 │
│          │ ┌────────────────────────────────┐ │  -1.4550,   │
│          │ │                                │ │  -48.5030   │
│          │ │      camada base discreta      │ │  Alt: —     │
│          │ │      ●───●───○ waypoints       │ │  [Remover]  │
│          │ │      ⬠ polígono selecionado   │ │             │
│          │ │                                │ │  LEGENDA    │
│          │ └────────────────────────────────┘ │  ● origem   │
│          │  [Camadas ▾]  Dist.: 1.240 m       │  ○ destino  │
│          │  ⚠ Mapa de referência — não é      │  ⬠ área     │
│          │  mapa aeronáutico oficial          │             │
└──────────┴────────────────────────────────────┴─────────────┘
```

**Regra de ouro (Skill 03, §8):** marca d'água/aviso permanente; nenhuma cor de "área liberada"; ferramentas só desenham geometria — nunca classificam espaço aéreo.

## 6. Lista de drones (mobile)

```
┌─────────────────────────┐
│ ☰  Drones         [Filt]│
│ [Buscar______________]  │
│ ┌─────────────────────┐ │
│ │ DJI Mavic 3         │ │
│ │ SN: 1581F5J...      │ │
│ │ ● Disponível        │ │
│ │ Última missão: 12/12│ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ Agras T40            │ │
│ │ ● Manutenção         │ │
│ └─────────────────────┘ │
│                         │
│ [Painel][Missões][Mapas]│  ← bottom nav
└─────────────────────────┘
```

## 7. Estados vazios (padrão único)

```
┌────────────────────────────────────┐
│      [ilustração waypoint]         │
│   Nenhuma missão ainda             │
│   Registre a primeira operação     │
│   para começar o histórico.        │
│        [Criar primeira missão]     │
└────────────────────────────────────┘
```

Aplicado a: missões, drones, operadores, clientes, checklists, relatórios, atividades recentes.

## 8. Fora do wireframe (proibido pela matriz)

Telas/sugestões de: autorização de voo, "área liberada", status aeronáutico, integração oficial, IA de segurança. Qualquer elemento nessa direção é reprovado no review de design.
