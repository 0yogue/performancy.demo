# 🎭 Role Play - Especificação Técnica

> **Status:** ✅ 90% Implementado  
> **Última Atualização:** 3 de Dezembro de 2025

Funcionalidade de treinamento de vendas através de simulação de calls, permitindo que AGENTs pratiquem seus pitches e recebam feedback detalhado da IA.

---

## 📋 Visão Geral

### Objetivo
Permitir que vendedores (AGENTs) treinem suas habilidades de vendas fazendo apresentações (monólogo) baseadas em playbooks, recebendo análise automática com feedback detalhado para evolução contínua.

### Permissões (RBAC)
| Role | Acesso |
|------|--------|
| **AGENT** | Fazer role plays, ver próprios resultados, badges, streaks |
| **MANAGER** | Tudo do AGENT + ver time, definir metas, dashboard do time |
| **DIRECTOR** | Tudo do MANAGER + visão de todas gerências |
| **ADMIN** | Acesso total |

### Feature Flag
- **Nome:** `roleplay`
- **Planos:** STARTER+, PROFESSIONAL, ENTERPRISE
- **Limites:** Sem limite de role plays

---

## 🔄 Fluxo Principal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FLUXO DO ROLE PLAY                                 │
│                                                                              │
│  1. ATIVIDADE          2. SELEÇÃO           3. CALL              4. ANÁLISE │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────┐│
│  │ Inbox 9h     │ ──→ │ Escolher     │ ──→ │ Google Meet  │ ──→ │ IA       ││
│  │ ou Menu      │     │ Playbook     │     │ + Plugin     │     │ Automática│
│  └──────────────┘     └──────────────┘     └──────────────┘     └──────────┘│
│                                                                              │
│  • Atividade fixa 9h   • Lista playbooks   • Transcrição      • Mental     │
│  • Menu "Role Play"    • Botão iniciar     • Métricas tempo   • Emocional  │
│  • Qualquer momento    • Metodologia       • real             • Técnico    │
│                                                                              │
│                                              5. RESULTADO                    │
│                                            ┌──────────────────┐              │
│                                            │ • Feedback IA    │              │
│                                            │ • Plano estudo   │              │
│                                            │ • Badges/Streaks │              │
│                                            │ • Notificação    │              │
│                                            └──────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Prisma Models

### RolePlaySession
```prisma
model RolePlaySession {
  id                   String   @id @default(cuid())
  company_id           String
  user_id              String
  playbook_id          String
  
  // Timing
  scheduled_at         DateTime // Quando estava agendado (9h)
  started_at           DateTime
  ended_at             DateTime?
  duration_seconds     Int?
  
  // Status
  status               RolePlayStatus @default(IN_PROGRESS)
  
  // Transcrição e Métricas (do plugin)
  transcript           Json?    // Transcrição completa
  metrics              Json?    // talk_ratio, wpm, silences, etc
  methodology_progress Json?    // Progresso SPICED/SPIN/etc
  
  // Análise IA
  analysis             Json?    // Análise completa estruturada
  mental_score         Float?   // 0-100
  emotional_score      Float?   // 0-100
  technical_score      Float?   // 0-100
  overall_score        Float?   // Média ponderada
  
  // Plano de Estudo
  study_plan           Json?    // Recomendações estruturadas
  strengths            Json?    // Pontos fortes identificados
  improvements         Json?    // Áreas para melhorar
  
  // Metadata
  created_at           DateTime @default(now())
  updated_at           DateTime @updatedAt
  
  // Relations
  company              Company  @relation(fields: [company_id], references: [id])
  user                 User     @relation(fields: [user_id], references: [id])
  playbook             Playbook @relation(fields: [playbook_id], references: [id])
  badges_earned        RolePlayBadge[]
  
  @@index([company_id])
  @@index([user_id])
  @@index([playbook_id])
  @@index([started_at])
  @@map("roleplay_sessions")
}

enum RolePlayStatus {
  SCHEDULED    // Agendado para 9h
  IN_PROGRESS  // Em andamento
  COMPLETED    // Finalizado com análise
  CANCELLED    // Cancelado
  SKIPPED      // Pulado (não fez no dia)
}
```

