import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getCurrentOrganization,
  listMembers,
  type OrganizationMember,
} from "@/modules/organizations/service";

export const dynamic = "force-dynamic";

const ROLE_LABELS: Record<string, string> = {
  owner: "Proprietário",
  admin: "Administrador",
  member: "Membro",
};

export default async function PainelPage() {
  const org = await getCurrentOrganization();
  if (!org) redirect("/onboarding");

  let members: OrganizationMember[] = [];
  let membrosComErro = false;
  try {
    members = await listMembers(org.organizationId);
  } catch {
    membrosComErro = true;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Painel</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral da organização {org.name}.
        </p>
      </div>

      <section aria-labelledby="proximas-missoes" className="space-y-3">
        <h2
          id="proximas-missoes"
          className="text-lg font-semibold text-gray-900"
        >
          Próximas missões
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-700">
            O módulo de missões ainda não está disponível nesta versão.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Ele será liberado após a validação do escopo (Skill 01).
          </p>
        </div>
      </section>

      <section aria-labelledby="recursos" className="space-y-3">
        <h2 id="recursos" className="text-lg font-semibold text-gray-900">
          Organização
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card label="Identificador" value={org.slug} />
          <Card label="Seu papel" value={ROLE_LABELS[org.role] ?? org.role} />
          <Card
            label="Membros"
            value={
              membrosComErro ? "—" : String(members.length)
            }
          />
        </div>
      </section>

      <section aria-labelledby="membros" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="membros" className="text-lg font-semibold text-gray-900">
            Equipe
          </h2>
        </div>

        {membrosComErro ? (
          <div
            role="alert"
            className="rounded-lg border border-danger/30 bg-danger-bg p-6 text-center"
          >
            <p className="text-sm text-danger">
              Não foi possível carregar os membros.
            </p>
            <Link
              href="/"
              className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
            >
              Tentar novamente
            </Link>
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            Nenhum membro encontrado.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Membros da organização atual
              </caption>
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
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
                  <tr key={m.userId} className="border-b border-gray-100 last:border-0">
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

      <section aria-labelledby="avisos" className="space-y-3">
        <h2 id="avisos" className="text-lg font-semibold text-gray-900">
          Avisos
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-700">
          <p>
            Esta é a primeira versão do AeroGrid: autenticação e organização
            funcionando. Drones, operadores, clientes e missões entram nas
            próximas etapas.
          </p>
        </div>
      </section>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 truncate text-lg font-semibold tabular-nums text-gray-900">
        {value}
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const style =
    status === "active"
      ? "bg-success-bg text-success"
      : status === "invited"
        ? "bg-warning-bg text-warning"
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
