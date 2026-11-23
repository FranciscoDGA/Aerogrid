# INTEGRATION-ROADMAP — Roteiro de Integrações

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSTO — nenhum passo executado; cada fase exige autorização expressa.
**Base de decisão:** custo, benefício, complexidade, risco regulatório e dependência de fornecedor (Skill 09 ETAPA 6).

---

## Fase 0 — Fundação (pré-requisito de tudo)

| Passo | Detalhe | Bloqueio |
|-------|---------|----------|
| Implementar `src/integrations/core/` | Interface, erros tipados, retry, idempotência, logger, allowlist SSRF | Autorização |
| Definir envs de integração | Só estrutura (`INTEGRATION_*_URL` etc.); **sem chaves reais** | Autorização |
| Testes de núcleo | Falha simulada, retry, SSRF bloqueado, isolamento de org | Execução real |

**Valor:** nenhuma integração nasce improvisada; custo zero (não usa nenhum fornecedor pago).

---

## Prioridade MVP (recomendação — ETAPA 6)

### ✅ Priorizar no MVP

| # | Integração | Custo | Benefício | Complexidade | Risco reg. | Decisão |
|---|------------|-------|-----------|--------------|------------|---------|
| 1 | **Fornecedor de tiles** (MapTiler após ToS, ou Stadia) | Baixo-médio (Free ou US$ 20–30/mês) | **Essencial** — sem tiles não há mapa (Skill 05) | Baixa (URL de estilo no MapLibre) | Baixo (não é dado aeronáutico) | **Fazer primeiro** |
| 2 | **Caminho de extensão `/api/v1`** | Zero | Prepara IA (Skill 08) e webhooks futuros | Média | Nenhum | **Fazer** (arquitetura) |
| 3 | IBGE (camada de referência) | Zero (dados públicos) | Contexto geográfico para cliente | Média (licença + CRS 4674→4326) | Baixo | **Só após licença verificada** |

### ⏸ Fases posteriores (condicionadas)

| # | Integração | Condição para entrar |
|---|------------|----------------------|
| 4 | AirData UAV / DJI Cloud API | Módulo de missões (0003) implementado + requisito de produto aprovado (Skill 01) + custo confirmado |
| 5 | Fontes INPE/ANA/INCRA/Pará | Requisito claro + licença de cada fonte verificada |
| 6 | Notificações (e-mail) | Requisito de produto (ex.: alertas da Skill 08 Monitor de Prazos) + escolha de fornecedor |
| 7 | Google Maps | Só se fornecedor de tiles escolhido falhar |

### ⛔ Permanecer fora (prazo indeterminado)

| # | Integração | Motivo |
|---|------------|--------|
| 8 | **SARPAS, SISANT, DECEA, BR-UTM, ECO-UTM** | Sem API pública documentada + risco regulatório (Skills 07/09) — qualquer avanço exige autorização expressa + doc oficial + nova auditoria |
| 9 | Qualquer automação em sistema governamental | Proibido sem autorização documentada |
| 10 | Imagens de satélite | Sem requisito + licença não verificada (Skill 05 §11) |
| 11 | Gateway de pagamento | ADR-004: fora do MVP |

---

## Sequência proposta (com gate entre fases)

```
Fase 0  Fundação de integração (núcleo + testes)
   │  gate: autorização + testes executados com evidência
   ▼
Fase 1  Tile provider (ToS verificado → conta do USUÁRIO → chave em env → mapa Skill 05)
   │  gate: licença registrada + aviso de mapa de referência na UI
   ▼
Fase 2  IBGE como camada opcional (licença + transformação 4674→4326)
   │  gate: licença documentada
   ▼
Fase 3  Dados de voo (AirData/DJI) — SÓ com módulo de missões + requisito
   ▼
Fase 4  Notificações / demais — Só com requisito aprovado
```

## Regras do roteiro

1. Nenhum passo sem **autorização expressa** (Skills 04 §15 / 06 §17 / 09 final).
2. Contas e contratos são criados **pelo usuário** — o agente não cria conta nem contrata serviço (regra da Skill 09).
3. Toda fase atualiza `API-CATALOG.md` (situação), `INTEGRATION-PENDING-VALIDATION.md` (pendências) e `PROVIDER-COMPARISON.md` (custo datado).
4. Chave nunca em repositório; credencial exposta = incidente (Skill 06 §15).
5. Integração sem teste de isolamento de org não vai a produção.

## Riscos do roteiro

| Risco | Mitigação |
|-------|-----------|
| ToS do MapTiler vedar uso comercial | Pendência travada **antes** de implementar; Stadia como reserva |
| Custo de tiles estourar | Cache + limites de carga por org; monitorar uso |
| Fornecedor sumir/mudar termos | Adaptador trocável (arquitetura §3.1) |
| Pressão por "integrar o SARPAS" | Resposta padrão: sem API documentada + autorização obrigatória (§⛔) |
