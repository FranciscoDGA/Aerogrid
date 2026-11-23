import { createClient } from "@/lib/supabase/server";
import { getCurrentOrganization } from "@/modules/organizations/service";
import type { CreateDroneInput, CreateMaintenanceInput } from "./schemas";
import { droneStatusSchema } from "./schemas";

export type DroneRecord = {
  id: string;
  manufacturer: string;
  model: string;
  serialNumber: string | null;
  status: string;
  specs: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type MaintenanceRecord = {
  id: string;
  droneId: string;
  performedAt: string;
  description: string;
  cost: string | null;
  createdAt: string;
};

export type RecentMaintenanceRecord = MaintenanceRecord & {
  droneManufacturer?: string;
  droneModel?: string;
};

const DRONE_COLUMNS =
  "id, manufacturer, model, serial_number, status, specs, created_at, updated_at";

function toDrone(row: {
  id: string;
  manufacturer: string;
  model: string;
  serial_number: string | null;
  status: string;
  specs: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}): DroneRecord {
  return {
    id: row.id,
    manufacturer: row.manufacturer,
    model: row.model,
    serialNumber: row.serial_number,
    status: droneStatusSchema.safeParse(row.status).success
      ? row.status
      : "available",
    specs: row.specs ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function requireOrg() {
  const org = await getCurrentOrganization();
  if (!org) throw new Error("unauthenticated");
  return org;
}

export async function listDrones(): Promise<DroneRecord[]> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("drones")
    .select(DRONE_COLUMNS)
    .is("deleted_at", null)
    .order("manufacturer")
    .order("model")
    .limit(200);

  if (error) throw new Error(`Falha ao carregar drones: ${error.message}`);
  return (data ?? []).map(toDrone);
}

export async function getDrone(id: string): Promise<DroneRecord | null> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("drones")
    .select(DRONE_COLUMNS)
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(`Falha ao carregar drone: ${error.message}`);
  return data ? toDrone(data) : null;
}

export async function listMaintenance(droneId: string): Promise<MaintenanceRecord[]> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("maintenance_records")
    .select("id, drone_id, performed_at, description, cost, created_at")
    .eq("drone_id", droneId)
    .order("performed_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(`Falha ao carregar manutenções: ${error.message}`);
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    droneId: row.drone_id,
    performedAt: row.performed_at,
    description: row.description,
    cost: row.cost,
    createdAt: row.created_at,
  }));
}

export async function listRecentMaintenance(
  limit = 5,
): Promise<RecentMaintenanceRecord[]> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("maintenance_records")
    .select("id, drone_id, performed_at, description, cost, created_at, drones(manufacturer, model)")
    .order("performed_at", { ascending: false })
    .limit(limit);

  if (error) {
    return [];
  }

  type RowWithDrone = {
    id: string;
    drone_id: string;
    performed_at: string;
    description: string;
    cost: string | null;
    created_at: string;
    drones?: { manufacturer?: string; model?: string } | null;
  };

  return ((data as unknown as RowWithDrone[]) ?? []).map((row) => ({
    id: row.id,
    droneId: row.drone_id,
    performedAt: row.performed_at,
    description: row.description,
    cost: row.cost,
    createdAt: row.created_at,
    droneManufacturer: row.drones?.manufacturer,
    droneModel: row.drones?.model,
  }));
}

export async function createDroneRecord(input: CreateDroneInput): Promise<string> {
  const supabase = await createClient();
  const org = await requireOrg();

  const { data, error } = await supabase
    .from("drones")
    .insert({
      organization_id: org.organizationId,
      manufacturer: input.manufacturer,
      model: input.model,
      serial_number: input.serialNumber || null,
      status: input.status,
      specs: input.specs,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[drones] insert:", error.message);
    if (error.code === "23505") {
      throw new Error("Já existe um drone com esse número de série nesta organização.");
    }
    throw new Error("Não foi possível salvar o drone.");
  }
  return data.id as string;
}

export async function updateDroneRecord(
  id: string,
  input: CreateDroneInput,
): Promise<void> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("drones")
    .update({
      manufacturer: input.manufacturer,
      model: input.model,
      serial_number: input.serialNumber || null,
      status: input.status,
      specs: input.specs,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select("id");

  if (error) {
    console.error("[drones] update:", error.message);
    if (error.code === "23505") {
      throw new Error("Já existe um drone com esse número de série nesta organização.");
    }
    throw new Error("Não foi possível atualizar o drone.");
  }
  if (!data || data.length === 0) throw new Error("not_found");
}

export async function deleteDroneRecord(id: string): Promise<void> {
  const supabase = await createClient();
  await requireOrg();

  const { data, error } = await supabase
    .from("drones")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .is("deleted_at", null)
    .select("id");

  if (error) {
    console.error("[drones] delete:", error.message);
    throw new Error("Não foi possível excluir o drone.");
  }
  if (!data || data.length === 0) throw new Error("not_found");
}

export async function addMaintenanceRecord(
  droneId: string,
  input: CreateMaintenanceInput,
): Promise<void> {
  const supabase = await createClient();
  const org = await requireOrg();

  const { error } = await supabase.from("maintenance_records").insert({
    organization_id: org.organizationId,
    drone_id: droneId,
    performed_at: input.performedAt,
    description: input.description,
    cost: input.cost ?? null,
  });

  if (error) {
    console.error("[maintenance] insert:", error.message);
    throw new Error("Não foi possível registrar a manutenção.");
  }
}
