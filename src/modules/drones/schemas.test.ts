import { describe, expect, it } from "vitest";
import {
  createDroneSchema,
  createMaintenanceSchema,
  parseSpecsText,
} from "./schemas";

const valid = {
  manufacturer: "DJI",
  model: "Matrice 350 RTK",
  serialNumber: "1581F6CKD23001ABCD",
  status: "available" as const,
  specs: { Autonomia: "55 min", "Câmera": "RGB 20 MP" },
};

describe("createDroneSchema", () => {
  it("aceita entrada completa válida", () => {
    const result = createDroneSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("aceita sem número de série", () => {
    const result = createDroneSchema.safeParse({
      ...valid,
      serialNumber: null,
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.serialNumber).toBeNull();
  });

  it("normaliza número de série vazio em null", () => {
    const result = createDroneSchema.safeParse({
      ...valid,
      serialNumber: "",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.serialNumber).toBeNull();
  });

  it("rejeita situação fora do enum", () => {
    const result = createDroneSchema.safeParse({
      ...valid,
      status: "autorizado",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita fabricante vazio", () => {
    const result = createDroneSchema.safeParse({ ...valid, manufacturer: "" });
    expect(result.success).toBe(false);
  });

  it("rejeita mais de 20 características técnicas", () => {
    const specs: Record<string, string> = {};
    for (let i = 0; i < 21; i++) specs[`campo${i}`] = "valor";
    const result = createDroneSchema.safeParse({ ...valid, specs });
    expect(result.success).toBe(false);
  });

  it("aplica specs vazias por padrão", () => {
    const result = createDroneSchema.safeParse({
      manufacturer: "DJI",
      model: "Mini 4 Pro",
      status: "available",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.specs).toEqual({});
  });
});

describe("createMaintenanceSchema", () => {
  const validMaint = {
    performedAt: "2026-11-01",
    description: "Troca de hélices e revisão dos sensores",
    cost: 250.5,
  };

  it("aceita registro válido", () => {
    expect(createMaintenanceSchema.safeParse(validMaint).success).toBe(true);
  });

  it("aceita custo vazio como null (não vira 0)", () => {
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      cost: "",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.cost).toBeNull();
  });

  it("converte custo string numérica vinda do formulário (FormData)", () => {
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      cost: "10.5",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.cost).toBe(10.5);
  });

  it("aceita custo string com vírgula decimal (padrão pt-BR)", () => {
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      cost: "10,5",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.cost).toBe(10.5);
  });

  it("rejeita custo não numérico com mensagem em português", () => {
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      cost: "abc",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Custo inválido — informe um número.",
      );
    }
  });

  it("rejeita custo negativo", () => {
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      cost: -1,
    });
    expect(result.success).toBe(false);
  });

  it("rejeita data futura", () => {
    const future = new Date(Date.now() + 7 * 86400000)
      .toISOString()
      .slice(0, 10);
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      performedAt: future,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("futuro");
    }
  });

  it("rejeita data com formato inválido", () => {
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      performedAt: "01/11/2026",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita descrição muito curta", () => {
    const result = createMaintenanceSchema.safeParse({
      ...validMaint,
      description: "x",
    });
    expect(result.success).toBe(false);
  });
});

describe("parseSpecsText", () => {
  it("converte linhas chave: valor", () => {
    expect(parseSpecsText("Autonomia: 55 min\nPeso: 6,3 kg")).toEqual({
      Autonomia: "55 min",
      Peso: "6,3 kg",
    });
  });

  it("ignora linhas sem separador e linhas vazias", () => {
    expect(parseSpecsText("linha sem separador\n\n")).toEqual({});
  });

  it("ignora linha iniciando com dois-pontos", () => {
    expect(parseSpecsText(":valor sem chave")).toEqual({});
  });

  it("trunca chaves e valores longos", () => {
    const result = parseSpecsText(`${"k".repeat(80)}: ${"v".repeat(400)}`);
    const key = Object.keys(result)[0] as string;
    expect(key.length).toBeLessThanOrEqual(60);
    expect(Object.values(result)[0]?.length).toBeLessThanOrEqual(300);
  });

  it("preserva dois-pontos dentro do valor", () => {
    expect(parseSpecsText("Observação: ver: manual")).toEqual({
      "Observação": "ver: manual",
    });
  });
});
