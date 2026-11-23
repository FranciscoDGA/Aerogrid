# 08 — Protótipos das Telas Principais

**Versão:** 0.1 · **Data:** 2026-11-23 · **Natureza:** especificação funcional das telas (protótipo visual navegável é etapa seguinte, após aprovação desta base)

---

> **Não confundir com funcionalidade entregue** (Skill 04, §16). Este documento especifica o que cada tela fará quando implementada. Wireframes ASCII no doc 07.

## 1. Telas de autenticação

### Login (`/login`)
- **Campos:** e-mail, senha (mostrar/ocultar), botão "Entrar".
- **Ações:** submit → Supabase Auth (arquitetura ADR-002) → redirect p/ painel preservando rota de volta. Erro genérico "E-mail ou senha inválidos" (sem revelar existência de conta). Link "Esqueci minha senha" → `/recuperar-senha`. Link de convite → `/convite/:token`.
- **Estados:** normal (default), loading (botão), erro (banner), offline (erro de rede).

### Recuperar senha (`/recuperar-senha`)
- E-mail → "Se existir uma conta, enviaremos um link de redefinição." (mesma razão de segurança acima).

### Convite (`/convite/:token`)
- Valida token no servidor (tabela memberships com status `invited`).
- Estados: token válido (criar senha + entrar), expirado, inválido, já aceito.

## 2. Painel (`/`)

| Bloco | Conteúdo | Fonte |
|-------|----------|-------|
| Próximas missões | até 5 missões com status planned/in_progress, ordenadas por data | missões |
| Recursos | contagens reais: drones por situação, operadores ativos | drones/operators |
| Documentos com atenção | vencimentos (após liberação — matriz condicionada) | operator_documents |
| Atividades recentes | últimos 10 audit_logs legíveis | audit |

**Regras:** zero dado fictício; contagem sem dado = estado vazio; skeleton no carregamento; cada bloco com falha própria (erro num blojo não derruba a tela).

## 3. Módulos CRUD (clientes, drones, operadores)

Padrão único para lista + cadastro + detalhe:

- **Lista:** busca, filtros relevantes (status/segmento), tabela desktop → cards mobile (doc 09), paginação por cursor, ação primária "Novo".
- **Cadastro:** formulário do doc 05 §5, validação Zod no servidor, sucesso → detalhe + toast.
- **Detalhe:** dados + sub-seções (drones: manutenção; operadores: documentos/validades; clientes: histórico de missões) + editar + excluir (modal de confirmação, exclusão lógica, audit log).

**Campos específicos:**
- Drone: fabricante*, modelo*, nº série (único por org), características (chave-valor dinâmico), situação* (available/in_use/maintenance/inactive), histórico de manutenção.
- Operador: nome*, documentos (tipo, número, validade, anexo), qualificações declaradas (texto — **nunca** selo de certificação), histórico de missões.
- Cliente: nome*, contato (ao menos um canal), notas, histórico de missões.

## 4. Missões

### Lista (`/missões`)
Busca, filtros (status, cliente, período), contagem por status, CTA "Nova missão".

### Criação (`/missões/nova`)
Formulário: cliente* (busca), título*, objetivo*, data*, responsável* (usuário da org), drones (multi), operadores (multi) → salvar → detalhe.

### Detalhe (`/missões/:id`) — abas

| Aba | Conteúdo | Regras |
|-----|----------|--------|
| Resumo | dados + equipamentos + operadores (adicionar/remover) + anexos | status editável por dropdown com transições válidas (planned→in_progress→completed/cancelled) |
| Mapa | ferramentas: ponto, linha, polígono, apagar; painel de detalhes com coordenadas; distância (PostGIS); camadas; **aviso permanente "mapa de referência — não é oficial"** | ver doc 07 §5; nenhuma semântica de voo (Skill 05/01) |
| Checklists | modelos aplicados + preenchimento + conclusão | resposta salva com timestamp e usuário |
| Documentos | anexos da missão (upload validado, URL assinada) | limites do doc 05 arquitetura |
| Histórico | audit log filtrado da missão | somente leitura |

### Edição
Mesmo formulário da criação em modo editar; histórico registra antes/depois.

## 5. Mapas (`/mapas`)

Visão geral das geometrias da organização (listagem + mapa); seleção leva à missão dona. Sem camadas aeronáuticas. Legendas sempre visíveis (doc 03 §8: identificação de camadas).

## 6. Checklists e Relatórios

- **Modelos de checklist:** CRUD simples (nome, itens ordenados, obrigatório). Disponível em Configurações → e dentro de missão.
- **Relatórios:** lista de relatórios gerados + "Gerar" (tipos do dicionário: resumo de missão, situação de frota). Exportação **PDF quando aprovada** — se não aprovada nesta rodada, botão desabilitado com tooltip "Em breve" **não** é aceitável (botão sem ação proibido — §16): a opção simplesmente não aparece até ser aprovada.

## 7. Configurações

| Tela | Acesso | Conteúdo |
|------|--------|----------|
| Perfil | próprio usuário | nome, e-mail, trocar senha |
| Organização | admin | nome, slug, dados cadastrais |
| Usuários | admin | lista de memberships, papel (owner/admin/member), convidar, desabilitar |
| Preferências | próprio | fuso, formatação (futuro — só se requisito) |
| Assinatura | admin | plano atual + limites (informativo, ADR-009: ativação manual no MVP) |

## 8. Critérios globais de todo protótipo/tela

1. Estados: normal, loading (skeleton), vazio (CTA), erro (recuperável), 403 (doc 05 §6).
2. Acessibilidade: labels, foco visível, teclado, contraste (doc 10).
3. Responsivo: doc 09.
4. Nenhum botão sem ação; nenhum dado fictício; nenhuma sugestão regulatória (doc 08 Skill 01).
5. Autorização refletida na UI: quem não é admin **não vê** itens de admin (e o servidor rejeita mesmo se chamado — Skill 04 §8).