### RolePlayBadge
```prisma
model RolePlayBadge {
  id              String   @id @default(cuid())
  company_id      String
  user_id         String
  badge_type      String   // Tipo do badge
  earned_at       DateTime @default(now())
  session_id      String?  // Sessão que desbloqueou
  
  // Relations
  company         Company          @relation(fields: [company_id], references: [id])
  user            User             @relation(fields: [user_id], references: [id])
  session         RolePlaySession? @relation(fields: [session_id], references: [id])
  
  @@unique([user_id, badge_type])
  @@index([company_id])
  @@index([user_id])
  @@map("roleplay_badges")
}
```

### RolePlayStreak
```prisma
model RolePlayStreak {
  id              String   @id @default(cuid())
  company_id      String
  user_id         String
  activity_type   String   // "roleplay", "call", "follow_up", etc
  
  current_streak  Int      @default(0)
  longest_streak  Int      @default(0)
  last_activity   DateTime?
  
  // Metadata
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  
  // Relations
  company         Company  @relation(fields: [company_id], references: [id])
  user            User     @relation(fields: [user_id], references: [id])
  
  @@unique([user_id, activity_type])
  @@index([company_id])
  @@index([user_id])
  @@map("roleplay_streaks")
}
```

### RolePlayGoal (Metas do MANAGER)
```prisma
model RolePlayGoal {
  id              String   @id @default(cuid())
  company_id      String
  
  // Target
  target_type     GoalTargetType // USER, SQUAD, COMPANY
  target_id       String         // user_id, squad_id ou company_id
  
  // Goal
  metric          String   // "sessions_per_week", "avg_score", "streak_days"
  target_value    Float
  current_value   Float    @default(0)
  
  // Period
  period_type     GoalPeriodType // WEEKLY, MONTHLY
  period_start    DateTime
  period_end      DateTime
  
  // Creator
  created_by_id   String
  
  // Status
  status          GoalStatus @default(ACTIVE)
  
  // Metadata
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  
  // Relations
  company         Company  @relation(fields: [company_id], references: [id])
  created_by      User     @relation(fields: [created_by_id], references: [id])
  
  @@index([company_id])
  @@index([target_type, target_id])
  @@map("roleplay_goals")
}

enum GoalTargetType {
  USER
  SQUAD
  COMPANY
}

enum GoalPeriodType {
  WEEKLY
  MONTHLY
}

enum GoalStatus {
  ACTIVE
  COMPLETED
  FAILED
  CANCELLED
}
```

---

## 🏆 Sistema de Badges

### Badges de Frequência
| Badge | Critério | Ícone |
|-------|----------|-------|
| `first_roleplay` | Primeiro role play | 🎬 |
| `early_bird` | Role play antes das 9h | 🌅 |
| `consistent_5` | 5 role plays seguidos | ⭐ |
| `consistent_10` | 10 role plays seguidos | 🌟 |
| `consistent_30` | 30 role plays seguidos | 💫 |
| `streak_week` | 7 dias consecutivos | 🔥 |
| `streak_month` | 30 dias consecutivos | 🏆 |

### Badges de Performance
| Badge | Critério | Ícone |
|-------|----------|-------|
| `score_80` | Score geral ≥ 80 | 🥉 |
| `score_90` | Score geral ≥ 90 | 🥈 |
| `score_95` | Score geral ≥ 95 | 🥇 |
| `perfect_mental` | Mental score = 100 | 🧠 |
| `perfect_emotional` | Emotional score = 100 | ❤️ |
| `perfect_technical` | Technical score = 100 | ⚙️ |
| `triple_perfect` | Todos os 3 scores = 100 | 👑 |

### Badges de Metodologia
| Badge | Critério | Ícone |
|-------|----------|-------|
| `spiced_master` | 100% SPICED em 5 sessões | 🌶️ |
| `spin_master` | 100% SPIN em 5 sessões | 🔄 |
| `meddic_master` | 100% MEDDIC em 5 sessões | 📋 |
| `bant_master` | 100% BANT em 5 sessões | 💰 |
| `methodology_expert` | Master em 2+ metodologias | 🎓 |

### Badges de Evolução
| Badge | Critério | Ícone |
|-------|----------|-------|
| `improvement_10` | +10 pontos em 1 semana | 📈 |
| `improvement_20` | +20 pontos em 1 mês | 🚀 |
| `comeback` | Score 90+ após score <70 | 💪 |
| `playbook_variety` | 5+ playbooks diferentes | 📚 |

