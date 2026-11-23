# REGULATORY-MAP — Mapa Regulatório Aplicável ao AeroGrid Brasil

**Versão:** 0.1 · **Data da auditoria:** 2026-11-23 · **Tipo:** documental (pesquisa de fontes oficiais)
**Status:** NÃO constitui parecer jurídico nem declaração de conformidade legal do AeroGrid.

> **Nota de abertura:** o arquivo `SKILL-07-LEGISLACAO-AERONAUTICA-BRASILEIRA.md` **não existe** neste repositório (verificado por busca em 2026-11-23). Esta auditoria seguiu as instruções repassadas na mensagem de trabalho. A lacuna está registrada em `PENDENCIAS-DE-VALIDACAO-ESPECIALIZADA.md`.

---

## 1. Órgãos e suas competências (conforme fontes oficiais consultadas)

| Órgão | Competência relevante | Fonte oficial consultada |
|-------|----------------------|--------------------------|
| **ANAC** — Agência Nacional de Aviação Civil | Regulamenta aeronaves não tripuladas de uso civil: requisitos gerais, cadastro (SISANT), piloto remoto, categorias de operação | Lei nº 11.182/2005 (lista do MD); página de legislação ANAC |
| **DECEA** — Departamento de Controle do Espaço Aéreo | Acesso ao espaço aéreo por aeronaves não tripuladas; regras UTM; SARPAS; publicação das ICA | Publicações DECEA; gov.br/Defesa — Aerolevantamento |
| **Ministério da Defesa** | Autorização de **aerolevantamento** no território nacional (empresas credenciadas) | Serviço "Obter autorização para realizar aerolevantamentos (SisCLATEN)" — gov.br |
| **ANATEL** | Homologação de radiofrequência dos equipamentos (mencionada como exigência operacional; **fora do escopo desta auditoria**) | Não aprofundada — ver pendências |
| **MAPA / outros** | Uso agrícola e demais setores — **não pesquisado** | Fora do escopo desta auditoria |

**Divisão fundamental (documentada nas fontes):** a ANAC regula o **produto e o piloto** (RBAC 100, SISANT); o DECEA regula o **acesso ao espaço aéreo** (ICA 100-40, SARPAS, ICA 100-48/UTM). Um software para operadores civis toca ambas as esferas apenas como **ferramenta administrativa do operador** — nunca como órgão emissor.

---

## 2. Normas centrais vigentes (identificadas nesta auditoria)

| Norma | Objeto | Situação |
|-------|--------|----------|
| **RBAC nº 100** (Resolução ANAC nº 805, de 15/06/2026) | Requisitos gerais para aeronaves não tripuladas de uso civil — categorias **aberta, específica e certificada** (base em risco, não mais só peso) | **Vigente** (publicada no DOU em 16/06/2026; vigência precisa de confirmação — ver pendências) |
| **Resolução ANAC nº 806, de 15/06/2026** | Regras para UA com peso em voo **até 250 g** e aeromodelos em VLOS/EVLOS | **Vigente** (texto integral publicado no site da ANAC) |
| **RBAC-E nº 94** (Resolução nº 419/2017) | Requisitos gerais para aeronaves não tripuladas de uso civil (versão anterior) | **REVOGADO** pela Resolução nº 805 de 15/06/2026 — **não usar como norma atual** |
| **ICA 100-40 (edição 2026)** — "Aeronaves Não Tripuladas e o Acesso ao Espaço Aéreo Brasileiro" | Procedimentos de acesso ao espaço aéreo; autorização via SARPAS; distâncias de entorno de aeródromos | **Vigente desde 01/07/2026** (BCA nº 58 de 30/03/2026); **revogou** ICA 100-40/2023, MCA 56-2/2023 e MCA 56-5/2023 |
| **ICA 100-48 — "Regras UTM"** (Portaria DECEA nº 2.093/DNOR8, de 18/03/2026) | Gerenciamento de Tráfego Aéreo Não Tripulado: ECO-UTM (art. 8º), **USS** (art. 9º — Entidade Autorizada acreditada pelo DECEA), **SDSP** (art. 16), Zona UTM, Plano de Voo UTM, protocolo **interUSS**, referência a ASTM F3548-21 | **Vigente desde 01/07/2026** (BCA nº 58 de 30/03/2026) |
| **Código Brasileiro de Aeronáutica** — Lei nº 7.565/1986 | Base legal do sistema; citado como parâmetro normativo da ICA 100-48 (art. 91) | Vigente |

