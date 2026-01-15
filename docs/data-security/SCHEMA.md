# 🗄️ Database Schema - Performancy

Documentação completa do esquema do banco de dados PostgreSQL.

---

## 📊 Visão Geral

- **ORM**: Prisma 6.x
- **Banco**: PostgreSQL 14+
- **Convenção**: `snake_case` para todos os campos
- **Multi-Tenant**: Isolamento via `company_id`

---

## 🔑 Enums

### UserRole
```prisma
enum UserRole {
  ADMIN     // Performancy staff - acesso a todas empresas
  DIRECTOR  // Acesso total da empresa cliente
  MANAGER   // Acesso ao squad que gerencia
  AGENT     // Acesso aos próprios dados + ranking
}
```

### UserStatus
```prisma
enum UserStatus {
  ACTIVE    // Usuário ativo
  INACTIVE  // Usuário desativado
  INVITED   // Usuário convidado (ainda não ativou)
}
```

### UserArea
```prisma
enum UserArea {
  SALES      // Vendas
  MARKETING  // Marketing
  CX_CS      // Customer Experience / Customer Success
  GTM        // Go-to-Market
}
```

### PlaybookFunction
```prisma
enum PlaybookFunction {
  PRE_SALES  // Pré-vendas (SDR)
  SALES      // Vendas (Closer)
  CS         // Customer Success
}
```

### PlaybookStatus
```prisma
enum PlaybookStatus {
  ACTIVE    // Playbook ativo
  INACTIVE  // Playbook desativado
  DRAFT     // Rascunho
}
```

### IntegrationType
```prisma
enum IntegrationType {
  CRM       // CRM (Zoho, HubSpot, etc)
  WHATSAPP  // WhatsApp
  EMAIL     // Email
  PHONE     // Telefonia
  VIDEO     // Videoconferência
  AI        // IA (OpenAI, Anthropic)
}
```

### IntegrationProvider
```prisma
enum IntegrationProvider {
  ZOHO
  HUBSPOT
  SALESFORCE
  PIPEDRIVE
  CUSTOM_API
  WHATSAPP_OFFICIAL
  WHATSAPP_UNOFFICIAL
  TWILIO
  SMTP
  GOOGLE_MEET
  ZOOM
  OPENAI
  ANTHROPIC
  GEMINI
}
```

### IntegrationStatus
```prisma
enum IntegrationStatus {
  ACTIVE   // Integração ativa
  INACTIVE // Desativada
  ERROR    // Com erro
  PENDING  // Pendente configuração
}
```

### ConversationChannel
```prisma
enum ConversationChannel {
  CALL      // Telefone
  WHATSAPP  // WhatsApp
  EMAIL     // Email
  VIDEO     // Videoconferência
}
```

### ConversationSentiment
```prisma
enum ConversationSentiment {
  POSITIVE  // Sentimento positivo
  NEUTRAL   // Neutro
  NEGATIVE  // Negativo
}
```

### BotType
```prisma
enum BotType {
  SDR       // Bot de prospecção
  CLOSER    // Bot de fechamento
  FOLLOW_UP // Bot de follow-up
  CS        // Bot de Customer Success
}
```

### BotStatus
```prisma
enum BotStatus {
  ACTIVE    // Bot ativo
  INACTIVE  // Bot desativado
}
```

### BotLogStatus
```prisma
enum BotLogStatus {
  SUCCESS  // Ação executada com sucesso
  FAILED   // Falha na execução
  PENDING  // Pendente
}
```

### AlertType
```prisma
enum AlertType {
  IMPORT_FAILED           // Falha na importação
  BOT_ERROR              // Erro no bot
  AI_RATE_LIMIT          // Limite de IA atingido
  LOW_PLAYBOOK_ADHERENCE // Baixa aderência ao playbook
  DEAL_STUCK             // Deal parado
  CONVERSION_DROP        // Queda na conversão
  TARGET_RISK            // Risco de não bater meta
}
```

