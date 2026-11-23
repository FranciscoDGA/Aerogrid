"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addOperatorDocument,
  createOperatorRecord,
  deleteOperatorRecord,
  updateOperatorRecord,
} from "./service";
import { createOperatorDocumentSchema, createOperatorSchema } from "./schemas";

export type OperatorFormState = { error?: string; success?: string } | undefined;

function parseOperator(formData: FormData) {
  return createOperatorSchema.safeParse({
    fullName: formData.get("fullName"),
    notes: formData.get("notes") || null,
  });
}

export async function createOperatorAction(
  _prev: OperatorFormState,
  formData: FormData,
): Promise<OperatorFormState> {
  const parsed = parseOperator(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }
  try {
    const id = await createOperatorRecord(parsed.data);
    revalidatePath("/operadores");
    redirect(`/operadores/${id}`);
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: e instanceof Error ? e.message : "Erro ao salvar." };
  }
}

export async function updateOperatorAction(
  _prev: OperatorFormState,
  formData: FormData,
): Promise<OperatorFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Identificador inválido." };

  const parsed = parseOperator(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }
  try {
    await updateOperatorRecord(id, parsed.data);
    revalidatePath("/operadores");
    revalidatePath(`/operadores/${id}`);
    redirect(`/operadores/${id}`);
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return {
      error:
        e instanceof Error && e.message === "not_found"
          ? "Operador não encontrado (ou de outra organização)."
          : e instanceof Error
            ? e.message
            : "Erro ao atualizar.",
    };
  }
}

/** Exclusão lógica (ADR-008) com erro visível na tela. */
export async function deleteOperatorAction(
  _prev: OperatorFormState,
  formData: FormData,
): Promise<OperatorFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Identificador inválido." };

  try {
    await deleteOperatorRecord(id);
    revalidatePath("/operadores");
    redirect("/operadores");
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return {
      error:
        e instanceof Error && e.message === "not_found"
          ? "Operador não encontrado (ou de outra organização)."
          : e instanceof Error
            ? e.message
            : "Erro ao excluir.",
    };
  }
}

export async function addDocumentAction(
  _prev: OperatorFormState,
  formData: FormData,
): Promise<OperatorFormState> {
  const operatorId = String(formData.get("operatorId") ?? "");
  if (!operatorId) return { error: "Identificador inválido." };

  const parsed = createOperatorDocumentSchema.safeParse({
    docType: formData.get("docType"),
    documentNumber: formData.get("documentNumber") || null,
    issuedAt: formData.get("issuedAt") || null,
    expiresAt: formData.get("expiresAt") || null,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }
  try {
    await addOperatorDocument(operatorId, parsed.data);
    revalidatePath(`/operadores/${operatorId}`);
    return { success: "Documento adicionado." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao adicionar." };
  }
}