### Badges Especiais
| Badge | Critério | Ícone |
|-------|----------|-------|
| `top_performer` | #1 do squad no mês | 🏅 |
| `team_champion` | #1 da empresa no mês | 🏆 |
| `mentor` | Ajudou colega a melhorar | 🤝 |

---

## 📊 Sistema de Ranking

### Níveis de Ranking
1. **Squad** - Ranking entre AGENTs do mesmo squad
2. **Gerência** - Ranking entre AGENTs da mesma gerência (MANAGER)
3. **Diretoria** - Ranking entre AGENTs da mesma diretoria (DIRECTOR)
4. **Empresa** - Ranking geral da empresa

### Métricas do Ranking
- **Score médio** (últimos 30 dias)
- **Quantidade de role plays** (mês)
- **Streak atual**
- **Badges conquistados**

### Cálculo de Pontos
```typescript
ranking_points = (
  (avg_score * 0.4) +           // 40% score médio
  (sessions_count * 2) +        // 2 pontos por sessão
  (current_streak * 5) +        // 5 pontos por dia de streak
  (badges_count * 10)           // 10 pontos por badge
)
```

---

## 🎯 Sistema de Streaks

### Atividades com Streak
| Atividade | Descrição |
|-----------|-----------|
| `roleplay` | Role plays diários |
| `call` | Calls com clientes |
| `follow_up` | Follow-ups enviados |
| `proposal` | Propostas enviadas |
| `meeting` | Reuniões realizadas |

### Regras de Streak
- **Reset:** Se não fizer a atividade no dia, streak zera
- **Tolerância:** Finais de semana não quebram streak (configurável)
- **Recuperação:** Não há recuperação de streak perdido
- **Registro:** `last_activity` atualizado diariamente

---

## 🤖 Análise da IA

### Prompt de Análise
```markdown
# Análise de Role Play - Vendedor

## Contexto
- Playbook: {playbook_name}
- Metodologia: {methodology}
- Duração: {duration}
- Data: {date}

## Transcrição
{transcript}

## Métricas Coletadas
- Talk ratio: {talk_ratio}%
- WPM: {wpm}
- Silêncios: {silence_count}
- Monólogos longos: {monologue_count}

## Instruções de Análise

Analise esta sessão de role play avaliando três dimensões:

### 1. MENTAL (0-100)
Avalie:
- Clareza de raciocínio
- Estrutura lógica da apresentação
- Capacidade de articular ideias
- Domínio do conteúdo do playbook
- Organização das informações

### 2. EMOCIONAL (0-100)
Avalie:
- Tom de voz (inferido pela pontuação/estrutura)
- Confiança demonstrada
- Entusiasmo e energia
- Capacidade de criar rapport
- Gestão de pausas e ritmo

### 3. TÉCNICO (0-100)
Avalie:
- Aderência ao playbook
- Cobertura da metodologia ({methodology})
- Uso correto de técnicas de vendas
- Qualidade das perguntas (mesmo que retóricas)
- Transições entre etapas

## Output Esperado (JSON)

{
  "mental_score": number,
  "emotional_score": number,
  "technical_score": number,
  "overall_score": number,
  
  "analysis": {
    "mental": {
      "score": number,
      "highlights": ["..."],
      "concerns": ["..."],
      "feedback": "..."
    },
    "emotional": {
      "score": number,
      "highlights": ["..."],
      "concerns": ["..."],
      "feedback": "..."
    },
    "technical": {
      "score": number,
      "highlights": ["..."],
      "concerns": ["..."],
      "feedback": "..."
    }
  },
  
  "strengths": [
    {
      "area": "string",
      "description": "string",
      "example_from_transcript": "string"
    }
  ],
  
  "improvements": [
    {
      "area": "string",
      "priority": "high" | "medium" | "low",
      "current_behavior": "string",
      "suggested_behavior": "string",
      "practice_tip": "string"
    }
  ],
  
  "study_plan": {
    "immediate": [
      {
        "action": "string",
        "reason": "string",
        "resources": ["string"]
      }
    ],
    "short_term": [...],  // Próxima semana
    "long_term": [...]    // Próximo mês
  },
  
  "methodology_coverage": {
    "methodology": "SPICED" | "SPIN" | "MEDDIC" | "BANT",
    "steps_covered": ["S", "P", "I"],
    "steps_missing": ["C", "E", "D"],
    "coverage_percentage": number,
    "recommendations": ["..."]
  },
  
  "playbook_adherence": {
    "percentage": number,
    "sections_covered": ["..."],
    "sections_missed": ["..."],
    "suggestions": ["..."]
  },
  
  "next_session_focus": "string",
  
  "motivational_message": "string"
}
```

