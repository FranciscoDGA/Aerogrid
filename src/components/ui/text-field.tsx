import type { InputHTMLAttributes } from "react";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Obrigatório — label sempre visível (doc 05, §5) */
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  required,
  className = "",
  ...rest
}: TextFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        {label}
        {required && (
          <span className="ml-1 font-normal normal-case text-gray-500">
            (obrigatório)
          </span>
        )}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`h-10 w-full rounded-md border bg-white px-3 text-base text-gray-900 placeholder:text-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none disabled:bg-gray-100 ${
          error ? "border-danger" : "border-gray-300"
        } ${className}`}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-gray-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
