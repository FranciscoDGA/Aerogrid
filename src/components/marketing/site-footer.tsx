import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const CONTATO_EMAIL = "contato@aerogrid.com.br";

const ANCORA_LINKS = [
  { href: "#produto", label: "O produto" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#faq", label: "Perguntas" },
] as const;

/** Rodapé institucional da página pública. */
export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo size={28} />
          <p className="max-w-xs text-sm text-gray-500">
            Plataforma de gestão e planejamento administrativo de operações com
            drones: clientes, equipamentos, manutenção e equipe.
          </p>
          <p className="max-w-xs text-xs text-gray-500">
            O AeroGrid não emite autorizações de voo e não se integra a órgãos
            oficiais.
          </p>
        </div>

        <nav aria-label="Seções da página" className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Navegar
          </p>
          {ANCORA_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-sm text-gray-700 hover:text-brand-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Conta e contato
          </p>
          <Link
            href="/login"
            className="block text-sm text-gray-700 hover:text-brand-700"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="block text-sm text-gray-700 hover:text-brand-700"
          >
            Criar conta
          </Link>
          <a
            href={`mailto:${CONTATO_EMAIL}?subject=${encodeURIComponent("Quero conhecer o AeroGrid Brasil")}&body=${encodeURIComponent(
              "Olá,\n\nGostaria de conhecer o AeroGrid Brasil.\n\nEmpresa:\nCidade/UF:\nTamanho da equipe de operações:\n\nObrigado.",
            )}`}
            className="block text-sm text-gray-700 hover:text-brand-700"
          >
            {CONTATO_EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100 py-5">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-gray-500">
          © 2026 AeroGrid Brasil. Ferramenta de gestão administrativa — não
          constitui autorização, aprovação ou conformidade regulatória.
        </p>
      </div>
    </footer>
  );
}
