# 🎯 Coach ao Vivo - Documentação Técnica

> **Status:** ✅ Implementado (v1.0)  
> **Última Atualização:** 28 de Novembro de 2025

Assistente de vendas em tempo real para videochamadas. Monitora conversas, fornece métricas, detecta objeções e sugere respostas contextuais.

---

## 📁 Estrutura do Projeto

```
coach/
├── README.md                          # Quick start
├── coach-extension/                   # Chrome Extension
│   ├── manifest.json                  # Manifest V3
│   ├── vite.config.ts                 # Build config
│   ├── package.json
│   └── src/
│       ├── background/                # Service Worker
│       │   └── service-worker.ts      # Tab capture, auth, settings
│       │
│       ├── content/                   # Content Script (injeta widget)
│       │   ├── index.tsx              # Entry point + CoachController
│       │   │
│       │   ├── platforms/             # Abstração de plataformas
│       │   │   ├── base-platform.ts   # Interface abstrata
│       │   │   ├── google-meet.ts     # ✅ Implementado
│       │   │   ├── zoom.ts            # 🔜 Preparado
│       │   │   └── teams.ts           # 🔜 Preparado
│       │   │
│       │   ├── transcription/         # Sistema híbrido de transcrição
│       │   │   ├── transcription-manager.ts  # Orquestrador com fallback
│       │   │   ├── captions-interceptor.ts   # Legendas nativas (1ª opção)
│       │   │   └── web-speech-api.ts         # Web Speech API (fallback)
│       │   │
│       │   ├── audio/                 # Captura de áudio
│       │   │   ├── audio-capture.ts   # Mic + Tab audio
│       │   │   └── audio-stream.ts    # WebSocket para Whisper
│       │   │
│       │   ├── analysis/              # Análise em tempo real
│       │   │   ├── metrics-calculator.ts    # Talk ratio, WPM, etc
│       │   │   ├── keyword-detector.ts      # Detecção de keywords
│       │   │   ├── objection-detector.ts    # Detecção de objeções
│       │   │   ├── methodology-tracker.ts   # SPICED, SPIN, etc
│       │   │   └── suggestion-engine.ts     # Motor de sugestões
│       │   │
│       │   └── ui/                    # Widget React
│       │       ├── components/
│       │       │   ├── CoachWidget.tsx       # Widget principal
│       │       │   ├── MetricsPanel.tsx      # Painel de métricas
│       │       │   ├── KeyMomentsPanel.tsx   # Momentos-chave
│       │       │   ├── SuggestionCard.tsx    # Cards de sugestão
│       │       │   ├── MethodologyProgress.tsx # Progresso SPICED
│       │       │   ├── NotesPanel.tsx        # Notas da call
│       │       │   ├── BattleCardModal.tsx   # Modal de objeção
│       │       │   └── ConsentModal.tsx      # Consentimento gravação
│       │       │
│       │       └── store/
│       │           └── coach-store.ts # Zustand state
│       │
│       ├── popup/                     # Popup da extensão
│       │   ├── popup.html
│       │   └── Popup.tsx
│       │
│       └── shared/                    # Compartilhado
│           ├── types.ts               # TypeScript types
│           ├── constants.ts           # Constantes e configs
│           └── api-client.ts          # Cliente HTTP/WS
│
└── coach-api/                         # Backend API
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── index.ts                   # Entry point
        ├── server.ts                  # Fastify config
        ├── services/
        │   └── whisper.ts             # faster-whisper integration
        └── routes/
            ├── transcription.ts       # POST + WebSocket
            ├── calls.ts               # Start/end calls
            ├── battle-cards.ts        # Objection cards
            └── analytics.ts           # Performance metrics
```

---

## 🔊 Sistema de Transcrição Híbrido

