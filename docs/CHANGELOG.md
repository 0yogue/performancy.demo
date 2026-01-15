# 📝 Changelog - Performancy

Histórico de mudanças significativas do projeto.

---

## [1.9.2] - 12 de Janeiro de 2026

### ✨ CRM HPro - Extração de Data Combinada + Status de Envio na UI

#### Adicionado
- **Extração de Data da Atividade Combinada**
  - Prompt do Gemini agora extrai `data_atividade_combinada` quando cliente e vendedor combinam data/hora para próximo contato
  - Suporta datas relativas ("amanhã", "segunda-feira", "semana que vem")
  - Data é usada automaticamente ao enviar atividade ao CRM HPro
  - Card visual na UI mostrando a data combinada com destaque verde

- **Status de Envio ao CRM na UI**
  - Verificação automática do status de envio ao carregar conversa
  - Botão "Enviar ao CRM" mostra "Enviado" quando já foi enviado
  - Ícone ✓ verde na lista de conversas para itens já enviados ao CRM
  - Persistência correta do status em `is_atividade_enviada`

- **Validação de Speech - Confirmação de Data**
  - Novo campo `speech_data_confirmada` identifica se vendedor reforçou a data no final da ligação
  - Alerta **vermelho** quando nenhuma data foi combinada (atividade vai para mesmo dia = retrabalho)
  - Alerta **amarelo** quando data foi combinada mas não confirmada no encerramento
  - Badge **verde** "✓ Confirmada no speech" quando vendedor seguiu o roteiro corretamente
  - Objetivo: educar vendedores a sempre confirmar data do próximo contato

#### Arquivos Modificados
- `lib/integrations/gemini.ts` - Campos `data_atividade_combinada` e `speech_data_confirmada` no prompt e interface
- `app/api/conversations/[id]/analyze/route.ts` - Persistência dos novos campos
- `app/api/conversations/[id]/send-to-crm/route.ts` - Usa data combinada quando disponível
- `components/conversations/conversation-analysis.tsx` - Card de data + alertas de validação de speech
- `components/conversations/conversations-view.tsx` - Indicador visual de envio na lista

---

## [1.9.1] - 23 de Dezembro de 2025

### ✨ Deploy em Produção + Análise Gemini Completa

#### Adicionado
- **Análise de Conversas com Gemini 2.0 Flash**
  - Análise completa de ligações com tipo de atividade, sentimento, resumo
  - Campos: interesse_cliente, proximo_passo, produtos_mencionados, objecoes
  - Pontos positivos e melhorias identificados automaticamente
  - Persistência completa em `methodology_scores` (JSON)
  - Custo médio: ~$0.0007 por análise

- **Aba de Metadados na UI**
  - Nova aba "Metadados" ao lado de Sumário e Transcrição
  - Exibe: ID, canal, data/hora, duração, participantes, custos de IA
  - Cards organizados com ícones e badges

- **Deploy em Produção (Ubuntu DigitalOcean)**
  - Schema atualizado com colunas de IA e gravação
  - 4.857 conversas da Industria Simples migradas
  - Script com `ON CONFLICT DO NOTHING` para evitar duplicação
  - Documentação completa em `docs/DEPLOY-PRODUCAO.md`

#### Corrigido
- Modelo Gemini trocado de 2.5-flash para 2.0-flash (sem thinking tokens)
- maxOutputTokens aumentado para 8192 (evita truncamento)
- Carga de análise salva ao reabrir conversa

#### Arquivos Criados/Modificados
- `lib/integrations/gemini.ts` - Análise com Gemini 2.0 Flash
- `app/api/conversations/[id]/analyze/route.ts` - Persistência completa
- `components/conversations/conversation-analysis.tsx` - Aba metadados
- `docs/DEPLOY-PRODUCAO.md` - Guia de deploy
- `docs/CONVERSATIONS-ANALYSIS.md` - Documentação da análise

---

## [1.9.0] - 20 de Dezembro de 2025

### ✨ Pipeline GoTo Connect - Download Paralelo + Transcrição Gemini

#### Adicionado
- **Download Paralelo de Gravações**
  - `scripts/goto-download-all.ts` agora baixa 10 arquivos simultaneamente
  - Refresh proativo do token a cada 50 minutos (evita expiração)
  - Suporte a `--start` e `--end` para ranges customizados
  - ~10x mais rápido que download sequencial

- **Transcrição com Gemini API**
  - `scripts/transcribe-by-day.py` agora suporta `--provider gemini`
  - ~4x mais rápido que Whisper local (~7s vs ~30s por arquivo)
  - Diarização automática (VENDEDOR/CLIENTE)
  - Custo estimado: ~$0.0004 por arquivo (~$5 para 12.000 arquivos)
  - Busca chave mestra do Gemini via .env ou banco

