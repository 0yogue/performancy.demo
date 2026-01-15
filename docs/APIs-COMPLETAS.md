# 🔌 APIs Completas - Performancy

Documentação de todas as APIs REST implementadas no sistema.

**Última Atualização:** 5 de Dezembro de 2025  
**Versão:** 2.1.0

---

## 📋 Índice

- [Autenticação](#autenticação)
- [Usuários](#usuários)
- [Empresas](#empresas)
- [Squads](#squads)
- [Menu](#menu)
- [Busca Inteligente](#busca-inteligente)
- [Admin - Features](#admin-features)
- [Admin - Menu](#admin-menu)
- [Coach ao Vivo (v1)](#coach-ao-vivo-v1)
- [Role Play (v1)](#role-play-v1)
- [OKRs (v1)](#okrs---objectives-and-key-results-v1)

---

## 🔐 Autenticação

Todas as APIs requerem autenticação via **NextAuth.js v5** com estratégia JWT.

### Como Autenticar

```typescript
import { auth } from '@/lib/auth';

const session = await auth();
if (!session?.user) {
  return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
}

const user = session.user as any;
// user.id, user.email, user.role, user.company_id, user.company_slug
```

### Session Object

```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'DIRECTOR' | 'MANAGER' | 'AGENT';
    company_id: string | null;
    company_slug: string;
    company_name: string;
  }
}
```

---

## 👥 Usuários

### POST `/api/users`
Cria um novo usuário.

**Permissões:** ADMIN, DIRECTOR, MANAGER  
**Método:** POST  
**Content-Type:** application/json

**Body:**
```json
{
  "email": "usuario@empresa.com",
  "name": "Nome Completo",
  "linkedin": "https://linkedin.com/in/usuario",
  "role": "AGENT",
  "area": "SALES",
  "squad_id": "clx123",
  "company_id": "clx456"
}
```

**Campos:**
- `email` (required, string): Email único
- `name` (required, string): Nome completo (min 3 chars)
- `linkedin` (optional, string): URL do LinkedIn
- `role` (required, enum): `DIRECTOR`, `MANAGER`, `AGENT` (nunca `ADMIN`)
- `area` (optional, enum, default `SALES`): `SALES`, `MARKETING`, `CX_CS`, `GTM`
- `squad_id` (optional, string): ID do squad
- `company_id` (conditional, string): Obrigatório apenas para ADMIN

**Response 201:**
```json
{
  "id": "clx123...",
  "email": "usuario@empresa.com",
  "name": "Nome Completo",
  "role": "AGENT",
  "area": "SALES",
  "status": "ACTIVE",
  "company": {
    "id": "clx456",
    "name": "Empresa XYZ",
    "slug": "empresa-xyz"
  },
  "generated_password": "empresa-a7x",
  "created_at": "2025-11-19T10:00:00.000Z"
}
```

**Errors:**
- `400`: Dados inválidos
- `401`: Não autenticado
- `403`: Sem permissão (AGENT tentando criar)
- `404`: Empresa ou Squad não encontrado
- `409`: Email já cadastrado

---

### GET `/api/users`
Lista usuários do sistema.

**Permissões:** ADMIN, DIRECTOR, MANAGER  
**Método:** GET

**Filtros:**
- ADMIN: vê todos usuários de todas empresas
- DIRECTOR/MANAGER: apenas usuários da própria empresa

**Response 200:**
```json
{
  "users": [
    {
      "id": "clx123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "AGENT",
      "status": "ACTIVE",
      "avatar_url": null,
      "company_id": "clx456",
      "company": {
        "id": "clx456",
        "name": "Empresa XYZ",
        "slug": "empresa-xyz"
      },
      "created_at": "2025-11-16T22:00:00.000Z",
      "last_login_at": "2025-11-19T10:30:00.000Z"
    }
  ]
}
```

---

### GET `/api/users/[id]`
Busca dados de um usuário específico.

**Permissões:**
- ADMIN: qualquer usuário
- DIRECTOR/MANAGER: usuários da mesma empresa
- AGENT: apenas próprios dados

**Método:** GET

**Response 200:**
```json
{
  "user": {
    "id": "clx123",
    "email": "user@example.com",
    "name": "John Doe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "role": "AGENT",
    "area": "SALES",
    "status": "ACTIVE",
    "company": {
      "id": "clx456",
      "name": "Empresa XYZ",
      "slug": "empresa-xyz"
    },
    "squad_memberships": [
      {
        "squad_id": "clx789",
        "squad": {
          "id": "clx789",
          "name": "Enterprise Sales"
        }
      }
    ],
    "created_at": "2025-11-16T22:00:00.000Z"
  }
}
```

**Errors:**
- `401`: Não autenticado
- `403`: Sem permissão
- `404`: Usuário não encontrado

---

### PATCH `/api/users/[id]`
Atualiza dados de um usuário.

**Permissões:**
- ADMIN: qualquer usuário
- DIRECTOR: usuários da mesma empresa
- MANAGER: apenas AGENTs da mesma empresa
- AGENT: apenas próprios dados (não pode alterar role)

**Método:** PATCH  
**Content-Type:** application/json

**Body:**
```json
{
  "name": "John Doe Updated",
  "email": "newemail@example.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "role": "MANAGER",
  "area": "SALES",
  "status": "ACTIVE",
  "squad_id": "clx789"
}
```

**Regras:**
- Apenas ADMIN pode alterar `role`
- Email deve ser único no sistema
- Squad deve pertencer à mesma empresa do usuário
- Audit log criado automaticamente

**Response 200:**
```json
{
  "message": "Usuário atualizado com sucesso",
  "user": {
    "id": "clx123",
    "email": "newemail@example.com",
    "name": "John Doe Updated",
    "role": "MANAGER",
    "area": "SALES",
    "status": "ACTIVE"
  }
}
```

**Errors:**
- `400`: Email já em uso, dados inválidos
- `401`: Não autenticado
- `403`: Sem permissão ou tentando alterar role sem ser ADMIN
- `404`: Usuário não encontrado

---

### POST `/api/users/[id]/deactivate`
Desativa um usuário (soft delete).

**Permissões:**
- ADMIN: qualquer usuário (exceto outros ADMINs)
- DIRECTOR: usuários da mesma empresa
- MANAGER: apenas AGENTs da mesma empresa

**Método:** POST

**Regras:**
- Não pode desativar a si mesmo
- Não pode desativar usuários ADMIN
- Muda `status` para `INACTIVE`
- Audit log criado automaticamente

**Response 200:**
```json
{
  "message": "Usuário desativado com sucesso",
  "user": {
    "id": "clx123",
    "email": "user@example.com",
    "status": "INACTIVE"
  }
}
```

**Errors:**
- `400`: Tentando desativar a si mesmo ou usuário ADMIN
- `401`: Não autenticado
- `403`: Sem permissão
- `404`: Usuário não encontrado

---

### POST `/api/users/[id]/reactivate`
Reativa um usuário previamente desativado.

**Permissões:**
- ADMIN: qualquer usuário
- DIRECTOR: usuários da mesma empresa

**Método:** POST

**Regras:**
- Usuário deve estar com status `INACTIVE`
- Muda `status` para `ACTIVE`
- Audit log criado automaticamente

**Response 200:**
```json
{
  "message": "Usuário reativado com sucesso",
  "user": {
    "id": "clx123",
    "email": "user@example.com",
    "status": "ACTIVE"
  }
}
```

**Errors:**
- `400`: Usuário já está ativo
- `401`: Não autenticado
- `403`: Sem permissão
- `404`: Usuário não encontrado

---

## 🏢 Empresas

### GET `/api/companies`
Lista empresas (autocomplete para ADMIN).

**Permissões:** ADMIN only  
**Método:** GET

**Query Params:**
- `search` (optional, string): Busca por nome ou slug

**Response 200:**
```json
{
  "companies": [
    {
      "id": "clx123",
      "name": "Empresa XYZ",
      "slug": "empresa-xyz",
      "domain": "empresa-xyz.com.br",
      "created_at": "2025-01-01T00:00:00.000Z",
      "_count": {
        "users": 25
      }
    }
  ]
}
```

**Limit:** 50 resultados (para autocomplete)

**Errors:**
- `401`: Não autenticado
- `403`: Apenas ADMIN pode listar empresas

---

## 👨‍👩‍👧‍👦 Squads

### GET `/api/squads`
Lista squads/times.

**Permissões:** Todos (filtrado por empresa)  
**Método:** GET

**Query Params:**
- `company_id` (conditional, string): Obrigatório para ADMIN, ignorado para outros roles

**Filtros:**
- ADMIN: deve especificar `company_id` via query param
- DIRECTOR/MANAGER/AGENT: automaticamente filtrado pela própria empresa

**Response 200:**
```json
{
  "squads": [
    {
      "id": "clx123",
      "name": "Enterprise Sales",
      "type": "sales",
      "target_monthly": 500000.00,
      "_count": {
        "members": 8
      }
    }
  ]
}
```

**Errors:**
- `400`: ADMIN sem company_id ou usuário sem empresa
- `401`: Não autenticado

---

## 🧭 Menu

### GET `/api/menu`
Retorna menu do usuário (itens visíveis baseados em role + overrides).

**Permissões:** Todos  
**Método:** GET

**Query Params:**
- `user_id` (required, string): ID do usuário
- `role` (required, enum): Role do usuário

**Response 200:**
```json
{
  "menu_items": [
    {
      "id": "clx123",
      "key": "dashboard",
      "title": "Dashboard",
      "href": "/dashboard",
      "icon": "LayoutDashboard",
      "description": "Visão geral e métricas",
      "order": 0,
      "visible": true
    }
  ]
}
```

**Cache:** 1 hora (public, s-maxage=3600)

**Errors:**
- `400`: user_id ou role faltando

---

## 🔍 Busca Inteligente

### POST `/api/search`
Busca inteligente com análise LLM.

**Permissões:** Todos  
**Método:** POST  
**Content-Type:** application/json

**Body:**
```json
{
  "query": "leads que mencionaram preço",
  "company_slug": "empresa-xyz"
}
```

**Response 200:**
```json
{
  "search_id": "clx123",
  "query": "leads que mencionaram preço",
  "search_results": {
    "leads": [...],
    "deals": [...],
    "conversations": [...],
    "users": [...],
    "playbooks": [...]
  },
  "llm_analysis": {
    "summary": "Encontrados 5 leads...",
    "insights": [...],
    "recommendations": [...],
    "tokens_used": 1200
  },
  "processing_time_ms": 850,
  "created_at": "2025-11-19T10:00:00.000Z"
}
```

---

### GET `/api/search/[id]`
Busca detalhes de uma pesquisa anterior.

**Permissões:**
- ADMIN: todas as buscas
- DIRECTOR: buscas da empresa
- MANAGER/AGENT: apenas próprias buscas

**Método:** GET

**Response 200:**
```json
{
  "id": "clx123",
  "query": "leads que mencionaram preço",
  "search_results": {...},
  "llm_analysis": {...},
  "user": {
    "name": "John Doe",
    "role": "AGENT"
  },
  "created_at": "2025-11-19T10:00:00.000Z"
}
```

**Errors:**
- `401`: Não autenticado
- `403`: Sem permissão para acessar esta busca
- `404`: Busca não encontrada

---

## 🔧 Admin - Features

### GET `/api/admin/features?company_id=xxx`
Lista feature overrides de uma empresa.

**Permissões:** ADMIN only  
**Método:** GET

**Query Params:**
- `company_id` (required, string): ID da empresa

**Response 200:**
```json
{
  "company": {
    "id": "clx123",
    "name": "Empresa XYZ",
    "plan": "PROFESSIONAL"
  },
  "overrides": [
    {
      "id": "clx456",
      "feature": "bots",
      "enabled": true,
      "reason": "Trial de 30 dias",
      "expires_at": "2025-12-31T23:59:59.000Z",
      "created_at": "2025-11-01T00:00:00.000Z",
      "updated_at": "2025-11-01T00:00:00.000Z"
    }
  ]
}
```

**Errors:**
- `400`: company_id faltando
- `401`: Não autenticado
- `403`: Apenas ADMIN
- `404`: Empresa não encontrada

---

### POST `/api/admin/features`
Cria ou atualiza um feature override.

**Permissões:** ADMIN only  
**Método:** POST  
**Content-Type:** application/json

**Body:**
```json
{
  "company_id": "clx123",
  "feature": "bots",
  "enabled": true,
  "reason": "Trial de 30 dias",
  "expires_at": "2025-12-31T23:59:59.000Z"
}
```

**Response 200:**
```json
{
  "success": true,
  "override": {
    "id": "clx456",
    "company_id": "clx123",
    "feature": "bots",
    "enabled": true,
    "reason": "Trial de 30 dias",
    "expires_at": "2025-12-31T23:59:59.000Z"
  }
}
```

**Errors:**
- `400`: Dados inválidos
- `401`: Não autenticado
- `403`: Apenas ADMIN
- `404`: Empresa não encontrada

---

### DELETE `/api/admin/features?override_id=xxx`
Remove um feature override.

**Permissões:** ADMIN only  
**Método:** DELETE

**Query Params:**
- `override_id` (required, string): ID do override

**Response 200:**
```json
{
  "success": true,
  "message": "Override removido com sucesso"
}
```

**Errors:**
- `400`: override_id faltando
- `401`: Não autenticado
- `403`: Apenas ADMIN
- `404`: Override não encontrado

---

## 🧭 Admin - Menu

### GET `/api/admin/menu`
Lista todos os menu items.

**Permissões:** ADMIN only  
**Método:** GET

**Response 200:**
```json
{
  "menu_items": [
    {
      "id": "clx123",
      "key": "dashboard",
      "title": "Dashboard",
      "href": "/dashboard",
      "icon": "LayoutDashboard",
      "description": "Visão geral",
      "order": 0,
      "is_active": true,
      "default_roles": ["ADMIN", "DIRECTOR", "MANAGER", "AGENT"],
      "_count": {
        "user_overrides": 5
      }
    }
  ]
}
```

---

### POST `/api/admin/menu`
Cria ou atualiza um menu item.

**Permissões:** ADMIN only  
**Método:** POST  
**Content-Type:** application/json

**Body:**
```json
{
  "id": "clx123",
  "key": "dashboard",
  "title": "Dashboard",
  "href": "/dashboard",
  "icon": "LayoutDashboard",
  "description": "Visão geral",
  "order": 0,
  "is_active": true,
  "default_roles": ["ADMIN", "DIRECTOR", "MANAGER", "AGENT"]
}
```

**Response 200:**
```json
{
  "menu_item": {
    "id": "clx123",
    "key": "dashboard",
    "title": "Dashboard",
    "href": "/dashboard",
    "icon": "LayoutDashboard"
  }
}
```

---

### DELETE `/api/admin/menu?id=xxx`
Deleta um menu item.

**Permissões:** ADMIN only  
**Método:** DELETE

**Response 200:**
```json
{
  "success": true
}
```

---

## 🎯 Coach ao Vivo (v1)

### GET `/api/v1/meetings`
Lista reuniões do usuário.

**Permissões:** Todos (filtrado por empresa)

### POST `/api/v1/meetings`
Cria uma nova reunião.

**Body:**
```json
{
  "title": "Discovery Call - Empresa X",
  "type": "DISCOVERY",
  "methodology": "SPICED",
  "scheduled_at": "2025-12-05T14:00:00.000Z",
  "deal_id": "clx123"
}
```

### GET `/api/v1/meetings/[id]/config`
Retorna configuração da reunião para o widget de coaching.

### POST `/api/v1/coach/sessions`
Salva uma sessão de coaching após a call.

### GET `/api/v1/coach/sessions`
Lista sessões de coaching do usuário.

### GET `/api/v1/deals/today`
Lista deals com reuniões agendadas para hoje.

---

## 🎭 Role Play (v1)

### GET `/api/v1/roleplay`
Lista sessões de role play do usuário.

**Query Params:**
- `status` (optional): Filtrar por status
- `limit` (default 50): Quantidade de resultados
- `offset` (default 0): Paginação

### POST `/api/v1/roleplay`
Cria uma nova sessão de role play.

**Body:**
```json
{
  "playbook_id": "clx123",
  "scheduled_at": "2025-12-05T09:00:00.000Z"
}
```

### GET `/api/v1/roleplay/[id]`
Busca uma sessão específica.

### PATCH `/api/v1/roleplay/[id]`
Atualiza uma sessão (finaliza, adiciona transcrição/métricas).

### POST `/api/v1/roleplay/[id]/analyze`
Dispara análise IA para a sessão.

### GET `/api/v1/roleplay/badges`
Lista badges do usuário.

### GET `/api/v1/roleplay/streaks`
Lista streaks do usuário.

### GET `/api/v1/roleplay/ranking`
Lista ranking por squad/empresa.

### GET/POST `/api/v1/roleplay/goals`
CRUD de metas (MANAGER+).

---

## 🎯 OKRs - Objectives and Key Results (v1)

### GET `/api/v1/okrs/periods`
Lista períodos de OKR da empresa.

**Permissões:** Todos (filtrado por empresa)

### POST `/api/v1/okrs/periods`
Cria novo período (ex: "Q1 2025").

**Permissões:** DIRECTOR+

**Body:**
```json
{
  "label": "Q1 2025",
  "start_date": "2025-01-01T00:00:00.000Z",
  "end_date": "2025-03-31T23:59:59.000Z",
  "is_current": true
}
```

### GET `/api/v1/okrs`
Lista objetivos do período atual ou especificado.

**Query Params:**
- `period_id` (optional): ID do período
- `area` (optional): REVENUE, SALES, MARKETING, PRESALES, CS
- `status` (optional): DRAFT, ACTIVE, ACHIEVED, MISSED, CANCELLED

**Permissões:** Todos (AGENT vê apenas seus OKRs ou do squad)

### POST `/api/v1/okrs`
Cria novo objetivo.

**Permissões:** DIRECTOR+

**Body:**
```json
{
  "period_id": "clx123",
  "title": "Aumentar ARR para R$ 5M",
  "description": "Crescimento agressivo...",
  "area": "REVENUE",
  "owner_id": "user_123",
  "owner_type": "USER"
}
```

### GET `/api/v1/okrs/[id]`
Busca objetivo específico com key results.

### PATCH `/api/v1/okrs/[id]`
Atualiza objetivo.

**Permissões:** DIRECTOR+ ou owner

### DELETE `/api/v1/okrs/[id]`
Remove objetivo (cascade deleta KRs).

**Permissões:** DIRECTOR+

### GET `/api/v1/okrs/[id]/key-results`
Lista key results do objetivo.

### POST `/api/v1/okrs/[id]/key-results`
Cria novo key result.

**Permissões:** DIRECTOR+ ou owner do objetivo

**Body:**
```json
{
  "title": "Fechar 50 novos clientes Enterprise",
  "target": 50,
  "current": 0,
  "unit": "NUMBER",
  "owner_id": "user_456",
  "due_date": "2025-03-31T23:59:59.000Z",
  "linked_metrics": [
    {"source": "pipeline", "metric": "deals_won"}
  ]
}
```

### GET `/api/v1/okrs/key-results/[id]`
Busca key result com histórico de progresso.

### PATCH `/api/v1/okrs/key-results/[id]`
Atualiza key result (recalcula status automaticamente).

**Permissões:** DIRECTOR+ ou owner do KR ou owner do objetivo

### DELETE `/api/v1/okrs/key-results/[id]`
Remove key result.

**Permissões:** DIRECTOR+ ou owner do objetivo

### GET `/api/v1/okrs/key-results/[id]/progress`
Lista histórico de progresso do key result.

### POST `/api/v1/okrs/key-results/[id]/progress`
Adiciona registro de progresso (atualiza current e status automaticamente).

**Permissões:** MANAGER+ ou owner do KR ou owner do objetivo

**Body:**
```json
{
  "value": 34,
  "note": "Fechamos mais 5 clientes esta semana",
  "source": "manual"
}
```

---

## 📊 Resumo de Endpoints

| Grupo | Endpoint | Método | Permissões | Status |
|-------|----------|--------|------------|--------|
| **Usuários** | `/api/users` | POST | ADMIN, DIRECTOR, MANAGER | ✅ |
| | `/api/users` | GET | ADMIN, DIRECTOR, MANAGER | ✅ |
| | `/api/users/[id]` | GET | Todos (filtrado) | ✅ |
| | `/api/users/[id]` | PATCH | Todos (filtrado) | ✅ |
| | `/api/users/[id]/deactivate` | POST | ADMIN, DIRECTOR, MANAGER | ✅ |
| | `/api/users/[id]/reactivate` | POST | ADMIN, DIRECTOR | ✅ |
| **Empresas** | `/api/companies` | GET | ADMIN | ✅ |
| **Squads** | `/api/squads` | GET | Todos (filtrado) | ✅ |
| **Menu** | `/api/menu` | GET | Todos | ✅ |
| **Busca** | `/api/search` | POST | Todos | ✅ |
| | `/api/search/[id]` | GET | Todos (filtrado) | ✅ |
| **Admin Features** | `/api/admin/features` | GET | ADMIN | ✅ |
| | `/api/admin/features` | POST | ADMIN | ✅ |
| | `/api/admin/features` | DELETE | ADMIN | ✅ |
| **Admin Menu** | `/api/admin/menu` | GET | ADMIN | ✅ |
| | `/api/admin/menu` | POST | ADMIN | ✅ |
| | `/api/admin/menu` | DELETE | ADMIN | ✅ |
| **Coach v1** | `/api/v1/meetings` | GET/POST | Todos (filtrado) | ✅ |
| | `/api/v1/meetings/[id]/config` | GET | Todos (filtrado) | ✅ |
| | `/api/v1/coach/sessions` | GET/POST | Todos (filtrado) | ✅ |
| | `/api/v1/deals/today` | GET | Todos (filtrado) | ✅ |
| **Role Play v1** | `/api/v1/roleplay` | GET/POST | Todos (filtrado) | ✅ |
| | `/api/v1/roleplay/[id]` | GET/PATCH | Todos (filtrado) | ✅ |
| | `/api/v1/roleplay/[id]/analyze` | POST | Todos (filtrado) | ✅ |
| | `/api/v1/roleplay/badges` | GET | Todos (filtrado) | ✅ |
| | `/api/v1/roleplay/streaks` | GET | Todos (filtrado) | ✅ |
| | `/api/v1/roleplay/ranking` | GET | Todos (filtrado) | ✅ |
| | `/api/v1/roleplay/goals` | GET/POST | MANAGER+ | ✅ |
| **OKRs v1** | `/api/v1/okrs/periods` | GET/POST | Todos/DIRECTOR+ | ✅ |
| | `/api/v1/okrs` | GET/POST | Todos/DIRECTOR+ | ✅ |
| | `/api/v1/okrs/[id]` | GET/PATCH/DELETE | Todos/Owner/DIRECTOR+ | ✅ |
| | `/api/v1/okrs/[id]/key-results` | GET/POST | Todos/Owner | ✅ |
| | `/api/v1/okrs/key-results/[id]` | GET/PATCH/DELETE | Todos/Owner | ✅ |
| | `/api/v1/okrs/key-results/[id]/progress` | GET/POST | Todos/MANAGER+ | ✅ |

**Total:** 40+ endpoints implementados

---

## 🔐 Códigos de Status HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| `200` | OK | Sucesso (GET, PATCH, DELETE) |
| `201` | Created | Recurso criado (POST) |
| `400` | Bad Request | Dados inválidos, regras de negócio |
| `401` | Unauthorized | Não autenticado |
| `403` | Forbidden | Sem permissão |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Email duplicado, conflito |
| `500` | Internal Server Error | Erro no servidor |

---

## 📝 Padrões de Resposta

### Sucesso
```json
{
  "data": {...},
  "message": "Operação realizada com sucesso"
}
```

### Erro
```json
{
  "error": "Mensagem de erro",
  "details": {...}
}
```

### Validação Zod
```json
{
  "error": "Dados inválidos",
  "details": [
    {
      "path": ["email"],
      "message": "Email inválido"
    }
  ]
}
```

---

## 🔗 Google Workspace Integration (v1)

### OAuth Flow

#### Iniciar Conexão
```
GET /api/integrations/google/start
```
Redireciona para Google OAuth consent screen.

#### Callback OAuth
```
GET /api/integrations/google/callback
```
Recebe código, troca por tokens, salva integração.

#### Status da Conexão
```
GET /api/integrations/google/status

Response 200:
{
  "connected": true,
  "email": "user@company.com",
  "last_sync": "2025-12-05T21:00:00Z"
}
```

#### Desconectar
```
POST /api/integrations/google/disconnect

Response 200:
{ "success": true }
```

### Calendar

#### Listar Eventos
```
GET /api/v1/google/calendar/events?time_min=...&time_max=...&max_results=50

Response 200:
{
  "events": [
    {
      "id": "abc123",
      "title": "Reunião de Vendas",
      "start": "2025-12-06T10:00:00-03:00",
      "end": "2025-12-06T11:00:00-03:00",
      "attendees": [{ "email": "...", "name": "...", "status": "accepted" }],
      "meet_link": "https://meet.google.com/xxx-xxx-xxx"
    }
  ]
}
```

#### Criar Evento
```
POST /api/v1/google/calendar/events

Body:
{
  "title": "Demo Performancy",
  "description": "Demonstração do produto",
  "start": "2025-12-06T14:00:00-03:00",
  "end": "2025-12-06T15:00:00-03:00",
  "attendees": ["cliente@empresa.com"],
  "add_meet": true
}

Response 200:
{
  "id": "event123",
  "title": "Demo Performancy",
  "calendar_link": "https://calendar.google.com/...",
  "meet_link": "https://meet.google.com/xxx-xxx-xxx"
}
```

### Gmail

#### Listar Mensagens
```
GET /api/v1/google/gmail/messages?q=from:cliente&max_results=20

Response 200:
{
  "messages": [
    {
      "id": "msg123",
      "thread_id": "thread123",
      "subject": "Re: Proposta Comercial",
      "from": "Cliente <cliente@empresa.com>",
      "to": "vendedor@performancy.com",
      "date": "2025-12-05T18:30:00Z",
      "snippet": "Olá, gostaria de saber mais sobre..."
    }
  ],
  "next_page_token": "..."
}
```

#### Enviar Email
```
POST /api/v1/google/gmail/send

Body:
{
  "to": ["cliente@empresa.com"],
  "cc": ["gerente@empresa.com"],
  "subject": "Proposta Comercial - Performancy",
  "body": "<h1>Olá!</h1><p>Segue proposta...</p>",
  "is_html": true,
  "thread_id": "thread123" // opcional, para resposta
}

Response 200:
{
  "id": "msg456",
  "thread_id": "thread123",
  "success": true
}
```

### Docs

#### Listar Documentos
```
GET /api/v1/google/docs?search=proposta

Response 200:
{
  "documents": [
    {
      "id": "doc123",
      "title": "Proposta Comercial - Cliente X",
      "created_at": "2025-12-01T10:00:00Z",
      "updated_at": "2025-12-05T15:00:00Z",
      "link": "https://docs.google.com/document/d/doc123/edit"
    }
  ]
}
```

#### Criar Documento
```
POST /api/v1/google/docs

Body:
{
  "title": "Proposta Comercial - Novo Cliente",
  "content": "# Proposta\n\nConteúdo da proposta...",
  "template_id": "template123", // opcional - copiar de template
  "folder_id": "folder123" // opcional - mover para pasta
}

Response 200:
{
  "id": "newdoc123",
  "title": "Proposta Comercial - Novo Cliente",
  "link": "https://docs.google.com/document/d/newdoc123/edit"
}
```

### Meet

#### Criar Sala
```
POST /api/v1/google/meet

Body:
{
  "access_type": "TRUSTED" // OPEN, TRUSTED, RESTRICTED
}

Response 200:
{
  "id": "spaces/abc123",
  "meeting_uri": "https://meet.google.com/xxx-xxx-xxx",
  "meeting_code": "xxx-xxx-xxx",
  "meeting_link": "https://meet.google.com/xxx-xxx-xxx"
}
```

---

## 📅 Calendar Sync (v1)

### Eventos Sincronizados

#### Listar Eventos (do banco)
```
GET /api/v1/calendar/events?start_date=...&end_date=...

Response 200:
{
  "events": [
    {
      "id": "abc123",
      "external_id": "google_event_id",
      "title": "Reunião com Cliente",
      "start": "2025-12-06T10:00:00-03:00",
      "end": "2025-12-06T11:00:00-03:00",
      "all_day": false,
      "meet_link": "https://meet.google.com/xxx",
      "attendees": [...]
    }
  ],
  "sync": {
    "last_sync": "2025-12-05T21:00:00Z",
    "interval": "HOUR_1"
  }
}
```

#### Sincronizar Manualmente
```
POST /api/v1/calendar/sync

Response 200:
{
  "success": true,
  "synced": 25,
  "created": 5,
  "updated": 3,
  "deleted": 0
}
```

### Configuração de Sync

#### Obter Configuração
```
GET /api/v1/calendar/config

Response 200:
{
  "interval": "HOUR_1",
  "interval_ms": 3600000,
  "last_sync": "2025-12-05T21:00:00Z",
  "available_intervals": [
    { "key": "MINUTES_15", "label": "A cada 15 minutos", "ms": 900000 },
    { "key": "MINUTES_30", "label": "A cada 30 minutos", "ms": 1800000 },
    { "key": "HOUR_1", "label": "A cada 1 hora", "ms": 3600000 },
    { "key": "HOURS_4", "label": "A cada 4 horas", "ms": 14400000 }
  ]
}
```

#### Atualizar Configuração
```
PATCH /api/v1/calendar/config

Body:
{
  "interval": "MINUTES_30"
}

Response 200:
{
  "success": true,
  "interval": "MINUTES_30",
  "interval_ms": 1800000
}
```

---

## ⚙️ Cron Jobs

### Processar Jobs Agendados
```
POST /api/cron/jobs
Authorization: Bearer $CRON_SECRET

Response 200:
{
  "success": true,
  "processed": 5,
  "succeeded": 5,
  "failed": 0,
  "errors": []
}
```

### Status dos Jobs
```
GET /api/cron/jobs
Authorization: Bearer $CRON_SECRET

Response 200:
{
  "status": "healthy",
  "jobs": {
    "pending": 3,
    "running": 0,
    "completed": 150,
    "failed": 2,
    "total": 155
  },
  "timestamp": "2025-12-05T21:00:00Z"
}
```

---

**Documentação Completa:** `/docs`  
**Schema DB:** `/docs/SCHEMA.md`  
**RBAC:** `/docs/RBAC.md`
