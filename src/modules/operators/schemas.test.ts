import { describe, expect, it } from "vitest";
import {
  createOperatorDocumentSchema,
  createOperatorSchema,
} from "./schemas";

describe("createOperatorSchema", () => {
  it("aceita entrada válida", () => {
    const result = createOperatorSchema.safeParse({
      fullName: "João da Silva",
      notes: "Experiência declarada em mapeamento.",
    });
    expect(result.success).toBe(true);
  });

  it("aceita sem observações", () => {
    const result = createOperatorSchema.safeParse({ fullName: "João Silva" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.notes).toBeNull();
  });

  it("rejeita nome com menos de 2 caracteres", () => {
    const result = createOperatorSchema.safeParse({ fullName: "J" });
    expect(result.success).toBe(false);
  });

  it("rejeita nome acima de 120 caracteres", () => {
    const result = createOperatorSchema.safeParse({
      fullName: "J".repeat(121),
    });
    expect(result.success).toBe(false);
  });
});

describe("createOperatorDocumentSchema", () => {
  const validDoc = {
    docType: "Registro profissional",
    documentNumber: "12345",
    issuedAt: "2026-01-10",
    expiresAt: "2027-01-10",
  };

  it("aceita documento com datas válidas", () => {
    expect(createOperatorDocumentSchema.safeParse(validDoc).success).toBe(true);
  });

  it("aceita documento sem datas", () => {
    const result = createOperatorDocumentSchema.safeParse({
      docType: "Declaração",
      documentNumber: null,
      issuedAt: null,
      expiresAt: null,
    });
    expect(result.success).toBe(true);
  });

  it("rejeita validade anterior à emissão com mensagem em pt-BR", () => {
    const result = createOperatorDocumentSchema.safeParse({
      ...validDoc,
      issuedAt: "2026-05-01",
      expiresAt: "2026-04-01",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "A validade não pode ser anterior à emissão.",
      );
      expect(result.error.issues[0]?.path).toContain("expiresAt");
    }
  });

  it("rejeita data com formato inválido", () => {
    const result = createOperatorDocumentSchema.safeParse({
      ...validDoc,
      expiresAt: "10/01/2027",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita tipo de documento vazio", () => {
    const result = createOperatorDocumentSchema.safeParse({
      ...validDoc,
      docType: "",
    });
    expect(result.success).toBe(false);
  });

  it("aceita datas vazias (normaliza para null)", () => {
    const result = createOperatorDocumentSchema.safeParse({
      ...validDoc,
      issuedAt: "",
      expiresAt: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.issuedAt).toBeNull();
      expect(result.data.expiresAt).toBeNull();
    }
  });
});
