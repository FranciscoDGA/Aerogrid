"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { createClient } from "@/lib/supabase/client";

export default function CadastroPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(null);
    setInfo(null);
    setCarregando(true);

    const formData = new FormData(event.currentTarget);
    const nome = String(formData.get("nome") ?? "").trim();
    const email = String(formData.get("email") ?? "");
    const senha = String(formData.get("senha") ?? "");

    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      setCarregando(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { full_name: nome } },
    });

    if (error) {
      if (
        error.message.toLowerCase().includes("already") ||
        error.message.toLowerCase().includes("registered")
      ) {
        setErro("Já existe uma conta com este e-mail. Faça login.");
      } else {
        setErro("Não foi possível criar a conta. Tente novamente.");
      }
      setCarregando(false);
      return;
    }

    if (data.session) {
      // Conta ativada imediatamente (configuração local sem confirmação de e-mail)
      router.push("/onboarding");
      router.refresh();
      return;
    }

    setCarregando(false);
    setInfo("Conta criada. Confirme seu e-mail para concluir o cadastro.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <Logo size={32} />

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Criar conta
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Depois do cadastro você cria a organização da sua empresa.
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
            id="nome"
            label="Seu nome"
            name="nome"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Nome e sobrenome"
          />
          <TextField
            id="email"
            label="E-mail"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="voce@empresa.com.br"
          />
          <TextField
            id="senha"
            label="Senha"
            type="password"
            name="senha"
            autoComplete="new-password"
            required
            minLength={8}
            hint="Mínimo de 8 caracteres."
            placeholder="••••••••"
          />

          <Button type="submit" size="lg" loading={carregando} className="w-full">
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <Link href="/login" className="text-brand-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
