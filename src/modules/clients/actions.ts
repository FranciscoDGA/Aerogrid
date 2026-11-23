"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createClientRecord,
  deleteClientRecord,
  updateClientRecord,
} from "./service";
import { createClientSchema } from "./schemas";

export type ClientFormState = { error?: string } | undefined;

function parse(formData: FormData) {
  return createClientSchema.safeParse({
    name: formData.get("name"),
    contactName: formData.get("contactName") || null,
    contactEmail: formData.get("contactEmail") || null,
    contactPhone: formData.get("contactPhone") || null,
    notes: formData.get("notes") || null,
  });
}

export async function createClientAction(
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  try {
    const id = await createClientRecord(parsed.data);
    revalidatePath("/clientes");
    redirect(`/clientes/${id}`);
  } catch (e) {
    // redirect lança exceção com digest — repassa para o Next
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: e instanceof Error ? e.message : "Erro ao salvar." };
  }
}

export async function updateClientAction(
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Identificador inválido." };

  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  try {
    await updateClientRecord(id, parsed.data);
    revalidatePath("/clientes");
    revalidatePath(`/clientes/${id}`);
    redirect(`/clientes/${id}`);
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return {
      error:
        e instanceof Error && e.message === "not_found"
          ? "Cliente não encontrado (ou de outra organização)."
          : e instanceof Error
            ? e.message
            : "Erro ao atualizar.",
    };
  }
}

/** Exclusão lógica (ADR-008). Erro fica visível no modal — nada de catch silencioso. */
export async function deleteClientAction(
  _prev: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Identificador inválido." };

  try {
    await deleteClientRecord(id);
    revalidatePath("/clientes");
    redirect("/clientes");
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return {
      error:
        e instanceof Error && e.message === "not_found"
          ? "Cliente não encontrado (ou de outra organização)."
          : e instanceof Error
            ? e.message
            : "Erro ao excluir.",
    };
  }
}
