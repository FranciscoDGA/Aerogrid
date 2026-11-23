# PENDENCIAS-DE-VALIDACAO-ESPECIALIZADA — AeroGrid Brasil

**Versão:** 0.1 · **Data:** 2026-11-23 · **Finalidade:** lista aberta do que NÃO foi resolvido nesta auditoria documental e exige validação humana especializada, leitura de texto primário ou autorização.

---

## 1. Pendências de fonte/leitura primária

| ID | Pendência | Responsável sugerido | Bloqueia |
|----|-----------|----------------------|----------|
| **P-01** | `SKILL-07-LEGISLACAO-AERONAUTICA-BRASILEIRA.md` **não existe** no repositório — auditoria seguiu as instruções repassadas por mensagem. Se o arquivo existir em outro lugar, reprocessar a auditoria contra ele | Usuário / autor da skill | Conferência da auditoria |
| **P-02** | **Vigência exata do RBAC 100 e da Res. 806**: fontes secundárias divergem (publicação 16/06/2026 × entrada em vigor 01/07/2026). Ler o texto da Resolução 805 e confirmar o artigo de vigência | Especialista em direito aeronáutico / ANAC | Qualquer citação de vigência na UI |
| **P-03** | **Exame teórico do piloto remoto**: exigência confirmada por comunicação oficial; prazo de exigibilidade (reportado como 01/01/2027) não confirmado no primário | Idem | Funcionalidade de alerta de documentos |
| **P-04** | Ler o **texto integral do RBAC 100** (Res. 805) para classificar funcionalidades com base em artigos reais (categorias de operação, cadastro, seguro, piloto remoto) | Especialista | Matriz §1/§2 (itens 16, 19) |
| **P-05** | Confirmar **numeração de artigos da ICA 100-48** usada neste mapa (arts. 8º, 9º, 16, 29) no PDF oficial — parte foi lida em trecho, parte em fonte secundária | Especialista DECEA/UTM | Riscos R-07, matriz item 20 |
| **P-06** | **Número da portaria que aprovou a ICA 100-40/2026** (data 18/03/2026 e BCA 58 confirmados; número da portaria não) | Idem | FONTES-OFICIAIS A4 |
| **P-07** | **Varredura de strings do código/UI** em busca de termos obsoletos ("RBAC-E 94", "ICA 100-40/2023", "MCA 56") e de termos proibidos ("autorizado", "liberado") — auditoria da Skill 06 não incluiu essa lista de palavras | QA (Skill 10) | Gate de release |
| **P-08** | Detalhes SISANT (validade 24 meses, prefixos PP/PS/PR, obrigatoriedade por classe) vêm de blogs — confirmar na página/FAQ oficial da ANAC antes de qualquer exibição | Especialista | Item 18 da matriz |

## 2. Pendências que exigem parecer especializado (não resolvíveis por documentação)

| ID | Pendência | Por quê |
|----|-----------|---------|
| **P-09** | **Parecer jurídico** sobre enquadramento do SaaS (comercialização para operadores) e sobre textos de isenção de responsabilidade | A auditoria **não declara** conformidade legal (regra da Skill 07) |
| **P-10** | **Análise regulatória** de qualquer futuro recurso de "preenchimento assistido SARPAS" ou exibição de restrições | Pode caracterizar aproximação de ato privativo ou de serviço regulado (R-01/R-05/R-07) |
| **P-11** | **Análise de acreditação USS** caso o produto evolua para serviços UTM | ICA 100-48, art. 9º (a confirmar — P-05) |
| **P-12** | Requisitos setoriais não pesquisados: **ANATEL** (homologação de rádio), **MAPA** (agro), seguro RETA, avaliação de risco operacional — fora do escopo desta auditoria | Escopo da Skill 07 cobriu ANAC/DECEA/MD |

## 3. Pendências operacionais (aeroGrid interno)

| ID | Pendência | Origem |
|----|-----------|--------|
| **P-13** | Nenhuma funcionalidade nova da matriz pode ser implementada sem reclassificação + autorização (regra da Skill 07) | Skill 07 |
| **P-14** | Definir quem faz a **revisão trimestral** de fontes (changelog §3) e registrar data de próxima revisão | Esta auditoria |
| **P-15** | Integrações futuras dependem da Skill 09 (catálogo de APIs) — sem API oficial confirmada, tudo permanece "não disponível" | Skill 09 |

## 4. O que esta auditoria AUTORIZA continuar

- Desenvolvimento das funcionalidades classificadas como **P** na matriz (cadastros, missões internas, mapas de referência com aviso, GeoJSON, relatórios gerenciais).
- Continuidade da documentação e dos testes (Skills 04/05/06/10).

## 5. O que deve permanecer FORA do MVP

- Qualquer exibição de restrições/zonas aeronáuticas ou Zonas UTM.
- Integrações com SARPAS/SISANT/BR-UTM.
- Serviços UTM / papel de USS.
- Geração automática de rota de voo.
- Verificação de "área liberada".

## 6. Declaração final

Esta auditoria **não declara o AeroGrid juridicamente regular**. Ela mapeia normas vigentes, classifica funcionalidades sob justificativa e registra pendências. A validação final depende de parecer especializado (P-09 a P-12). Nenhum código, dependência, banco, integração ou deploy foi realizado.
