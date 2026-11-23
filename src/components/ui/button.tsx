import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-300",
  secondary:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:text-gray-300",
  danger: "bg-danger text-white hover:brightness-90 disabled:opacity-50",
  ghost: "text-gray-700 hover:bg-gray-100 disabled:text-gray-300",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  // lg/mobile: alvo de toque ≥ 44px (doc 09, §3)
  lg: "h-11 px-5 text-base",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
