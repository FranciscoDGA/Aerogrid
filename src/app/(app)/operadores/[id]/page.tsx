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
      {/* Navegação de retorno / Breadcrumb */}
      <div>
        <nav aria-label="Navegação estrutural" className="mb-2">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500">
            <li>
              <Link href="/operadores" className="hover:text-gray-900 hover:underline">
                Operadores
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-800">{operator.fullName}</li>
          </ol>
        </nav>
        <PageHeader
          title={operator.fullName}
          description="Dados do operador. As qualificações são declarações da organização — o AeroGrid não valida certificações."
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
      </div>

      {/* Grid de blocos legíveis */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bloco 1: Identificação e Dados */}
        <section aria-labelledby="dados-operador" className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
          <h2 id="dados-operador" className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
            Identificação do Operador
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Nome Completo
              </dt>
              <dd className="mt-1 font-medium text-gray-900">
                {operator.fullName}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Qualificações Declaradas / Observações
              </dt>
              <dd className="mt-1 text-gray-700 whitespace-pre-line">
                {operator.notes || "Nenhuma qualificação informada."}
              </dd>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Cadastrado em
                </dt>
                <dd className="mt-1 tabular-nums text-gray-700">
                  {new Date(operator.createdAt).toLocaleDateString("pt-BR")}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Atualizado em
                </dt>
                <dd className="mt-1 tabular-nums text-gray-700">
                  {new Date(operator.updatedAt).toLocaleDateString("pt-BR")}
                </dd>
              </div>
            </div>
          </dl>

          <p className="mt-4 text-xs text-gray-500 bg-gray-50 p-2.5 rounded-md border border-gray-100">
            Qualificações e cursos são registros informados internamente pela empresa. O AeroGrid não valida carteiras, habilitações ou certificados emitidos por órgãos oficiais.
          </p>
        </section>

        {/* Bloco 2: Resumo de Documentação */}
        <section aria-labelledby="resumo-documentacao" className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 id="resumo-documentacao" className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Situação da Documentação
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total de documentos arquivados:</span>
                <span className="font-semibold text-gray-900 tabular-nums">
                  {documents.length}
                </span>
              </div>
              <div className="rounded-md border border-brand-100 bg-brand-50/50 p-3 text-xs text-brand-900">
                <p className="font-semibold">Controle administrativo interno</p>
                <p className="mt-1 text-brand-700">
                  Mantenha as datas de emissão e validade atualizadas para auditorias internas da sua empresa. O sistema não envia avisos de vencimento por e-mail nesta versão.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Documentos são acessíveis apenas aos membros ativos da sua organização.
          </p>
        </section>
      </div>

      {/* Bloco 3: Documentos e Validades */}
      <section aria-labelledby="documentos" className="space-y-4">
        <div>
          <h2 id="documentos" className="text-lg font-semibold text-gray-900">
            Documentos e Validades
          </h2>
          <p className="text-xs text-gray-500">
            Arquivamento de registros, números de identificação e prazos de validade declarados.
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
            Nenhum documento cadastrado para este operador até o momento.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Documentos cadastrados deste operador
              </caption>
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Tipo do Documento
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Número / Identificador
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Data de Emissão
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Data de Validade
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
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
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-gray-700 font-medium">
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

        {/* Formulário para adicionar documento */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
            Adicionar Documento
          </h3>
          <OperatorDocumentForm operatorId={operator.id} />
        </div>
      </section>

      {/* Bloco 4: Histórico de Missões */}
      <section aria-labelledby="missoes" className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 id="missoes" className="text-lg font-semibold text-gray-900">
            Histórico de Missões do Operador
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
            Quando liberado, as operações executadas por este piloto ficarão registradas neste histórico.
          </p>
        </div>
      </section>
    </div>
  );
}
