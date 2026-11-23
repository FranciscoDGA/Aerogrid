import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">
        Página não encontrada
      </h1>
      <p className="max-w-md text-sm text-gray-500">
        O endereço não existe ou você não tem acesso a ele. Se você copiou um
        link de outra organização, ele não estará disponível aqui.
      </p>
      <Link
        href="/painel"
        className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Ir para o painel
      </Link>
    </main>
  );
}
