# 08 — Matriz de Funcionalidades: Permitidas, Condicionadas e Proibidas

**Projeto:** AeroGrid Brasil
**Versão:** 0.1
**Última atualização:** 2026-11-23

---

> Esta matriz é o controle central de escopo regulatório. Qualquer funcionalidade nova deve ser classificada aqui **antes** de entrar no backlog.

## 1. PERMITIDAS (MVP)

Funcionalidades de gestão empresarial, sem caráter aeronáutico regulado:

- Cadastro de empresas, usuários, permissões e clientes.
- Cadastro de drones (fabricante, modelo, série, características, situação).
- Histórico de manutenção de equipamentos.
- Cadastro de operadores, documentos, validades e qualificações **declaradas**.
- Cadastro de missões (cliente, responsáveis, equipamentos, data, situação, objetivo, observações, histórico).
- Mapas genéricos, coordenadas, waypoints, polígonos, distâncias.
- Importação/exportação GeoJSON.
- Checklists configuráveis, anexos, relatórios internos, histórico de alterações.

## 2. CONDICIONADAS (exigem verificação antes do desenvolvimento)

| Funcionalidade | Condição para avançar | Status atual |
|----------------|------------------------|--------------|
| Qualquer campo ou selo que sugira "documento válido/aprovado" | Verificação jurídica de que não há apropriação indevida de atribuição oficial | Bloqueado |
| Alertas de vencimento de documentos | Análise de que é apenas lembrete de gestão, sem parecer de conformidade | Em análise |
| Qualquer integração com dados oficiais (aeronáuticos ou não) | Contrato/fonte oficial verificada; nada de scraping apresentado como oficial | Bloqueado |
| Exportação de relatórios para fins contratados/licitatórios | Validação comercial + revisão de que o relatório é interno, não documento oficial | Em análise |
| Exibição de zonas, restrições ou áreas de interesse aeronáutico | Estudo regulatório com especialista; fonte oficial comprovada | Bloqueado |
| Plano de missão automatizado (geração de rota/waypoints) | Análise técnica + responsabilidade civil + revisão regulatória | Bloqueado |
| Rastreabilidade para auditorias de clientes | Validação comercial com clientes-alvo | Em análise |

## 3. PROIBIDAS (não desenvolver no MVP)

- Autorização automática de voos.
- Emissão ou simulação de autorizações oficiais.
- Controle remoto de drones, autopiloto, prevenção de colisões.
- Rastreamento aeronáutico em tempo real.
- Controle oficial do espaço aéreo.
- Gestão de corredores aéreos oficiais.
- Serviços USS ou SDSP sem os requisitos e aprovações aplicáveis.
- Integrações oficiais presumidas com DECEA, ANAC, SARPAS ou BR-UTM (inclui logos, textos ou UI que sugiram parceria/credenciamento).
- Inteligência artificial que declare uma operação segura ou autorizada.
- Qualquer afirmação de que o sistema garante conformidade regulatória.
- Representar mapas genéricos como mapas aeronáuticos oficiais.

## 4. Regras de revisão

1. Funcionalidade condicionada só entra no backlog com status "liberado" e registro no documento 10 (histórico de decisões).
2. Reavaliação das proibidas somente após estudo regulatório, técnico e comercial específico.
3. Alterações nesta matriz exigem nova versão do documento e justificativa registrada.
