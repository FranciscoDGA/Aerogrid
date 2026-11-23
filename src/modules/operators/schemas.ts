import { z } from "zod";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Campo de data opcional no formato AAAA-MM-DD (input type=date). */
function dateField(label: string) {
  return z
    .string()
    .trim()
    .max(10, `${label}: data inválida.`)
    .optional()
    .nullable()
    .refine(
      (v) =>
        !v || (DATE_RE.test(v) && !Number.isNaN(new Date(v).getTime())),
      { message: `${label}: data inválida (use o seletor de data).` },
    )
    .transform((v) => v || null);
}

const baseShape = {
  fullName: z
    .string()
    .trim()
    .min(2, "Informe o nome completo (mínimo 2 caracteres).")
    .max(120, "O nome pode ter no máximo 120 caracteres."),
  // Qualificações DECLARADAS — nunca certificação oficial (doc 02, nota 1)
  notes: z
    .string()
    .trim()
    .max(4000, "As observações podem ter no máximo 4000 caracteres.")
    .optional()
    .nullable()
    .transform((v) => v || null),
};

export const createOperatorSchema = z.object(baseShape);
export type CreateOperatorInput = z.infer<typeof createOperatorSchema>;

export const updateOperatorSchema = createOperatorSchema;
export type UpdateOperatorInput = z.infer<typeof updateOperatorSchema>;

/** Documento do operador (armazenamento; alertas = funcionalidade condicionada). */
export const createOperatorDocumentSchema = z
  .object({
    docType: z
      .string()
      .trim()
      .min(1, "Informe o tipo do documento.")
      .max(80, "O tipo pode ter no máximo 80 caracteres."),
    documentNumber: z
      .string()
      .trim()
      .max(80, "O número pode ter no máximo 80 caracteres.")
      .optional()
      .nullable()
      .transform((v) => v || null),
    issuedAt: dateField("Emissão"),
    expiresAt: dateField("Validade"),
  })
  .refine((d) => !d.issuedAt || !d.expiresAt || d.issuedAt <= d.expiresAt, {
    message: "A validade não pode ser anterior à emissão.",
    path: ["expiresAt"],
  });

export type CreateOperatorDocumentInput = z.infer<
  typeof createOperatorDocumentSchema
>;