- **Script de Transcrição por Dia**
  - `scripts/transcribe-by-day.py --day YYYY-MM-DD --provider gemini`
  - `--list-days` mostra dias disponíveis com pendentes
  - Evita conflito entre múltiplas instâncias (cada uma processa um dia)
  - Suporte a Whisper local (padrão) e Gemini API

- **Script de Mover Áudios Curtos**
  - `scripts/move-short-audios.py` move áudios < 30s para backup
  - Processamento paralelo com 8 workers
  - Preserva áudios curtos em `data/calls/recordings/backup_short/`

#### Corrigido
- Erro `invalid_client` no GoTo Connect (client_id faltando na config)
- Atualização de credenciais GoTo (client_id + client_secret) no banco

#### Arquivos Criados/Modificados
- `scripts/goto-download-all.ts` - Download paralelo + refresh proativo
- `scripts/transcribe-by-day.py` - Transcrição por dia com Gemini
- `scripts/move-short-audios.py` - Mover áudios curtos
- `scripts/update-goto-secret.ts` - Atualizar credenciais GoTo

#### Comandos Úteis
```bash
# Download dezembro com paralelização
npx tsx scripts/goto-download-all.ts --start 2025-12-01 --end 2025-12-18 --company-id cmj7nlj8u0000pjv3lqkc8ovy

# Listar dias disponíveis
python3 scripts/transcribe-by-day.py --list-days

# Transcrever com Gemini (4x mais rápido)
python3 scripts/transcribe-by-day.py --day 2025-12-18 --provider gemini

# Transcrever com Whisper local
python3 scripts/transcribe-by-day.py --day 2025-12-18 --provider whisper

# Mover áudios curtos para backup
python3 scripts/move-short-audios.py
```

---

## [1.8.0] - 11 de Dezembro de 2025

### ✨ Módulo de Telefonia + Transcrição Whisper

#### Adicionado
- **Módulo Modular de Telefonia** (`lib/telephony/`)
  - Factory pattern para múltiplos provedores (GoTo, Twilio, etc.)
  - Types compartilhados (`CallMetadata`, `RecordingMetadata`, `TranscriptionResult`)
  - Pipeline end-to-end (login → download → transcrição)
  - Provider GoTo Connect implementado

- **Transcriber com faster-whisper**
  - Transcrição local sem usar OpenAI
  - Suporte a modelos: tiny, base, small, medium, large
  - Suporte a CPU e GPU (CUDA)
  - Detecção automática de idioma

- **Scripts de Teste** (`tests/integrations/goto/`)
  - `test-connection.ts` - Testa conexão OAuth e APIs
  - `test-download.ts` - Baixa gravações e metadados
  - `test-transcribe.ts` - Transcreve com Whisper
  - `full-pipeline.ts` - Pipeline completo

- **UI: Auto-Connect ao Salvar Credenciais**
  - Ao salvar credenciais na UI, inicia OAuth automaticamente
  - Feedback visual durante validação
  - Mensagens de erro mais claras

#### Arquivos Criados
- `lib/telephony/index.ts` - Export principal
- `lib/telephony/types.ts` - Types compartilhados
- `lib/telephony/pipeline.ts` - Pipeline end-to-end
- `lib/telephony/transcriber.ts` - Whisper transcriber
- `lib/telephony/providers/index.ts` - Factory pattern
- `lib/telephony/providers/goto.ts` - Provider GoTo
- `tests/integrations/goto/*.ts` - 4 scripts de teste
- `docs/features/TELEPHONY.md` - Documentação completa

#### Alterado
- `components/integrations/goto-test-modal.tsx` - Auto-connect ao salvar

---

## [1.7.0] - 6 de Dezembro de 2025

### ✨ Sprint 6 - Integração GoTo Connect + Melhorias Calendar

#### Adicionado
- **Integração GoTo Connect Completa**
  - OAuth 2.0 flow com credenciais configuráveis via UI
  - API de relatórios de chamadas (Call Reports)
  - Sincronização de chamadas para arquivo local
  - Modal lightbox para configuração e teste
  - Suporte a múltiplos métodos para obter account_key
  - Tratamento de erros com mensagens claras

