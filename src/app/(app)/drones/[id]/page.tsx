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

  const totalCost = maintenance.reduce((acc, m) => {
    return acc + (m.cost ? Number(m.cost) : 0);
  }, 0);

  return (
    <div className="space-y-8">
      {/* Navegação de retorno / Breadcrumb */}
      <div>
        <nav aria-label="Navegação estrutural" className="mb-2">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500">
            <li>
              <Link href="/drones" className="hover:text-gray-900 hover:underline">
                Drones
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-800">
              {drone.manufacturer} {drone.model}
            </li>
          </ol>
        </nav>
        <PageHeader
          title={`${drone.manufacturer} ${drone.model}`}
          description="Registro interno do equipamento — a situação cadastrada não representa autorização de voo."
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
      </div>

      {/* Grid de blocos legíveis */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bloco 1: Identificação e Situação Cadastrada */}
        <section aria-labelledby="identificacao-drone" className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
          <h2 id="identificacao-drone" className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
            Identificação do Equipamento
          </h2>
          <dl className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Fabricante
                </dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {drone.manufacturer}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Modelo
                </dt>
                <dd className="mt-1 font-medium text-gray-900">
                  {drone.model}
                </dd>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Número de Série
                </dt>
                <dd className="mt-1 font-mono text-xs text-gray-800">
                  {drone.serialNumber || "Não informado"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Situação Cadastrada
                </dt>
                <dd className="mt-1">
                  <DroneStatusBadge status={drone.status} label={statusLabel} />
                </dd>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Cadastrado em
                </dt>
                <dd className="mt-1 tabular-nums text-gray-700">
                  {new Date(drone.createdAt).toLocaleDateString("pt-BR")}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Atualizado em
                </dt>
                <dd className="mt-1 tabular-nums text-gray-700">
                  {new Date(drone.updatedAt).toLocaleDateString("pt-BR")}
                </dd>
              </div>
            </div>
          </dl>
          <p className="mt-4 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-md border border-gray-100">
            A situação do drone é um controle de inventário interno da empresa. Não indica autorização oficial de voo nem certificação aeronáutica.
          </p>
        </section>

        {/* Bloco 2: Características Técnicas */}
        <section aria-labelledby="especificacoes-drone" className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
          <h2 id="especificacoes-drone" className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
            Características Técnicas
          </h2>
          {Object.keys(drone.specs).length === 0 ? (
            <p className="text-sm text-gray-500 py-4">
              Nenhuma característica técnica informada para este equipamento.
            </p>
          ) : (
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              {Object.entries(drone.specs).map(([chave, valor]) => (
                <div key={chave} className="rounded-md border border-gray-100 bg-gray-50 p-3">
                  <dt className="text-xs font-medium text-gray-500">{chave}</dt>
                  <dd className="mt-0.5 font-medium text-gray-900">{valor}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      </div>

      {/* Bloco 3: Histórico de Manutenção */}
      <section aria-labelledby="manutencao" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="manutencao" className="text-lg font-semibold text-gray-900">
              Histórico de Manutenção
            </h2>
            <p className="text-xs text-gray-500">
              Registro contábil e operacional de revisões, trocas de peças e reparos.
            </p>
          </div>
          {maintenance.length > 0 && totalCost > 0 && (
            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              Custo total: R${" "}
              {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {maintenance.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Nenhuma manutenção registrada para este equipamento até o momento.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Manutenções registradas deste drone
              </caption>
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Data
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Descrição do Serviço
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Custo (R$)
                  </th>
                </tr>
              </thead>
              <tbody>
                {maintenance.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums font-medium text-gray-700">
                      {new Date(m.performedAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{m.description}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums font-semibold text-gray-800">
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

        {/* Formulário de inclusão rápida de manutenção */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
            Registrar Nova Manutenção
          </h3>
          <MaintenanceForm droneId={drone.id} />
        </div>
      </section>

      {/* Bloco 4: Missões com este Equipamento */}
      <section aria-labelledby="missoes" className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 id="missoes" className="text-lg font-semibold text-gray-900">
            Missões com este Equipamento
          </h2>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            Em desenvolvimento
          </span>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-700">
            O módulo de missões ainda não está disponível nesta versão.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Quando liberado, os voos e operações associados a este drone aparecerão aqui com telemetria e registros.
          </p>
        </div>
      </section>
    </div>
  );
}

function DroneStatusBadge({
  status,
  label,
}: {
  status: string;
  label: string;
}) {
  const isAvailable = status === "available";
  const isMaintenance = status === "maintenance";
  const isInUse = status === "in_use";

  const style = isAvailable
    ? "bg-success-bg text-success-700"
    : isMaintenance
      ? "bg-warning-bg text-warning-700"
      : isInUse
        ? "bg-brand-50 text-brand-700"
        : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
