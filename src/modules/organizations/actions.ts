"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createOrganizationSchema } from "./schemas";

export type CreateOrganizationState = { error?: string } | undefined;

/**
 * Cria a organização do usuário via RPC security definer (migração 0001).
 * Autorização: o RPC só usa o usuário da sessão (auth.uid()) — nunca dados do cliente.
 */
export async function createOrganization(
  _prev: CreateOrganizationState,
  formData: FormData,
): Promise<CreateOrganizationState> {
  const parsed = createOrganizationSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.rpc("create_organization", {
    p_name: parsed.data.name,
    p_slug: parsed.data.slug,
  });

  if (error) {
    if (error.message.includes("already_has_organization")) {
      return { error: "Você já pertence a uma organização." };
    }
    if (error.code === "23505" || error.message.includes("duplicate")) {
      return { error: "Este identificador já está em uso. Escolha outro." };
    }
    // Log sem dados sensíveis (Skill 04, §9)
    console.error("[create_organization] falha:", error.message);
    return {
      error: "Não foi possível criar a organização. Tente novamente.",
    };
  }

  redirect("/");
}
