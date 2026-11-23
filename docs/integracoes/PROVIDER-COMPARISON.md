# PROVIDER-COMPARISON — Comparação de Fornecedores

**Versão:** 0.1 · **Data:** 2026-11-23 · **Foco:** fornecedores de exibição cartográfica (decisão pendente do MVP da Skill 05) + comparações laterais.
**Aviso:** preços são **cotações datadas de terceiros/oficiais na data indicada** — não são contratos; confirmar na contratação.

---

## 1. Fornecedores de tiles/exibição

| Critério | OSMF (tile.openstreetmap.org) | MapTiler | Stadia Maps | Google Maps Platform |
|----------|-------------------------------|----------|-------------|----------------------|
| **Custo (cotação 2026-11-23)** | Grátis (voluntário, sem SLA) | Free listado como comercial **ou** não-comercial (conflito); Flex reportado US$ 30/mês (terceiro) | Uso comercial a partir de US$ 20/mês (terceiro) | Pay-as-you-go por SKU; conta de faturamento obrigatória |
| **Uso comercial em SaaS** | ⛔ Não recomendado (política OSMF) | ⏳ **A verificar nos ToS** | ✅ Em plano pago (a confirmar) | ✅ Em plano pago |
| **SLA/support** | Não | Free: não; pagos: conforme plano | Conforme plano | Conforme contrato |
| **Compatibilidade MapLibre** | Sim (tiles XYZ) | Sim (estilo + tiles) | Sim (ecossistema MapLibre) | Não nativa (uso via conformidade/alternativas — a verificar) |
| **Atribuição exigida** | Sim (OSM/ODbL) | Sim (conforme plano) | Sim | Sim (Google) |
| **Risco de lock-in** | Baixo (dados OSM abertos) | Médio | Médio | Alto |
| **Situação no AeroGrid** | **Descartado** | **Candidato principal** (pendência de ToS) | Reserva | Reserva (mais custo) |

## 2. Camada de bibliotecas (não conflita com escolha de tiles)

| Biblioteca | Papel | Licença | Status |
|------------|-------|---------|--------|
| MapLibre GL JS | Render do mapa | BSD-3-Clause | ✅ Aprovada — **não instalada** |
| Turf.js | Cálculo geoespacial no cliente | BSD-3-Clause | ✅ Aprovada — **não instalada** |
| PostGIS | Cálculo/armazenamento no servidor | PostgreSQL-like (licença permissiva) | ✅ Suportado no Supabase — habilitar na migração `0005` |

*Justificativa registrada (Skill 02): dependências permissivas, sem custo, mantidas; nenhuma outra lib de mapa sem nova justificativa.*

## 3. Fornecedores de dados de voo (futuro — fora do MVP)

| Critério | DJI Cloud API | AirData UAV |
|----------|---------------|-------------|
| **Existe API documentada?** | ✅ `developer.dji.com/cloud-api` (2026-11-23) | ✅ `app.airdata.com/docs/api/` (2026-11-23) |
| **O que oferece** | Sincronização drone ↔ plataforma própria (MQTT/HTTPS/WebSocket), gestão de Dock/Pilot 2 | Importação/consolidação de voos de múltiplas marcas, manutenção, relatórios |
| **Acesso** | Cadastro de desenvolvedor + APP ID/Key/License | Conta + API key (planos com "API access") |
| **Custo** | Não coletado (programa de dev) | Não coletado (página de planos) |
| **Complexidade** | **Alta** (infra de protocolo, certificação de dispositivo) | Média (ingestão de dados) |
| **Dependências do AeroGrid** | Frota DJI compatível + backend de evento + **módulo de missões inexistente** | Dados de voo reais (hoje: **nenhum** — sem missões/voos) |
| **Situação** | ⏳ Para fase futura | ⏳ Para fase futura |

## 4. Órgãos governamentais (comparação da indisponibilidade)

| Sistema | API pública documentada | Consequência |
|---------|-------------------------|--------------|
| SARPAS | ⛔ Não | Sem consulta, sem preenchimento, sem automação |
| SISANT (ANAC) | ⛔ Não | Cadastro oficial é manual, do operador |
| BR-UTM | ⛔ Não | Sem consumo |
| ECO-UTM | ⛔ Não | Sem consumo |
| DECEA (genérico) | ⛔ Não identificada | Qualquer futuro exige autorização expressa |

*Nenhum desses sistemas pode ser contornado por scraping/login automatizado (Skill 09 §ETAPA 4).*

## 5. Decisão recomendada (aguardando autorização)

1. **Tiles:** pesquisar ToS do MapTiler (pendência P-T01) → se permitir uso comercial no Free, usar MapTiler Free como inicial; senão, avaliar Stadia (US$ 20/mês) ou MapTiler Flex.
2. **OSMF:** manter descartado para produção.
3. **Google Maps:** manter como reserva (maior custo por SKU; exige faturamento).
4. **Dados de voo (DJI/AirData):** adiar até existir módulo de missões (0003) e requisito claro de produto.
5. **Governamentais:** permanecer sem integração por prazo indeterminado.
