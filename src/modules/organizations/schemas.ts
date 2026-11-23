import { z } from "zod";

/** Papéis de membership — espelha o enum do banco (migração 0001). */
export const roleSchema = z.enum(["owner", "admin", "member"]);
export type Role = z.infer<typeof roleSchema>;

/** Criação de organização — usada na tela de onboarding (RPC create_organization). */
export const createOrganizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe o nome da organização (mínimo 2 caracteres).")
    .max(120, "O nome pode ter no máximo 120 caracteres."),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9-]{2,60}$/,
      "Use apenas letras minúsculas, números e hífens (2 a 60 caracteres).",
    )
    .refine(
      (v) => v.startsWith("-") === false && v.endsWith("-") === false,
      "O identificador não pode começar ou terminar com hífen.",
    ),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;

/** Atualização de dados cadastrais da organização (admin). */
export const updateOrganizationSchema = z.object({
  name: createOrganizationSchema.shape.name,
});

export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
