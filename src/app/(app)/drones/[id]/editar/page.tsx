import Link from "next/link";
import { notFound } from "next/navigation";
import { DroneForm } from "@/components/forms/drone-form";
import { PageHeader } from "@/components/ui/page-header";
import { getDrone } from "@/modules/drones/service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Editar drone" };

type Props = { params: Promise<{ id: string }> };

export default async function EditarDronePage({ params }: Props) {
  const { id } = await params;

  let drone;
  try {
    drone = await getDrone(id);
  } catch {
    return (
      <div
        role="alert"
        className="rounded-lg border border-danger/30 bg-danger-bg p-6 text-center"
      >
        <p className="text-sm text-danger">
          Não foi possível carregar o drone. Tente novamente.
        </p>
        <Link
          href="/drones"
          className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }

  if (!drone) notFound();

  return (
    <div>
      <PageHeader
        title="Editar drone"
        description={`Alterando ${drone.manufacturer} ${drone.model}.`}
      />
      <DroneForm existing={drone} />
    </div>
  );
}
