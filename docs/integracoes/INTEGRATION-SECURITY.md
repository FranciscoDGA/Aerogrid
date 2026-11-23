# INTEGRATION-SECURITY — Segurança de Integrações

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** PROPOSITIVO — sem integrações ativas hoje.
**Referências:** Skill 09 ETAPA 4 · Skill 06 (OWASP Top 10/ASVS, LGPD) · Skill 07 (fronteiras regulatórias).

---

## 1. Proteção de chaves e tokens

| Regra | Implementação pretendida |
|-------|--------------------------|
| Chave só em env de servidor | `.env` local ignorado pelo Git (já presente no `.gitignore`); env do deploy por ambiente |
| Nunca no navegador | Nenhum `NEXT_PUBLIC_*` para segredos; bundle inspecionado antes de release |
| Nunca em log | Máscara automática em logger (`sk-***`); teste de regressão com grep |
| Nunca em commit | Hook/gate de scan de segredos no pipeline de release |
| Menor privilégio | Chave do fornecedor com escopo mínimo (só leitura se bastar) |
| Rotação | Data da última rotação registrada em `INTEGRATION-PENDING-VALIDATION.md` |
| Separação de ambientes | Chaves distintas dev/homolog/prod quando o fornecedor permitir |

## 2. Autorização de acesso (lado AeroGrid)

- Toda rota de integração: **sessão → papel → org da sessão → rate limit → Zod → adaptador**.
- Integrações administrativas (configurar fornecedor): restritas a **owner/admin**.
- Dados recebidos de terceiro materializados com `organization_id` + RLS (mesma regra do produto).
- Nenhuma credencial de cliente final é aceita no MVP (sem "traga sua própria chave").

## 3. Webhooks

1. Endpoint dedicado por fornecedor.
2. **Assinatura verificada** (HMAC/token) com comparação em tempo constante — rejeitar se inválida.
3. Validação Zod do payload + limites de tamanho.
4. Idempotência por `event_id`; descartar replay (janela de tempo definida na implementação).
5. Sem escrita crítica antes da verificação; processamento assíncrono.
6. Respostas ao webhook sempre `200` rápido após validação (evitar reenvio em loop), com erro logado.

## 4. Prevenção contra SSRF (crítica para qualquer fetch de URL)

| Controle | Regra |
|----------|-------|
| Allowlist de hosts | O servidor só fala com endpoints **pré-configurados** em env — nunca com URL vinda do usuário |
| URL de usuário nunca é buscada por backend | Upload/importação de GeoJSON não dispara requisição a domínio do arquivo |
| Bloqueio de redes internas | Negar `localhost`, `127.0.0.0/8`, `10/8`, `172.16/12`, `169.254/16`, `::1` etc. em qualquer redirect |
| Redirects | Máximo de N redirects; revalidar host em cada salto |
| Timeout + limite de tamanho | Evitar esgotar memória/banda com resposta gigante |
| DNS | Opcional: resolver e validar IP antes da conexão (hardening) |

## 5. Validação de dados recebidos

- **Toda** resposta de terceiro passa por Zod/tipagem antes de persistir — formato do fornecedor não é confiável.
- Nenhum campo de terceiro é executado (sem `eval`, sem SQL concatenado — queries parameterizadas).
- Dado de terceiro é **rótulo**, não fato: UI identifica proveniência (ex.: "fonte: X, consultado em data").
- Geometrias vindas de terceiro passam pelas validações da Skill 05 (SRID declarado, limites, `ST_IsValid`).

## 6. Limites de requisições

- Rate limit por usuário e por org nas rotas `/api/v1/*`.
- Limite por fornecedor respeitando o `Retry-After` e os quotas do provedor.
- Payload máximo por rota (ex.: importação GeoJSON com teto de bytes/elementos — doc 06 da Skill 05).
- Circuit breaker: N falhas seguidas → abre o circuito e degrada a UI por período.

## 7. Licenças comerciais

- Nenhum fornecedor é ativado sem registro em `API-CATALOG.md` com: licença/termos, uso comercial permitido?, atribuição exigida, custo.
- Dados com **ODbL** (OSM) exigem atribuição visível; dados IBGE: **licença não verificada** → bloqueados até confirmação.
- Custo por SKU registrado **com data** (preços mudam — nunca tratar cotação antiga como vigente).

## 8. Privacidade e LGPD

- Dados enviados a terceiro: mínimo necessário, finalidade declarada (ex.: geocoding só com o endereço, não com a org inteira).
- Inventariar terceiros que recebem dados pessoais (operadores, contatos de cliente) → base legal e contrato de operador de dados a revisar com assessoria jurídica (**não declarado como compliant aqui**).
- Residência dos dados do fornecedor registrada antes da contratação.
- Logs de integração sem conteúdo pessoal desnecessário.

## 9. Regras de integração com sistemas aeronáuticos (Skill 07 + Skill 09)

1. **Sem API pública documentada → sem integração** (ANAC, DECEA, SARPAS, BR-UTM, ECO-UTM: ⛔ hoje).
2. **Proibido** automatizar login, navegação, preenchimento ou extração em site/sistema governamental sem **autorização expressa documentada**.
3. Nenhuma integração pode gerar aparência de ato oficial (autorização, protocolo, certidão).
4. Integração aeronáutica futura exige: doc oficial da API + autorização do órgão + revisão das Skills 06 e 07 + nova auditoria.
5. Webhook/evento vindo de sistema oficial nunca é tratado como "liberação de voo" pelo produto.

## 10. Checklist antes de ativar qualquer integração

- [ ] Linha `✅ confirmado` no `API-CATALOG.md` (doc + termos + custo datados).
- [ ] Chave em env de servidor, escopo mínimo, rotação registrada.
- [ ] Allowlist de host + defesa SSRF implementadas.
- [ ] Zod na entrada e na saída do adaptador.
- [ ] Rate limit + idempotência + retry limitado.
- [ ] Logs sem segredos; métricas de erro ativas.
- [ ] Testes: contrato, falha simulada, isolamento de org, vazamento de chave.
- [ ] Autorização expressa do usuário registrada.
