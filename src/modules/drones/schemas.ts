import { z } from "zod";

export const droneStatusSchema = z.enum([
  "available",
  "in_use",
  "maintenance",
  "inactive",
]);
export type DroneStatus = z.infer<typeof droneStatusSchema>;

export const DRONE_STATUS_LABELS: Record<DroneStatus, string> = {
  available: "Disponível",
  in_use: "Em uso",
  maintenance: "Manutenção",
  inactive: "Inativo",
};

const specsSchema = z
  .record(z.string().min(1).max(60), z.string().max(300))
  .refine((v) => Object.keys(v).length <= 20, {
    message: "Máximo de 20 características técnicas.",
  });

const baseShape = {
  manufacturer: z
    .string()
    .trim()
    .min(1, "Informe o fabricante.")
    .max(80, "O fabricante pode ter no máximo 80 caracteres."),
  model: z
    .string()
    .trim()
    .min(1, "Informe o modelo.")
    .max(120, "O modelo pode ter no máximo 120 caracteres."),
  serialNumber: z
    .string()
    .trim()
    .max(80, "O número de série pode ter no máximo 80 caracteres.")
    .optional()
    .nullable()
    .transform((v) => v || null),
  status: droneStatusSchema,
  specs: specsSchema.default({}),
};

export const createDroneSchema = z.object(baseShape);
export type CreateDroneInput = z.infer<typeof createDroneSchema>;

export const updateDroneSchema = createDroneSchema;
export type UpdateDroneInput = z.infer<typeof updateDroneSchema>;

/** Registro de manutenção (requisito B6). */
export const createMaintenanceSchema = z.object({
  performedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida.")
    .refine((d) => new Date(d) <= new Date(Date.now() + 86400000), {
      message: "A data não pode estar no futuro.",
    }),
  description: z
    .string()
    .trim()
    .min(2, "Descreva a manutenção.")
    .max(2000, "A descrição pode ter no máximo 2000 caracteres."),
  // FormData sempre entrega STRING — o preprocess converte para número antes
  // da validação numérica ("" vira null; z.coerce.number() sozinho viraria 0).
  // Valor não numérico é mantido como está para cair no invalid_type_error
  // com mensagem em português (nunca "Expected number, received string").
  cost: z.preprocess(
    (v) => {
      if (v === null || v === undefined || v === "") return null;
      if (typeof v === "number") return v;
      const n = Number(String(v).trim().replace(",", "."));
      return Number.isNaN(n) ? v : n;
    },
    z
      .number({ invalid_type_error: "Custo inválido — informe um número." })
      .min(0, "O custo não pode ser negativo.")
      .max(99999999, "Custo acima do permitido.")
      .nullable(),
  ),
});

export type CreateMaintenanceInput = z.infer<typeof createMaintenanceSchema>;

/**
 * Converte texto "uma característica por linha, chave: valor"
 * vindo da textarea do formulário em objeto de specs.
 */
export function parseSpecsText(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) result[key.slice(0, 60)] = value.slice(0, 300);
  }
  return result;
}