### Fluxo de Prioridade

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TRANSCRIPTION MANAGER                             │
│                                                                      │
│  1️⃣ LEGENDAS NATIVAS    2️⃣ WHISPER           3️⃣ WEB SPEECH API    │
│  ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐ │
│  │ Google Meet/Zoom │   │ faster-whisper   │   │ Browser Native   │ │
│  │ Speaker ID: ✅   │   │ Speaker ID: ⚠️   │   │ Speaker ID: ❌   │ │
│  │ Latência: Baixa  │   │ Latência: Média  │   │ Latência: Baixa  │ │
│  │ Custo: Grátis    │   │ Custo: CPU local │   │ Custo: Grátis    │ │
│  └────────┬─────────┘   └────────┬─────────┘   └────────┬─────────┘ │
│           │ Falha?               │ Falha?               │           │
│           └──────────────────────┴──────────────────────┘           │
│                                                                      │
│  • Auto-failover se fonte falha                                     │
│  • Health check a cada 10s                                          │
│  • Troca se 30s sem dados                                           │
└─────────────────────────────────────────────────────────────────────┘
```

### Classes Principais

#### `TranscriptionManager` (transcription-manager.ts)
```typescript
// Orquestra fontes de transcrição com fallback automático
class TranscriptionManager {
  async start(call_id: string, callback: TranscriptCallback): Promise<TranscriptionSource>;
  stop(): void;
  get_status(): TranscriptionStatus;
  set_seller_name(name: string): void;  // Para identificação de speaker
}
```

#### `CaptionsInterceptor` (captions-interceptor.ts)
```typescript
// Intercepta legendas nativas de Google Meet, Zoom, Teams
class CaptionsInterceptor {
  start(callback: CaptionCallback): boolean;
  stop(): void;
  is_receiving(): boolean;
  set_seller_name(name: string): void;
}
```

#### `WebSpeechTranscription` (web-speech-api.ts)
```typescript
// Speech recognition do browser (fallback gratuito)
class WebSpeechTranscription {
  static is_supported(): boolean;
  start(callback: SpeechCallback): boolean;
  stop(): void;
  set_language(lang: string): void;
}
```

---

## 📊 Métricas em Tempo Real

### `MetricsCalculator` (metrics-calculator.ts)

Calcula métricas da call em tempo real:

| Métrica | Descrição | Ideal |
|---------|-----------|-------|
| `talk_ratio` | % que vendedor falou | 30-45% |
| `questions_asked` | Total de perguntas | 5-10 por call |
| `questions_open` | Perguntas abertas | >60% |
| `words_per_minute` | Velocidade de fala | 120-150 WPM |
| `silence_count` | Pausas > 3s | Variável |
| `interruptions` | Interrupções | <3 |
| `monologue_alerts` | Falas > 60s seguidos | 0 |

```typescript
interface CallMetrics {
  talk_ratio: number;
  seller_talk_time: number;
  client_talk_time: number;
  questions_asked: number;
  questions_open: number;
  questions_closed: number;
  words_per_minute: number;
  silence_count: number;
  longest_silence: number;
  avg_response_time: number;
  interruptions: number;
  monologue_alerts: number;
  keywords_mentioned: KeywordMention[];
  objections_detected: ObjectionDetection[];
}
```

---

## 🔍 Detecção de Objeções

### `ObjectionDetector` (objection-detector.ts)

Detecta 7 tipos de objeções com padrões regex:

| Tipo | Exemplos | Battle Card |
|------|----------|-------------|
| `price` | "muito caro", "fora do orçamento" | bc-price-001 |
| `timing` | "não é o momento", "ano que vem" | bc-timing-001 |
| `authority` | "preciso falar com meu chefe" | bc-authority-001 |
| `competitor` | "já usamos X", "cotação com Y" | bc-competitor-001 |
| `need` | "não precisamos disso" | bc-need-001 |
| `trust` | "não conheço vocês" | bc-trust-001 |
| `complexity` | "parece complicado" | bc-complexity-001 |

### Cooldown
- **30 segundos** entre detecções do mesmo tipo
- Evita spam de alertas

---

## 🎯 Metodologias de Vendas

### `MethodologyTracker` (methodology-tracker.ts)

Suporta 4 metodologias com tracking de etapas:

#### SPICED (Default)
```
S ━━━━ P ━━━━ I ━━━━ C ━━━━ E ━━━━ D
│      │      │      │      │      │
│      │      │      │      │      └─ Decision
│      │      │      │      └─ Event
│      │      │      └─ Critical Event
│      │      └─ Impact
│      └─ Pain
└─ Situation
```

#### Outras Metodologias
- **SPIN**: Situation, Problem, Implication, Need-Payoff
- **MEDDIC**: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion
- **BANT**: Budget, Authority, Need, Timeline

### Detecção Automática
- Keywords específicas por etapa
- Threshold: 2+ keywords para marcar etapa
- Alerta se pular etapa sequencial

---

## 🖥️ Interface do Widget

### Estados do Widget
1. **Minimizado**: Apenas ícone flutuante
2. **Compacto**: Métricas principais
3. **Expandido**: Todos os painéis

### Painéis
- **Metrics**: Talk ratio, perguntas, WPM
- **Key Moments**: Keywords e objeções detectadas
- **Methodology**: Progresso SPICED/SPIN/etc
- **Suggestions**: Sugestões contextuais
- **Notes**: Notas manuais/automáticas

### Zustand Store
```typescript
interface CoachState {
  // Widget
  widget_state: 'minimized' | 'compact' | 'expanded';
  widget_position: { x: number; y: number };
  active_panel: 'metrics' | 'moments' | 'methodology' | 'notes';
  
  // Call
  is_in_call: boolean;
  is_recording: boolean;
  call_id: string | null;
  platform: string | null;
  
  // Data
  metrics: CallMetrics | null;
  transcript_segments: TranscriptSegment[];
  suggestions: Suggestion[];
  notes: Note[];
  
  // Methodology
  methodology_type: string;
  completed_steps: string[];
  current_step: string | null;
  