### AlertPriority
```prisma
enum AlertPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

### AlertStatus
```prisma
enum AlertStatus {
  UNREAD        // Não lido
  READ          // Lido
  ACKNOWLEDGED  // Reconhecido/tratado
}
```

### ImportStatus
```prisma
enum ImportStatus {
  SUCCESS  // Importação bem-sucedida
  FAILED   // Falha total
  PARTIAL  // Parcial (alguns registros falharam)
  RUNNING  // Em execução
}
```

---

## 🏢 Multi-Tenant & Usuários

### Company
**Tabela**: `companies`

```prisma
model Company {
  id       String  @id @default(cuid())
  name     String
  slug     String  @unique // usado na URL: /{company_slug}/...
  domain   String?
  timezone String  @default("America/Sao_Paulo")
  currency String  @default("BRL")

  // Feature flags (JSON)
  features Json @default("{...}")

  // Settings (JSON)
  settings Json @default("{...}")

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  users         User[]
  squads        Squad[]
  playbooks     Playbook[]
  integrations  Integration[]
  leads         Lead[]
  deals         Deal[]
  conversations Conversation[]
  bots          Bot[]
  ai_usage      AIUsage[]
  alerts        Alert[]
  import_logs   ImportLog[]
  audit_logs    AuditLog[]
  chat_searches ChatSearch[]
}
```

**Features (JSON):**
```json
{
  "ai_analysis": true,
  "bots": true,
  "auto_crm_fill": true,
  "playbook_generation": true,
  "ranking_visibility": false
}
```

**Settings (JSON):**
```json
{
  "polling_interval": 300,
  "backup_interval": "daily"
}
```

---

### User
**Tabela**: `users`

```prisma
model User {
  id            String     @id @default(cuid())
  email         String     @unique
  name          String
  linkedin      String?    // LinkedIn profile URL ⭐ NOVO
  password_hash String?    // null se login apenas via OAuth
  role          UserRole
  status        UserStatus @default(INVITED)
  avatar_url    String?
  area          UserArea   @default(SALES) // Área da empresa

  // Multi-tenant
  company_id String?
  company    Company? @relation(...)

  // Metadata
  last_login_at DateTime?
  created_at    DateTime  @default(now())
  updated_at    DateTime  @updatedAt

  // Relations
  squad_memberships SquadMember[]
  conversations     Conversation[]
  bot_logs          BotLog[]
  audit_logs        AuditLog[]
  sessions          Session[]
  accounts          Account[]
  chat_searches     ChatSearch[]

  @@index([company_id])
  @@index([email])
}
```

**Campos Importantes:**
- `password_hash`: bcrypt, pode ser `null` para OAuth
- `area`: Área da empresa do usuário (SALES, MARKETING, CX_CS, GTM)
- `linkedin`: URL do perfil LinkedIn (opcional)
- `company_id`: `null` apenas para ADMIN

---

### Squad
**Tabela**: `squads`

```prisma
model Squad {
  id             String @id @default(cuid())
  name           String
  type           String // "sales", "pre_sales", "cs"
  target_monthly Float? // Meta de receita mensal

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  members   SquadMember[]
  playbooks Playbook[]

  @@index([company_id])
}
```

---

### SquadMember
**Tabela**: `squad_members`

```prisma
model SquadMember {
  id String @id @default(cuid())

  user_id String
  user    User   @relation(...)

  squad_id String
  squad    Squad  @relation(...)

  is_leader Boolean  @default(false)
  joined_at DateTime @default(now())

  @@unique([user_id, squad_id])
  @@index([user_id])
  @@index([squad_id])
}
```

**Nota:** Um usuário pode fazer parte de múltiplos squads.

---

## 🔐 NextAuth Tables

### Account
**Tabela**: `accounts`

```prisma
model Account {
  id                  String  @id @default(cuid())
  user_id             String
  type                String
  provider            String
  provider_account_id String
  refresh_token       String? @db.Text
  access_token        String? @db.Text
  expires_at          Int?
  token_type          String?
  scope               String?
  id_token            String? @db.Text
  session_state       String?

  user User @relation(...)

  @@unique([provider, provider_account_id])
}
```

### Session
**Tabela**: `sessions`

```prisma
model Session {
  id            String   @id @default(cuid())
  session_token String   @unique
  user_id       String
  expires       DateTime
  user          User     @relation(...)
}
```

### VerificationToken
**Tabela**: `verification_tokens`

```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

