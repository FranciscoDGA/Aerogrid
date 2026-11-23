import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/link-button";
import { Button } from "@/components/ui/button";
import { listClients, type ClientRecord } from "@/modules/clients/service";
import { clientSearchSchema } from "@/modules/clients/schemas";

export const dynamic = "force-dynamic";

export const metadata = { title: "Clientes" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function ClientesPage({ searchParams }: Props) {
  const params = await searchParams;
  const parsed = clientSearchSchema.safeParse({ q: params.q });
  const search = parsed.success ? parsed.data.q : undefined;

  let clients: ClientRecord[] = [];
  let loadError: string | null = null;
  try {
    clients = await listClients(search);
  } catch {
    loadError = "Não foi possível carregar os clientes. Tente novamente.";
  }

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Empresas e pessoas pelas quais sua organização realiza operações."
        action={
          <LinkButton href="/clientes/novo" size="lg">
            Novo cliente
          </LinkButton>
        }
      />

      <form
        method="get"
        action="/clientes"
        className="mb-4 flex max-w-md gap-2"
        role="search"
      >
        <label htmlFor="q" className="sr-only">
          Buscar cliente por nome
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={search ?? ""}
          maxLength={80}
          placeholder="Buscar por nome…"
          className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-base text-gray-900 placeholder:text-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
        />
        <Button type="submit" variant="secondary">
          Buscar
        </Button>
      </form>

      {loadError ? (
        <div
          role="alert"
          className="rounded-lg border border-danger/30 bg-danger-bg p-6 text-center"
        >
          <p className="text-sm text-danger">{loadError}</p>
          <Link
            href="/clientes"
            className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
          >
            Tentar novamente
          </Link>
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
          <p className="font-medium text-gray-900">
            {search ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado"}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {search
              ? "Revise o termo de busca ou limpe o filtro."
              : "Cadastre o primeiro cliente para associá-lo às missões."}
          </p>
          {!search && (
            <LinkButton href="/clientes/novo" className="mt-4">
              Cadastrar primeiro cliente
            </LinkButton>
          )}
        </div>
      ) : (
        <>
          {/* Desktop: tabela (doc 09 §3) */}
          <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white sm:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Lista de clientes</caption>
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th scope="col" className="px-4 py-3">
                    Cliente
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Contato
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {c.contactEmail ?? c.contactPhone ?? c.contactName ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/clientes/${c.id}`}
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

          {/* Mobile: cards empilhados (doc 09 §3 — sem <table> no DOM) */}
          <ul className="space-y-3 sm:hidden">
            {clients.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/clientes/${c.id}`}
                  className="block rounded-lg border border-gray-200 bg-white p-4"
                >
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {c.contactEmail ?? c.contactPhone ?? c.contactName ?? "—"}
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
