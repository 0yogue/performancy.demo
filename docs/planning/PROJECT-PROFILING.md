# 🔍 Profiling Completo do Projeto Performancy

**Data:** 29 de Novembro de 2025  
**Objetivo:** Mapear esforço necessário para produção 100%

---

## 📊 Resumo Executivo

| Categoria | Status | Esforço Estimado |
|-----------|--------|------------------|
| **App Next.js** | 🟡 70% | 40-60h |
| **Coach Extension** | 🟡 65% | 30-50h |
| **Coach API** | 🔴 50% | 40-60h |
| **Integrações** | 🔴 20% | 80-120h |
| **Segurança** | 🟡 75% | 15-25h |
| **TOTAL** | **~60%** | **205-315h** |

---

## 🔴 CRÍTICO - Dados Mockados que Precisam ser Resolvidos

### 1. Dashboard (`lib/mock-data.ts`)
**Arquivos afetados:** `app/[company_slug]/dashboard/page.tsx`

```typescript
// MOCK: get_dashboard_data() retorna dados hardcoded
// PRECISA: Buscar de APIs reais / banco de dados

Dados mockados:
- ARR/MRR history (12 meses fixos)
- Funnel stages com valores fixos
- Pipeline velocity
- Forecast data
- Alerts
```

**Esforço:** 20-30h
- Criar tabelas no Prisma para métricas
- Implementar agregações de dados reais
- Jobs para calcular métricas diariamente

---

### 2. Conversas e Análises (`data/mock/`)
**Arquivos afetados:**
- `data/mock/all-conversations-data.ts` (27KB!)
- `data/mock/conversation-analysis-data.ts`
- `data/mock/conversation-analysis-amanda.ts`
- `data/mock/conversations-list.ts`

```typescript
// MOCK: Conversas e análises completamente fictícias
// PRECISA: Processar áudio real → transcrição → análise IA
```

**Esforço:** 40-60h
- Implementar pipeline de transcrição (Whisper)
- Integrar análise com Anthropic/OpenAI
- Armazenar e indexar conversas no banco

---

### 3. Insights Operacionais
**Arquivo:** `lib/mock-data.ts::get_operational_insights()`

```typescript
// MOCK: Scorecards, alerts, ranking de reps
// PRECISA: Calcular a partir de dados reais
```

**Esforço:** 15-25h

---

### 4. Inteligência de Conversas
**Arquivo:** `lib/mock-data.ts::get_conversation_intelligence()`

```typescript
// MOCK: Objeções, concorrentes, temas emergentes
// PRECISA: NLP para extrair insights de transcrições
```

**Esforço:** 30-40h

---

### 5. Pipeline/Deals
**Arquivo:** `lib/mock-pipeline.ts`
**Usado em:** `app/[company_slug]/pipeline/page.tsx`

```typescript
// MOCK: Deals estáticos para o Kanban
// PRECISA: Integração com CRM real
```

**Esforço:** 20-30h

---

### 6. Inbox
**Arquivo:** `app/[company_slug]/inbox/page.tsx`

```typescript
// MOCK: mock_messages, mock_contacts
// PRECISA: Integração WhatsApp/Email real
```

**Esforço:** 40-60h (integrações complexas)

---

### 7. Calendar
**Arquivo:** `app/[company_slug]/calendar/page.tsx`

```typescript
// MOCK: mock_events, mock_participants
// PRECISA: Integração Google Calendar/Outlook
```

**Esforço:** 15-25h

---

## 🟠 APIs que NÃO EXISTEM no Backend

### Coach API - Rotas Faltando

| Rota Chamada | Existe? | Ação |
|--------------|---------|------|
| `POST /api/v1/calls/:id/sync` | ❌ NÃO | Criar para sync incremental |
| `GET /api/v1/playbooks/:id` | ❌ NÃO | Criar para carregar playbook |
| `POST /api/v1/transcription/whisper` | ⚠️ Parcial | Falta integração real |

**Esforço:** 15-20h

---

### Next.js API - Rotas Incompletas

| Rota | Status | Problema |
|------|--------|----------|
| `/api/v1/coach/sessions` | ⚠️ | Usa Prisma mas schema pode não estar sincronizado |
| `/api/search` | ⚠️ | Usa mock para histórico |
| `/api/search/history` | ⚠️ | `mock_search_history` hardcoded |

---

## 🟡 Inconsistências de Código

### 1. Duas Bases de Dados Prisma

```
/prisma/schema.prisma           → App principal
/coach/coach-api/prisma/schema.prisma → Coach API separado
```

**Problema:** Duplicação de modelos e potencial dessincronização
**Solução:** Unificar schemas ou usar monorepo approach

**Esforço:** 8-12h

---

### 2. Variáveis de Ambiente Inconsistentes

```env
# App principal usa:
DATABASE_URL
ANTHROPIC_API_KEY
NEXTAUTH_SECRET

# Coach API usa:
DATABASE_URL (diferente?)
WHISPER_API_KEY (não existe no env principal)
```

**Esforço:** 2-4h para unificar

---

