import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";

const NAV = [
  { href: "#produto", label: "O produto" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#faq", label: "Perguntas" },
] as const;

/**
 * Cabeçalho da página pública (landing).
 * Sticky; menu de âncoras em <details> no mobile (sem JavaScript —
 * nenhum botão morto, Skill 03).
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo size={32} />

        <nav
          aria-label="Navegação da página"
          className="hidden items-center gap-6 md:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors duration-150 hover:text-brand-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={`${buttonClasses("secondary", "md")} hidden sm:inline-flex`}
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className={buttonClasses("primary", "md")}
          >
            Criar conta
          </Link>
        </div>
      </div>

      {/* Menu de âncoras no mobile — nativo, funciona sem JS */}
      <details className="border-t border-gray-100 md:hidden">
        <summary className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700">
          Menu
        </summary>
        <nav
          aria-label="Navegação da página (mobile)"
          className="flex flex-col gap-1 px-4 pb-3"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/login"
            className="rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 sm:hidden"
          >
            Entrar
          </Link>
        </nav>
      </details>
    </header>
  );
}
