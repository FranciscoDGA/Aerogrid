import { createBrowserClient } from "@supabase/ssr";

// Fallbacks permitem build sem .env.local; em runtime as variáveis reais são obrigatórias.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "anon-placeholder";

/** Cliente Supabase para o navegador (chave anon — protegida por RLS). */
export function createClient() {
  return createBrowserClient(url, anonKey);
}
