import { describe, expect, it } from "vitest";
import { createClientSchema } from "./schemas";

const valid = {
  name: "Construtora Pará Norte Ltda",
  contactName: "Maria Souza",
  contactEmail: "maria@paranorte.com.br",
  contactPhone: "(91) 99999-0001",
  notes: "Cliente desde 2026.",
};

describe("createClientSchema", () => {
  it("aceita entrada completa válida", () => {
    const result = createClientSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("aceita apenas um canal de contato (somente telefone)", () => {
    const result = createClientSchema.safeParse({
      name: "Cliente Sem Contato",
      contactPhone: "(91) 98888-7777",
    });
    expect(result.success).toBe(true);
  });

  it("rejeita cadastro sem nenhum contato", () => {
    const result = createClientSchema.safeParse({
      name: "Cliente Sem Contato",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("ao menos um contato");
    }
  });

  it("rejeita nome com menos de 2 caracteres", () => {
    const result = createClientSchema.safeParse({ ...valid, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejeita e-mail inválido com mensagem em pt-BR", () => {
    const result = createClientSchema.safeParse({
      ...valid,
      contactEmail: "nao-e-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Informe um e-mail válido.",
      );
    }
  });

  it("normaliza campo vazio em null", () => {
    const result = createClientSchema.safeParse({
      ...valid,
      contactEmail: "",
      contactName: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contactEmail).toBeNull();
      expect(result.data.contactName).toBeNull();
    }
  });

  it("rejeita observações acima de 4000 caracteres", () => {
    const result = createClientSchema.safeParse({
      ...valid,
      notes: "x".repeat(4001),
    });
    expect(result.success).toBe(false);
  });
});
