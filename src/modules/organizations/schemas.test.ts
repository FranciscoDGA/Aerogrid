import { describe, expect, it } from "vitest";
import { createOrganizationSchema, roleSchema } from "./schemas";

describe("createOrganizationSchema", () => {
  it("aceita entrada válida", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Topografia Vale Norte Ltda",
      slug: "topografia-vale-norte",
    });
    expect(result.success).toBe(true);
  });

  it("normaliza slug para minúsculas", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Empresa X",
      slug: "Empresa-X",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.slug).toBe("empresa-x");
  });

  it("rejeita nome com menos de 2 caracteres", () => {
    const result = createOrganizationSchema.safeParse({
      name: "A",
      slug: "empresa-a",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita slug com espaços", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Empresa X",
      slug: "empresa x",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita slug com caracteres especiais", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Empresa X",
      slug: "empresa_x.1",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita slug começando ou terminando com hífen", () => {
    expect(
      createOrganizationSchema.safeParse({
        name: "Empresa X",
        slug: "-empresa",
      }).success,
    ).toBe(false);
    expect(
      createOrganizationSchema.safeParse({
        name: "Empresa X",
        slug: "empresa-",
      }).success,
    ).toBe(false);
  });

  it("rejeita slug acima de 60 caracteres", () => {
    const result = createOrganizationSchema.safeParse({
      name: "Empresa X",
      slug: "a".repeat(61),
    });
    expect(result.success).toBe(false);
  });
});

describe("roleSchema", () => {
  it("aceita papéis válidos", () => {
    expect(roleSchema.safeParse("owner").success).toBe(true);
    expect(roleSchema.safeParse("admin").success).toBe(true);
    expect(roleSchema.safeParse("member").success).toBe(true);
  });

  it("rejeita papel inválido", () => {
    expect(roleSchema.safeParse("superadmin").success).toBe(false);
    expect(roleSchema.safeParse("").success).toBe(false);
  });
});
