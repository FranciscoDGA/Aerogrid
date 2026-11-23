# 02 — Estrutura de Diretórios

**Versão:** 0.1 · **Status:** proposto (pré-código) · **Data:** 2026-11-23

---

Organização por domínio, alinhada aos módulos da Skill 02 (seção 4).

```
AeroGrid/
├── docs/                          # documentação (produto + arquitetura)
│   ├── 01..10-*.md                # Skill 01 — documentos de produto
│   └── arquitetura/               # Skill 02 — esta pasta
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # login, cadastro, recuperação de senha
│   │   ├── (app)/                 # área logada
│   │   │   ├── clientes/
│   │   │   ├── drones/
│   │   │   ├── operadores/
│   │   │   ├── missoes/
│   │   │   ├── mapas/
│   │   │   ├── checklists/
│   │   │   ├── relatorios/
│   │   │   └── config/            # organização, usuários, permissões
│   │   └── api/v1/                # contratos públicos da API (doc 05)
│   ├── modules/                   # domínio independente da interface
│   │   ├── auth/
│   │   ├── organizations/
│   │   ├── users/
│   │   ├── clients/
│   │   ├── drones/
│   │   ├── operators/
│   │   ├── missions/
│   │   ├── geoprocessing/
│   │   ├── documents/             # checklists + anexos + relatórios
│   │   ├── subscriptions/
│   │   └── audit/
│   │       └── (cada módulo:)
│   │           ├── service.ts     # regras de negócio
│   │           ├── schemas.ts     # validação Zod (entrada/saída)
│   │           ├── actions.ts     # Server Actions (opcional)
│   │           └── *.test.ts
│   ├── components/                # componentes de UI reutilizáveis
│   │   ├── ui/                    # botões, inputs, tabelas (acessíveis)
│   │   └── map/                   # wrappers MapLibre
│   └── lib/                       # infraestrutura compartilhada
│       ├── supabase/              # clientes browser/server
│       ├── auth/                  # sessão, membership, papéis
│       ├── errors/                # tratamento padronizado
│       └── geo/                   # validação GeoJSON, distância
├── supabase/
│   ├── migrations/                # migrações versionadas (doc 07)
│   └── seed.sql                   # dados locais de desenvolvimento
├── tests/
│   ├── integration/               # inclui testes de isolamento RLS
│   └── e2e/                       # fluxos principais
├── .env.example                   # variáveis documentadas, sem segredos
└── package.json
```

## Regras

1. **Nenhum SQL de negócio fora de `supabase/migrations/`.**
2. Componentes de UI não importam de `modules/*/service` diretamente — o caminho é Server Action ou Route Handler.
3. Arquivos grandes são sinal de violação da separação de camadas (Skill 02, 7).
4. Imports seguem convenção única (alias `@/`), revisados no ADR-006.
5. Testes de isolamento multiempresa são obrigatórios para cada módulo novo (Skill 02, 12).