  // Actions
  start_call(id: string, platform: string): void;
  end_call(): void;
  update_metrics(metrics: CallMetrics): void;
  add_transcript(segment: TranscriptSegment): void;
  add_suggestion(suggestion: Suggestion): void;
  // ...
}
```

---

## 🔌 APIs

### Backend (coach-api) - Porta 3001

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/v1/transcription/stream` | POST | Transcrição HTTP |
| `/api/v1/transcription/ws` | WS | Transcrição real-time |
| `/api/v1/calls/start` | POST | Iniciar call |
| `/api/v1/calls/:id/end` | POST | Finalizar call |
| `/api/v1/calls/active` | GET | Calls ativas |
| `/api/v1/battle-cards` | GET | Listar battle cards |
| `/api/v1/analytics/performance` | GET | Métricas de performance |

### Next.js (Performancy) - Porta 3000

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/v1/meetings` | GET | Listar reuniões |
| `/api/v1/meetings` | POST | Criar reunião |
| `/api/v1/meetings/:id` | GET/PATCH/DELETE | CRUD reunião |
| `/api/v1/meetings/:id/config` | GET | Config para call |
| `/api/v1/coach/sessions` | GET | Listar sessões |
| `/api/v1/coach/sessions` | POST | Salvar sessão |
| `/api/v1/coach/sessions/:id` | GET/DELETE | CRUD sessão |
| `/api/v1/deals/today` | GET | Deals com reuniões hoje |

---

## 🗃️ Prisma Models

```prisma
model Meeting {
  id             String   @id @default(cuid())
  company_id     String
  user_id        String
  deal_id        String?
  title          String
  type           MeetingType @default(DISCOVERY)
  platform_url   String?
  scheduled_at   DateTime
  methodology    String   @default("SPICED")
  playbook_ids   String[] @default([])
  objectives     Json?
  coach_sessions CoachSession[]
}

model CoachSession {
  id                   String   @id @default(cuid())
  company_id           String
  user_id              String
  meeting_id           String?
  deal_id              String?
  platform             String
  status               CoachSessionStatus @default(IN_PROGRESS)
  started_at           DateTime @default(now())
  ended_at             DateTime?
  duration_seconds     Int?
  transcript           Json?
  metrics              Json?
  methodology_progress Json?
  notes                Json?
  keywords             Json?
  objections           Json?
  summary              String?
  action_items         Json?
}

model BattleCard {
  id              String   @id @default(cuid())
  company_id      String
  objection_type  String
  title           String
  client_says     String
  response_steps  Json
  supporting_data Json?
  tags            String[] @default([])
  is_active       Boolean  @default(true)
}

enum MeetingType {
  DISCOVERY
  DEMO
  NEGOTIATION
  CLOSING
  FOLLOW_UP
  ONBOARDING
  OTHER
}

enum CoachSessionStatus {
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

---

## 🚀 Quick Start

### 1. Instalar faster-whisper (Python)
```bash
pip install faster-whisper
```

### 2. Backend API
```bash
cd coach/coach-api
cp .env.example .env
npm install
npm run dev
# API em http://localhost:3001
```

### 3. Chrome Extension
```bash
cd coach/coach-extension
npm install
npm run build
# Carregar dist/ no Chrome
```

### 4. Prisma
```bash
npx prisma generate
npx prisma db push
```

---

## 🔒 Segurança e Privacidade

- ✅ Áudio bruto **NÃO** é armazenado
- ✅ Transcrições criptografadas em trânsito (HTTPS/WSS)
- ✅ Consentimento explícito antes de gravar
- ✅ Indicador de gravação sempre visível
- ✅ Usuário pode deletar transcrições
- ✅ Multi-tenant: dados isolados por empresa

---

## 📋 Checklist de Desenvolvimento

### ✅ Implementado
- [x] Chrome Extension (React + Vite + TypeScript)
- [x] Platform abstraction (Google Meet, Zoom, Teams)
- [x] Transcrição híbrida (Captions → Whisper → Web Speech)
- [x] Métricas em tempo real
- [x] Detecção de keywords e objeções
- [x] Metodologias (SPICED, SPIN, MEDDIC, BANT)
- [x] Motor de sugestões
- [x] Widget UI (Zustand + React)
- [x] Backend API (Fastify + faster-whisper)
- [x] Prisma models (Meeting, CoachSession, BattleCard)
- [x] Next.js endpoints (/api/v1/meetings, /api/v1/coach)

### 🔜 Próximos Passos
- [ ] Testar em produção com Google Meet
- [ ] Ajustar seletores de legendas do Google Meet
- [ ] Implementar seletores de Zoom e Teams
- [ ] Dashboard de performance pós-call
- [ ] Integração com CRM (auto-fill)
- [ ] Notificações push para follow-ups

---

**Versão:** 1.0.0  
**Data:** 28 de Novembro de 2025
