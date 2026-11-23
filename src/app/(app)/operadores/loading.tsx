/** Estado de carregamento da listagem de operadores (doc 05 §3 — skeleton). */
export default function OperadoresLoading() {
  return (
    <div aria-busy="true" aria-label="Carregando operadores">
      <div className="mb-6 h-8 w-40 animate-pulse rounded bg-gray-200" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
