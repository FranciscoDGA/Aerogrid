import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/ui/delete-button";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/link-button";
import { deleteClientAction } from "@/modules/clients/actions";
import { getClient } from "@/modules/clients/service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Detalhes do cliente" };

type Props = { params: Promise<{ id: string }> };

export default async function ClienteDetalhePage({ params }: Props) {
  const { id } = await params;

  let client;
  try {
    client = await getClient(id);
  } catch {
    return (
      <div
        role="alert"
        className="rounded-lg border border-danger/30 bg-danger-bg p-6 text-center"
      >
        <p className="text-sm text-danger">
          Não foi possível carregar o cliente. Tente novamente.
        </p>
        <Link
          href="/clientes"
          className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }

  if (!client) notFound();

  return (
    <div className="space-y-8">
      {/* Navegação de retorno / Breadcrumb */}
      <div>
        <nav aria-label="Navegação estrutural" className="mb-2">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500">
            <li>
              <Link href="/clientes" className="hover:text-gray-900 hover:underline">
                Clientes
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-800">{client.name}</li>
          </ol>
        </nav>
        <PageHeader
          title={client.name}
          description="Dados cadastrais e canais de contato da organização."
          action={
            <div className="flex gap-2">
              <LinkButton
                href={`/clientes/${client.id}/editar`}
                variant="secondary"
                size="lg"
              >
                Editar
              </LinkButton>
              <DeleteButton
                action={deleteClientAction}
                id={client.id}
                confirmMessage={`Excluir "${client.name}"? O registro será ocultado da listagem (exclusão lógica).`}
              />
            </div>
          }
        />
      </div>

      {/* Grid de blocos organizados */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bloco 1: Canais de Contato */}
        <section aria-labelledby="contatos-titulo" className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
          <h2 id="contatos-titulo" className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
            Canais de Contato
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Pessoa de Contato
              </dt>
              <dd className="mt-1 font-medium text-gray-900">
                {client.contactName || "Não informado"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                E-mail
              </dt>
              <dd className="mt-1">
                {client.contactEmail ? (
                  <a
                    href={`mailto:${client.contactEmail}`}
                    className="font-medium text-brand-600 hover:underline focus-visible:outline-brand-500"
                  >
                    {client.contactEmail}
                  </a>
                ) : (
                  <span className="text-gray-500">Não informado</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Telefone
              </dt>
              <dd className="mt-1">
                {client.contactPhone ? (
                  <a
                    href={`tel:${client.contactPhone.replace(/\D/g, "")}`}
                    className="font-medium text-brand-600 hover:underline focus-visible:outline-brand-500"
                  >
                    {client.contactPhone}
                  </a>
                ) : (
                  <span className="text-gray-500">Não informado</span>
                )}
              </dd>
            </div>
          </dl>
        </section>

        {/* Bloco 2: Informações de Registro e Observações */}
        <section aria-labelledby="registro-titulo" className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
          <h2 id="registro-titulo" className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
            Informações do Registro
          </h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Observações
              </dt>
              <dd className="mt-1 text-gray-700 whitespace-pre-line">
                {client.notes || "Nenhuma observação informada."}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Cadastrado em
                </dt>
                <dd className="mt-1 tabular-nums text-gray-700">
                  {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Atualizado em
                </dt>
                <dd className="mt-1 tabular-nums text-gray-700">
                  {new Date(client.updatedAt).toLocaleDateString("pt-BR")}
                </dd>
              </div>
            </div>
          </dl>
        </section>
      </div>

      {/* Bloco 3: Histórico de Missões */}
      <section aria-labelledby="historico-titulo" className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 id="historico-titulo" className="text-lg font-semibold text-gray-900">
            Histórico de Missões
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
            Quando liberado, as missões e levantamentos contratados por este cliente aparecerão aqui.
          </p>
        </div>
      </section>
    </div>
  );
}