## 📖 Playbooks

### Playbook
**Tabela**: `playbooks`

```prisma
model Playbook {
  id          String           @id @default(cuid())
  name        String
  description String?
  function    PlaybookFunction
  methodology String           // "SPICED", "SPIN", "MEDDIC", "BANT"
  version     Int              @default(1)
  status      PlaybookStatus   @default(DRAFT)
  
  is_ai_generated Boolean @default(false)
  
  // Content (JSON)
  content Json

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  squad_id String?
  squad    Squad?  @relation(...)

  // Versionamento
  parent_version_id String?
  parent_version    Playbook?  @relation(...)
  child_versions    Playbook[] @relation(...)

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  conversations Conversation[]
  bots          Bot[]

  @@index([company_id])
  @@index([squad_id])
  @@index([status])
}
```

**Content (JSON) - Exemplo:**
```json
{
  "sections": [
    {
      "title": "Descoberta",
      "questions": ["Qual seu principal desafio?"]
    }
  ],
  "objections": [
    {
      "objection": "Muito caro",
      "response": "Vamos falar sobre ROI..."
    }
  ],
  "automations": {
    "auto_fill_crm": true
  }
}
```

---

## 🔌 Integrações

### Integration
**Tabela**: `integrations`

```prisma
model Integration {
  id       String              @id @default(cuid())
  type     IntegrationType
  provider IntegrationProvider
  name     String
  status   IntegrationStatus   @default(PENDING)

  encrypted_config String  @db.Text // Criptografado AES-256
  settings         Json    // Config por integração
  
  last_sync_at DateTime?
  last_error   String?

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  import_logs ImportLog[]

  @@index([company_id])
}
```

**Nota:** `encrypted_config` usa `lib/crypto.ts` (AES-256-GCM).

---

## 💼 CRM - Leads e Deals

### Lead
**Tabela**: `leads`

```prisma
model Lead {
  id          String  @id @default(cuid())
  external_id String? // ID no CRM externo

  // Identificação
  name         String
  email        String?
  phone        String?
  company_name String?
  position     String?

  // Classificação
  source      String?
  status      String?
  lead_score  Float?

  custom_fields Json @default("{}")

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  deals         Deal[]
  conversations Conversation[]
  bot_logs      BotLog[]

  @@unique([company_id, external_id])
  @@index([company_id])
  @@index([email])
}
```

### Deal
**Tabela**: `deals`

```prisma
model Deal {
  id          String  @id @default(cuid())
  external_id String?
  title       String

  // Pipeline
  stage       String  // "prospecting", "qualification", "proposal", etc
  probability Float?

  // Financeiro
  value    Float
  currency String @default("BRL")

  // Datas
  expected_close_at DateTime?
  closed_at         DateTime?

  custom_fields Json @default("{}")

  // Relations
  lead_id String
  lead    Lead   @relation(...)

  company_id String
  company    Company @relation(...)

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  @@unique([company_id, external_id])
  @@index([company_id])
  @@index([lead_id])
  @@index([stage])
}
```

---

## 💬 Conversas & IA

### Conversation
**Tabela**: `conversations`

```prisma
model Conversation {
  id               String               @id @default(cuid())
  channel          ConversationChannel
  duration_seconds Int?

  // Participantes
  user_id String
  user    User   @relation(...)

  lead_id String
  lead    Lead   @relation(...)

  // Conteúdo
  transcript String  @db.Text
  summary    String? @db.Text

  // IA
  playbook_id       String?
  playbook          Playbook? @relation(...)
  playbook_score    Float?
  sentiment         ConversationSentiment?
  methodology_scores Json? // Ex: SPICED scores
  key_moments        Json? // Momentos importantes
  suggested_actions  Json? // Ações sugeridas

  notes String? @db.Text

  // Datas
  conversation_date DateTime
  processed_at      DateTime?

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  @@index([company_id])
  @@index([user_id])
  @@index([lead_id])
  @@index([conversation_date])
}
```

---

## 🤖 Bots & Automações

### Bot
**Tabela**: `bots`