---

## 🖥️ Interfaces (UI)

### 1. Atividade no Inbox
- Card especial "Role Play Diário" sempre às 9h
- Botão "Iniciar Role Play" abre modal de seleção de playbook
- Status: Pendente, Em Andamento, Concluído, Pulado

### 2. Modal de Seleção de Playbook
- Lista de playbooks disponíveis
- Filtro por metodologia
- Preview do playbook
- Botão "Iniciar" → Abre Google Meet

### 3. Página de Resultados (`/roleplay/[session_id]`)
- Score geral + 3 dimensões (cards visuais)
- Gráfico radar: Mental x Emocional x Técnico
- Análise detalhada por seção
- Plano de estudo com checklist
- Badges conquistados na sessão
- Transcrição com highlights

### 4. Dashboard do AGENT (`/roleplay`)
- **Visão Geral:** Score médio, total de sessões, streak atual
- **Evolução:** Gráfico de linha dos últimos 30 dias
- **Badges:** Grid com todos os badges (conquistados e a conquistar)
- **Histórico:** Lista de sessões passadas
- **Ranking:** Posição no squad/empresa

### 5. Dashboard do MANAGER (`/team/roleplay`)
- **Calendário:** Visualização de quem fez role play cada dia
- **Métricas do Time:** Score médio, participação, evolução
- **Ranking do Time:** Lista ordenada por performance
- **Metas:** Criar e acompanhar metas para AGENTs/Squad
- **Detalhes:** Drill-down em cada AGENT

### 6. Streaks na Performance (`/performed`)
- Seção "Streaks" com cards por atividade
- Chama atual (🔥) com número de dias
- Recorde pessoal
- Comparativo com média do time

---

## 🔔 Notificações

### Para AGENT
| Evento | Notificação |
|--------|-------------|
| Análise pronta | "Sua análise de Role Play está pronta! Score: {score}" |
| Badge conquistado | "Parabéns! Você conquistou o badge {badge_name} 🏆" |
| Streak em risco | "Não esqueça do seu Role Play hoje! Streak: {days} dias 🔥" |
| Nova meta | "Seu gerente definiu uma nova meta para você" |

### Para MANAGER
| Evento | Notificação |
|--------|-------------|
| Resumo diário (18h) | "Resumo do time: {x} role plays, score médio: {avg}" |
| AGENT bateu meta | "{agent_name} atingiu a meta de {goal}!" |
| AGENT em risco | "{agent_name} não fez role play há 3 dias" |

---

## 📁 Estrutura de Arquivos

```
app/
├── [company_slug]/
│   ├── roleplay/
│   │   ├── page.tsx                    # Dashboard do AGENT
│   │   └── [session_id]/
│   │       └── page.tsx                # Detalhe da sessão
│   └── team/
│       └── roleplay/
│           └── page.tsx                # Dashboard do MANAGER
│
├── api/
│   └── v1/
│       └── roleplay/
│           ├── route.ts                # GET (listar), POST (criar)
│           ├── [id]/
│           │   ├── route.ts            # GET, PATCH, DELETE
│           │   └── analyze/
│           │       └── route.ts        # POST (trigger análise IA)
│           ├── badges/
│           │   └── route.ts            # GET badges do usuário
│           ├── streaks/
│           │   └── route.ts            # GET streaks do usuário
│           ├── ranking/
│           │   └── route.ts            # GET ranking
│           └── goals/
│               └── route.ts            # CRUD metas (MANAGER)

components/
├── roleplay/
│   ├── roleplay-activity-card.tsx      # Card no inbox
│   ├── playbook-selector-modal.tsx     # Modal seleção playbook
│   ├── roleplay-result-card.tsx        # Card de resultado
│   ├── roleplay-score-radar.tsx        # Gráfico radar
│   ├── roleplay-analysis-section.tsx   # Seção de análise
│   ├── roleplay-study-plan.tsx         # Plano de estudo
│   ├── roleplay-badges-grid.tsx        # Grid de badges
│   ├── roleplay-streak-card.tsx        # Card de streak
│   ├── roleplay-ranking-list.tsx       # Lista de ranking
│   ├── roleplay-history-list.tsx       # Histórico de sessões
│   ├── roleplay-team-calendar.tsx      # Calendário do time
│   └── roleplay-goal-form.tsx          # Form de metas

lib/
├── roleplay/
│   ├── analysis.ts                     # Lógica de análise IA
│   ├── badges.ts                       # Sistema de badges
│   ├── streaks.ts                      # Sistema de streaks
│   ├── ranking.ts                      # Cálculo de ranking
│   └── goals.ts                        # Sistema de metas
```

