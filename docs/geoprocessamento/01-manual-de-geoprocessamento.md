# 01 — Manual de Geoprocessamento

**Versão:** 0.1 · **Data:** 2026-11-23

---

## 1. O que é o módulo geográfico do AeroGrid

Um conjunto de ferramentas para **organizar espacialmente** as operações da empresa: marcar pontos, desenhar áreas e trajetos, medir distâncias e áreas, e guardar tudo isso associado a missões.

**O que ele NÃO é:** autorizador de voo, fonte de informação aeronáutica, planejador automático de rota. Detalhes em [08-limitacoes-conhecidas.md](08-limitacoes-conhecidas.md).

## 2. Conceitos usados na interface

| Termo | Significado na tela |
|-------|---------------------|
| **Coordenada** | Par latitude/longitude (WGS 84) no formato `lat, lon` com até 5 casas decimais (~1 m) |
| **Ponto (waypoint)** | Localização única — ex.: ponto de decolagem planejada, marco |
| **Linha** | Sequência de pontos conectados — ex.: trajeto planejado |
| **Polígono** | Área fechada — ex.: área de interesse do cliente |
| **Camada** | Grupo de geometrias com legenda visível sempre |
| **Planejamento geográfico** | Rótulo obrigatório de tudo que o usuário desenha — **nunca** "rota autorizada" |

## 3. Fluxos de uso

### 3.1 Desenhar na missão
1. Abrir missão → aba **Mapa**.
2. Escolher ferramenta: **ponto · linha · polígono · apagar**.
3. Clicar para adicionar vértices; duplo clique/Enter fecha linha/polígono.
4. Painel lateral mostra coordenadas e medidas em tempo real.
5. **Salvar** grava a geometria (validação no servidor — doc 06).
6. Exclusão sempre pede confirmação.

### 3.2 Medir
- Distância: soma das arestas em percurso geodésico (doc 07).
- Área: geodésica sobre a elipsoide WGS 84 (doc 07).
- Unidades: m/km e m²/ha/km² com limiares fixos (doc 07 §4).

### 3.3 Importar/Exportar GeoJSON
- Exportar: botão "Exportar GeoJSON" → download `FeatureCollection` (contrato no doc 06).
- Importar: upload com limites de tamanho/quantidade; geometrias inválidas são **rejeitadas com mensagem por item**, nunca aceitas silenciosamente.

### 3.4 Identificação obrigatória
Tela de mapa exibe permanentemente:
- aviso **"Mapa de referência — não é mapa aeronáutico oficial"**;
- legenda de camadas visível;
- proveniência e data do fornecedor de tiles (doc 03).

## 4. Semântica de cores e status

Nenhuma cor de geometria/status significa "liberado", "seguro" ou "autorizado para voo" (Skill 01 doc 08 + Skill 05 §13). Cores identificam apenas **tipo de objeto** (ponto/linha/área) e **camada**.

## 5. Responsabilidades do usuário

O usuário é responsável por:
- conferir se a coordenada corresponde ao local pretendido;
- entender que medidas são estimativas geométricas (doc 07);
- seguir seus próprios procedimentos operacionais — o software não substitui nenhum procedimento regulatório.

## 6. Estado do documento

Especificação funcional. As telas correspondentes **ainda não foram implementadas** — não confundir com funcionalidade entregue (Skill 04 §16).
