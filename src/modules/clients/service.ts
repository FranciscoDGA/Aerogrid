import { createClient } from "@/lib/supabase/server";
import { getCurrentOrganization } from "@/modules/organizations/service";
import type { CreateClientInput } from "./schemas";

export type ClientRecord = {
  id: string;
  name: string;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

function toRecord(row: {
  id: string;
  name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}): ClientRecord {
  return {
    id: row.id,
    name: row.name,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function requireOrg() {
  const org = await getCurrentOrganization();
  if (!org) throw new Error("unauthenticated");
  return org;
}

/** Lista clientes da organização atual (exclusão lógica filtrada). */
export async function listClients(search?: string): Promise<ClientRecord[]> {
  const supabase = await createClient();
  await requireOrg();

  let query = supabase
    .from("clients")
    .select(
      "id, name, contact_name, contact_email, contact_phone, notes, created_at, updated_at",
    )
    .is("deleted_at", null)
    .order("name", { ascending: true })
    .limit(100);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Falha ao carregar clientes: ${error.message}`);
  return (data ?? []).map(toRecord);
}

/** Busca um cliente. RLS garante: de outra organização → null (404). */
export async function getClient(id: string): Promise<ClientRecord | null> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, name, contact_name, contact_email, contact_phone, notes, created_at, updated_at",
    )
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(`Falha ao carregar cliente: ${error.message}`);
  return data ? toRecord(data) : null;
}

/**
 * Cria cliente. organization_id vem SEMPRE da sessão (nunca do payload).
 */
export async function createClientRecord(
  input: CreateClientInput,
): Promise<string> {
  const supabase = await createClient();
  const org = await requireOrg();

  const { data, error } = await supabase
    .from("clients")
    .insert({
      organization_id: org.organizationId,
      name: input.name,
      contact_name: input.contactName ?? null,
      contact_email: input.contactEmail ?? null,
      contact_phone: input.contactPhone ?? null,
      notes: input.notes ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[clients] insert:", error.message);
    throw new Error(
      error.code === "23505"
        ? "Já existe um cliente com esse nome."
        : "Não foi possível salvar o cliente.",
    );
  }
  return data.id as string;
}

/** Atualiza cliente (RLS: outra org afeta 0 linhas → erro de não encontrado). */
export async function updateClientRecord(
  id: string,
  input: CreateClientInput,
): Promise<void> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("clients")
    .update({
      name: input.name,
      contact_name: input.contactName ?? null,
      contact_email: input.contactEmail ?? null,
      contact_phone: input.contactPhone ?? null,
      notes: input.notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select("id");

  if (error) {
    console.error("[clients] update:", error.message);
    throw new Error("Não foi possível atualizar o cliente.");
  }
  if (!data || data.length === 0) throw new Error("not_found");
}

/** Exclusão lógica (doc/arquitetura ADR-008). */
export async function deleteClientRecord(id: string): Promise<void> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("clients")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .is("deleted_at", null)
    .select("id");

  if (error) {
    console.error("[clients] delete:", error.message);
    throw new Error("Não foi possível excluir o cliente.");
  }
  if (!data || data.length === 0) throw new Error("not_found");
}
