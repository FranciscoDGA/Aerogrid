# MATRIZ-FUNCIONALIDADES-REGULATORIAS

**Versão:** 0.1 · **Data:** 2026-11-23 · **Classificações:** `P` = Permitida em princípio · `C` = Condicionada a requisitos · `E` = Necessita parecer especializado · `M` = Fora do MVP · `N` = Não deve ser oferecida

> Fonte das funcionalidades: `docs/08-matriz-funcionalidades.md` (matriz aprovada da Skill 01) + estado real do código (Skills 02–04). Justificativa normativa em cada linha; lacunas de citação marcadas como pendência.

---

## 1. Funcionalidades implementadas ou em andamento

| # | Funcionalidade | Class. | Justificativa | Base normativa |
|---|----------------|--------|---------------|----------------|
| 1 | Cadastro de clientes, contatos, observações | **P** | Gestão comercial pura; nenhum ato aeronáutico | — (não há ato regulado) |
| 2 | Cadastro de drones (fabricante, modelo, nº série, especificações, status interno) | **P** | Inventário administrativo. **Proibido** rotular status como "autorizado/aero aprovado"; proibido exibir selo SISANT/ANAC | Res. 805/806 (2026): cadastro oficial é SISANT — o do AeroGrid não o substitui |
| 3 | Histórico de manutenção de drones (data, descrição, custo) | **P** | Registro interno de manutenção; sem emissão de certificado de aeronavegabilidade | Competência de certificação é da ANAC (RBAC 100) — AeroGrid não emite |
| 4 | Cadastro de operadores (nome, observações com qualificações **declaradas**) | **P** | Registro interno. **Condição:** nunca apresentar como certificação/licença emitida | Exame/habilitação de piloto remoto é da ANAC (RBAC 100; Res. 806 para ≤250 g) |
| 5 | Documentos de operadores (tipo, número, emissão, validade) | **C** | Armazenamento é permitido; **alertas automáticos de vencimento** só com texto claro de que não substituem verificação oficial | Boa prática; sem norma específica — não declarar "documento válido junto à ANAC" |
| 6 | Autenticação, organização, usuários, papéis | **P** | Infraestrutura de software | — |
| 7 | Painel com dados reais da organização | **P** | Visualização interna | — |

## 2. Funcionalidades planejadas (próximas etapas)

| # | Funcionalidade | Class. | Justificativa | Base normativa |
|---|----------------|--------|---------------|----------------|
| 8 | Missões: criação, sequência, status interno, checklists | **P** | Organização operacional; sem autorização embutida. **Condição:** status/nunca significar "voo aprovado" | ICA 100-40/2026: autorização de acesso ao espaço aéreo é do DECEA/SARPAS |
| 9 | Mapas de referência interativos (MapLibre) | **P** | Exibição cartográfica genérica. **Condição obrigatória:** aviso permanente "não é mapa aeronáutico oficial" e fonte/data do fornecedor | Skill 05 §13; risco R-02 desta auditoria |
| 10 | Pontos, linhas, polígonos, waypoints, distâncias, áreas | **P** | Cálculo geométrico puro. **Condição:** rótulo "planejamento geográfico", nunca "rota autorizada" | Skill 05 §7/§13 |
| 11 | Importação/exportação de GeoJSON | **P** | Troca de dados do próprio usuário, com limites e validação | — |
| 12 | Associação geografia ↔ missões/clientes/áreas de interesse | **P** | Relacionamento interno | — |
| 13 | Relatórios gerenciais (frota, clientes, missões) | **P** | Estatística administrativa interna | — |
| 14 | Relatórios de missão com conclusões de voo | **C** | Permitido como **registro declarado pelo operador**; proibido apresentar como laudo oficial ou evidência de conformidade | Não há norma que dê valor oficial a relatório de software |
| 15 | Auditoria de alterações (audit_logs) | **P** | Rastreabilidade interna | — |

## 3. Funcionalidades condicionadas ou bloqueadas

| # | Funcionalidade | Class. | Justificativa | Base normativa |
|---|----------------|--------|---------------|----------------|
| 16 | Alertas/verificação de documentos obrigatórios do operador (licença, exame teórico) | **C** | Só com pesquisa de fonte primária do que o RBAC 100 exige de cada categoria; sem "selo de conformidade" | RBAC 100 (Res. 805/2026) — leitura integral pendente (P-04) |
| 17 | Exibição de restrições de proximidade de aeródromos | **E / M** | Enquadraria o produto como fonte de informação aeronáutica; exige fonte oficial, data, cobertura, limitações e validação técnica **e** regulatória (Skill 05 §13) | ICA 100-40/2026 (edição vigente); AIP-Brasil |
| 18 | Consulta de situação cadastral SISANT do drone | **M / E** | Não há API pública documentada; automatizar acesso a sistema da ANAC exige autorização expressa | Skill 09 (integrações) — proibição de automação sem autorização |
| 19 | Preenchimento assistido do Plano de Voo / solicitação SARPAS | **E** | Caracteriza aproximação de ato privativo do DECEA; qualquer apoio exige análise de que não há simulação de resposta oficial | ICA 100-40/2026; risco R-05 |
| 20 | Exibição de Zonas UTM / Plano de Voo UTM / restrições ECO-UTM | **N** (hoje) / **E** (futuro) | Informação aeronáutica oficial: só com fonte oficial, data de atualização, cobertura, limitações e validação regulatória | ICA 100-48/2026 (arts. 8º, 9º, 16, 29 — confirmar numeração, P-05) |
| 21 | Cálculo/otimização automática de rota de voo (waypoints gerados) | **M** (decisão anterior: "Bloqueado") | Requer análise técnica + responsabilidade civil + revisão regulatória antes de qualquer proposta | `docs/08-matriz-funcionalidades.md` linha 33 (decisão da Skill 01) |
| 22 | Integração com SARPAS, SISANT, BR-UTM | **M** | Sem API pública documentada; exige autorização do órgão e nova auditoria | Skill 07 §ETAPA 2.4 / Skill 09 |
| 23 | Prestação de serviços UTM (ser USS) | **N** (MVP) | Depende de acreditação perante o DECEA | ICA 100-48/2026, art. 9º (confirmar, P-05) |
| 24 | Exibição de imagem de satélite | **M** | Sem requisito aprovado e sem licença verificada | Skill 01 (escopo); Skill 05 §11 |
| 25 | Verificação automática de "área segura/liberada para voo" | **N** | Proibida em absoluto — cria percepção falsa de autorização | Skill 05 §13; risco R-01 |

---

## 4. Resumo quantitativo

| Classificação | Qtde |
|---------------|------|
| Permitida em princípio (P) | 13 |
| Condicionada (C) | 3 |
| Necessita parecer especializado (E) | 4 (algumas também M) |
| Fora do MVP (M) | 5 |
| Não deve ser oferecida (N) | 2 |

---

## 5. Regras transversais para qualquer funcionalidade nova

1. Classificar nesta matriz **antes** de implementar (fluxo da Skill 01 §regras).
2. Toda tela com geografia exibe aviso de mapa de referência (Skill 05 §13).
3. Nenhum texto sugere autorização, liberação ou segurança garantida.
4. Nenhuma "norma" é citada na UI sem número, data e verificação em fonte primária.
