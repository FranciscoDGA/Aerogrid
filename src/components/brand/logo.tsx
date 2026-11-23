import Link from "next/link";

/**
 * Símbolo AeroGrid — proposta A "Waypoints na grade"
 * (docs/design/02-identidade-visual.md). Versão simplificada para 20–32px.
 */
export function Logo({
  size = 28,
  withWordmark = true,
}: {
  size?: number;
  withWordmark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label="AeroGrid"
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="var(--color-brand-800)" />
        <g stroke="var(--color-brand-500)" strokeWidth="1.5" opacity="0.45">
          <line x1="10" y1="21" x2="54" y2="21" />
          <line x1="10" y1="43" x2="54" y2="43" />
          <line x1="21" y1="10" x2="21" y2="54" />
          <line x1="43" y1="10" x2="43" y2="54" />
        </g>
        <path
          d="M16 46 L32 16 L48 46"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="46" r="4.5" fill="var(--color-brand-400)" />
        <circle cx="32" cy="16" r="4.5" fill="#ffffff" />
        <circle cx="48" cy="46" r="4.5" fill="var(--color-brand-400)" />
      </svg>
      {withWordmark && (
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-brand-800"
        >
          AeroGrid
        </Link>
      )}
    </span>
  );
}