### 3. Tipagem Fraca em Alguns Lugares

```typescript
// lib/anthropic.ts
interface SearchResults {
  leads: any[];      // ❌ Deveria ser Lead[]
  deals: any[];      // ❌ Deveria ser Deal[]
}

// Vários lugares usando 'as any' para bypass de tipos
```

**Esforço:** 8-15h para tipar corretamente

---

### 4. Rate Limiting Mock

```typescript
// lib/rate-limit.ts
// Em DEV, usa mock_limiter que sempre retorna sucesso
// Em PROD, precisa de Upstash configurado
```

**Risco:** Sem proteção real em dev/staging
**Esforço:** 2-4h para configurar Upstash

---

## 🔴 Integrações Não Implementadas

### CRMs (Prioridade ALTA)
| CRM | Status | Esforço |
|-----|--------|---------|
| Zoho | ❌ Não implementado | 20-30h |
| HubSpot | ❌ Não implementado | 20-30h |
| Salesforce | ❌ Não implementado | 25-35h |
| Pipedrive | ❌ Não implementado | 15-20h |

### Comunicação
| Serviço | Status | Esforço |
|---------|--------|---------|
| WhatsApp (Twilio) | ❌ Estrutura só | 20-30h |
| Email (SendGrid/etc) | ❌ Não implementado | 10-15h |
| Google Meet API | ⚠️ Parcial (só detecção) | 10-15h |
| Zoom API | ⚠️ Parcial | 10-15h |

### Calendários
| Serviço | Status | Esforço |
|---------|--------|---------|
| Google Calendar | ❌ Não implementado | 10-15h |
| Outlook/Microsoft | ❌ Não implementado | 10-15h |

---

## 🟡 Coach Extension - Gaps

### 1. Transcrição Real
```typescript
// transcription-manager.ts
// Prioridade: Captions > Whisper > Web Speech
// PROBLEMA: Whisper não está funcionando (sem backend)
```

**Esforço:** 15-20h

### 2. Audio Capture
```typescript
// audio-capture.ts
// Captura funciona, mas envio para Whisper não
```

**Esforço:** 10-15h

### 3. Battle Cards
```typescript
// BattleCardModal.tsx
// Dados mockados, não busca de API
```

**Esforço:** 5-8h

### 4. Plataformas (Zoom/Teams)
```typescript
// zoom.ts, teams.ts
// Estrutura criada, mas seletores podem estar desatualizados
```

**Esforço:** 8-12h para testar e ajustar

---

## ✅ O que ESTÁ Funcionando

1. **Autenticação**
   - NextAuth configurado ✅
   - Login da extensão com JWT ✅
   - Rate limiting (mock em dev) ✅

2. **Multi-tenancy**
   - Middleware de company ✅
   - Isolamento por company_id ✅

3. **RBAC**
   - Roles implementados ✅
   - Permissões por feature ✅

4. **UI/UX**
   - Design system consistente ✅
   - Paleta de cores Performancy ✅
   - Responsividade ✅

5. **Roleplay**
   - Sessões funcionais ✅
   - Análise mock (precisa Anthropic key) ✅
   - Badges e streaks ✅

---

## 📋 Priorização Recomendada

### Sprint 1 (40h) - Fundação
- [ ] Unificar schemas Prisma
- [ ] Configurar variáveis de ambiente
- [ ] Criar rota `/sync` no Coach API
- [ ] Configurar Anthropic API key

### Sprint 2 (60h) - Conversas Reais
- [ ] Implementar Whisper real
- [ ] Pipeline transcrição → análise
- [ ] Armazenar conversas no banco

### Sprint 3 (40h) - Dashboard Real
- [ ] Substituir mock de métricas
- [ ] Criar jobs de agregação
- [ ] Calcular KPIs reais

### Sprint 4 (80h) - Integrações
- [ ] Integrar 1 CRM (Zoho ou HubSpot)
- [ ] Integrar WhatsApp básico
- [ ] Google Calendar

### Sprint 5 (40h) - Polish
- [ ] Tipar todo código
- [ ] Testes automatizados
- [ ] Documentação API

---

## 💰 Estimativa de Custo

| Recurso | Taxa/h | Horas | Total |
|---------|--------|-------|-------|
| Dev Senior | R$ 200 | 160h | R$ 32.000 |
| Dev Pleno | R$ 120 | 100h | R$ 12.000 |
| DevOps | R$ 180 | 40h | R$ 7.200 |
| **TOTAL** | - | 300h | **R$ 51.200** |

*Considerando cenário mediano (260h)*

---

## 🎯 Conclusão

O projeto tem uma **base sólida de 60%**, mas há trabalho significativo para chegar a 100%:

1. **Remover mocks** é o maior esforço (120-180h)
2. **Integrações** são complexas mas bem definidas (80-120h)
3. **Código existente** está razoavelmente organizado

**Recomendação:** Focar primeiro em ter 1 fluxo funcionando end-to-end (call → transcrição → análise → dashboard) antes de expandir integrações.

---

*Documento gerado automaticamente por Cascade AI*