```prisma
model Bot {
  id     String    @id @default(cuid())
  name   String
  type   BotType
  status BotStatus @default(INACTIVE)

  playbook_id String
  playbook    Playbook @relation(...)

  channels Json // ["WHATSAPP", "EMAIL"]
  triggers Json // Eventos e condições

  max_messages_per_day           Int
  delay_between_messages_seconds Int

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  // Metadata
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  logs BotLog[]

  @@index([company_id])
  @@index([status])
}
```

### BotLog
**Tabela**: `bot_logs`

```prisma
model BotLog {
  id String @id @default(cuid())

  bot_id String
  bot    Bot    @relation(...)

  lead_id String
  lead    Lead   @relation(...)

  user_id String?
  user    User?   @relation(...)

  action  String         // "message_sent", "email_sent"
  channel String         // "WHATSAPP", "EMAIL"
  status  BotLogStatus
  
  message       String? @db.Text
  error_message String? @db.Text

  created_at DateTime @default(now())

  @@index([bot_id])
  @@index([lead_id])
  @@index([created_at])
}
```

---

## 📊 Rastreamento

### AIUsage
**Tabela**: `ai_usage`

```prisma
model AIUsage {
  id String @id @default(cuid())

  provider String // "anthropic", "openai"
  model    String // "claude-3-5-sonnet-20241022"

  total_tokens      Int
  prompt_tokens     Int
  completion_tokens Int
  
  estimated_cost_usd Float

  feature      String // "conversation_analysis", "intelligent_search"
  period_month String // "YYYY-MM"

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  created_at DateTime @default(now())

  @@index([company_id])
  @@index([period_month])
  @@index([provider])
}
```

### AuditLog
**Tabela**: `audit_logs`

```prisma
model AuditLog {
  id String @id @default(cuid())

  user_id String
  user    User   @relation(...)

  action      String // "CREATE_USER", "DELETE_PLAYBOOK"
  entity_type String // "user", "playbook"
  entity_id   String

  changes Json? // { before: {...}, after: {...} }

  ip_address String?
  user_agent String? @db.Text

  // Multi-tenant
  company_id String
  company    Company @relation(...)

  created_at DateTime @default(now())

  @@index([company_id])
  @@index([user_id])
  @@index([entity_type, entity_id])
  @@index([created_at])
}
```

---

## 🔍 Chat Inteligente

### ChatSearch
**Tabela**: `chat_searches`

```prisma
model ChatSearch {
  id    String @id @default(cuid())
  query String @db.Text

  search_results Json // { leads: [], deals: [], ... }
  llm_analysis   Json // { summary, insights, timeline, ... }

  // Metadados LLM
  llm_provider String  @default("anthropic")
  llm_model    String  @default("claude-3-5-sonnet-20241022")
  tokens_used  Int?
  processing_time_ms Int?

  shared_as_memory Boolean @default(false)

  // Relations
  user_id String
  user    User   @relation(...)

  company_id String
  company    Company @relation(...)

  created_at DateTime @default(now())

  @@index([company_id])
  @@index([user_id])
  @@index([created_at])
}
```

---

## 🎯 OKRs - Objectives and Key Results

### Enums de OKRs

```prisma
enum OKRArea {
  REVENUE     // Receita
  SALES       // Vendas
  MARKETING   // Marketing
  PRESALES    // Pré-vendas
  CS          // Customer Success
}

enum OKRStatus {
  DRAFT       // Rascunho
  ACTIVE      // Ativo
  ACHIEVED    // Atingido
  MISSED      // Não atingido
  CANCELLED   // Cancelado
}

enum KeyResultStatus {
  ON_TRACK    // No caminho
  AT_RISK     // Em risco
  BEHIND      // Atrasado
  ACHIEVED    // Atingido
}

enum KeyResultUnit {
  CURRENCY    // Moeda (R$)
  PERCENTAGE  // Porcentagem (%)
  NUMBER      // Número
  HOURS       // Horas
  DAYS        // Dias
}
```

### OKRPeriod
**Tabela**: `okr_periods`

```prisma
model OKRPeriod {
  id         String   @id @default(cuid())
  company_id String
  
  label      String   // "Q1 2025", "Q2 2025"
  start_date DateTime
  end_date   DateTime
  is_current Boolean  @default(false)
  
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  
  // Relations
  company    Company     @relation(...)
  objectives Objective[]
  
  @@unique([company_id, label])
  @@index([company_id])
  @@index([is_current])
}
```

