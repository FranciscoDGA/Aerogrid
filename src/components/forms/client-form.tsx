"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import {
  createClientAction,
  updateClientAction,
  type ClientFormState,
} from "@/modules/clients/actions";
import type { ClientRecord } from "@/modules/clients/service";

/**
 * Formulário de cliente (criar/editar).
 * Validação: HTML para agilidade + Zod no servidor (ação) — nunca só no cliente.
 */
export function ClientForm({ existing }: { existing?: ClientRecord }) {
  const action = existing ? updateClientAction : createClientAction;
  const [state, formAction, pending] = useActionState<ClientFormState, FormData>(
    action,
    undefined,
  );

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
        id="client-name"
        label="Nome do cliente"
        name="name"
        required
        maxLength={160}
        defaultValue={existing?.name ?? ""}
        placeholder="Ex.: Construtora Pará Norte Ltda"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="client-contact-name"
          label="Nome do contato"
          name="contactName"
          maxLength={120}
          defaultValue={existing?.contactName ?? ""}
          placeholder="Pessoa de contato"
        />
        <TextField
          id="client-contact-phone"
          label="Telefone"
          name="contactPhone"
          type="tel"
          maxLength={30}
          defaultValue={existing?.contactPhone ?? ""}
          placeholder="(91) 99999-9999"
        />
      </div>

      <TextField
        id="client-contact-email"
        label="E-mail do contato"
        name="contactEmail"
        type="email"
        maxLength={160}
        defaultValue={existing?.contactEmail ?? ""}
        placeholder="contato@empresa.com.br"
        hint="Informe ao menos um contato: nome, e-mail ou telefone."
      />

      <TextArea
        id="client-notes"
        label="Observações"
        name="notes"
        maxLength={4000}
        defaultValue={existing?.notes ?? ""}
        placeholder="Informações internas sobre o cliente (opcional)"
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="lg" loading={pending}>
          {existing ? "Salvar alterações" : "Cadastrar cliente"}
        </Button>
        <Link
          href={existing ? `/clientes/${existing.id}` : "/clientes"}
          className="inline-flex h-11 items-center rounded-md border border-gray-300 px-5 text-base font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
