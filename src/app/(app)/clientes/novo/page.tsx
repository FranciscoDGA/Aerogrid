import { ClientForm } from "@/components/forms/client-form";
import { PageHeader } from "@/components/ui/page-header";

export const dynamic = "force-dynamic";

export const metadata = { title: "Novo cliente" };

export default function NovoClientePage() {
  return (
    <div>
      <PageHeader
        title="Novo cliente"
        description="Informe o nome e ao menos um canal de contato."
      />
      <ClientForm />
    </div>
  );
}
