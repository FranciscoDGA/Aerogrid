# 06 — Mapa de Navegação

**Versão:** 0.1 · **Data:** 2026-11-23 · **Escopo:** exclusivamente o MVP da Skill 01

---

## 1. Estrutura geral

```
/login                      (sem sessão)
/recuperar-senha            (sem sessão)
/convite/:token             (sem sessão)

/                           Painel (dashboard)
/missões                    Lista
/missões/nova               Criação
/missões/:id                Detalhe (aba: resumo | planejamento geo | checklists | documentos | histórico)
/mapas                      Mapa geral (sem missão específica)
/drones                     Lista
/drones/nova                Criação
/drones/:id                 Detalhe (situação + manutenção)
/operadores                 Lista
/operadores/novo            Criação
/operadores/:id             Detalhe (documentos + validades + histórico)
/clientes                   Lista
/clientes/novo              Criação
/clientes/:id               Detalhe (dados + histórico de missões)
/relatórios                 Lista de relatórios internos
/configurações              Perfil
/configurações/organização  Dados da organização
/configurações/usuários     Usuários e papéis (admin)
/configurações/assinatura   Planos e limites (estado inicial: informativo — ADR-009)
```

## 2. Navegação principal — desktop (sidebar)

```
┌──────────────────────────────────────────────┐
│ [logo] AeroGrid            [Org ▾]  [avatar] │
│──────────────────────────────────────────────│
│ ▸ PAINEL                                     │
│ ▸ OPERAÇÃO                                   │
│    Missões                                   │
│    Mapas                                     │
│ ▸ RECURSOS                                   │
│    Drones                                    │
│    Operadores                                │
│    Clientes                                  │
│ ▸ DOCUMENTOS                                 │
│    Checklists   (config dentro de missões)   │
│    Relatórios                                │
│──────────────────────────────────────────────│
│ ▸ CONFIGURAÇÕES  (admin: usuários, org)      │
└──────────────────────────────────────────────┘
```

- Seções colapsáveis com overline; item ativo conforme doc 05.
- Colapsada (ícones) em `lg` quando solicitado; drawer em `md` e abaixo.
- Troca de organização no topo (usuário em múltiplas orgs — memberships, doc 03 da arquitetura).

## 3. Navegação — mobile (Smartphone)

- **Topo:** logo + título da tela + menu (avatar → gaveta lateral).
- **Aba inferior** apenas para as 4 áreas de maior uso em campo: Painel · Missões · Mapas · Mais.
- "Mais" abre gaveta com: Drones, Operadores, Clientes, Relatórios, Configurações.
- Funções complexas (cadastro completo, config de usuário) têm página própria dedicada — **nunca** esconder sem alternativa (Skill 03, §9).

## 4. Fluxos principais

### Fluxo 1 — Criar missão
Painel/Lista de missões → "Nova missão" → formulário (cliente, responsáveis, data, objetivo) → salvar → detalhe da missão → adicionar drones/operadores → planejamento no mapa (waypoints/polígonos) → checklists → executar/atualizar status → histórico.

### Fluxo 2 — Responder checklist em campo (mobile)
Missão → aba Checklists → responder itens (sim/não/nota) → anexar foto → salvar offline-sync (futuro; MVP: online com feedback de erro claro).

### Fluxo 3 — Consultar equipamento
Drones → lista com filtro por situação → detalhe → histórico de manutenção + missões em que participou.

### Fluxo 4 — Convite de usuário (admin)
Configurações → Usuários → "Convidar" → e-mail com `/convite/:token` → aceite → membership criado → papel atribuído.

## 5. Breadcrumbs e contexto

- Tela de detalhe sempre mostra: `Missões / [nome da missão]`.
- Ações destrutivas ficam no menu de contexto (⋯), longe do botão primário.
- Busca global: fora do MVP (evitar escopo — registrar como candidata pós-validação).

## 6. Estados de navegação

| Situação | Comportamento |
|----------|---------------|
| Sessão expirada | redirect para `/login` preservando rota de volta |
| Sem membership ativo | tela "Você não pertence a nenhuma organização ativa" + convite/contato |
| 403 | página dedicada (doc 05, §6) |
| Rota inexistente | 404 com volta ao painel |
| Dados de outra org (ataque/link externo) | 404 (não revelar existência — doc 05, §2) |
