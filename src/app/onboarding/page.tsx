import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasActiveOrganization } from "@/modules/organizations/service";
import { OnboardingForm } from "./onboarding-form";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (await hasActiveOrganization()) redirect("/painel");

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Crie a organização da sua empresa
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            A organização separa os dados da sua empresa dos demais clientes do
            AeroGrid. Você será o proprietário (owner) e poderá convidar a
            equipe depois.
          </p>
        </div>

        <OnboardingForm />
      </div>
    </main>
  );
}
