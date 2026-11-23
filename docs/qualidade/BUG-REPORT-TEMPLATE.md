# BUG-REPORT-TEMPLATE — Modelo de Relato de Defeito

**Versão:** 0.1 · **Data:** 2026-11-23 · **Uso:** todo achado de teste (funcional, segurança, qualidade) segue este modelo.
**Regra:** gravidade nunca é "baixada" para melhorar indicadores (Skill 06 §14).

---

## Formulário (copiar e preencher)

```markdown
### BUG-XXX — [título curto e específico]

- **Data:** AAAA-MM-DD
- **Relator:** (quem executou o teste)
- **Ambiente:** local | CI | homologação | produção  (nunca testar em produção sem autorização)
- **Versão/commit:** (hash ou tag)
- **Módulo/rota:** ex.: /clientes/[id], modules/drones/service

**Gravidade:** Crítica | Alta | Média | Baixa | Cosmética
**Prioridade:** Imediata | Alta | Normal | Baixa

**Passos para reproduzir:**
1. …
2. …
3. …

**Comportamento esperado:**
…

**Comportamento observado (saída real, colar):**
…

**Evidência:** log/screenshot/URL do teste executado

**Impacto:** (usuário afetado, dados, segurança, regulatório)

**Classificação (opcional):** funcional | UI | performance | segurança | isolamento multi-tenant | regulatório | documentação

**Suspeita de causa:** (se houver)

**Workaround:** (se houver)

**Status:** Aberto | Em análise | Corrigido | Confirmado | Rejeitado (com motivo)
```

---

## Regras de gravedade

| Gravidade | Critério | Exemplos |
|-----------|----------|----------|
| **Crítica** | Vazamento entre orgs, perda de dados, falha de segurança explorável, ato com aparência regulatória | MT-01 falhando; `service_role` no bundle; tela sugerindo autorização |
| **Alta** | Bloqueio de fluxo principal sem workaround, vulnerabilidade alta | Cadastro impossível; `npm audit` crítico ativo |
| **Média** | Fluxo degradado com workaround | Estado de erro sem retry |
| **Baixa** | Inconsistência menor | Texto confuso |
| **Cosmética** | Visual | Espaçamento |

## Regras de registro

1. **Um defeito por relato** — nada de "vários problemas" num único item.
2. **Sem evidência = não é defeito confirmado** (vira "suspeita").
3. Defeitos **nunca** são fechados sem reteste registrado (data + resultado).
4. Achado de **segurança** vai para registro próprio (Skill 06 doc 07) **e** aqui, com ID cruzado.
5. Vulnerabilidade conhecida e não corrigida fica **visível** no relatório — sem omit.

---

## Defeitos abertos hoje (registro inicial — ver também TEST-CASES §3)

| ID | Título | Grav. | Status |
|----|--------|-------|--------|
| BUG-03 | 6 vulnerabilidades em dependências (`npm audit`) | Alta | Aberto |
| BUG-06 | Testes de RLS nunca executados (ambiente ausente) | Crítica (homologação) | Aberto |
| BUG-04 | Sem pipeline de CI | Média | Aberto |
| BUG-05 | Sem medição de cobertura | Média | Aberto |
| BUG-01 | `vitest.config.ts` cita script `test:integration` inexistente | Baixa | Aberto |
| BUG-02 | Pasta `tests/integration` referenciada inexistente | Baixa | Aberto |
