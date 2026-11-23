# 10 — Procedimentos de Backup e Recuperação

**Versão:** 0.1 · **Status:** rascunho — ajustar ao provedor real (Supabase) antes do primeiro dado de cliente · **Data:** 2026-11-23

---

## 1. Escopo do que proteger

| Dado | Onde vive | Crítico? |
|------|-----------|----------|
| Dados empresariais (orgs, missões, clientes, drones...) | Supabase Postgres | **Sim** |
| Arquivos (anexos, documentos) | Supabase Storage | **Sim** |
| Credenciais de usuários | Supabase Auth (gerenciado) | Sim (gerenciado pelo provedor) |
| Código-fonte | Git/GitHub | Sim |
| Configurações/secretos | .env local + Vercel | Sim |

## 2. Backup de banco (plano inicial — confirmar no painel Supabase)

- **PITR (Point-in-Time Recovery)** ou backup diário automático: habilitar **antes do primeiro cliente pagante** (obrigatório no lançamento).
- Retenção mínima desejada: 7 dias (ajustar conforme custo — hipótese operacional, não requisito legal).
- Backup manual antes de: migração de grande impacto, mudança de plano, exportação em massa.
- Storage: verificar retenção/versionamento do provedor; anexos críticos podem ter cópia em bucket secundário quando houver volume real.

## 3. Recuperação (RTO/RPO iniciais — metas a revisar)

| Métrica | Meta inicial | Observação |
|---------|--------------|------------|
| RPO (perda máxima tolerada) | ≤ 24 h | cai para minutos com PITR |
| RTO (restauração) | ≤ 4 h | depende do suporte do plano contratado |

**Estas são metas operacionais iniciais, não garantias contratuais.**

## 4. Procedimento de restauração (passos)

1. **Pare** escritas (modo manutenção do app, se existir) para evitar divergência.
2. Identificar ponto de restauração (timestamp do incidente − margem).
3. Restaurar banco em **instância nova de teste** primeiro — nunca direto na produção sem conferência.
4. Validar: contagem de organizações, amostra de missões recentes, integridade de FKs.
5. Promover para produção e conferir login + CRUD de pelo menos um tenant.
6. Restaurar arquivos do Storage (se afetado) conferindo `storage_path` por organização.
7. Registrar incidente e lições no histórico de decisões se houve perda.

## 5. Testes periódicos (obrigatórios)

| Quando | O que testar |
|--------|--------------|
| A cada 90 dias | restauração de amostra em ambiente de teste + conferência de dados |
| Antes do lançamento | fluxo completo: restaurar → login → CRUD → anexo → relatório |
| Após mudança grande de schema | migração em cópia do banco de produção (dump) antes de aplicar |

## 6. Backup de código e configurações

- Código: GitHub é a fonte; branches protegidas quando houver equipe.
- `.env.example` versionado; valores reais **nunca** em repositório.
- Documentação nesta pasta é parte do que precisa sobreviver — mantida no mesmo repositório.

## 7. Exclusão de dados de cliente (LGPD — pendência jurídica)

- Definir política de retenção e exclusão **antes** do primeiro cliente (Skill 02, §10).
- Exclusão de organização = apagar/anonimizar dados empresariais + arquivos + backups expiram naturalmente pelo limite de retenção.
- Prazos exatos: **dependem de análise jurídica** — este documento não é parecer.

## 8. Responsável e registro

- Responsável inicial: fundador (único operador até haver equipe).
- Toda restauração real: registrar data, motivo, perda estimada e tempo de recuperação neste documento (seção 4, ao final).
