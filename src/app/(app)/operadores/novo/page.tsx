import { OperatorForm } from "@/components/forms/operator-form";
import { PageHeader } from "@/components/ui/page-header";

export const dynamic = "force-dynamic";

export const metadata = { title: "Novo operador" };

export default function NovoOperadorPage() {
  return (
    <div>
      <PageHeader
        title="Novo operador"
        description="Nome e qualificações declaradas pela organização."
      />
      <OperatorForm />
    </div>
  );
}
