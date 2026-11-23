import { createClient } from "@/lib/supabase/server";
import { getCurrentOrganization } from "@/modules/organizations/service";
import type { CreateOperatorDocumentInput, CreateOperatorInput } from "./schemas";

export type OperatorRecord = {
  id: string;
  fullName: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OperatorDocumentRecord = {
  id: string;
  operatorId: string;
  docType: string;
  documentNumber: string | null;
  issuedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

async function requireOrg() {
  const org = await getCurrentOrganization();
  if (!org) throw new Error("unauthenticated");
  return org;
}

export async function listOperators(): Promise<OperatorRecord[]> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("operators")
    .select("id, full_name, notes, created_at, updated_at")
    .is("deleted_at", null)
    .order("full_name")
    .limit(200);

  if (error) throw new Error(`Falha ao carregar operadores: ${error.message}`);
  return (data ?? []).map((row) => ({
    id: row.id,
    fullName: row.full_name,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function getOperator(id: string): Promise<OperatorRecord | null> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("operators")
    .select("id, full_name, notes, created_at, updated_at")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(`Falha ao carregar operador: ${error.message}`);
  if (!data) return null;
  return {
    id: data.id,
    fullName: data.full_name,
    notes: data.notes,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function listOperatorDocuments(
  operatorId: string,
): Promise<OperatorDocumentRecord[]> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("operator_documents")
    .select("id, operator_id, doc_type, document_number, issued_at, expires_at, created_at")
    .eq("operator_id", operatorId)
    .order("doc_type")
    .limit(100);

  if (error) {
    throw new Error(`Falha ao carregar documentos: ${error.message}`);
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    operatorId: row.operator_id,
    docType: row.doc_type,
    documentNumber: row.document_number,
    issuedAt: row.issued_at,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
  }));
}

export async function createOperatorRecord(
  input: CreateOperatorInput,
): Promise<string> {
  const supabase = await createClient();
  const org = await requireOrg();

  const { data, error } = await supabase
    .from("operators")
    .insert({
      organization_id: org.organizationId,
      full_name: input.fullName,
      notes: input.notes ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[operators] insert:", error.message);
    throw new Error("Não foi possível salvar o operador.");
  }
  return data.id as string;
}

export async function updateOperatorRecord(
  id: string,
  input: CreateOperatorInput,
): Promise<void> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("operators")
    .update({
      full_name: input.fullName,
      notes: input.notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select("id");

  if (error) {
    console.error("[operators] update:", error.message);
    throw new Error("Não foi possível atualizar o operador.");
  }
  if (!data || data.length === 0) throw new Error("not_found");
}

export async function deleteOperatorRecord(id: string): Promise<void> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("operators")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .is("deleted_at", null)
    .select("id");

  if (error) {
    console.error("[operators] delete:", error.message);
    throw new Error("Não foi possível excluir o operador.");
  }
  if (!data || data.length === 0) throw new Error("not_found");
}

export async function addOperatorDocument(
  operatorId: string,
  input: CreateOperatorDocumentInput,
): Promise<void> {
  const supabase = await createClient();
  const org = await requireOrg();

  const { error } = await supabase.from("operator_documents").insert({
    organization_id: org.organizationId,
    operator_id: operatorId,
    doc_type: input.docType,
    document_number: input.documentNumber || null,
    issued_at: input.issuedAt || null,
    expires_at: input.expiresAt || null,
  });

  if (error) {
    console.error("[operator_documents] insert:", error.message);
    throw new Error("Não foi possível adicionar o documento.");
  }
}
