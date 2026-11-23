# 09 — Instruções de Desenvolvimento Local

**Versão:** 0.1 · **Status:** proposto (pré-código — ajustar quando o projeto existir) · **Data:** 2026-11-23

---

## 1. Pré-requisitos

| Ferramenta | Versão mínima | Observação |
|------------|---------------|------------|
| Node.js | LTS (20+) | `node -v` |
| npm ou pnpm | atual | definir um só no projeto (npm por padrão) |
| Git | 2.x | já instalado na máquina do fundador |
| Docker | atual | necessário p/ Supabase local |
| Supabase CLI | atual | `supabase --version` |

## 2. Setup (quando o código existir)

```bash
git clone https://github.com/FranciscoDGA/Aerogrid.git
cd Aerogrid
npm install
cp .env.example .env.local    # preencher valores
supabase start                # sobe Postgres + Auth + Storage locais
supabase db reset             # aplica migrações do supabase/migrations/
npm run dev                   # http://localhost:3000
```

## 3. Variáveis de ambiente

| Variável | Onde | Observação |
|----------|------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | público | URL do projeto |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | público | chave anon (segura p/ browser por design) |
| `SUPABASE_SERVICE_ROLE_KEY` | **somente servidor** | **proibido** no bundle do cliente (Skill 02, 5.8) |
| `NEXT_PUBLIC_SITE_URL` | público | URL base |

`.env.example` nunca contém valores reais; segredos nunca são commitados.

## 4. Comandos previstos

| Comando | Função |
|---------|--------|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` / `npm run start` | build/produção local |
| `npm run lint` / `npm run typecheck` | ESLint + `tsc --noEmit` |
| `npm test` | unidades e integração (Vitest) |
| `npm run test:e2e` | Playwright |
| `supabase migration new <nome>` | cria migração (doc 07) |
| `supabase db reset` | recria banco local |

## 5. Fluxo de trabalho diário

1. `git pull origin main`.
2. Criar branch `feat/<modulo>` ou `fix/<descrição>`.
3. Escrever/atualizar teste **antes** ou junto com a funcionalidade (critérios de aceitação — doc 07 da Skill 01).
4. `lint` + `typecheck` + `test` verdes.
5. Commit em português claro, com escopo (`missions: adiciona status da missão`).
6. Push/PR **somente com autorização expressa** (Skill 02, §14).

## 6. Regras durante o desenvolvimento (Skill 02, §14)

- Inspecionar estrutura e ler docs antes de modificar qualquer coisa.
- Não sobrescrever arquivo sem entender seu conteúdo.
- Não remover funcionalidade existente sem autorização.
- Não alterar banco de produção em planejamento/testes.
- Não fazer push, deploy ou alterar recursos externos sem autorização expressa.

## 7. Definição de pronto (mínimo)

- [ ] Critério de aceitação atendido.
- [ ] Testes de isolamento multiempresa (se tocou em dado empresarial).
- [ ] Validação Zod na fronteira.
- [ ] Atualizou docs afetados (03/04/05 se modelo ou API mudou).
- [ ] Nada que viole o doc 08 da Skill 01 (matriz de funcionalidades).
