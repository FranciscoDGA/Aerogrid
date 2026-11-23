# AeroGrid Brasil

Plataforma SaaS para **gestão e planejamento de operações com drones** — clientes, equipamentos, operadores, missões, mapas e documentos, com isolamento total por organização (multi-tenant).

> ⚠️ O AeroGrid **não** emite autorizações de voo, não controla espaço aéreo e não se integra a órgãos oficiais. Nenhum mapa exibido é mapa aeronáutico oficial. Escopo controlado em [`docs/08-matriz-funcionalidades.md`](docs/08-matriz-funcionalidades.md).

## Estado atual

- **Funcional nesta versão:** autenticação (cadastro, login, recuperação de senha), criação de organização (onboarding), painel com dados reais e **CRUDs de clientes, drones (com histórico de manutenção) e operadores (com documentos/validades)** — listas com busca, criação, detalhe, edição e exclusão lógica com confirmação.
- **Próximas etapas:** missões, mapas (Skill 05), documentos/checklists/relatórios, auditoria de segurança (Skill 06).
- **Testes:** unitários (schemas Zod) executados com `npm test`; testes de RLS/ integração **ainda não executados** — exigem Docker + Supabase CLI (ver [docs/arquitetura/09-desenvolvimento-local.md](docs/arquitetura/09-desenvolvimento-local.md)).

## Documentação

| Área | Pasta |
|------|-------|
| Produto e estratégia (Skill 01) | [`docs/`](docs/README.md) |
| Arquitetura e ADRs (Skill 02) | [`docs/arquitetura/`](docs/arquitetura/README.md) |
| Design e design system (Skill 03) | [`docs/design/`](docs/design/README.md) |

## Requisitos

- Node.js 20+ (LTS)
- npm
- Docker + [Supabase CLI](https://supabase.com/docs/guides/cli) (para banco local)

## Instalação

```bash
git clone https://github.com/FranciscoDGA/Aerogrid.git
cd Aerogrid
npm install
cp .env.example .env.local   # preencha as chaves do Supabase local
supabase start               # sobe Postgres + Auth locais
supabase db reset            # aplica supabase/migrations
npm run dev                  # http://localhost:3000
```

## Variáveis de ambiente

Definidas em [`.env.example`](.env.example). Regras:

- `SUPABASE_SERVICE_ROLE_KEY` **nunca** pode ir para o navegador (só no servidor).
- Valores reais **nunca** são commitados.

## Scripts

| Comando | Função |
|---------|--------|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | verificação de tipos (`tsc --noEmit`) |
| `npm test` | testes unitários (Vitest) |

## Padrões obrigatórios

1. Toda funcionalidade: requisito documentado, validação Zod no servidor, autorização no servidor, estados de loading/vazio/erro, testes proporcionais ao risco.
2. Multi-tenant: RLS em toda tabela empresarial; organização vem da sessão, nunca do payload.
3. Nenhum commit/push/deploy sem autorização expressa (Skill 04, §15).
