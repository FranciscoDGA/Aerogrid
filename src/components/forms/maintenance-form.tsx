"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import {
  addMaintenanceAction,
  type DroneFormState,
} from "@/modules/drones/actions";

/** Registro de manutenção de um drone (requisito B6 — doc 02 Skill 01). */
export function MaintenanceForm({ droneId }: { droneId: string }) {
  const [state, formAction, pending] = useActionState<DroneFormState, FormData>(
    addMaintenanceAction,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="droneId" value={droneId} />

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

      <div className="grid gap-4 sm:grid-cols-3">
        <TextField
          id="maint-date"
          label="Data"
          name="performedAt"
          type="date"
          required
          max={new Date().toISOString().slice(0, 10)}
        />
        <div className="sm:col-span-2">
          <TextField
            id="maint-cost"
            label="Custo (R$)"
            name="cost"
            type="number"
            min="0"
            step="0.01"
            placeholder="Opcional"
          />
        </div>
      </div>

      <TextField
        id="maint-description"
        label="Descrição"
        name="description"
        required
        maxLength={2000}
        placeholder="Ex.: troca de hélices e revisão dos sensores"
      />

      <Button type="submit" loading={pending}>
        Registrar manutenção
      </Button>
    </form>
  );
}
