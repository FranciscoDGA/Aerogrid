import Link from "next/link";
import { notFound } from "next/navigation";
import { OperatorForm } from "@/components/forms/operator-form";
import { PageHeader } from "@/components/ui/page-header";
import { getOperator } from "@/modules/operators/service";

export const dynamic = "force-dynamic";

export const metadata = { title: "Editar operador" };

type Props = { params: Promise<{ id: string }> };

export default async function EditarOperadorPage({ params }: Props) {
  const { id } = await params;

  let operator;
  try {
    operator = await getOperator(id);
  } catch {
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
    <div>
      <PageHeader
        title="Editar operador"
        description={`Alterando os dados de ${operator.fullName}.`}
      />
      <OperatorForm existing={operator} />
    </div>
  );
}
