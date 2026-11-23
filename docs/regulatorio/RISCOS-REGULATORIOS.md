# RISCOS-REGULATORIOS — AeroGrid Brasil

**Versão:** 0.1 · **Data:** 2026-11-23 · **Escala:** Criticidade (Alta/Média/Baixa) × Probabilidade · **Controle** = medida já existente ou proposta (não implementada sem autorização)

---

## R-01 — Induzir o cliente a acreditar que possui autorização de voo

| Campo | Conteúdo |
|-------|----------|
| **Crit.** | **Alta** |
| **Cenário** | Texto de UI, e-mail ou relatório usando "voo aprovado", "área liberada", "autorizado"; status de missão com semântica de liberação; cor verde lida como "pode voar" |
| **Por que importa** | Autorização de acesso ao espaço aéreo é do DECEA via SARPAS (ICA 100-40/2026). Software que simula ou sugere autorização pratica ato enganoso e pode caracterizar função regulada |
| **Controles atuais** | Proibição documentada (Skill 01 doc 08; Skill 05 §13); status de drone é "disponibilidade interna"; nenhum texto "autorizado" no código (verificado em auditoria da Skill 06) |
| **Controles propostos** | Revisão de copy em toda tela de missão; glossário de termos proibidos no QA (Skill 10); gate de release `RELEASE-QUALITY-GATES.md` |
| **Resíduo** | Médio — depende de revisão contínua de conteúdo |

## R-02 — Apresentar mapas genéricos como mapas aeronáuticos oficiais

| Campo | Conteúdo |
|-------|----------|
| **Crit.** | **Alta** |
| **Cenário** | Base de tiles (OSM/MapTiler) exibida sem aviso; usuário interpreta restrição visual como informação oficial; uso do nome "aeronáutico" em camada |
| **Por que importa** | Informação aeronáutica oficial vem de AIP/DECEA; tiles genéricos não têm validade aeronáutica (Skill 05 §13) |
| **Controles atuais** | Doc 08 da matriz de funcionalidades proíbe a representação; doc 01/03 da Skill 05 exigem aviso permanente e proveniência |
| **Controles propostos** | Aviso fixo no componente de mapa; nomenclatura "Mapa de referência"; teste visual no plano de testes (Skill 10) |
| **Resíduo** | Baixo se implementado |

## R-03 — Fornecer informações regulatórias desatualizadas

| Campo | Conteúdo |
|-------|----------|
| **Crit.** | **Alta** |
| **Cenário** | Citar RBAC-E 94, ICA 100-40/2023 ou MCA 56-x como vigentes; datas de vigência erradas; texto de exame teórico com prazo incorreto |
| **Por que importa** | Regulamentação mudou em 2026 (RBAC 100; ICA 100-40/2026; ICA 100-48) — conteúdo obsoleto induz a erro o operador |
| **Controles atuais** | `REGULATORY-CHANGELOG.md` registra as revogações; nenhuma norma é citada hoje na UI |
| **Controles propostos** | Revisão trimestral (changelog §3); qualquer citação normativa exige número + data + URL oficial; teste de regressão de copy |
| **Resíduo** | Médio — risco recorrente |

## R-04 — Simular autorizações governamentais

| Campo | Conteúdo |
|-------|----------|
| **Crit.** | **Alta** |
| **Cenário** | Gerar "comprovante de voo aprovado", recibo falso de SARPAS, número de protocolo inventado, tela imitando resposta do DECEA |
| **Por que importa** | Falsidade de documento público; quebra de confiança; possível ilicitude |
| **Controles atuais** | Nenhuma integração oficial existe; nenhum número de protocolo é gerado (Skill 06) |
| **Controles propostos** | Política explícita: o produto **nunca** emite documento com aparência de ato oficial; qualquer "comprovante" leva "documento interno, sem validade junto a órgãos" |
| **Resíduo** | Baixo |

## R-05 — Integração não autorizada com sistemas governamentais

| Campo | Conteúdo |
|-------|----------|
| **Crit.** | **Alta** |
| **Cenário** | Scraping/automação de login no SARPAS/SISANT; uso não documentado de API; "preenchimento automático" que assume resposta do órgão |
| **Por que importa** | Sem API pública documentada e sem autorização expressa, a automação é indevida e pode violar termos de uso e legislação |
| **Controles atuais** | Zero integrações externas (Skill 06); Skill 09 proíbe automação sem autorização |
| **Controles propostos** | Gate: nenhuma integração nova sem doc de API + autorização + auditoria; bloqueio de credenciais governamentais em `.env` por política |
| **Resíduo** | Baixo |

## R-06 — Assumir indevidamente responsabilidades do operador

| Campo | Conteúdo |
|-------|----------|
| **Crit.** | **Média-Alta** |
| **Cenário** | Checklists sugerindo "conforme ANAC"; relatório declarando que a operação atende normas; alertas afirmando que o operador está regular |
| **Por que importa** | Responsabilidade pela operação é do operador/piloto remoto (RBAC 100); o software é ferramenta administrativa |
| **Controles atuais** | Qualificações de operador são "declaradas"; documentos sem alerta automático (decisão da Skill 04) |
| **Controles propostos** | Modelos de relatório com rodapé "registro declarado pelo usuário — não constitui parecer de conformidade"; revisão de copy dos checklists |
| **Resíduo** | Médio |

## R-07 — Executar funções que possam caracterizar serviço regulado (UTM)

| Campo | Conteúdo |
|-------|----------|
| **Crit.** | **Alta** (futuro) |
| **Cenário** | Gerenciamento de tráfego não tripulado, coordenação de separação, aceitação de planos de voo, declaração de disponibilidade de espaço |
| **Por que importa** | Serviços UTM são disciplinados pela ICA 100-48/2026; USS é Entidade Autorizada acreditada pelo DECEA (art. 9º) |
| **Controles atuais** | Fora do MVP declarado; nenhuma função de gerenciamento de tráfego existe |
| **Controles propostos** | Linha vermelha em `AI-SECURITY-POLICY`/matriz: sem coordenação de tráfego, sem aceitação de plano de voo; qualquer evolução exige parecer especializado antes do design |
| **Resíduo** | Baixo enquanto permanecer fora do escopo |

---

## Matriz resumida

| ID | Risco | Crit. | Estado do controle |
|----|-------|-------|--------------------|
| R-01 | Percepção falsa de autorização | Alta | Parcial (docs) |
| R-02 | Mapa genérico como oficial | Alta | Parcial (docs) |
| R-03 | Info regulatória desatualizada | Alta | Parcial (changelog) |
| R-04 | Simulação de autorização | Alta | Forte (não existe) |
| R-05 | Integração não autorizada | Alta | Forte (não existe) |
| R-06 | Responsabilidade indevida | Média-Alta | Parcial |
| R-07 | Função de serviço regulado | Alta (futuro) | Forte (fora do escopo) |

**Conclusão:** nenhum risco está **zerado** por implementação — os controles atuais são majoritariamente documentais. A redução efetiva depende das gates de qualidade (Skill 10) e da revisão de copy antes de qualquer release pública.
