import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { AppNav } from "@/components/nav/app-nav";
import { logout } from "@/modules/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { getCurrentOrganization } from "@/modules/organizations/service";

export const dynamic = "force-dynamic";

/**
 * Shell da área logada: guarda de sessão + organização.
 * Sem sessão → /login. Sessão sem organização → /onboarding.
 */
export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const org = await getCurrentOrganization();
  if (!org) redirect("/onboarding");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <span className="hidden text-sm text-gray-500 sm:inline">
              {org.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 md:inline">
              {org.role === "owner"
                ? "Proprietário"
                : org.role === "admin"
                  ? "Administrador"
                  : "Membro"}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="h-9 rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <AppNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
