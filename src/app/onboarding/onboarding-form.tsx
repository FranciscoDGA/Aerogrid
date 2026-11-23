"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import {
  createOrganization,
  type CreateOrganizationState,
} from "@/modules/organizations/actions";

export function OnboardingForm() {
  const [state, action, pending] = useActionState<
    CreateOrganizationState,
    FormData
  >(createOrganization, undefined);

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div
          role="alert"
          className="rounded-md border border-danger/30 bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          {state.error}
        </div>
      )}

      <TextField
        id="org-nome"
        label="Nome da organização"
        name="name"
        required
        maxLength={120}
        placeholder="Ex.: Topografia Vale Norte Ltda"
        hint="Nome da sua empresa como ela aparece para a equipe."
      />
      <TextField
        id="org-slug"
        label="Identificador"
        name="slug"
        required
        pattern="[a-z0-9-]{2,60}"
        title="Somente letras minúsculas, números e hífens"
        placeholder="topografia-vale-norte"
        hint="Usado para endereços do sistema. Somente minúsculas, números e hífens."
      />

      <Button type="submit" size="lg" loading={pending} className="w-full">
        Criar organização
      </Button>
    </form>
  );
}