---

## 3. Sistemas oficiais (o que são, sem simulação)

| Sistema | O que é | Papel do AeroGrid |
|---------|---------|-------------------|
| **SARPAS** (`sarpas.decea.mil.br`) | Sistema oficial do DECEA de solicitação de acesso ao espaço aéreo por aeronaves remotamente pilotadas | **Nenhuma integração.** O AeroGrid não emite, não substitui, não simula e não consulta o SARPAS |
| **SISANT** (`gov.br/anac/…/sisant`) | Sistema da ANAC de cadastro de aeronaves não tripuladas (>250 g, conforme fontes consultadas) | **Nenhuma integração.** Cadastro no AeroGrid é registro administrativo interno, sem qualquer valor oficial |
| **BR-UTM** (`br-utm.decea.mil.br`) | Portal/programa do DECEA para o sistema UTM brasileiro | **Nenhuma integração, nenhum consumo de API** |
| **ECO-UTM** | Ecossistema/entidade definida na ICA 100-48 (art. 8º) | **Não participa do AeroGrid** |
| **USS** (Provedor de Serviços UTM) | Entidade autorizada acreditada pelo DECEA (ICA 100-48, art. 9º) que recebe Plano de Voo UTM | **O AeroGrid NÃO é e NÃO se declara USS** — qualquer prestação futura de serviços UTM exige acreditação e análise específica (fora do MVP) |
| **SDSP** (ICA 100-48, art. 16) | Serviço definido pela instrução UTM | Não integrado; significado exato deve ser confirmado no texto integral da norma antes de qualquer citação funcional |

---

## 4. Enquadramento do AeroGrid (ETAPA 2 — 5 hipóteses analisadas)

1. **Fornecedor de software SaaS administrativo** — **enquadramento principal.** Gestão de clientes, frota, operadores, documentos e missões é atividade administrativa civil, sem emissão de ato aeronáutico. **Não se presume** que o mero fato de vender software a empresas de drones exija credenciamento aeronáutico.
2. **Plataforma de planejamento geográfico** — permitida em princípio como ferramenta de organização interna (geometrias, medidas, GeoJSON), desde que **nunca** rotulada como rota autorizada, plano de voo ou área liberada (Skill 05 §13).
3. **Ferramenta de organização de missões** — permitida em princípio: cadastros, sequências, checklists e documentos são gestão operacional, **não** autorização. Alertas de validade de documentos são informativos e não substituem verificação junto aos órgãos.
4. **Integração futura com sistemas oficiais** — **não presumida.** Não há API pública documentada de SARPAS, SISANT ou BR-UTM identificada nesta auditoria. Qualquer integração futura exige: documentação oficial de acesso, autorização expressa do órgão, contratação/credenciamento se aplicável e nova auditoria.
5. **Prestação futura de serviços UTM** — **fora do MVP e não ofertada.** Dependeria de acreditação como USS perante o DECEA (ICA 100-48, art. 9º) e análise regulatória dedicada. Nada nesta auditoria autoriza tal expansão.

**Regra decorrente:** nenhuma funcionalidade do AeroGrid pode criar, por interface ou texto, a percepção de que o cliente possui autorização de voo, área liberada ou respaldo oficial.

---

## 5. Fronteira do que o AeroGrid NÃO faz (síntese normativa)

- Não emite autorização de voo (competência DECEA/SARPAS — ICA 100-40/2026).
- Não substitui cadastro SISANT (competência ANAC — Res. 805/806 de 15/06/2026).
- Não representa zonas UTM, restrições ou corredores aéreos (ICA 100-48/2026 — fonte oficial obrigatória).
- Não declara áreas liberadas nem garante segurança aeronáutica.
- Não executa nem automatiza login/navegação/extração em sistemas governamentais.
- Não presta serviços UTM.

---

## 6. Limitações desta auditoria

- Pesquisa **documental** com fontes oficiais; **não** substitui parecer de advogado de aviação civil nem do DECEA/ANAC.
- Textos integrais dos RBAC/ICA nem sempre foram lidos artigo por artigo — citações de artigos específicos estão marcadas como pendência quando não confirmadas em fonte primária.
- Normas de outras áreas (ANATEL, MAPA, LGPD, proteção de dados) não foram esgotadas.
- **Não declara o AeroGrid juridicamente regular.**
