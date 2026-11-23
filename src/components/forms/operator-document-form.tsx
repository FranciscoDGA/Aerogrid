"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import {
  addDocumentAction,
  type OperatorFormState,
} from "@/modules/operators/actions";

/**
 * Cadastro de documento do operador (armazenamento de dados e validades).
 * NÃO gera alertas automáticos de vencimento — funcionalidade condicionada
 * (docs/08-matriz-funcionalidades.md).
 */
export function OperatorDocumentForm({ operatorId }: { operatorId: string }) {
  const [state, formAction, pending] = useActionState<
    OperatorFormState,
    FormData
  >(addDocumentAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="operatorId" value={operatorId} />

      {state?.error && (
        <div
          role="alert"
          className="rounded-md border border-danger/30 bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          {state.error}
        </div>
      )}
      {state?.success && (
        <p
          role="status"
          className="rounded-md border border-success/30 bg-success-bg px-3 py-2 text-sm font-medium text-success"
        >
          {state.success}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="opdoc-type"
          label="Tipo do documento"
          name="docType"
          required
          maxLength={80}
          placeholder="Ex.: registro profissional (informado pela empresa)"
        />
        <TextField
          id="opdoc-number"
          label="Número"
          name="documentNumber"
          maxLength={80}
          placeholder="Opcional"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="opdoc-issued"
          label="Emissão"
          name="issuedAt"
          type="date"
        />
        <TextField
          id="opdoc-expires"
          label="Validade"
          name="expiresAt"
          type="date"
          hint="Opcional. O sistema não emite alertas de vencimento nesta versão."
        />
      </div>

      <Button type="submit" loading={pending}>
        Adicionar documento
      </Button>
    </form>
  );
}
