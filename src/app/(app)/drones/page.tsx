import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/link-button";
import { listDrones, type DroneRecord } from "@/modules/drones/service";
import {
  DRONE_STATUS_LABELS,
  droneStatusSchema,
} from "@/modules/drones/schemas";

export const dynamic = "force-dynamic";

export const metadata = { title: "Drones" };

export default async function DronesPage() {
  let drones: DroneRecord[] = [];
  let loadError: string | null = null;
  try {
    drones = await listDrones();
  } catch {
    loadError = "Não foi possível carregar os drones. Tente novamente.";
  }

  return (
    <div>
      <PageHeader
        title="Drones"
        description="Equipamentos da sua organização. A situação é um registro interno — não indica autorização de voo."
        action={
          <LinkButton href="/drones/novo" size="lg">
            Novo drone
          </LinkButton>
        }
      />

      {loadError ? (
        <div
          role="alert"
          className="rounded-lg border border-danger/30 bg-danger-bg p-6 text-center"
        >
          <p className="text-sm text-danger">{loadError}</p>
          <Link
            href="/drones"
            className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
          >
            Tentar novamente
          </Link>
        </div>
      ) : drones.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
          <p className="font-medium text-gray-900">Nenhum drone cadastrado</p>
          <p className="mt-1 text-sm text-gray-500">
            Cadastre o primeiro equipamento com fabricante, modelo e situação.
          </p>
          <LinkButton href="/drones/novo" className="mt-4">
            Cadastrar primeiro drone
          </LinkButton>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white sm:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Lista de drones</caption>
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Equipamento
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Número de série
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Situação
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {drones.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {d.manufacturer} {d.model}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">
                      {d.serialNumber ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={d.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/drones/${d.id}`}
                        className="font-medium text-brand-600 hover:underline"
                      >
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 sm:hidden">
            {drones.map((d) => (
              <li key={d.id}>
                <Link
                  href={`/drones/${d.id}`}
                  className="block rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-gray-900">
                      {d.manufacturer} {d.model}
                    </p>
                    <StatusPill status={d.status} />
                  </div>
                  <p className="mt-1 font-mono text-xs text-gray-500">
                    {d.serialNumber ?? "sem número de série"}
                  </p>
                  <span className="mt-2 inline-block text-sm font-medium text-brand-600">
                    Ver detalhes
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/** Pill de situação — texto + cor + ícone (nunca só cor — doc 10 §5). */
function StatusPill({ status }: { status: string }) {
  const parsed = droneStatusSchema.safeParse(status);
  const value = parsed.success ? parsed.data : "available";
  const label = parsed.success ? DRONE_STATUS_LABELS[value] : status;

  const style =
    value === "available"
      ? "bg-success-bg text-success"
      : value === "in_use"
        ? "bg-brand-50 text-brand-700"
        : value === "maintenance"
          ? "bg-warning-bg text-warning"
          : "bg-gray-100 text-gray-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
