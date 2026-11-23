"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addMaintenanceRecord,
  createDroneRecord,
  deleteDroneRecord,
  updateDroneRecord,
} from "./service";
import {
  createDroneSchema,
  createMaintenanceSchema,
  parseSpecsText,
} from "./schemas";

export type DroneFormState = { error?: string; success?: string } | undefined;

function parseDrone(formData: FormData) {
  return createDroneSchema.safeParse({
    manufacturer: formData.get("manufacturer"),
    model: formData.get("model"),
    serialNumber: formData.get("serialNumber") || null,
    status: formData.get("status"),
    specs: parseSpecsText(String(formData.get("specsText") ?? "")),
  });
}

export async function createDroneAction(
  _prev: DroneFormState,
  formData: FormData,
): Promise<DroneFormState> {
  const parsed = parseDrone(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }
  try {
    const id = await createDroneRecord(parsed.data);
    revalidatePath("/drones");
    redirect(`/drones/${id}`);
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: e instanceof Error ? e.message : "Erro ao salvar." };
  }
}

export async function updateDroneAction(
  _prev: DroneFormState,
  formData: FormData,
): Promise<DroneFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Identificador inválido." };

  const parsed = parseDrone(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }
  try {
    await updateDroneRecord(id, parsed.data);
    revalidatePath("/drones");
    revalidatePath(`/drones/${id}`);
    redirect(`/drones/${id}`);
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return {
      error:
        e instanceof Error && e.message === "not_found"
          ? "Drone não encontrado (ou de outra organização)."
          : e instanceof Error
            ? e.message
            : "Erro ao atualizar.",
    };
  }
}

/** Exclusão lógica (ADR-008) com erro visível na tela. */
export async function deleteDroneAction(
  _prev: DroneFormState,
  formData: FormData,
): Promise<DroneFormState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Identificador inválido." };

  try {
    await deleteDroneRecord(id);
    revalidatePath("/drones");
    redirect("/drones");
  } catch (e) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return {
      error:
        e instanceof Error && e.message === "not_found"
          ? "Drone não encontrado (ou de outra organização)."
          : e instanceof Error
            ? e.message
            : "Erro ao excluir.",
    };
  }
}

export async function addMaintenanceAction(
  _prev: DroneFormState,
  formData: FormData,
): Promise<DroneFormState> {
  const droneId = String(formData.get("droneId") ?? "");
  if (!droneId) return { error: "Identificador inválido." };

  const parsed = createMaintenanceSchema.safeParse({
    performedAt: formData.get("performedAt"),
    description: formData.get("description"),
    cost: formData.get("cost") || null,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }
  try {
    await addMaintenanceRecord(droneId, parsed.data);
    revalidatePath(`/drones/${droneId}`);
    return { success: "Manutenção registrada." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro ao registrar." };
  }
}
