"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import {
  createOperatorAction,
  updateOperatorAction,
  type OperatorFormState,
} from "@/modules/operators/actions";
import type { OperatorRecord } from "@/modules/operators/service";

/**
 * Formulário de operador (criar/editar).
 * Observações = qualificações DECLARADAS pelo usuário — nunca certificação
 * oficial (doc 02 Skill 01, nota de domínio).
 */
export function OperatorForm({ existing }: { existing?: OperatorRecord }) {
  const action = existing ? updateOperatorAction : createOperatorAction;
  const [state, formAction, pending] = useActionState<
    OperatorFormState,
    FormData
  >(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      {existing && <input type="hidden" name="id" value={existing.id} />}

      {state?.error && (
        <div
          role="alert"
          className="rounded-md border border-danger/30 bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          {state.error}
        </div>
      )}

      <TextField
        id="operator-name"
        label="Nome completo"
        name="fullName"
        required
        maxLength={120}
        defaultValue={existing?.fullName ?? ""}
        placeholder="Ex.: João da Silva"
        autoComplete="name"
      />

      <TextArea
        id="operator-notes"
        label="Qualificações declaradas e observações"
        name="notes"
        maxLength={4000}
        defaultValue={existing?.notes ?? ""}
        placeholder="Ex.: experiência declarada em mapeamento; rádio amador (dados informados pelo usuário)"
        hint="Texto livre declarado pela organização. O AeroGrid não valida nem certifica qualificações."
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="lg" loading={pending}>
          {existing ? "Salvar alterações" : "Cadastrar operador"}
        </Button>
        <Link
          href={existing ? `/operadores/${existing.id}` : "/operadores"}
          className="inline-flex h-11 items-center rounded-md border border-gray-300 px-5 text-base font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
