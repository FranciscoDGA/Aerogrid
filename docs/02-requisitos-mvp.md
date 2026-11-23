# 02 — Requisitos do MVP

**Projeto:** AeroGrid Brasil
**Versão:** 0.1 (rascunho inicial — sujeito a validação técnica e comercial)
**Última atualização:** 2026-11-23

---

## 1. Contexto

Este documento define o escopo mínimo do MVP do AeroGrid Brasil. A inclusão definitiva de cada requisito depende de validação técnica e comercial. Requisitos marcados como **[CONDICIONADO]** exigem verificação prévia (regulatória, técnica ou comercial) antes de desenvolvimento — ver documento 08.

## 2. Requisitos funcionais

### A. Gestão empresarial

| ID | Requisito | Prioridade |
|----|-----------|------------|
| A1 | Cadastro de empresas (tenant) | Obrigatório |
| A2 | Cadastro de usuários | Obrigatório |
| A3 | Controle de permissões por papel (ex.: admin, gestor, operador) | Obrigatório |
| A4 | Cadastro de clientes da empresa | Obrigatório |
| A5 | Isolamento total dos dados entre empresas | Obrigatório (crítico) |

### B. Gestão de equipamentos

| ID | Requisito | Prioridade |
|----|-----------|------------|
| B1 | Cadastro de drones | Obrigatório |
| B2 | Fabricante e modelo | Obrigatório |
| B3 | Número de série | Obrigatório |
| B4 | Características técnicas (campos configuráveis) | Obrigatório |
| B5 | Situação do equipamento (ex.: disponível, em uso, manutenção, inativo) | Obrigatório |
| B6 | Histórico de manutenção | Desejável — validar relevância comercial |

### C. Gestão de operadores

| ID | Requisito | Prioridade |
|----|-----------|------------|
| C1 | Cadastro de operadores | Obrigatório |
| C2 | Controle de documentos com data de validade | Obrigatório |
| C3 | Qualificações **declaradas** pelo operador (sem validação oficial) | Obrigatório — ver nota 1 |
| C4 | Histórico de participação em missões | Obrigatório |

> **Nota 1:** o sistema registra informações declaradas pela empresa. Não valida, certifica nem substitui documentos oficiais. Nenhuma UI pode sugerir que o AeroGrid certifica qualificações.

### D. Gestão de missões

| ID | Requisito | Prioridade |
|----|-----------|------------|
| D1 | Cadastro de missões | Obrigatório |
| D2 | Vinculação com cliente | Obrigatório |
| D3 | Responsáveis (usuários/operadores) | Obrigatório |
| D4 | Equipamentos utilizados | Obrigatório |
| D5 | Data e situação (ex.: planejada, em andamento, concluída, cancelada) | Obrigatório |
| D6 | Objetivo da operação (texto livre) | Obrigatório |
| D7 | Observações | Obrigatório |
| D8 | Histórico da missão | Obrigatório |
| D9 | Anexos de arquivos por missão | Obrigatório |

### E. Planejamento geográfico

| ID | Requisito | Prioridade |
|----|-----------|------------|
| E1 | Visualização de mapas | Obrigatório |
| E2 | Registro de coordenadas | Obrigatório |
| E3 | Origem e destino | Obrigatório |
| E4 | Waypoints | Obrigatório |
| E5 | Polígonos | Obrigatório |
| E6 | Cálculo de distâncias | Obrigatório |
| E7 | Importação de GeoJSON | Obrigatório |
| E8 | Exportação de GeoJSON | Obrigatório |
| E9 | Qualquer camada apresentada como "oficial" ou "aeronáutica" | **Proibido** — ver documento 8 |

> **Nota 2:** os tiles de mapa devem ser identificados como mapas genéricos. Proibido exibir conteúdo que sugira ser mapa aeronáutico oficial ou fonte oficial de restrições de voo.

### F. Documentação

| ID | Requisito | Prioridade |
|----|-----------|------------|
| F1 | Checklists configuráveis (modelo + preenchimento por missão) | Obrigatório |
| F2 | Arquivos anexados | Obrigatório |
| F3 | Relatórios (a definir formato na validação) | Obrigatório — escopo mínimo a validar |
| F4 | Histórico de alterações (auditoria básica) | Obrigatório |

## 3. Requisitos não funcionais

| ID | Requisito |
|----|-----------|
| NF1 | Multi-tenant com isolamento obrigatório por empresa |
| NF2 | Controle de acesso baseado em papéis |
| NF3 | Interface responsiva (computador e dispositivos móveis) |
| NF4 | Fácil de aprender, intuitiva, rápida, organizada |
| NF5 | Acessibilidade básica |
| NF6 | Backup e integridade dos dados |
| NF7 | Registro de auditoria de alterações sensíveis |
| NF8 | Conformidade com LGPD no tratamento de dados pessoais (ver nota 3) |

> **Nota 3:** a adequação formal à LGPD deve ser revisada por especialista; este documento não constitui análise jurídica.

## 4. Explicitamente fora do escopo do MVP

- Autorização automática de voos.
- Controle remoto de drones / autopiloto / prevenção de colisões.
- Rastreamento aeronáutico em tempo real.
- Controle oficial do espaço aéreo ou emissão de autorizações.
- Corredores aéreos oficiais.
- USS / SDSP sem requisitos e aprovações aplicáveis.
- Integrações oficiais presumidas com DECEA, ANAC, SARPAS ou BR-UTM.
- IA que declare operação segura ou autorizada.

## 5. Critérios de aceitação

Critérios detalhados por requisito serão registrados no documento **07 — Critérios de aceitação** conforme o backlog for sendo priorizado (documento 06).