- **APIs GoTo Connect**
  - `GET /api/integrations/goto/start` - Inicia OAuth
  - `GET /api/integrations/goto/callback` - Callback OAuth
  - `GET /api/integrations/goto/status` - Status da conexão
  - `POST /api/integrations/goto/disconnect` - Desconectar
  - `GET/POST /api/integrations/goto/config` - Gerenciar credenciais
  - `GET /api/integrations/goto/test` - Testar conexão
  - `GET /api/integrations/goto/calls` - Listar chamadas
  - `POST /api/integrations/goto/sync` - Sincronizar chamadas

- **UI Melhorada**
  - Modal de configuração com abas (Configuração / Teste)
  - Formulário para Client ID e Client Secret
  - Testes de conexão em tempo real
  - Estatísticas de chamadas (total, recebidas, realizadas)
  - Botões de ação: Sincronizar, Testar, Desconectar

- **Calendar sem Google**
  - Calendário local funciona sem conexão Google
  - Eventos salvos no banco (model Meeting)
  - Banner informativo quando não conectado ao Google
  - Opções de Google Meet ocultas quando não conectado

#### Arquivos Criados
- `lib/integrations/goto.ts` - Helper OAuth + API GoTo
- `app/api/integrations/goto/*/route.ts` - 9 rotas de API
- `components/integrations/goto-buttons.tsx` - Botões client
- `components/integrations/goto-test-modal.tsx` - Modal de configuração/teste
- `public/integrations/goto.svg` - Logo GoTo

#### Alterado
- `tailwind.config.ts` - Corrigido require → import ESM
- `app/[company_slug]/calendar/page.tsx` - Suporte a calendário local
- `app/api/v1/calendar/events/route.ts` - Combina eventos Google + locais
- `components/calendar/event-modal.tsx` - Opção hide_google_options

#### Corrigido
- Erro `require is not defined` no tailwind.config.ts
- Cache corrompido do Next.js (webpack)
- Persistência de sessão (cookies 7 dias)

---

## [1.6.0] - 5 de Dezembro de 2025

### ✨ Sprint 5 - Integração Google Workspace + Calendar Sync

#### Adicionado
- **Integração Google Workspace Completa**
  - OAuth 2.0 flow para conectar conta Google
  - Calendar: Listar e criar eventos com Google Meet
  - Gmail: Listar e enviar emails
  - Docs: Listar e criar documentos (propostas)
  - Meet: Criar salas de reunião

- **Prisma Schema**
  - Novo enum: `SUITE` em IntegrationType
  - Novos providers: `GOOGLE_WORKSPACE`, `MICROSOFT_365`
  - Novos enums: `JobType`, `JobStatus`, `CalendarEventStatus`
  - Novo modelo: `ScheduledJob` - Sistema de jobs agendados
  - Novo modelo: `CalendarEvent` - Eventos do calendário

- **APIs OAuth**
  - `GET /api/integrations/google/start` - Inicia OAuth
  - `GET /api/integrations/google/callback` - Callback OAuth
  - `GET /api/integrations/google/status` - Status da conexão
  - `POST /api/integrations/google/disconnect` - Desconectar

- **APIs Google Services**
  - `GET/POST /api/v1/google/calendar/events` - Eventos de calendário
  - `GET /api/v1/google/gmail/messages` - Listar emails
  - `POST /api/v1/google/gmail/send` - Enviar email
  - `GET/POST /api/v1/google/docs` - Documentos/propostas
  - `GET/POST /api/v1/google/meet` - Criar salas

- **APIs Calendar Sync**
  - `GET /api/v1/calendar/events` - Eventos do banco (sincronizados)
  - `POST /api/v1/calendar/sync` - Sincronizar manualmente
  - `GET/PATCH /api/v1/calendar/config` - Configurar intervalo de sync

- **Sistema de Jobs Agendados**
  - `POST /api/cron/jobs` - Endpoint para cron job (cada minuto)
  - `GET /api/cron/jobs` - Status dos jobs
  - `lib/jobs/runner.ts` - Executor de jobs
  - Suporte para: CALENDAR_SYNC, EMAIL_SYNC, CRM_SYNC, REPORT_GENERATE

- **UI Atualizada**
  - Nova categoria "Suites" na página de integrações
  - Card Google Workspace com botão Conectar/Desconectar
  - Status dinâmico da conexão
  - Página de calendário agora usa dados reais do Google
  - Botão "Atualizar" para sync manual
  - Exibição de última sincronização e intervalo

