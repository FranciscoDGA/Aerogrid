"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import {
  createDroneAction,
  updateDroneAction,
  type DroneFormState,
} from "@/modules/drones/actions";
import {
  DRONE_STATUS_LABELS,
  droneStatusSchema,
} from "@/modules/drones/schemas";
import type { DroneRecord } from "@/modules/drones/service";

const STATUS_OPTIONS = droneStatusSchema.options.map((value) => ({
  value,
  label: DRONE_STATUS_LABELS[value],
}));

function specsToText(specs: Record<string, string>): string {
  return Object.entries(specs)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

/**
 * Formulário de drone (criar/editar).
 * Características técnicas: textarea "chave: valor" por linha (parse no servidor).
 */
export function DroneForm({ existing }: { existing?: DroneRecord }) {
  const action = existing ? updateDroneAction : createDroneAction;
  const [state, formAction, pending] = useActionState<DroneFormState, FormData>(
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

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="drone-manufacturer"
          label="Fabricante"
          name="manufacturer"
          required
          maxLength={80}
          defaultValue={existing?.manufacturer ?? ""}
          placeholder="Ex.: DJI"
        />
        <TextField
          id="drone-model"
          label="Modelo"
          name="model"
          required
          maxLength={120}
          defaultValue={existing?.model ?? ""}
          placeholder="Ex.: Matrice 350 RTK"
        />
      </div>

      <TextField
        id="drone-serial"
        label="Número de série"
        name="serialNumber"
        maxLength={80}
        defaultValue={existing?.serialNumber ?? ""}
        placeholder="Ex.: 1581F6CKD23001ABCD"
        hint="Opcional. Deve ser único dentro da organização."
      />

      <Select
        id="drone-status"
        label="Situação"
        name="status"
        required
        options={STATUS_OPTIONS}
        defaultValue={existing?.status ?? "available"}
        hint="Situação operacional interna — não indica autorização de voo."
      />

      <TextArea
        id="drone-specs"
        label="Características técnicas"
        name="specsText"
        defaultValue={existing ? specsToText(existing.specs) : ""}
        placeholder={"Autonomia: 55 min\nCâmera: RGB 20 MP\nPeso: 6,3 kg"}
        hint="Uma por linha, no formato chave: valor (opcional)."
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="lg" loading={pending}>
          {existing ? "Salvar alterações" : "Cadastrar drone"}
        </Button>
        <Link
          href={existing ? `/drones/${existing.id}` : "/drones"}
          className="inline-flex h-11 items-center rounded-md border border-gray-300 px-5 text-base font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
