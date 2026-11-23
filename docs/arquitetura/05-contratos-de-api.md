# 05 — Contratos de APIs

**Versão:** 1.0 (interna) · **Status:** proposto · **Data:** 2026-11-23

---

## 1. Princípios

1. Contratos explícitos e validados com **Zod na entrada e na saída** (Skill 02, 8).
2. **Autorização sempre no servidor**: sessão → membership → papel. O `organization_id` vem da sessão, nunca do body (Skill 02, 5.3).
3. Erros em formato único; logs sem dados sensíveis.
4. Paginação obrigatória em listas; rate limit em endpoints públicos.
5. Nenhuma rota presume disponibilidade de API oficial de órgão externo (ADR-010).

## 2. Formato padrão

**Sucesso (lista):**
```json
{ "data": [...], "page": { "limit": 20, "cursor": "uuid", "next": true } }
```

**Erro:**
```json
{ "error": { "code": "FORBIDDEN", "message": "Sem acesso a este recurso." } }
```

| Código HTTP | code | Quando |
|-------------|------|--------|
| 400 | VALIDATION_ERROR | Falha no Zod |
| 401 | UNAUTHENTICATED | Sem sessão |
| 403 | FORBIDDEN | Membership/papel insuficiente ou cruzamento de tenant |
| 404 | NOT_FOUND | Inexistente **ou** de outra org (não vazar existência) |
| 409 | CONFLICT | Violação de unique |
| 429 | RATE_LIMITED | Limite excedido |
| 500 | INTERNAL | Erro inesperado (sem stack ao cliente) |

## 3. Endpoints (v1) — escopo do MVP

Base: `/api/v1`. Auth: cookie de sessão Supabase (mesmo pipeline das Server Actions).

| Método | Rota | Papel mínimo | Observação |
|--------|------|--------------|------------|
| GET | /organizations/current | member | dados da org da sessão |
| PATCH | /organizations/current | admin | |
| GET/POST | /clients | member / admin | filtro `?q=&limit=&cursor=` |
| GET/PATCH/DELETE | /clients/:id | member / admin | DELETE = lógico |
| GET/POST | /drones | member / admin | |
| GET/PATCH/DELETE | /drones/:id | member / admin | |
| GET/POST | /drones/:id/maintenance | member / admin | |
| GET/POST | /operators | member / admin | |
| GET/PATCH/DELETE | /operators/:id | member / admin | |
| GET/POST | /operators/:id/documents | member / admin | |
| GET/POST | /missions | member / admin | |
| GET/PATCH | /missions/:id | member / admin | |
| POST | /missions/:id/geometries | member | GeoJSON validado (§5) |
| GET | /missions/:id/geometries | member | FeatureCollection |
| POST | /missions/:id/checklists/:templateId | member | responde template |
| POST | /attachments | member | multipart,限 10 MB (ajustar) |
| GET | /attachments/:id | member | redireciona p/ URL assinada (expira em 5 min) |
| GET | /reports?type=mission_summary&missionId= | member | gera relatório interno |
| GET | /audit-logs | admin | paginação |

Mutação interna da UI pode usar **Server Actions** com os mesmos schemas — a API existe para contratos externos e testes.

## 4. Exemplo — POST /missions

Request:
```json
{
  "clientId": "uuid",
  "responsibleUserId": "uuid",
  "title": "Levantamento área X",
  "objective": "Mapeamento topográfico",
  "missionDate": "2026-12-01",
  "droneIds": ["uuid"],
  "operatorIds": ["uuid"]
}
```
Resposta `201`: `{ "data": { "id": "uuid", "sequenceNumber": 42, "status": "planned", ... } }`

Validação (Zod, resumo): UUIDs obrigatórios; `missionDate` ISO date; `title` 3–120 chars; arrays máx. 20 itens; **coerência org↔cliente** verificada no servidor (404 se não pertencer à org).

## 5. Geoprocessamento (API interna + lib geo)

- Entrada aceita: `FeatureCollection` GeoJSON com Point/LineString/Polygon, SRID 4326.
- Rejeitar: geometrias com coordenadas fora de [-90,90]/[-180,180], polígonos inválidos (`ST_IsValid`), tamanho > 1 MB.
- Distância: `ST_Distance` com geografia (metros), devolvido em metros.
- **Proibido** (doc 08): endpoints que classifiquem área como "autorizada", "liberada" ou "segura para voo". A resposta traz apenas geometria e métricas — sem semântica aeronáutica.
- Camadas de mapa do frontend vêm de provedor com licença verificada (ADR-005), nunca rotuladas como oficiais.

## 6. Segurança transversal

- Rate limit: 100 req/min por sessão em `/api/v1` (ajustar com métricas).
- Headers: `Cache-Control: no-store` em dados empresariais.
- Validação de Content-Type e limite de body (256 KB JSON).
- Anexos: MIME permitido (pdf, jpg, png, csv, geojson), antimalware na entrada conforme infra disponível, armazenamento com path `orgId/...`.
- Auditoria: toda mutação registra `audit_logs` (exceto leituras).