#### Arquivos Criados
- `lib/integrations/google.ts` - Helper OAuth + API
- `lib/calendar/sync.ts` - Serviço de sincronização
- `lib/jobs/runner.ts` - Executor de jobs agendados
- `app/api/integrations/google/*/route.ts` - 4 rotas OAuth
- `app/api/v1/google/*/route.ts` - 5 rotas de serviços
- `app/api/v1/calendar/*/route.ts` - 3 rotas de calendário
- `app/api/cron/jobs/route.ts` - Endpoint do cron
- `components/calendar/calendar-events-view.tsx` - Novo componente
- `components/integrations/google-buttons.tsx` - Botões client
- `public/integrations/google.svg` - Logo Google
- `public/integrations/microsoft.svg` - Logo Microsoft

---

## [1.5.0] - 3 de Dezembro de 2025

### ✨ Sprint 4.5 - OKRs CRUD Completo

#### Adicionado
- **OKRs - APIs CRUD Completas**
  - Prisma Models: OKRPeriod, Objective, KeyResult, KeyResultProgress
  - Enums: OKRArea, OKRStatus, KeyResultStatus, KeyResultUnit
  - 6 rotas de API em `/api/v1/okrs/`
  - RBAC: Permissões por role (AGENT vê só seus OKRs)
  - Multi-tenant: Filtro obrigatório por company_id
  - Validação Zod em todos os inputs
  - Audit logs para todas as ações

- **Funcionalidades Automáticas**
  - Cálculo de progresso % baseado em current/target
  - Status automático: ON_TRACK → AT_RISK → BEHIND → ACHIEVED
  - Trend: Variação vs semana anterior (up/down/stable)
  - Cascade delete: Objetivo remove KRs e progress

#### APIs Criadas
| Endpoint | Métodos | Permissões |
|----------|---------|------------|
| `/api/v1/okrs/periods` | GET, POST | Todos / DIRECTOR+ |
| `/api/v1/okrs` | GET, POST | Todos / DIRECTOR+ |
| `/api/v1/okrs/[id]` | GET, PATCH, DELETE | Owner / DIRECTOR+ |
| `/api/v1/okrs/[id]/key-results` | GET, POST | Owner / DIRECTOR+ |
| `/api/v1/okrs/key-results/[id]` | GET, PATCH, DELETE | Owner |
| `/api/v1/okrs/key-results/[id]/progress` | GET, POST | MANAGER+ |

#### Arquivos Criados
- `app/api/v1/okrs/periods/route.ts`
- `app/api/v1/okrs/route.ts`
- `app/api/v1/okrs/[id]/route.ts`
- `app/api/v1/okrs/[id]/key-results/route.ts`
- `app/api/v1/okrs/key-results/[id]/route.ts`
- `app/api/v1/okrs/key-results/[id]/progress/route.ts`

---

## [1.4.0] - 3 de Dezembro de 2025

### ✨ Sprint 4.5 - OKRs de Receita & Documentação

#### Adicionado
- **Página de OKRs de Receita**
  - Interface completa com objetivos e key results
  - Componentes: ObjectiveCard, KeyResultRow, OKRSummary, OKRPeriodSelector
  - Linked Metrics vinculadas a Coach, Role Play e Pipeline
  - AI Insights automáticos baseados nos dados
  - Filtros por área (Receita, Vendas, Pré-vendas)
  - Seletor de período trimestral

- **Reorganização da Documentação**
  - Nova estrutura em pastas temáticas:
    - `data-security/` - RBAC, Schema, LGPD, Segurança
    - `features/` - Coach ao Vivo, Role Play, Integrações
    - `install/` - Guias de instalação
  - ROADMAP.md unificado (visão estratégica + técnica)
  - 19 documentos organizados em 4 categorias

#### Arquivos Criados
- `app/[company_slug]/okrs/page.tsx`
- `components/okrs/index.ts`
- `components/okrs/key-result-row.tsx`
- `components/okrs/objective-card.tsx`
- `components/okrs/okr-period-selector.tsx`
- `components/okrs/okr-summary.tsx`

---

## [1.3.0] - 3 de Dezembro de 2025

### ✨ Sprint 4 Completa - Role Play & Coach ao Vivo Produção

#### Adicionado
- **Role Play - Sistema de Treinamento**
  - Prisma Models: RolePlaySession, RolePlayBadge, RolePlayStreak, RolePlayGoal
  - APIs CRUD completas em `/api/v1/roleplay/`
  - Análise IA com scores Mental, Emocional, Técnico
  - Sistema de badges com 20+ tipos
  - Sistema de streaks para tracking de consistência
  - Sistema de ranking por squad, gerência, empresa
  - Sistema de metas para MANAGER
  - Dashboard do AGENT com histórico e badges
  - 10 componentes de UI especializados
  - Parser de transcrições para métricas automáticas

