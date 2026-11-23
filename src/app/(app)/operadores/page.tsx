import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/link-button";
import {
  listOperators,
  type OperatorRecord,
} from "@/modules/operators/service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Operadores" };

export default async function OperadoresPage() {
  let operators: OperatorRecord[] = [];
  let loadError: string | null = null;
  try {
    operators = await listOperators();
  } catch {
    loadError = "Não foi possível carregar os operadores. Tente novamente.";
  }

  return (
    <div>
      <PageHeader
        title="Operadores"
        description="Pessoas que atuam nas operações da organização. Qualificações são declarações — o sistema não valida certificações."
        action={
          <LinkButton href="/operadores/novo" size="lg">
            Novo operador
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
            href="/operadores"
            className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
          >
            Tentar novamente
          </Link>
        </div>
      ) : operators.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
          <p className="font-medium text-gray-900">
            Nenhum operador cadastrado
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Cadastre o primeiro operador com nome e qualificações declaradas.
          </p>
          <LinkButton href="/operadores/novo" className="mt-4">
            Cadastrar primeiro operador
          </LinkButton>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white sm:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Lista de operadores</caption>
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Operador
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Observações
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {operators.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {o.fullName}
                    </td>
                    <td className="max-w-md truncate px-4 py-3 text-gray-700">
                      {o.notes ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/operadores/${o.id}`}
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
            {operators.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/operadores/${o.id}`}
                  className="block rounded-lg border border-gray-200 bg-white p-4"
                >
                  <p className="font-medium text-gray-900">{o.fullName}</p>
                  {o.notes && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {o.notes}
                    </p>
                  )}
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
