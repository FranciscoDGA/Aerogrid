import { createClient } from "@/lib/supabase/server";
import type { Role } from "./schemas";

export type CurrentOrganization = {
  organizationId: string;
  role: Role;
  name: string;
  slug: string;
  status: string;
};

export type OrganizationMember = {
  userId: string;
  email: string;
  fullName: string | null;
  role: Role;
  status: string;
  joinedAt: string;
};

/**
 * Organização ativa do usuário logado (lida da sessão, nunca do cliente).
 * Retorna null se não houver membership ativo.
 */
export async function getCurrentOrganization(): Promise<CurrentOrganization | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("memberships")
    .select("organization_id, role, status, organizations(name, slug, status)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Falha ao carregar organização: ${error.message}`);
  }
  if (!data) return null;

  const org = data.organizations as unknown as {
    name: string;
    slug: string;
    status: string;
  } | null;
  if (!org) return null;

  return {
    organizationId: data.organization_id,
    role: data.role as Role,
    name: org.name,
    slug: org.slug,
    status: org.status,
  };
}

/**
 * Lista membros da organização atual.
 * Verificação dupla de autorização (serviço + RLS) — Skill 04, §8.
 */
export async function listMembers(
  organizationId: string,
): Promise<OrganizationMember[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("unauthenticated");

  // Autorização no servidor: quem chama precisa ser membro ativo da org.
  const { data: myMembership } = await supabase
    .from("memberships")
    .select("role")
    .eq("organization_id", organizationId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!myMembership) {
    throw new Error("forbidden");
  }

  const { data, error } = await supabase
    .from("memberships")
    .select("user_id, role, status, created_at, users(email, full_name)")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Falha ao carregar membros: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const profile = row.users as unknown as {
      email: string;
      full_name: string | null;
    } | null;
    return {
      userId: row.user_id,
      email: profile?.email ?? "—",
      fullName: profile?.full_name || null,
      role: row.role as Role,
      status: row.status,
      joinedAt: row.created_at,
    };
  });
}

/** Usuário já possui organização ativa? (usado no onboarding) */
export async function hasActiveOrganization(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { count } = await supabase
    .from("memberships")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "active");

  return (count ?? 0) > 0;
}
