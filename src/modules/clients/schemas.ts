import { z } from "zod";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const baseShape = {
  name: z
    .string()
    .trim()
    .min(2, "Informe o nome do cliente (mínimo 2 caracteres).")
    .max(160, "O nome pode ter no máximo 160 caracteres."),
  contactName: z
    .string()
    .trim()
    .max(120, "O nome do contato pode ter no máximo 120 caracteres.")
    .optional()
    .nullable()
    .transform((v) => v || null),
  contactEmail: z
    .string()
    .trim()
    .max(160, "O e-mail pode ter no máximo 160 caracteres.")
    .optional()
    .nullable()
    .refine((v) => !v || EMAIL_RE.test(v), {
      message: "Informe um e-mail válido.",
    })
    .transform((v) => v || null),
  contactPhone: z
    .string()
    .trim()
    .max(30, "O telefone pode ter no máximo 30 caracteres.")
    .optional()
    .nullable()
    .transform((v) => v || null),
  notes: z
    .string()
    .trim()
    .max(4000, "As observações podem ter no máximo 4000 caracteres.")
    .optional()
    .nullable()
    .transform((v) => v || null),
};

function requireContact(data: {
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}): boolean {
  return Boolean(data.contactName || data.contactEmail || data.contactPhone);
}

/** Cadastro de cliente — ao menos um canal de contato (doc 04). */
export const createClientSchema = z
  .object(baseShape)
  .refine(requireContact, {
    message: "Informe ao menos um contato: nome, e-mail ou telefone.",
    path: ["contactName"],
  });

export type CreateClientInput = z.infer<typeof createClientSchema>;

/** Edição: mesmo requisito de contato. */
export const updateClientSchema = createClientSchema;

export type UpdateClientInput = z.infer<typeof updateClientSchema>;

/** Filtro de busca da listagem (?q=). */
export const clientSearchSchema = z.object({
  q: z.string().trim().max(80).optional(),
});
