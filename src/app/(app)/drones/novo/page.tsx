import { DroneForm } from "@/components/forms/drone-form";
import { PageHeader } from "@/components/ui/page-header";

export const dynamic = "force-dynamic";

export const metadata = { title: "Novo drone" };

export default function NovoDronePage() {
  return (
    <div>
      <PageHeader
        title="Novo drone"
        description="Fabricante, modelo e situação do equipamento."
      />
      <DroneForm />
    </div>
  );
}
