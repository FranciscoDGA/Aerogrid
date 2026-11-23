import Link from "next/link";
import { redirect } from "next/navigation";
import { LinkButton } from "@/components/ui/link-button";
import {
  getCurrentOrganization,
  listMembers,
  type OrganizationMember,
} from "@/modules/organizations/service";
import { listClients, type ClientRecord } from "@/modules/clients/service";
import {
  listDrones,
  listRecentMaintenance,
  type DroneRecord,
  type RecentMaintenanceRecord,
} from "@/modules/drones/service";
import { listOperators, type OperatorRecord } from "@/modules/operators/service";
import { DRONE_STATUS_LABELS } from "@/modules/drones/schemas";

export const dynamic = "force-dynamic";

const ROLE_LABELS: Record<string, string> = {
  owner: "Proprietário",
  admin: "Administrador",
  member: "Membro",
};

export default async function PainelPage() {
  const org = await getCurrentOrganization();
  if (!org) redirect("/onboarding");

  // Consultas resilientes com isolamento por organização
  const [membersRes, clientsRes, dronesRes, operatorsRes, maintenanceRes] =
    await Promise.allSettled([
      listMembers(org.organizationId),
      listClients(),
      listDrones(),
      listOperators(),
      listRecentMaintenance(5),
    ]);

  const members: OrganizationMember[] =
    membersRes.status === "fulfilled" ? membersRes.value : [];
  const clients: ClientRecord[] =
    clientsRes.status === "fulfilled" ? clientsRes.value : [];
  const drones: DroneRecord[] =
    dronesRes.status === "fulfilled" ? dronesRes.value : [];
  const operators: OperatorRecord[] =
    operatorsRes.status === "fulfilled" ? operatorsRes.value : [];
  const recentMaintenance: RecentMaintenanceRecord[] =
    maintenanceRes.status === "fulfilled" ? maintenanceRes.value : [];

  const availableDrones = drones.filter((d) => d.status === "available").length;
  const maintenanceDrones = drones.filter((d) => d.status === "maintenance").length;
  const inUseDrones = drones.filter((d) => d.status === "in_use").length;

  return (
    <div className="space-y-8">
      {/* 1. Cabeçalho com identificação da organização */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Painel Operacional
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Organização <strong className="font-semibold text-gray-900">{org.name}</strong>{" "}
            <span className="text-gray-400">({org.slug})</span> • Perfil:{" "}
            <span className="font-medium text-gray-900">
              {ROLE_LABELS[org.role] ?? org.role}
            </span>
          </p>
        </div>

        {/* Atalhos rápidos para formulários existentes */}
        <div className="flex flex-wrap items-center gap-2">
          <LinkButton href="/drones/novo" size="sm" variant="primary">
            + Novo drone
          </LinkButton>
          <LinkButton href="/clientes/novo" size="sm" variant="secondary">
            + Novo cliente
          </LinkButton>
          <LinkButton href="/operadores/novo" size="sm" variant="secondary">
            + Novo operador
          </LinkButton>
        </div>
      </div>

      {/* 2. Indicadores Operacionais Reais */}
      <section aria-labelledby="indicadores-operacionais">
        <h2 id="indicadores-operacionais" className="sr-only">
          Indicadores operacionais
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card Clientes */}
          <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Clientes
                </span>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                  Ativos
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums text-gray-900">
                {clientsRes.status === "fulfilled" ? clients.length : "—"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Contratos e cadastros gerenciados
              </p>
            </div>
            <Link
              href="/clientes"
              className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline"
            >
              Ver todos os clientes →
            </Link>
          </div>

          {/* Card Frota de Drones */}
          <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Frota de Drones
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  Equipamentos
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums text-gray-900">
                {dronesRes.status === "fulfilled" ? drones.length : "—"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1 text-success-700">
                  <span className="size-1.5 rounded-full bg-success-700" />
                  {availableDrones} disp.
                </span>
                {maintenanceDrones > 0 && (
                  <span className="inline-flex items-center gap-1 text-warning-700">
                    <span className="size-1.5 rounded-full bg-warning-700" />
                    {maintenanceDrones} em manut.
                  </span>
                )}
                {inUseDrones > 0 && (
                  <span className="inline-flex items-center gap-1 text-brand-700">
                    <span className="size-1.5 rounded-full bg-brand-700" />
                    {inUseDrones} em uso
                  </span>
                )}
              </div>
            </div>
            <Link
              href="/drones"
              className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline"
            >
              Gerenciar frota →
            </Link>
          </div>

          {/* Card Operadores */}
          <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Operadores
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  Equipe
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums text-gray-900">
                {operatorsRes.status === "fulfilled" ? operators.length : "—"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Pilotos e técnicos cadastrados
              </p>
            </div>
            <Link
              href="/operadores"
              className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline"
            >
              Ver operadores →
            </Link>
          </div>

          {/* Card Manutenção */}
          <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Manutenção
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  Histórico
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums text-gray-900">
                {recentMaintenance.length}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Registros recentes de revisão
              </p>
            </div>
            <Link
              href="/drones"
              className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-800 hover:underline"
            >
              Ver histórico por drone →
            </Link>
          </div>
        </div>

        {/* Nota regulatória sobre os indicadores */}
        <p className="mt-2 text-xs text-gray-500">
          Nota: a situação e o status dos drones são registros administrativos internos da sua empresa — não representam autorização de voo nem parecer técnico oficial.
        </p>
      </section>

      {/* 3. Destaque da Frota e Manutenção */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Coluna 1: Frota de Drones */}
        <section aria-labelledby="frota-resumo" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="frota-resumo" className="text-lg font-semibold text-gray-900">
              Frota de Equipamentos
            </h2>
            <Link
              href="/drones"
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              Ver todos
            </Link>
          </div>

          {drones.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-sm font-medium text-gray-900">
                Nenhum equipamento cadastrado
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Cadastre seus drones para acompanhar o status operacional e registrar manutenções.
              </p>
              <LinkButton href="/drones/novo" size="sm" className="mt-4">
                Cadastrar primeiro drone
              </LinkButton>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <ul className="divide-y divide-gray-100">
                {drones.slice(0, 5).map((drone) => (
                  <li
                    key={drone.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {drone.manufacturer} {drone.model}
                      </p>
                      <p className="text-xs font-mono text-gray-500">
                        {drone.serialNumber ? `S/N: ${drone.serialNumber}` : "Sem nº de série"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <DroneStatusBadge status={drone.status} />
                      <Link
                        href={`/drones/${drone.id}`}
                        className="text-xs font-semibold text-brand-600 hover:underline"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              {drones.length > 5 && (
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5 text-center text-xs text-gray-500">
                  Exibindo 5 de {drones.length} equipamentos da frota.
                </div>
              )}
            </div>
          )}
        </section>

        {/* Coluna 2: Histórico Recente de Manutenções */}
        <section aria-labelledby="manutencoes-resumo" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="manutencoes-resumo" className="text-lg font-semibold text-gray-900">
              Últimas Manutenções
            </h2>
            <Link
              href="/drones"
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              Ir para drones
            </Link>
          </div>

          {recentMaintenance.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-sm font-medium text-gray-900">
                Nenhuma manutenção registrada
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Os registros de manutenção adicionados em cada drone aparecerão aqui cronologicamente.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <ul className="divide-y divide-gray-100">
                {recentMaintenance.map((m) => (
                  <li key={m.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-gray-500 tabular-nums">
                        {new Date(m.performedAt).toLocaleDateString("pt-BR")}
                      </span>
                      {m.cost && (
                        <span className="text-xs font-semibold text-gray-700 tabular-nums">
                          R${" "}
                          {Number(m.cost).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {m.description}
                    </p>
                    {m.droneManufacturer && (
                      <p className="mt-0.5 text-xs text-gray-500">
                        Equipamento: {m.droneManufacturer} {m.droneModel}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {/* 4. Missões e Planejamento Geográfico (Honestidade de Roadmap) */}
      <section aria-labelledby="proximas-missoes" className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 id="proximas-missoes" className="text-lg font-semibold text-gray-900">
            Planejamento de Missões e Mapas
          </h2>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            Fase 2 — Em desenvolvimento
          </span>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-700">
            O módulo de planejamento de missões e mapas geográficos está no roadmap do produto.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Seus cadastros de clientes, drones e operadores já estão organizados e prontos para vinculação futura assim que o módulo for homologado.
          </p>
        </div>
      </section>

      {/* 5. Equipe e Membros da Organização */}
      <section aria-labelledby="membros" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="membros" className="text-lg font-semibold text-gray-900">
            Membros da Organização
          </h2>
          <span className="text-xs text-gray-500">
            {members.length} {members.length === 1 ? "membro cadastrado" : "membros cadastrados"}
          </span>
        </div>

        {membersRes.status === "rejected" ? (
          <div
            role="alert"
            className="rounded-lg border border-danger/30 bg-danger-bg p-6 text-center"
          >
            <p className="text-sm text-danger">
              Não foi possível carregar os membros da organização.
            </p>
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            Nenhum membro encontrado.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Membros da organização atual</caption>
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Membro
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Papel
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Situação
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.userId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">
                        {m.fullName || m.email}
                      </span>
                      {m.fullName && (
                        <span className="block text-xs text-gray-500">
                          {m.email}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {ROLE_LABELS[m.role] ?? m.role}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={m.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function DroneStatusBadge({ status }: { status: string }) {
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

  const label =
    status in DRONE_STATUS_LABELS
      ? DRONE_STATUS_LABELS[status as keyof typeof DRONE_STATUS_LABELS]
      : status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const style =
    status === "active"
      ? "bg-success-bg text-success-700"
      : status === "invited"
        ? "bg-warning-bg text-warning-700"
        : "bg-gray-100 text-gray-500";
  const label =
    status === "active"
      ? "Ativo"
      : status === "invited"
        ? "Convidado"
        : "Desativado";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
