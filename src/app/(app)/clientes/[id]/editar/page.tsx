import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientForm } from "@/components/forms/client-form";
import { PageHeader } from "@/components/ui/page-header";
import { getClient } from "@/modules/clients/service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Editar cliente" };

type Props = { params: Promise<{ id: string }> };

export default async function EditarClientePage({ params }: Props) {
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
    <div>
      <PageHeader
        title="Editar cliente"
        description={`Alterando os dados de ${client.name}.`}
      />
      <ClientForm existing={client} />
    </div>
  );
}