### Objective
**Tabela**: `objectives`

```prisma
model Objective {
  id          String    @id @default(cuid())
  company_id  String
  period_id   String
  
  title       String
  description String?
  area        OKRArea
  status      OKRStatus @default(ACTIVE)
  progress    Int       @default(0) // 0-100
  
  // Owner (pode ser usuário ou squad)
  owner_id    String
  owner_type  GoalTargetType @default(USER)
  
  created_by_id String
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  
  // Relations
  company     Company     @relation(...)
  period      OKRPeriod   @relation(...)
  created_by  User        @relation("ObjectiveCreator", ...)
  key_results KeyResult[]
  
  @@index([company_id])
  @@index([period_id])
  @@index([area])
  @@index([status])
  @@index([owner_id, owner_type])
}
```

### KeyResult
**Tabela**: `key_results`

```prisma
model KeyResult {
  id           String          @id @default(cuid())
  objective_id String
  
  title        String
  description  String?
  
  // Target e progresso
  current      Float           @default(0)
  target       Float
  unit         KeyResultUnit   @default(NUMBER)
  
  // Status (calculado automaticamente)
  status       KeyResultStatus @default(ON_TRACK)
  trend        String          @default("stable") // "up", "down", "stable"
  trend_value  Float           @default(0) // % change vs last period
  
  // Owner e prazo
  owner_id     String?
  due_date     DateTime?
  
  // Métricas vinculadas (JSON)
  // [{"source": "coach", "metric": "avg_score", "entity_id": "..."}]
  linked_metrics Json @default("[]")
  
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt
  
  // Relations
  objective    Objective          @relation(...)
  owner        User?              @relation("KeyResultOwner", ...)
  progress_log KeyResultProgress[]
  
  @@index([objective_id])
  @@index([status])
  @@index([owner_id])
}
```

### KeyResultProgress
**Tabela**: `key_result_progress`

```prisma
model KeyResultProgress {
  id            String   @id @default(cuid())
  key_result_id String
  
  value         Float          // Valor registrado
  note          String?        // Nota opcional
  recorded_at   DateTime @default(now())
  recorded_by_id String
  
  // Origem do registro
  source        String   @default("manual") // "manual", "coach", "roleplay", "pipeline", "crm"
  
  // Relations
  key_result  KeyResult @relation(...)
  recorded_by User      @relation("ProgressRecorder", ...)
  
  @@index([key_result_id])
  @@index([recorded_at])
}
```

---

## 🔗 Relacionamentos Principais

```
Company (1) ──────→ (N) User
Company (1) ──────→ (N) Squad
Squad (1) ────────→ (N) SquadMember
User (1) ──────────→ (N) SquadMember
Company (1) ──────→ (N) Playbook
Squad (1) ─────────→ (N) Playbook
User (1) ──────────→ (N) Conversation
Lead (1) ──────────→ (N) Conversation
Playbook (1) ──────→ (N) Conversation
Company (1) ──────→ (N) Integration
Company (1) ──────→ (N) Lead
Lead (1) ──────────→ (N) Deal
Company (1) ──────→ (N) Bot
Playbook (1) ──────→ (N) Bot
Bot (1) ───────────→ (N) BotLog

# OKRs
Company (1) ──────→ (N) OKRPeriod
OKRPeriod (1) ────→ (N) Objective
Objective (1) ────→ (N) KeyResult
KeyResult (1) ────→ (N) KeyResultProgress
User (1) ─────────→ (N) Objective (creator)
User (1) ─────────→ (N) KeyResult (owner)
User (1) ─────────→ (N) KeyResultProgress (recorder)
```

---

## 🛠️ Comandos Úteis

```bash
# Gerar Prisma Client
npx prisma generate

# Aplicar schema (dev - sem migrations)
npx prisma db push

# Criar migration
npx prisma migrate dev --name add_user_area

# Aplicar migrations (produção)
npx prisma migrate deploy

# Visualizar banco (Prisma Studio)
npx prisma studio

# Popular banco com dados de teste
npm run db:seed
```

---

**Última Atualização**: Dezembro 2025
