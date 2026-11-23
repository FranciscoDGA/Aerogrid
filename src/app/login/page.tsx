"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { createClient } from "@/lib/supabase/client";

type Modo = "login" | "reset";

export default function LoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [modo, setModo] = useState<Modo>("login");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    setInfo(null);
    setCarregando(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const senha = String(formData.get("senha") ?? "");

    if (modo === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
      if (error) {
        // Mensagem genérica: não revela se a conta existe (acessibilidade + segurança)
        setErro("E-mail ou senha inválidos.");
        setCarregando(false);
        return;
      }
      router.push("/");
      router.refresh();
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setCarregando(false);
    if (error) {
      setErro("Não foi possível enviar o e-mail. Tente novamente.");
      return;
    }
    // Mesma resposta nos dois casos — sem enumeração de contas
    setInfo("Se existir uma conta com esse e-mail, enviaremos um link de redefinição.");
  }

  return (
    <main className="flex min-h-screen">
      {/* Painel institucional */}
      <section className="hidden w-1/2 flex-col justify-between bg-brand-900 p-10 text-white lg:flex">
        <Logo size={36} />
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold leading-tight">
            Organize suas operações com drones
          </h1>
          <p className="text-brand-200">
            Clientes, equipamentos, operadores, missões e documentos em um só
            lugar — com histórico e relatórios para sua empresa.
          </p>
        </div>
        <p className="text-sm text-brand-300">
          Mapa de referência apenas. O AeroGrid não emite autorizações de voo.
        </p>
      </section>

      {/* Formulário */}
      <section className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-sm space-y-6">
          <div className="lg:hidden">
            <Logo size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {modo === "login" ? "Entrar" : "Recuperar senha"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {modo === "login"
                ? "Acesse sua organização no AeroGrid."
                : "Informe seu e-mail para receber o link de redefinição."}
            </p>
          </div>

          {erro && (
            <div
              role="alert"
              className="rounded-md border border-danger/30 bg-danger-bg px-3 py-2 text-sm text-danger"
            >
              {erro}
            </div>
          )}
          {info && (
            <div
              role="status"
              className="rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-700"
            >
              {info}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <TextField
              id="email"
              label="E-mail"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="voce@empresa.com.br"
            />
            {modo === "login" && (
              <TextField
                id="senha"
                label="Senha"
                type="password"
                name="senha"
                autoComplete="current-password"
                required
                minLength={8}
                placeholder="••••••••"
              />
            )}

            <Button type="submit" size="lg" loading={carregando} className="w-full">
              {modo === "login" ? "Entrar" : "Enviar link de redefinição"}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => {
                setModo(modo === "login" ? "reset" : "login");
                setErro(null);
                setInfo(null);
              }}
              className="text-brand-600 hover:underline"
            >
              {modo === "login" ? "Esqueci minha senha" : "Voltar ao login"}
            </button>
            <Link href="/cadastro" className="text-brand-600 hover:underline">
              Criar conta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
