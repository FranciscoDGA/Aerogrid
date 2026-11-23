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
    // Erro de servidor/RLS: mensagem genérica, sem vazar detalhes
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
      <PageHeader
        title={client.name}
        description="Dados do cliente cadastrado na sua organização."
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

      <section aria-labelledby="dados" className="space-y-3">
        <h2 id="dados" className="text-lg font-semibold text-gray-900">
          Dados
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
            <Field label="Nome" value={client.name} />
            <Field label="Contato (nome)" value={client.contactName} />
            <Field label="E-mail" value={client.contactEmail} />
            <Field label="Telefone" value={client.contactPhone} />
            <div className="sm:col-span-2">
              <Field label="Observações" value={client.notes} />
            </div>
            <Field
              label="Cadastrado em"
              value={new Date(client.createdAt).toLocaleDateString("pt-BR")}
            />
            <Field
              label="Atualizado em"
              value={new Date(client.updatedAt).toLocaleDateString("pt-BR")}
            />
          </dl>
        </div>
      </section>

      <section aria-labelledby="historico" className="space-y-3">
        <h2 id="historico" className="text-lg font-semibold text-gray-900">
          Histórico de missões
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-700">
            O módulo de missões ainda não está disponível nesta versão.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Quando liberado, as missões deste cliente aparecerão aqui.
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
