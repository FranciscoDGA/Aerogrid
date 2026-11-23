# 04 — Dicionário de Dados

**Versão:** 0.1 · **Status:** proposto — núcleo inicial (cresce a cada migração; obrigatório atualizar junto com o doc 03) · **Data:** 2026-11-23

---

Legenda: **O** = obrigatório · **C** = condicional · **—** = opcional. Tipos em PostgreSQL.

## organizations

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| id | uuid PK | O | |
| name | text | O | Razão social/nome fantasia |
| slug | text | O | Único global (URL) |
| status | enum | O | active, suspended, trial |
| created_at / updated_at | timestamptz | O | |

## memberships

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| id | uuid PK | O | |
| organization_id | uuid FK | O | |
| user_id | uuid FK | O | → auth.users |
| role | enum | O | owner, admin, member |
| status | enum | O | active, invited, disabled |
| created_at | timestamptz | O | |

## clients

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | herança de tenant |
| name | text | O | |
| contact_name / contact_email / contact_phone | text | C | ao menos um contato |
| notes | text | — | |
| deleted_at | timestamptz | — | exclusão lógica |

## drones

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| manufacturer | text | O | |
| model | text | O | |
| serial_number | text | C | único por org se informado |
| specs | jsonb | — | características técnicas livres (validadas por Zod no service) |
| status | enum | O | available, in_use, maintenance, inactive |
| deleted_at | timestamptz | — | |

## maintenance_records

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id / drone_id | uuid FK | O | |
| performed_at | date | O | |
| description | text | O | |
| cost | numeric(12,2) | — | BRL |

## operators

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| user_id | uuid FK | — | se for também usuário do sistema |
| full_name | text | O | |
| notes | text | — | qualificações **declaradas** (não certificadas — doc 02, C3) |
| deleted_at | timestamptz | — | |

## operator_documents

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id / operator_id | uuid FK | O | |
| doc_type | text | O | ex.: habilitação, CNH — catálogo livre |
| document_number | text | — | |
| issued_at | date | — | |
| expires_at | date | C | **alertas de vencimento = funcionalidade condicionada (doc 08)** |
| attachment_id | uuid FK | — | |

## missions

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| client_id | uuid FK | O | mesma org (regra §4.3 do doc 03) |
| responsible_user_id | uuid FK | O | |
| title / objective | text | O | |
| mission_date | date | O | |
| status | enum | O | planned, in_progress, completed, cancelled |
| notes | text | — | |
| sequence_number | int | O | sequencial por org (histórico) |

## mission_operators / mission_drones

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| mission_id | uuid FK | O | |
| operator_id / drone_id | uuid FK | O | |
| role | text | — | ex.: comandante, reserva |

## mission_geometries

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id / mission_id | uuid FK | O | |
| geometry_type | enum | O | point, linestring, polygon |
| geometry | geometry(Geometry,4326) | O | PostGIS |
| label | text | — | ex.: waypoint 3, origem, destino |
| sort_order | int | — | |
| **origem/destino** | — | — | modelados como point com `label`; distâncias via PostGIS `ST_Distance` (geodésico) |

## checklist_templates / checklist_items / checklist_responses

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| template: name | text | O | |
| item: text, sort_order, required | text/int/bool | O | |
| response: mission_id, template_id, answers | uuid/uuid/jsonb | O | snapshot das respostas |

## attachments

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| entity_type / entity_id | text/uuid | O | polimórfico (missão, operador, drone...) |
| storage_path | text | O | caminho no Storage, **prefixado por organization_id** |
| content_type / size_bytes | text/bigint | O | validação de tipo e limite no servidor |
| uploaded_by | uuid FK | O | |

## reports

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| type | text | O | catálogo do MVP: mission_summary, fleet_status |
| parameters / status | jsonb / enum | O | pending, ready, failed — **conteúdo é interno, não documento oficial** |

## audit_logs

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | |
| user_id | uuid FK | — | |
| action | text | O | create, update, delete, login |
| entity_type / entity_id | text/uuid | O | |
| changes | jsonb | — | antes/depois, sem dados sensíveis |

## subscriptions

| Campo | Tipo | O/C | Descrição |
|-------|------|-----|-----------|
| organization_id | uuid FK | O | 1:1 |
| plan | enum | O | free, professional, team, enterprise (hipóteses — doc 01 §9) |
| status | enum | O | trial, active, past_due, cancelled |
| limits | jsonb | — | limites do plano (usuários, missões/mês) |

**Regra de atualização:** toda nova tabela ou campo relevante deve ser adicionado aqui na mesma migração (Skill 02, 6).
