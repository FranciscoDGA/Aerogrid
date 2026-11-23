import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// Evita que o Next infira a raiz errada (lockfile na pasta do usuário)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  // Restrições de segurança básicas (revisar com a Skill 06 em auditoria)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
