# 🚀 Performancy - Status do Projeto

> **⭐ LEIA ESTE DOCUMENTO PRIMEIRO ao iniciar qualquer conversa sobre o projeto**

---

## 📌 Informações Essenciais

### Stack Técnica
- **Framework**: Next.js 15 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.7.2
- **Banco de Dados**: PostgreSQL 14+ com Prisma ORM 6.x
- **Autenticação**: NextAuth.js v5 (beta)
- **UI**: shadcn/ui + Tailwind CSS
- **Theme**: next-themes (Dark Mode)
- **IA**: Anthropic Claude 3.5 Sonnet
- **Ícones**: Lucide React
- **Gráficos**: Recharts

### Arquitetura
- **Multi-tenant**: URL-based (`/{company_slug}/...`)
- **RBAC**: 4 níveis (ADMIN, DIRECTOR, MANAGER, AGENT)
- **Design System**: Sunset Horizon (Laranja #FF6B35 + Dourado #FFB627)

---

## 🔐 RBAC - Roles e Permissões

| Role | Acesso | Criar Usuários | Configurações |
|------|--------|----------------|---------------|
| **ADMIN** | Todas empresas | ✅ Qualquer empresa | ✅ Full |
| **DIRECTOR** | Própria empresa | ✅ Mesma empresa | ✅ Full |
| **MANAGER** | Squads gerenciados | ✅ Mesma empresa | ❌ Limitado |
| **AGENT** | Apenas dados próprios | ❌ Não | ❌ Não |

**Menus por Role:**
- **Admin/Director/Manager**: Acesso a Configurações gerenciais (usuários, integrações, empresa)
- **Agent**: Acesso a Meu Perfil (dados pessoais, preferências)

**Helpers Principais:**
- `can_create_user(role)` - Verifica se pode criar usuários
- `can_manage_team(role)` - Verifica se pode gerenciar equipe
- `can_view_company_settings(role)` - Acesso a configurações

---

## 🗺️ Rotas Principais

```
Public:
/login                           - Página de login

App:
/[company_slug]/inbox            - Feed de atividades prioritário
/[company_slug]/pipeline         - Kanban de oportunidades
/[company_slug]/calendar         - Agenda de reuniões
/[company_slug]/performed        - Dashboard de performance
/[company_slug]/dashboard        - Dashboard principal
/[company_slug]/chat             - Busca inteligente
/[company_slug]/insights         - Insights e análises
/[company_slug]/playbooks        - Playbooks de vendas
/[company_slug]/conversations    - Conversações
/[company_slug]/bots             - Automações
/[company_slug]/profile          - Perfil pessoal (com Dark Mode toggle)
/[company_slug]/settings         - Configurações
  ├── integrations             - Integrações (todos)
  ├── users                     - Gerenciar usuários (ADMIN/DIRECTOR/MANAGER)
  ├── features                  - Gerenciar features (ADMIN only)
  └── menu                      - Gerenciar menu (ADMIN only)

Admin:
/admin                             - Painel administrativo (ADMIN only)
```

---

## ✅ Implementações Completas

### 1. Sistema de Planos e Feature Flags (Nov 2025)
**Status:** ✅ 100% Implementado

- ✅ **4 Planos**: FREE, STARTER, PROFESSIONAL, ENTERPRISE
- ✅ **10 Feature Flags**: ai_analysis, bots, auto_crm_fill, playbook_generation, ranking_visibility, advanced_analytics, custom_playbooks, api_access, white_label, priority_support
- ✅ **Overrides Persistidos**: Sistema de CompanyFeatureOverride no banco
- ✅ **Função `update_feature()`**: Cria/atualiza overrides com razão e expiração
- ✅ **Função `remove_feature_override()`**: Remove override e volta ao padrão
- ✅ **Cache por Request**: Performance otimizada
- ✅ **Limites por Plano**: max_users, max_squads, max_ai_requests_per_month, etc

**Planos:**
- **FREE**: 3 users, 100 AI requests/mês, sem features avançadas
- **STARTER**: 10 users, 1000 AI requests/mês, AI básica + ranking
- **PROFESSIONAL**: 50 users, 10K AI requests/mês, bots + playbooks + analytics
- **ENTERPRISE**: Ilimitado, todas features incluindo API e white-label

**Arquivos:**
- `lib/features.ts` - Sistema completo de features com overrides
- `app/api/admin/features/route.ts` - CRUD de overrides (ADMIN only)
- `prisma/schema.prisma` - CompanyFeatureOverride model

---

### 2. Gestão Completa de Usuários (Nov 2025)
**Status:** ✅ 100% Implementado (Sprint 2 completa)

- ✅ **CRUD Completo**: Criar, Listar, Visualizar, Editar, Desativar, Reativar
- ✅ **UserEditForm**: Componente completo de edição
- ✅ **APIs REST**:
  - `POST /api/users` - Criar usuário
  - `GET /api/users` - Listar usuários
  - `GET /api/users/[id]` - Buscar usuário
  - `PATCH /api/users/[id]` - Editar usuário
  - `POST /api/users/[id]/deactivate` - Desativar
  - `POST /api/users/[id]/reactivate` - Reativar
- ✅ **Senha Auto-gerada**: `<empresa>-<3chars>` (ex: `skyone-a7x`)
- ✅ **Campos**: name, email, linkedin, role, area, squad, status
- ✅ **RBAC Completo**: Permissões granulares por role
- ✅ **Validação Zod**: Todas as APIs validadas
- ✅ **Audit Logs**: Todas ações registradas

**Arquivos:**
- `app/api/users/route.ts` - POST (criar) e GET (listar)
- `app/api/users/[id]/route.ts` - GET e PATCH
- `app/api/users/[id]/deactivate/route.ts` - Desativar
- `app/api/users/[id]/reactivate/route.ts` - Reativar
- `components/settings/user-create-form.tsx` - Formulário criação
- `components/settings/user-edit-form.tsx` - Formulário edição
- `components/settings/users-list.tsx` - Listagem

---

### 3. Menu Dinâmico no Banco (Nov 2025)
**Status:** ✅ 100% Implementado

- ✅ **8 Itens Padrão**: Dashboard, Chat, Insights, Playbooks, Conversas, Bots, Configurações, Perfil
- ✅ **Default Roles**: Cada item tem roles padrão
- ✅ **User Overrides**: Personalização por usuário
- ✅ **Ícones Dinâmicos**: Renderização de Lucide icons
- ✅ **Cache**: Performance otimizada por request
- ✅ **APIs**: GET `/api/menu` e CRUD em `/api/admin/menu`

**Arquivos:**
- `lib/menu.ts` - get_user_menu(), update_user_menu_item()
- `app/api/menu/route.ts` - API pública
- `app/api/admin/menu/route.ts` - Admin CRUD
- `prisma/schema.prisma` - MenuItem + UserMenuItem

---

### 4. Segurança e RBAC (Nov 2025)
**Status:** ✅ 100% Implementado (Sprint 1 completa)

- ✅ **Busca Protegida**: `/api/search/[id]` com RBAC completo
- ✅ **Multi-tenant Isolation**: Todos queries filtrados por company_id
- ✅ **Middleware**: Autenticação e validação de acesso
- ✅ **4 Roles**: ADMIN, DIRECTOR, MANAGER, AGENT
- ✅ **17 Permission Helpers**: can_create_user(), can_manage_team(), etc
- ✅ **Audit Logs**: Registro automático de ações sensíveis
- ✅ **Testes Documentados**: 24 cenários em SECURITY-TESTS.md

**Arquivos:**
- `lib/permissions.ts` - 17 permission helpers
- `middleware.ts` - Auth + multi-tenant validation
- `app/api/search/[id]/route.ts` - RBAC implementado
- `docs/SECURITY-TESTS.md` - Plano de testes

---

### 5. Dark Mode e Tema (Nov 2025)
**Status:** ✅ 100% Implementado

- ✅ **next-themes**: Dark mode com suporte a Light/Dark/System
- ✅ **ThemeProvider**: Provider global configurado
- ✅ **ThemeToggle**: Cards bonitos no perfil do usuário
- ✅ **ThemeSwitcher**: Dropdown rápido no header
- ✅ **Cores Sunset Horizon**: Tema escuro elegante (roxo/vinho)
- ✅ **Persistência**: Tema salvo entre sessões
- ✅ **SSR-Safe**: Sem flash ao carregar (suppressHydrationWarning)

**Arquivos:**
- `components/providers/theme-provider.tsx` - Provider next-themes
- `components/theme/theme-toggle.tsx` - 3 cards no perfil
- `components/theme/theme-switcher.tsx` - Dropdown no header
- `app/layout.tsx` - ThemeProvider configurado
- `app/globals.css` - Variáveis CSS para .dark

---

### 6. Sistema de Atividades e Inbox (Nov 2025)
**Status:** ✅ 100% Implementado (Sprint 3)

- ✅ **Inbox Page**: Feed de atividades com ranking dinâmico
- ✅ **ActivityFeed**: Componente principal de exibição
- ✅ **ActivityCard**: Card da atividade com ações (Completar, Pular, Dispensar)
- ✅ **ActivityFilter**: Menu lateral direito com filtros e status
- ✅ **StoriesBar**: Barra de stories no topo (estilo Instagram)
- ✅ **Sistema de Ranking**: Algoritmo de priorização (urgência + importância)
- ✅ **Filtros por Tipo**: Todas, Prospectar, Follow-up, Pré-reunião, Reunião, Proposta
- ✅ **Progress Bar Dinâmica**: Avança conforme conclusão de tarefas
- ✅ **Layout Sem Header**: Stories começam do topo da página

**Arquivos:**
- `app/[company_slug]/inbox/page.tsx` - Página principal
- `components/activities/activity-feed.tsx` - Feed de atividades
- `components/activities/activity-card.tsx` - Card individual
- `components/activities/activity-filter.tsx` - Menu lateral direito
- `components/activities/stories-bar.tsx` - Barra de stories
- `lib/activity-ranking.ts` - Algoritmo de ranking

---

### 7. Pipeline e Gestão de Vendas (Nov 2025)
**Status:** ✅ 100% Implementado (Sprint 3)

- ✅ **Pipeline Kanban**: Visualização drag & drop de oportunidades
- ✅ **Calendar View**: Agenda de reuniões e follow-ups
- ✅ **Performance Dashboard**: Métricas de desempenho individual
- ✅ **Deal Detail Modal**: Detalhes completos da oportunidade
- ✅ **5 Estágios**: Prospecção, Qualificação, Proposta, Negociação, Fechamento

**Arquivos:**
- `app/[company_slug]/pipeline/page.tsx` - Kanban de vendas
- `app/[company_slug]/calendar/page.tsx` - Agenda
- `app/[company_slug]/performed/page.tsx` - Performance
- `components/pipeline/pipeline-kanban.tsx` - Componente kanban
- `components/pipeline/deal-detail-modal.tsx` - Modal de detalhes
- `lib/mock-pipeline.ts` - Dados mock

---

### 8. Correções de UI e Layout (Nov 2025)
**Status:** ✅ 100% Implementado (Sprint 3)

- ✅ **Sidebar Bottom**: User info e logout no rodapé (flex-col + mt-auto)
- ✅ **Nome Clicável**: Link para perfil com hover effects
- ✅ **Topbar Condicional**: Não aparece na página /inbox
- ✅ **Componentes UI**: dropdown-menu, dialog, scroll-area, textarea
- ✅ **RBAC Component**: RequireRole para proteção de rotas

**Arquivos:**
- `components/layout/sidebar.tsx` - Sidebar com bottom fixo
- `components/layout/topbar.tsx` - Header com ThemeSwitcher
- `app/[company_slug]/layout.tsx` - Layout com topbar condicional
- `components/ui/dropdown-menu.tsx` - Menu dropdown Radix UI
- `components/rbac/require-role.tsx` - Proteção de rotas

---

### 9. Role Play - Treinamento de Vendas (Dez 2025)
**Status:** ✅ 90% Implementado (Sprint 4)

- ✅ **Prisma Models**: RolePlaySession, RolePlayBadge, RolePlayStreak, RolePlayGoal
- ✅ **APIs CRUD**: GET/POST /api/v1/roleplay com feature flag
- ✅ **APIs Auxiliares**: badges, streaks, ranking, goals, analysis
- ✅ **Análise IA**: Scores Mental, Emocional, Técnico com Claude
- ✅ **Sistema de Badges**: 20+ tipos (frequência, performance, metodologia)
- ✅ **Sistema de Streaks**: Tracking de consistência por atividade
- ✅ **Sistema de Ranking**: Por squad, gerência, empresa
- ✅ **Sistema de Metas**: MANAGER pode definir metas para time
- ✅ **Dashboard AGENT**: Histórico, badges, streaks, ranking
- ✅ **Componentes UI**: 10 componentes especializados
- ✅ **Parser de Transcrições**: Extração automática de métricas
- 🔜 **Dashboard MANAGER**: Visão do time (em desenvolvimento)
- 🔜 **Notificações**: Push para badges e análise pronta

**Arquivos:**
- `app/[company_slug]/roleplay/page.tsx` - Dashboard do AGENT
- `app/[company_slug]/roleplay/[session_id]/page.tsx` - Detalhe da sessão
- `app/api/v1/roleplay/` - APIs CRUD completas
- `lib/roleplay/` - Lógica de análise, badges, streaks, ranking
- `components/roleplay/` - 10 componentes de UI

---

### 10. OKRs de Receita (Dez 2025)
**Status:** ✅ 95% Implementado (Sprint 4.5)

Sistema de Objectives and Key Results para área de receita, integrado com Coach ao Vivo, Role Play e Pipeline.

- ✅ **Página de OKRs**: Interface completa com objetivos e key results
- ✅ **Componentes**: ObjectiveCard, KeyResultRow, OKRSummary, OKRPeriodSelector
- ✅ **Linked Metrics**: Métricas vinculadas de Coach, Role Play e Pipeline
- ✅ **AI Insights**: Insights automáticos baseados nos dados
- ✅ **Prisma Models**: OKRPeriod, Objective, KeyResult, KeyResultProgress
- ✅ **APIs CRUD**: 6 endpoints completos em `/api/v1/okrs/`
- ✅ **Cálculo Automático**: Progress %, status, trend
- ✅ **Audit Logs**: Todas ações registradas
- 🔜 **Job de Sync**: Atualizar métricas de Coach/RolePlay/Pipeline automaticamente

**Arquivos:**
- `app/[company_slug]/okrs/page.tsx` - Página principal
- `components/okrs/` - 5 componentes de UI
- `app/api/v1/okrs/` - 6 rotas de API
- `prisma/schema.prisma` - 4 models + 4 enums

---

### 11. GoTo Connect - Pipeline Mensal de Chamadas (Dez 2025)
**Status:** ✅ 100% Implementado com Download Paralelo + Transcrição Gemini

Objetivo: executar o pipeline mensal de chamadas do GoTo Connect com consistência (download → transcrição → análise → carga no banco) garantindo multi-tenant e evitando reprocessamento incorreto.

**Funcionalidades implementadas:**
- **Download paralelo**: 10 arquivos simultâneos (~10x mais rápido)
- **Refresh proativo do token**: a cada 50 minutos (evita expiração)
- **Ranges customizados**: suporte a `--start YYYY-MM-DD --end YYYY-MM-DD`
- **Transcrição com Gemini**: ~4x mais rápido que Whisper local
- **Transcrição por dia**: evita conflito entre múltiplas instâncias
- **Diarização automática**: identifica VENDEDOR/CLIENTE
- **Backup de áudios curtos**: move < 30s para backup_short/
- **Token por empresa**: exige `company_id` para evitar pegar integração errada
- **Índice de gravações por data**: `recordings-index.json`

**Arquivos principais:**
- `scripts/goto-download-all.ts` - Download paralelo + refresh proativo
- `scripts/transcribe-by-day.py` - Transcrição por dia (Whisper ou Gemini)
- `scripts/move-short-audios.py` - Mover áudios curtos
- `scripts/is-pipeline-month.ts` - Pipeline completo
- `scripts/is-load-conversations.ts` - Carga no banco

**Comandos úteis:**
```bash
# Download com paralelização (10x mais rápido)
npx tsx scripts/goto-download-all.ts --start 2025-12-01 --end 2025-12-18 --company-id cmj7nlj8u0000pjv3lqkc8ovy

# Listar dias disponíveis para transcrição
python3 scripts/transcribe-by-day.py --list-days

# Transcrever com Gemini (4x mais rápido, ~$0.0004/arquivo)
python3 scripts/transcribe-by-day.py --day 2025-12-18 --provider gemini

# Transcrever com Whisper local
python3 scripts/transcribe-by-day.py --day 2025-12-18 --provider whisper

# Mover áudios < 30s para backup
python3 scripts/move-short-audios.py

# Carga no banco
npx tsx scripts/is-load-conversations.ts --month 2025-12 --analyze
```

---

## 🧭 Handoff (para nova janela / novo chat)

Ao continuar este trabalho em outra janela, comece lendo:
- `docs/STATUS.md` (este documento)
- `scripts/is-pipeline-month.ts`
- `scripts/goto-download-all.ts`
- `scripts/is-load-conversations.ts`

E valide o ambiente:
- `.env` deve conter `IS_COMPANY_ID=cmj7nlj8u0000pjv3lqkc8ovy`

Checklist rápido para continuar:
- Rode `npx tsx scripts/goto-download-all.ts --month 2025-11 --company-id cmj7nlj8u0000pjv3lqkc8ovy` e confirme que o GoTo retorna chamadas.
- Confirme que `data/calls/recordings/recordings-index.json` está populado (não vazio).
- Rode `npx tsx scripts/is-load-conversations.ts --month 2025-11 --analyze` e valide criação/skip coerentes.


## 📋 Convenções OBRIGATÓRIAS

### Nomenclatura
- ✅ **snake_case**: variáveis, funções, campos DB
- ✅ **PascalCase**: componentes React, classes
- ✅ **UPPER_SNAKE_CASE**: constantes
- ✅ **Código em INGLÊS** (comentários podem ser PT-BR)

### Multi-Tenancy
```ts
// ✅ CORRETO
const deals = await prisma.deal.findMany({
  where: { company_id: user.company_id }
});

// ❌ ERRADO - NUNCA FAZER
const deals = await prisma.deal.findMany();
```

### Design System
```tsx
// ✅ CORRETO - Usar tokens
<Button className="bg-primary text-primary-foreground" />

// ❌ ERRADO - Nunca hardcode
<Button className="bg-orange-500" />
<Button style={{ backgroundColor: '#FF6B35' }} />
```

### Validação de APIs
- **SEMPRE** usar Zod para validação de input
- **SEMPRE** verificar permissões RBAC
- **SEMPRE** verificar company_id para isolamento

### Banco de Dados
- Campos: `snake_case`
- FK: `{table}_id` (ex: `company_id`, `user_id`)
- Sempre incluir: `created_at`, `updated_at`

---

## 🎯 Coach ao Vivo - Chrome Extension (Nov 2025)
**Status:** ✅ 100% Implementado

Assistente de vendas em tempo real para videochamadas (Google Meet, Zoom, Teams).

### Arquitetura
```
coach/
├── coach-extension/    # Chrome Extension (React + Vite + TypeScript)
└── coach-api/          # Backend API (Fastify + faster-whisper)
```

### Funcionalidades
- ✅ **Transcrição Híbrida**: Legendas nativas → Whisper → Web Speech API (fallback automático)
- ✅ **Métricas em Tempo Real**: Talk ratio, perguntas, WPM, silêncios, monólogos
- ✅ **Detecção de Objeções**: 7 tipos com battle cards e respostas sugeridas
- ✅ **Metodologias**: SPICED, SPIN, MEDDIC, BANT com tracking de etapas
- ✅ **Speaker Identification**: Via legendas nativas ou heurística (mic=vendedor)
- ✅ **Widget Flutuante**: Draggable, minimizável, 3 estados

### Endpoints Next.js
- `GET/POST /api/v1/meetings` - CRUD de reuniões
- `GET /api/v1/meetings/[id]/config` - Config para call
- `GET/POST /api/v1/coach/sessions` - Sessões de coaching
- `GET /api/v1/deals/today` - Deals com reuniões hoje

### Prisma Models
- `Meeting`, `CoachSession`, `BattleCard`

**Documentação Completa:** [COACH_AO_VIVO.md](./COACH_AO_VIVO.md)

---

## 🔄 Próximos Passos

### Curto Prazo (Sprint 6) ✅
- [x] **GoTo Connect**: Integração completa com OAuth 2.0
- [x] **GoTo Connect**: API de relatórios de chamadas
- [x] **GoTo Connect**: Modal de configuração e teste
- [x] **Calendar**: Funciona sem Google (eventos locais)
- [ ] **Coach ao Vivo**: Testar em produção com usuários reais
- [ ] **Coach ao Vivo**: Ajustar seletores de legendas Google Meet
- [ ] **Role Play**: Dashboard do MANAGER com visão do time

### Médio Prazo (Sprint 7-8)
- [x] **CRM HPro** - Envio de atividades (Industria Simples)
- [ ] **CRM HPro** - Envio automático após análise Gemini
- [ ] API real de atividades (substituir mock em `/inbox`)
- [ ] API real de pipeline (substituir mock em `/pipeline`)
- [ ] Drag & drop no kanban (dnd-kit)
- [ ] Sistema de notificações em tempo real
- [ ] Alteração de senha pelo usuário
- [ ] Email de boas-vindas com credenciais
- [ ] ZOHO CRM - Sincronização bidirecional completa

### Longo Prazo (Sprint 9+)
- [ ] Integração Stripe para billing
- [ ] Dashboard de uso por plano
- [ ] 2FA (Two-Factor Authentication)
- [ ] SSO (ENTERPRISE)
- [ ] API Keys para integração externa (ENTERPRISE)
- [ ] White-label (ENTERPRISE)
- [ ] Mobile App (React Native)

---

## 📚 Documentação Detalhada

Para informações completas, consulte:

### 📄 Principais
- **[ROADMAP.md](./ROADMAP.md)** - Roadmap unificado 2025 (visão estratégica + técnica)
- **[APIs-COMPLETAS.md](./APIs-COMPLETAS.md)** - Todos os endpoints REST
- **[planning/PLANS.md](./planning/PLANS.md)** - Feature flags e limites por plano
- **[CHANGELOG.md](./CHANGELOG.md)** - Histórico de versões e mudanças

### 🔒 Segurança e Dados (`data-security/`)
- **[RBAC.md](./data-security/RBAC.md)** - Sistema de permissões completo
- **[SCHEMA.md](./data-security/SCHEMA.md)** - Schema do banco de dados
- **[SECURITY-TESTS.md](./data-security/SECURITY-TESTS.md)** - Plano de testes de segurança
- **[LGPD-COMPLIANCE.md](./data-security/LGPD-COMPLIANCE.md)** - Compliance LGPD + NIST

### ⚡ Features (`features/`)
- **[COACH_AO_VIVO.md](./features/COACH_AO_VIVO.md)** - Coach ao Vivo (Chrome Extension)
- **[ROLEPLAY.md](./features/ROLEPLAY.md)** - Sistema de treinamento
- **[INTEGRATION-OVERVIEW.md](./features/INTEGRATION-OVERVIEW.md)** - Integrações (Google Meet, GoTo Connect, ZOHO)

---

## 🚨 Regras Críticas

### ⛔ NUNCA FAÇA
- ❌ Alterar `schema.prisma` sem explicação e permissão
- ❌ Instalar/desinstalar módulos sem permissão
- ❌ Queries sem filtro de `company_id` (exceto ADMIN com justificativa)
- ❌ Criar usuários ADMIN via API
- ❌ Mock de dados reais
- ❌ Hardcode de cores ou valores

### ✅ SEMPRE FAÇA
- ✅ Pesquisar código existente antes de criar novo
- ✅ Usar dependências já instaladas
- ✅ Documentar mudanças significativas
- ✅ Validar input com Zod
- ✅ Verificar permissões RBAC
- ✅ Criar audit logs para ações sensíveis
- ✅ Testar localmente antes de commit

---

## �️ Processo de Desenvolvimento de Features

### Fluxo Padrão (4 passos)
```
1. INÍCIO      → Novo chat + carregar STATUS.md + explicar feature
2. DESENVOLVER → Implementar código seguindo convenções
3. TESTAR      → npm run build + testar funcionamento
4. DOCUMENTAR  → Atualizar docs (mínimo necessário)
```

### Template de Prompt para Novo Chat
```markdown
Carregue /docs/STATUS.md

FEATURE: [Nome da Feature]
OBJETIVO: [O que deve fazer em 1 frase]
CONTEXTO: [Onde se encaixa no sistema]
REQUISITOS:
- [ ] Req 1
- [ ] Req 2

Implemente seguindo as convenções do projeto.
```

### Documentação a Atualizar (por tipo)

| Tipo de Mudança | Documentos |
|-----------------|------------|
| **Qualquer mudança** | `CHANGELOG.md` (obrigatório) |
| **Novo endpoint** | + `APIs-COMPLETAS.md` |
| **Alteração schema** | + `data-security/SCHEMA.md` |
| **Feature grande** | + `STATUS.md` (seção Implementações) |
| **Módulo novo** | + Criar `features/NOME.md` |

### Checklist Pós-Desenvolvimento
```
□ Código implementado e funcionando
□ npm run build passa
□ CHANGELOG.md atualizado
□ API documentada (se aplicável)
□ Schema atualizado (se aplicável)
```

---

## �🔧 Setup Rápido

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Setup banco
./scripts/setup/postgres-setup.sh
npx prisma generate
npx prisma db push
npm run db:seed

# Desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# Build
npm run build
```

**Credenciais de Teste:**
```
ADMIN: admin@performancy.com.br / admin123
DIRECTOR: director@skyone.solutions / demo123
MANAGER: manager@skyone.solutions / demo123
AGENT: agent@skyone.solutions / demo123
```

---

## 📞 Contato e Suporte

- **Documentação Técnica**: Ver arquivos em `/docs`
- **Schema DB**: `prisma/schema.prisma`
- **Configuração**: `.env.example`

---

**Última Atualização**: 12 de Janeiro de 2026
**Versão**: 1.9.2
**Sprint Atual**: 7 (Integração CRM HPro + APIs Pipeline)
**Próxima Sprint**: 8 (APIs reais de atividades e pipeline)
