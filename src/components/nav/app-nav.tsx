"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/painel", label: "Painel" },
  { href: "/clientes", label: "Clientes" },
  { href: "/drones", label: "Drones" },
  { href: "/operadores", label: "Operadores" },
] as const;

/**
 * Navegação principal da área logada.
 * Mobile: barra com rolagem horizontal (doc 09 §3 — sidebar/gaveta completa
 * entra na evolução da navegação conforme doc 06).
 */
export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="border-b border-gray-200 bg-white"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1.5">
        {LINKS.map((link) => {
          const active =
            link.href === "/painel"
              ? pathname === "/painel"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