---

## 🚀 Status de Implementação

### Fase 1: Fundação (Sprint 4.1) ✅ Completo
- [x] Adicionar models ao Prisma
- [x] Adicionar feature flag `roleplay`
- [x] APIs básicas CRUD de sessões
- [x] Atividade no Inbox

### Fase 2: Core (Sprint 4.2) ✅ Completo
- [x] Modal de seleção de playbook
- [x] Integração com plugin de transcrição
- [x] Análise IA automática
- [x] Página de resultado

### Fase 3: Gamificação (Sprint 4.3) ✅ Completo
- [x] Sistema de badges
- [x] Sistema de streaks
- [x] Sistema de ranking
- [x] Dashboard do AGENT

### Fase 4: Time (Sprint 4.4) 🚧 Em Andamento
- [ ] Dashboard do MANAGER
- [x] Sistema de metas (API pronta)
- [ ] Notificações push
- [ ] Resumo diário automático

### Fase 5: Polish (Sprint 4.5) 🔜 Planejado
- [ ] Gráficos de evolução
- [ ] Performance e cache
- [ ] Testes automatizados
- [ ] Documentação completa

---

## 📝 Próximos Passos

### Imediato (Sprint 5)
- [ ] Dashboard do MANAGER com visão do time
- [ ] Notificações push para badges e análise pronta
- [ ] Resumo diário às 18h para MANAGER
- [ ] Calendário visual de role plays do time

### Próximo (Sprint 6)
- [ ] Gráficos de evolução de scores
- [ ] Comparação entre períodos
- [ ] Export de relatórios em PDF
- [ ] Integração com metas de vendas

---

## ✅ Arquivos Implementados

### APIs (`app/api/v1/roleplay/`)
- `route.ts` - GET (listar), POST (criar)
- `[id]/route.ts` - GET, PATCH, DELETE
- `[id]/analyze/route.ts` - POST (trigger análise IA)
- `badges/route.ts` - GET badges do usuário
- `streaks/route.ts` - GET streaks do usuário
- `ranking/route.ts` - GET ranking
- `goals/route.ts` - CRUD metas (MANAGER)
- `analyses/route.ts` - GET análises

### Lib (`lib/roleplay/`)
- `analysis.ts` - Lógica de análise IA
- `badges.ts` - Sistema de badges
- `streaks.ts` - Sistema de streaks
- `ranking.ts` - Cálculo de ranking
- `goals.ts` - Sistema de metas
- `parser.ts` - Parser de transcrições
- `types.ts` - TypeScript types

### Components (`components/roleplay/`)
- `roleplay-activity-card.tsx` - Card no inbox
- `playbook-selector-modal.tsx` - Modal seleção playbook
- `roleplay-score-card.tsx` - Card de score
- `roleplay-analysis-detail.tsx` - Detalhe da análise
- `roleplay-analyses-view.tsx` - Visão de análises
- `roleplay-badges-grid.tsx` - Grid de badges
- `roleplay-streak-card.tsx` - Card de streak
- `roleplay-ranking-list.tsx` - Lista de ranking
- `roleplay-history-list.tsx` - Histórico de sessões

### Pages (`app/[company_slug]/roleplay/`)
- `page.tsx` - Dashboard do AGENT
- `[session_id]/page.tsx` - Detalhe da sessão

---

**Versão:** 2.0.0  
**Data:** 3 de Dezembro de 2025