- **Coach ao Vivo - APIs Next.js**
  - `/api/v1/meetings` - CRUD de reuniões
  - `/api/v1/meetings/[id]/config` - Configuração para call
  - `/api/v1/coach/sessions` - Sessões de coaching
  - `/api/v1/deals/today` - Deals com reuniões hoje

- **Documentação**
  - ROADMAP.md - Novo documento de roadmap completo
  - Atualização de STATUS.md com Role Play
  - Atualização de ROLEPLAY.md com status implementado

#### Alterado
- Sprint atual: 4.5 (Role Play + Coach ao Vivo Produção)
- Próxima sprint: 5 (Coach Production + Role Play MANAGER)

---

## [1.2.0] - 28 de Novembro de 2025

### ✨ Sprint 3.5 - Coach ao Vivo (Chrome Extension)

#### Adicionado
- **Chrome Extension Completa**
  - React + Vite + TypeScript
  - Platform abstraction (Google Meet, Zoom, Teams preparado)
  - Transcrição híbrida (Legendas → Whisper → Web Speech API)
  - Métricas em tempo real (talk ratio, WPM, perguntas)
  - Detecção de objeções (7 tipos com battle cards)
  - Metodologias (SPICED, SPIN, MEDDIC, BANT)
  - Widget UI draggable com 3 estados
  - Backend API com Fastify + faster-whisper

- **Prisma Models**
  - Meeting (reuniões agendadas)
  - CoachSession (sessões de coaching)
  - BattleCard (respostas a objeções)

---

## [1.1.0] - 21 de Novembro de 2025

### ✨ Sprint 3 Completa - Dark Mode, Inbox e Pipeline

#### Adicionado
- **Dark Mode Completo**
  - `next-themes` com suporte a Light/Dark/System
  - ThemeToggle no perfil (3 cards bonitos)
  - ThemeSwitcher no header (dropdown rápido)
  - Cores Sunset Horizon para tema escuro
  - Persistência entre sessões

- **Sistema de Atividades (/inbox)**
  - Feed de atividades com ranking dinâmico
  - ActivityFeed, ActivityCard, ActivityFilter
  - StoriesBar estilo Instagram
  - Algoritmo de priorização por urgência e importância
  - Filtros: Todas, Prospectar, Follow-up, Pré-reunião, Reunião, Proposta
  - Progress bar dinâmica
  - Layout sem header (stories do topo)

- **Pipeline e Vendas**
  - `/pipeline` - Kanban de oportunidades
  - `/calendar` - Agenda de reuniões
  - `/performed` - Dashboard de performance
  - PipelineKanban component
  - DealDetailModal component
  - 5 estágios de vendas

- **Componentes UI**
  - `dropdown-menu` (Radix UI)
  - `dialog` (Radix UI)
  - `scroll-area` (Radix UI)
  - `textarea` (shadcn/ui)

#### Corrigido
- **Sidebar**: User info e logout agora no bottom (flex-col + mt-auto)
- **Nome do usuário**: Agora é link clicável para perfil
- **Topbar**: Não aparece na página /inbox
- **Layout**: Padding condicional por página

#### Alterado
- Menu principal agora inclui Inbox, Pipeline, Calendar
- Profile page agora tem Theme Toggle integrado
- Layout global com ThemeProvider

---

## [1.0.0] - Novembro de 2025

### ✨ Sprint 1 & 2 - Fundação e Gestão

#### Implementado
- **Sistema de Planos** (FREE, STARTER, PROFESSIONAL, ENTERPRISE)
- **Feature Flags** (10 features com overrides)
- **CRUD Completo de Usuários**
- **Menu Dinâmico no Banco**
- **Segurança e RBAC** (4 roles: ADMIN, DIRECTOR, MANAGER, AGENT)
- **Multi-tenant** (Isolamento por company_slug)
- **Chat com IA** (Claude 3.5 Sonnet)
- **Dashboard Executivo**
- **Playbooks de Vendas**
- **Análise de Conversas**
- **Audit Logs**
- **Admin Panel**

#### Stack Técnica
- Next.js 15 (App Router)
- React 18.3.1
- TypeScript 5.7.2
- PostgreSQL + Prisma ORM
- NextAuth.js v5
- shadcn/ui + Tailwind CSS
- Lucide React
- Recharts

---

## Formato do Changelog

Seguimos [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)

### Tipos de Mudanças
- **Adicionado** - novas features
- **Alterado** - mudanças em features existentes
- **Descontinuado** - features que serão removidas
- **Removido** - features removidas
- **Corrigido** - correções de bugs
- **Segurança** - correções de vulnerabilidades

---

**Última Atualização**: 20 de Dezembro de 2025
