"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  icon: (props: { className?: string }) => React.JSX.Element;
};

const LINKS: NavLink[] = [
  {
    href: "/painel",
    label: "Painel",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M2 4.25A2.25 2.25 0 014.25 2h2.5A2.25 2.25 0 019 4.25v2.5A2.25 2.25 0 016.75 9h-2.5A2.25 2.25 0 012 6.75v-2.5zM2 13.25A2.25 2.25 0 014.25 11h2.5A2.25 2.25 0 019 13.25v2.5A2.25 2.25 0 016.75 18h-2.5A2.25 2.25 0 012 15.75v-2.5zM11 4.25A2.25 2.25 0 0113.25 2h2.5A2.25 2.25 0 0118 4.25v2.5A2.25 2.25 0 0115.75 9h-2.5A2.25 2.25 0 0111 6.75v-2.5zM11 13.25A2.25 2.25 0 0113.25 11h2.5A2.25 2.25 0 0118 13.25v2.5A2.25 2.25 0 0115.75 18h-2.5A2.25 2.25 0 0111 15.75v-2.5z" />
      </svg>
    ),
  },
  {
    href: "/clientes",
    label: "Clientes",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
      </svg>
    ),
  },
  {
    href: "/drones",
    label: "Drones",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1.07A7.002 7.002 0 0116.93 9H18a1 1 0 110 2h-1.07A7.002 7.002 0 0111 15.93V17a1 1 0 11-2 0v-1.07A7.002 7.002 0 013.07 11H2a1 1 0 110-2h1.07A7.002 7.002 0 019 4.07V3a1 1 0 011-1zm-4 8a4 4 0 108 0 4 4 0 00-8 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    href: "/operadores",
    label: "Operadores",
    icon: ({ className }) => (
      <svg
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

/**
 * Navegação principal da área logada com foco em usabilidade e acessibilidade.
 * Responsiva para celular (com rolagem horizontal suave) e desktop.
 */
export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="border-b border-gray-200 bg-white"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
        {LINKS.map((link) => {
          const active =
            link.href === "/painel"
              ? pathname === "/painel"
              : pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2 ${
                active
                  ? "bg-brand-50 text-brand-700 shadow-xs ring-1 ring-brand-600/10 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`size-4 shrink-0 ${
                  active ? "text-brand-600" : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
