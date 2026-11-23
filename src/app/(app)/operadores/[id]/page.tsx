import Link from "next/link";
import { notFound } from "next/navigation";
import { OperatorDocumentForm } from "@/components/forms/operator-document-form";
import { DeleteButton } from "@/components/ui/delete-button";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/link-button";
import { deleteOperatorAction } from "@/modules/operators/actions";
import {
  getOperator,
  listOperatorDocuments,
} from "@/modules/operators/service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Detalhes do operador" };

type Props = { params: Promise<{ id: string }> };

export default async function OperadorDetalhePage({ params }: Props) {
  const { id } = await params;

  let operator;
  let documents: Awaited<ReturnType<typeof listOperatorDocuments>> = [];
  let loadError = false;
  try {
    operator = await getOperator(id);
    if (operator) documents = await listOperatorDocuments(operator.id);
  } catch {
    loadError = true;
    operator = null;
  }

  if (loadError) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-danger/30 bg-danger-bg p-6 text-center"
      >
        <p className="text-sm text-danger">
          Não foi possível carregar o operador. Tente novamente.
        </p>
        <Link
          href="/operadores"
          className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }

  if (!operator) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        title={operator.fullName}
        description="Dados do operador. Qualificações são declarações da organização — o AeroGrid não valida certificações."
        action={
          <div className="flex gap-2">
            <LinkButton
              href={`/operadores/${operator.id}/editar`}
              variant="secondary"
              size="lg"
            >
              Editar
            </LinkButton>
            <DeleteButton
              action={deleteOperatorAction}
              id={operator.id}
              confirmMessage={`Excluir "${operator.fullName}"? O registro será ocultado da listagem (exclusão lógica).`}
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
            <Field label="Nome completo" value={operator.fullName} />
            <Field
              label="Cadastrado em"
              value={new Date(operator.createdAt).toLocaleDateString("pt-BR")}
            />
            <div className="sm:col-span-2">
              <Field
                label="Qualificações declaradas / observações"
                value={operator.notes}
              />
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="documentos" className="space-y-3">
        <h2 id="documentos" className="text-lg font-semibold text-gray-900">
          Documentos e validades
        </h2>

        {documents.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            Nenhum documento cadastrado. O sistema não emite alertas de
            vencimento nesta versão.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Documentos cadastrados deste operador
              </caption>
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Tipo
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Número
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Emissão
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Validade
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {doc.docType}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">
                      {doc.documentNumber ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-gray-700">
                      {doc.issuedAt
                        ? new Date(doc.issuedAt).toLocaleDateString("pt-BR")
                        : "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-gray-700">
                      {doc.expiresAt
                        ? new Date(doc.expiresAt).toLocaleDateString("pt-BR")
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
            Adicionar documento
          </h3>
          <OperatorDocumentForm operatorId={operator.id} />
        </div>
      </section>

      <section aria-labelledby="missoes" className="space-y-3">
        <h2 id="missoes" className="text-lg font-semibold text-gray-900">
          Histórico de missões
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
