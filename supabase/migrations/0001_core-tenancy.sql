-- =========================================================================
-- AeroGrid — Migração 0001: core-tenancy (organizações, usuários, memberships)
-- Regras: docs/arquitetura/07-plano-de-migracoes.md e 03-modelo-entidade-relacionamento.md
-- Impacto: criação inicial de schema (sem dados em produção)
-- Rollback: drop schema reverso (antigo do lançamento) — ver comentários ao final
-- =========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.membership_role as enum ('owner', 'admin', 'member');
create type public.membership_status as enum ('active', 'invited', 'disabled');
create type public.organization_status as enum ('active', 'suspended', 'trial');

-- ---------------------------------------------------------------------------
-- organizations (tenant)
-- ---------------------------------------------------------------------------
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,60}$'),
  status public.organization_status not null default 'trial',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.organizations is
  'Tenant central do SaaS multiempresa. isolamento via RLS (ADR-003).';

-- ---------------------------------------------------------------------------
-- users (espelho do perfil em auth.users)
-- ---------------------------------------------------------------------------
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- memberships (vínculo usuário <-> organização com papel)
-- ---------------------------------------------------------------------------
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role public.membership_role not null default 'member',
  status public.membership_status not null default 'invited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create index memberships_user_idx on public.memberships (user_id);
create index memberships_org_idx on public.memberships (organization_id);
create index memberships_org_status_idx on public.memberships (organization_id, status);

-- ---------------------------------------------------------------------------
-- Preenche public.users a partir do cadastro em auth.users
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Helper: usuário autenticado é membro ATIVO da organização?
-- (base de todas as policies — lê a sessão, nunca o payload do cliente)
-- ---------------------------------------------------------------------------
create or replace function public.is_member_of(p_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.memberships m
    where m.organization_id = p_organization_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security — habilitado em toda tabela empresarial
-- Policy padrão é NEGATIVA; nada de USING (true) (Skill 02, 5.7)
-- ---------------------------------------------------------------------------
alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.memberships enable row level security;

create policy organizations_select_member
  on public.organizations for select
  using (public.is_member_of(id));

create policy organizations_update_admin
  on public.organizations for update
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = organizations.id
        and m.user_id = auth.uid()
        and m.status = 'active'
        and m.role in ('owner', 'admin')
    )
  );

-- Sem policies de insert/delete em organizations: criação é via RPC (abaixo).
-- Sem policies de delete: exclusão de tenant é processo administrativo documentado.

create policy users_select_self_or_colleague
  on public.users for select
  using (
    id = auth.uid()
    or exists (
      select 1
      from public.memberships mine
      join public.memberships theirs
        on theirs.organization_id = mine.organization_id
       and theirs.user_id = users.id
      where mine.user_id = auth.uid()
        and mine.status = 'active'
        and theirs.status = 'active'
    )
  );

create policy users_update_self
  on public.users for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy memberships_select_own
  on public.memberships for select
  using (user_id = auth.uid() or public.is_member_of(organization_id));

create policy memberships_update_admin
  on public.memberships for update
  using (
    exists (
      select 1 from public.memberships m
      where m.organization_id = memberships.organization_id
        and m.user_id = auth.uid()
        and m.status = 'active'
        and m.role in ('owner', 'admin')
    )
  );

-- ---------------------------------------------------------------------------
-- RPC: criar organização (owner = usuário da sessão)
-- Único caminho de criação de tenant — sem policy de insert aberta.
-- ---------------------------------------------------------------------------
create or replace function public.create_organization(p_name text, p_slug text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_org_id uuid;
begin
  if v_uid is null then
    raise exception 'unauthenticated';
  end if;

  if exists (
    select 1 from public.memberships
    where user_id = v_uid and status = 'active'
  ) then
    raise exception 'already_has_organization';
  end if;

  insert into public.organizations (name, slug)
  values (p_name, p_slug)
  returning id into v_org_id;

  insert into public.memberships (organization_id, user_id, role, status)
  values (v_org_id, v_uid, 'owner', 'active');

  return v_org_id;
end;
$$;

-- Execução restrita a usuários autenticados (anon não chama)
revoke execute on function public.create_organization(text, text) from public, anon;
grant execute on function public.create_organization(text, text) to authenticated;

-- =========================================================================
-- Rollback (executar apenas se a migração não estiver em produção):
--   drop trigger if exists on_auth_user_created on auth.users;
--   drop function if exists public.handle_new_user();
--   drop function if exists public.create_organization(text, text);
--   drop function if exists public.is_member_of(uuid);
--   drop table if exists public.memberships;
--   drop table if exists public.users;
--   drop table if exists public.organizations;
--   drop type if exists public.membership_role;
--   drop type if exists public.membership_status;
--   drop type if exists public.organization_status;
-- =========================================================================
