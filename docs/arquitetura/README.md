# AeroGrid Brasil — Documentação Arquitetural

Documentação técnica exigida pela Skill 02 (Arquitetura e Engenharia de Software), seção 13.

## Índice

| # | Documento | Arquivo | Status |
|---|-----------|---------|--------|
| 1 | Diagrama de arquitetura | `01-diagrama-de-arquitetura.md` | Criado |
| 2 | Estrutura de diretórios | `02-estrutura-de-diretorios.md` | Criado |
| 3 | Modelo entidade-relacionamento | `03-modelo-entidade-relacionamento.md` | Criado (v0.1 — revisar com Skill 06) |
| 4 | Dicionário de dados | `04-dicionario-de-dados.md` | Criado (núcleo inicial) |
| 5 | Contratos de APIs | `05-contratos-de-api.md` | Criado (v1 — interna) |
| 6 | Registro de decisões arquiteturais (ADR) | `06-adrs.md` | Criado (ADR-001 a 010) |
| 7 | Plano de migrações | `07-plano-de-migracoes.md` | Criado |
| 8 | Mapa de dependências | `08-mapa-de-dependencias.md` | Criado |
| 9 | Instruções de desenvolvimento local | `09-desenvolvimento-local.md` | Criado (pré-código) |
| 10 | Procedimentos de backup e recuperação | `10-backup-e-recuperacao.md` | Criado (rascunho — ajustar ao provedor real) |

## Relação com os documentos de produto

- Requisitos funcionais: `../02-requisitos-mvp.md`
- Matriz permitido/condicionado/proibido: `../08-matriz-funcionalidades.md`
- Nenhum ADR pode violar a matriz da Skill 01.

## Regras de atualização

- Todo ADR novo precisa de número, data, status (proposto/aceito/obsoleto) e justificativa.
- Mudança de modelo de dados exige nova migração + atualização dos documentos 3 e 4.
- Nenhuma integração oficial (ANAC, DECEA, SARPAS, BR-UTM) pode ser presumida em qualquer documento desta pasta.
