# REGULATORY-CHANGELOG — Mudanças Regulatórias Relevantes (2026)

**Versão:** 0.1 · **Data da auditoria:** 2026-11-23 · **Regra:** normas revogadas nunca são apresentadas como vigentes.

---

## 1. Linha do tempo verificada

| Data | Evento | Fonte oficial |
|------|--------|---------------|
| 02/05/2017 | Resolução ANAC nº 419 aprova o **RBAC-E nº 94** (requisitos gerais para aeronaves não tripuladas de uso civil) | PDF do RBAC-E 94 (gov.br/Defesa); página de legislação ANAC |
| 15/05/2023 → 03/07/2023 | **ICA 100-40/2023** (Portaria DECEA nº 928/DNOR8, BCA nº 103 de 06/06/2023) — acesso ao espaço aéreo por ANT | Publicações DECEA / gov.br (PDF do arquivo 2023) |
| **15/06/2026** | **Resolução ANAC nº 805** publicada no DOU (16/06/2026): aprova o **RBAC nº 100** e **revoga o RBAC-E nº 94** | Página de legislação ANAC (item "RBAC 100 EMD 0016/06/2026"; RBAC-E 94 marcado "Revogada: Resolução nº 805, de 15.06.2026") |
| **15/06/2026** | **Resolução ANAC nº 806**: regras para UA de até **250 g** e aeromodelos em VLOS/EVLOS | Texto integral no site da ANAC (`…/resolucoes/2026/resolucao-806`) |
| **18/03/2026** | **ICA 100-40** (nova edição) e **ICA 100-48 "Regras UTM"** aprovadas por portarias do DECEA/DNOR8 | gov.br/Defesa — página Aerolevantamento (datas das instruções); Publicações DECEA |
| **30/03/2026** | Publicação no **BCA nº 58** das ICA 100-40 (nova edição) e ICA 100-48 | Publicações DECEA (rodapé das páginas das normas) |
| **01/07/2026** | **Entrada em vigor** da ICA 100-40 (nova edição) e da ICA 100-48; **revogação** de ICA 100-40/2023, MCA 56-2/2023 e MCA 56-5/2023 | Publicações DECEA (`publicacao/ica-100-40`, `publicacao/ICA-100-48`) |
| 01/07/2026 (reportado) | Vigência operacional das novas regras de categorias de operação do RBAC 100 | Fontes secundárias — **ver pendência P-02** |

---

## 2. Mudanças que afetam o conteúdo do AeroGrid

### 2.1 RBAC 100 substitui o RBAC-E 94
- **Antes:** RBAC-E 94 (Res. 419/2017) — classificação baseada principalmente no peso.
- **Agora:** RBAC nº 100 (Res. 805/2026) — estrutura **baseada em risco**, com categorias de operação **aberta, específica e certificada** (Agência Gov/MPor, 2026).
- **Impacto em documentos:** qualquer texto do AeroGrid que cite "RBAC-E 94" como norma atual está **desatualizado** e deve ser corrigido (nenhum existe hoje — verificado).
- **Exame teórico do piloto remoto:** exigido pelo RBAC 100 (Agência Gov/MPor); data-limite de exigibilidade reportada como **01/01/2027** em fonte secundária — confirmar no texto da Res. 805 (pendência P-03).

### 2.2 ICA 100-40/2023 foi revogada
- Qualquer referência à ICA 100-40 **de 2023** está obsoleta. A edição vigente é a de **2026** (vigência 01/07/2026).
- **Impacto:** distâncias de entorno de aeródromos, procedimentos de solicitação e regras de acesso devem ser citados **somente** a partir da edição 2026 — e, ainda assim, o AeroGrid **não os exibe** como orientação de voo.

### 2.3 MCA 56-2 e MCA 56-5 revogadas
- MCA 56-2 (aeromodelos recreativos) e MCA 56-5 (operações aéreas especiais) **deixaram de existir** em 01/07/2026; seu conteúdo migrou para a ICA 100-40/2026.
- **Impacto:** não citar MCA 56-x como norma vigente em nenhuma tela, relatório ou documentação.

### 2.4 ICA 100-48 introduz o arcabouço UTM no Brasil
- Define **Zona UTM**, **Plano de Voo UTM**, **USS** (art. 9º), **ECO-UTM** (art. 8º), **SDSP** (art. 16), protocolo **interUSS** e referência a **ASTM F3548-21**; zonas UTM são publicadas na AIP-Brasil (art. 29, conforme fonte secundária — confirmar).
- **Impacto:** o AeroGrid **não** representa zonas UTM nem planos de voo UTM. Se no futuro houver consulta a esse arcabouço, será necessário fluxo de integração oficial aprovado (Skill 07 §ETAPA 2.4).

### 2.5 Cadastro SISANT continua sendo da ANAC
- O cadastro oficial da aeronave é do **SISANT** (ANAC). O cadastro de drone do AeroGrid é **interno e sem valor oficial** — texto de UI já observa essa distinção (nenhum selo de "registrado na ANAC" é exibido).

---

## 3. Controle de desatualização (mecanismo proposto, não implementado)

1. Revisar trimestralmente: página de legislação da ANAC, Publicações DECEA, página Aerolevantamento do MD.
2. Registrar em `FONTES-OFICIAIS.md` a data de cada consulta.
3. Qualquer alteração de vigência invalida automaticamente as citações deste repositório até nova revisão.
4. Documentos desatualizados devem ser marcados como **obsoletos**, nunca corrigidos por suposição.

---

## 4. Itens NÃO alterados por esta auditoria

- Nenhum código, dependência, banco ou integração foi modificado (regra da Skill 07).
- Nenhum texto de UI vigente foi revisado linha a linha — a verificação de strings desatualizadas é uma **pendência** (`PENDENCIAS-DE-VALIDACAO-ESPECIALIZADA.md`, P-07).
