-- =========================================================================
-- AeroGrid — Migração 0002: clients, drones, maintenance_records,
--                          operators, operator_documents
-- Regras: docs/arquitetura/07-plano-de-migracoes.md, 03/04 (ER e dicionário)
-- Impacto: criação de tabelas novas (sem dados em produção)
-- Rollback: ver bloco ao final
-- Decisão: membros ativos (qualquer papel) podem ler e gerenciar cadastros;
--          admin/owner ficam para usuários e configurações da organização
--          (contrato: docs/arquitetura/05-contratos-de-api.md)
-- =========================================================================

create type public.drone_status as enum ('available', 'in_use', 'maintenance', 'inactive');

-- ---------------------------------------------------------------------------
-- clients (clientes da organização)
-- ---------------------------------------------------------------------------
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 160),
  contact_name text check (contact_name is null or char_length(contact_name) <= 120),
  contact_email text check (contact_email is null or contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  contact_phone text check (contact_phone is null or char_length(contact_phone) <= 30),
  notes text check (notes is null or char_length(notes) <= 4000),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- ao menos um canal de contato (dicionário §clients)
  constraint clients_contact_required check (
    contact_name is not null or contact_email is not null or contact_phone is not null
  )
);

create index clients_org_idx on public.clients (organization_id, deleted_at);
create index clients_name_idx on public.clients (organization_id, name);

-- ---------------------------------------------------------------------------
-- drones (equipamentos)
-- ---------------------------------------------------------------------------
create table public.drones (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  manufacturer text not null check (char_length(manufacturer) between 1 and 80),
  model text not null check (char_length(model) between 1 and 120),
  serial_number text check (serial_number is null or char_length(serial_number) <= 80),
  specs jsonb not null default '{}'::jsonb,
  status public.drone_status not null default 'available',
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index drones_org_idx on public.drones (organization_id, deleted_at);
-- nº de série único por organização (quando informado, ativo)
create unique index drones_serial_unique
  on public.drones (organization_id, serial_number)
  where serial_number is not null and deleted_at is null;

-- ---------------------------------------------------------------------------
-- maintenance_records (histórico de manutenção — requisito B6)
-- ---------------------------------------------------------------------------
create table public.maintenance_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  drone_id uuid not null references public.drones(id) on delete cascade,
  performed_at date not null,
  description text not null check (char_length(description) between 2 and 2000),
  cost numeric(12, 2) check (cost is null or cost >= 0),
  created_at timestamptz not null default now(),
  constraint maintenance_future_date check (performed_at <= current_date + interval '1 day')
);

create index maintenance_drone_idx on public.maintenance_records (drone_id, performed_at desc);
create index maintenance_org_idx on public.maintenance_records (organization_id);

-- ---------------------------------------------------------------------------
-- operators (operadores/pilotos)
-- ---------------------------------------------------------------------------
create table public.operators (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  full_name text not null check (char_length(full_name) between 2 and 120),
  notes text check (notes is null or char_length(notes) <= 4000), -- qualificações DECLARADAS
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index operators_org_idx on public.operators (organization_id, deleted_at);

-- ---------------------------------------------------------------------------
-- operator_documents (documentos e validades)
-- ATENÇÃO: alertas automáticos de vencimento são funcionalidade CONDICIONADA
--          (docs/08-matriz-funcionalidades.md) — aqui apenas armazenamento.
-- ---------------------------------------------------------------------------
create table public.operator_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  operator_id uuid not null references public.operators(id) on delete cascade,
  doc_type text not null check (char_length(doc_type) between 1 and 80),
  document_number text check (document_number is null or char_length(document_number) <= 80),
  issued_at date,
  expires_at date,
  created_at timestamptz not null default now(),
  constraint operator_documents_dates check (issued_at is null or expires_at is null or issued_at <= expires_at)
);

create index operator_documents_org_idx on public.operator_documents (organization_id);
create index operator_documents_operator_idx on public.operator_documents (operator_id);

-- ---------------------------------------------------------------------------
-- Row Level Security (negativa por padrão — Skill 02, 5.7)
-- Seleção e mutação: membro ativo da própria organização.
-- ---------------------------------------------------------------------------
alter table public.clients enable row level security;
alter table public.drones enable row level security;
alter table public.maintenance_records enable row level security;
alter table public.operators enable row level security;
alter table public.operator_documents enable row level security;

create policy clients_select on public.clients for select
  using (public.is_member_of(organization_id));
create policy clients_insert on public.clients for insert
  with check (public.is_member_of(organization_id));
create policy clients_update on public.clients for update
  using (public.is_member_of(organization_id))
  with check (public.is_member_of(organization_id));
create policy clients_delete on public.clients for delete
  using (public.is_member_of(organization_id));

create policy drones_select on public.drones for select
  using (public.is_member_of(organization_id));
create policy drones_insert on public.drones for insert
  with check (public.is_member_of(organization_id));
create policy drones_update on public.drones for update
  using (public.is_member_of(organization_id))
  with check (public.is_member_of(organization_id));
create policy drones_delete on public.drones for delete
  using (public.is_member_of(organization_id));

create policy maintenance_select on public.maintenance_records for select
  using (public.is_member_of(organization_id));
create policy maintenance_insert on public.maintenance_records for insert
  with check (public.is_member_of(organization_id));
create policy maintenance_delete on public.maintenance_records for delete
  using (public.is_member_of(organization_id));

create policy operators_select on public.operators for select
  using (public.is_member_of(organization_id));
create policy operators_insert on public.operators for insert
  with check (public.is_member_of(organization_id));
create policy operators_update on public.operators for update
  using (public.is_member_of(organization_id))
  with check (public.is_member_of(organization_id));
create policy operators_delete on public.operators for delete
  using (public.is_member_of(organization_id));

create policy operator_documents_select on public.operator_documents for select
  using (public.is_member_of(organization_id));
create policy operator_documents_insert on public.operator_documents for insert
  with check (public.is_member_of(organization_id));
create policy operator_documents_delete on public.operator_documents for delete
  using (public.is_member_of(organization_id));

-- =========================================================================
-- Rollback (apenas antes do lançamento):
--   drop policy if exists operator_documents_delete on public.operator_documents;
--   ... (todas as policies acima)
--   drop table if exists public.operator_documents;
--   drop table if exists public.operators;
--   drop table if exists public.maintenance_records;
--   drop table if exists public.drones;
--   drop table if exists public.clients;
--   drop type if exists public.drone_status;
-- =========================================================================
