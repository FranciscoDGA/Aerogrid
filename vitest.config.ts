import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Testes de integração/RLS ficam em tests/integration e exigem banco local
    // (ver docs/arquitetura/09-desenvolvimento-local.md) — executar com npm run test:integration
  },
});
