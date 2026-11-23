import Link from "next/link";
import { notFound } from "next/navigation";
import { MaintenanceForm } from "@/components/forms/maintenance-form";
import { DeleteButton } from "@/components/ui/delete-button";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/link-button";
import { deleteDroneAction } from "@/modules/drones/actions";
import { getDrone, listMaintenance } from "@/modules/drones/service";
import {
  DRONE_STATUS_LABELS,
  droneStatusSchema,
} from "@/modules/drones/schemas";

export const dynamic = "force-dynamic";

export const metadata = { title: "Detalhes do drone" };

type Props = { params: Promise<{ id: string }> };

export default async function DroneDetalhePage({ params }: Props) {
  const { id } = await params;

  let drone;
  let maintenance: Awaited<ReturnType<typeof listMaintenance>> = [];
  let loadError = false;
  try {
    drone = await getDrone(id);
    if (drone) maintenance = await listMaintenance(drone.id);
  } catch {
    loadError = true;
    drone = null;
  }

  if (loadError) {
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

  const statusParsed = droneStatusSchema.safeParse(drone.status);
  const statusLabel = statusParsed.success
    ? DRONE_STATUS_LABELS[statusParsed.data]
    : drone.status;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${drone.manufacturer} ${drone.model}`}
        description="Registro interno do equipamento — não representa autorização de voo."
        action={
          <div className="flex gap-2">
            <LinkButton
              href={`/drones/${drone.id}/editar`}
              variant="secondary"
              size="lg"
            >
              Editar
            </LinkButton>
            <DeleteButton
              action={deleteDroneAction}
              id={drone.id}
              confirmMessage={`Excluir "${drone.manufacturer} ${drone.model}"? O registro será ocultado da listagem (exclusão lógica).`}
            />
          </div>
        }
      />

      <section aria-labelledby="dados" className="space-y-3">
        <h2 id="dados" className="text-lg font-semibold text-gray-900">
          Dados
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
            <Field label="Fabricante" value={drone.manufacturer} />
            <Field label="Modelo" value={drone.model} />
            <Field label="Número de série" value={drone.serialNumber} />
            <Field label="Situação" value={statusLabel} />
            <div className="sm:col-span-2">
              {Object.keys(drone.specs).length === 0 ? (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Características técnicas
                  </dt>
                  <dd className="mt-0.5 text-gray-500">
                    Nenhuma característica registrada.
                  </dd>
                </div>
              ) : (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Características técnicas
                  </dt>
                  <dd className="mt-1 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {Object.entries(drone.specs).map(([k, v]) => (
                      <span key={k} className="text-gray-900">
                        <span className="font-medium">{k}:</span> {v}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </div>
            <Field
              label="Cadastrado em"
              value={new Date(drone.createdAt).toLocaleDateString("pt-BR")}
            />
            <Field
              label="Atualizado em"
              value={new Date(drone.updatedAt).toLocaleDateString("pt-BR")}
            />
          </dl>
        </div>
      </section>

      <section aria-labelledby="manutencao" className="space-y-3">
        <h2 id="manutencao" className="text-lg font-semibold text-gray-900">
          Histórico de manutenção
        </h2>

        {maintenance.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            Nenhuma manutenção registrada para este drone.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Manutenções registradas deste drone
              </caption>
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Data
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Descrição
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Custo
                  </th>
                </tr>
              </thead>
              <tbody>
                {maintenance.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-gray-700">
                      {new Date(m.performedAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{m.description}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-gray-700">
                      {m.cost
                        ? `R$ ${Number(m.cost).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Registrar manutenção
          </h3>
          <MaintenanceForm droneId={drone.id} />
        </div>
      </section>

      <section aria-labelledby="missoes" className="space-y-3">
        <h2 id="missoes" className="text-lg font-semibold text-gray-900">
          Missões com este equipamento
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-700">
            O módulo de missões ainda não está disponível nesta versão.
          </p>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-gray-900">{value || "—"}</dd>
    </div>
  );
}
