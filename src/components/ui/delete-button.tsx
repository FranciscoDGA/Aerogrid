"use client";

import { useActionState, useEffect, useRef, useState } from "react";

type FormState = { error?: string } | undefined;

/**
 * Exclusão lógica com confirmação em dois passos — nenhum botão destrutivo
 * executa sem confirmação (doc 05 §5).
 * Server Action via useActionState: erro fica visível, sem catch silencioso.
 */
export function DeleteButton({
  action,
  id,
  confirmMessage,
  label = "Excluir",
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  id: string;
  confirmMessage: string;
  label?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    action,
    undefined,
  );
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirming) confirmRef.current?.focus();
  }, [confirming]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
      >
        {label}
      </button>

      {confirming && (
        <>
          {/* Fundo clicável fecha o painel */}
          <button
            type="button"
            aria-label="Cancelar exclusão"
            onClick={() => setConfirming(false)}
            className="fixed inset-0 z-20 cursor-default bg-gray-900/20"
          />
          <div
            role="alertdialog"
            aria-label="Confirmar exclusão"
            onKeyDown={(e) => {
              if (e.key === "Escape") setConfirming(false);
            }}
            className="absolute right-0 z-30 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          >
            <p className="text-sm font-semibold text-gray-900">
              Confirmar exclusão
            </p>
            <p className="mt-1 text-sm text-gray-500">{confirmMessage}</p>

            <form action={formAction} className="mt-3 space-y-3">
              <input type="hidden" name="id" value={id} />
              {state?.error && (
                <p role="alert" className="text-sm font-medium text-danger">
                  {state.error}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  ref={confirmRef}
                  type="submit"
                  disabled={pending}
                  aria-busy={pending || undefined}
                  className="h-9 flex-1 rounded-md bg-danger px-3 text-sm font-medium text-white transition-[filter] duration-150 hover:brightness-90 disabled:opacity-60"
                >
                  {pending ? "Excluindo…" : "Sim, excluir"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="h-9 rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
