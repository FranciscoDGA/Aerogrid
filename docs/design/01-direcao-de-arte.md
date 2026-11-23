# 01 — Direção de Arte

**Versão:** 0.1 · **Data:** 2026-11-23 · **Status:** proposta inicial

---

## 1. O que o AeroGrid deve transmitir

Tecnologia · Precisão · Confiança · Segurança · Organização · Modernidade · Profissionalismo · Inteligência geográfica.

**Leitura do contexto:** o usuário é um gestor de operação (dono, coordenador) que precisa de clareza para decidir rápido — não é entusiasta de tecnologia. A interface deve parecer uma **ferramenta de trabalho séria**, divertida o suficiente para não ser chata, jamais "brinquedo".

## 2. Conceito criativo: "Grade em voo"

O nome **Aero** (ar, voo) + **Grid** (grade, organização) traduz visualmente a proposta:

- **Grade** = organização, dados, método (linhas sutis, alinhamento rigoroso, tabelas bem resolvidas).
- **Voo** = movimento, rota, waypoints (traços que atravessam a grade, pontos conectados).

Aplicação: elementos gráficos auxiliares usam linhas de grade finas e traços de rota; nunca decoração aleatória. Onde não há função, não há ornamento.

## 3. Princípios de estilo

| Princípio | Significado prático |
|-----------|----------------------|
| Superfície calma | Fundos branco/cinza claro; cor institucional reservada para ação e estrutura |
| Informação em primeiro lugar | Dados > chrome da interface; tabelas e listas são heróis |
| Profundidade sutil | Bordas e sombras leves; nada de "cards flutuando" sem motivo |
| Precisão geométrica | Raios pequenos (4–8px), alinhamento à grade de 4px |
| Contraste com propósito | Azul = marca/ação; verde/amarelo/vermelho = semântica; nunca decoração |
| Sem slop | Proibido: gradientes decorativos, glows, ilustrações genéricas, animações gratuitas |

## 4. Paleta conceitual (resumo — tokens no doc 03)

- **Institucional:** azul profundo (navy) como âncora de confiança e vínculo com o universo aeronáutico.
- **Tecnológico:** tons de azul para dados, links e elementos de interface.
- **Neutros:** branco e cinza para organização e respiro.
- **Semânticos:** verde (positivo), amarelo/laranja (alerta), vermelho (erro/crítico).

Nunca grandes áreas saturadas; cor grande só em estados e ações.

## 5. Estilo de imagem e ícones

- Ícones: estilo line (traço uniforme), 20/24px, sempre com `aria-label` ou texto.
- Ilustrações: mínimas — restritas a **estados vazios** (ex.: "nenhuma missão ainda" com arte leve de rota/waypoint).
- Fotografia: não usar no produto (reservada ao marketing); no produto, geometria + dados.
- Mapas: camada base discreta (cinza/azul acinzentado) para os dados do usuário brilharem; ver doc 08 (mapas) e doc 05 da Skill 01.

## 6. Tom de voz da interface

- PT-BR, direto, sem jargão aeronáutico não explicado (fundador e usuários não são especialistas).
- Verbos de ação nos botões: "Criar missão", "Salvar", "Adicionar drone".
- Mensagens de erro: o que houve + o que fazer ("Não foi possível salvar. Verifique os campos destacados.").
- Nunca prometer: autorização, conformidade, liberação de voo (princípios da Skill 01).

## 7. Referências de qualidade (não de cópia)

Benchmark de qualidade SaaS profissional (estudar padrões, **não copiar identidades**): densidade informativa de ferramentas como Linear/Notion para ritmo e clareza; seriedade de painéis de operações; clareza de produtos cartográficos. Identidades visuais de concorrentes de drones são explicitamente fora-limits (Skill 03, §4).

## 8. Fora do escopo estético

- Aparência de template genérico (tema comprado sem adaptação).
- Painel administrativo improvisado (bootstrap default).
- Estética "experimental"/beta eterna.
- Semelhança perceptível com identidades de concorrentes.
