# 📞 Módulo de Telefonia - Performancy

> **Versão:** 1.0.0  
> **Data:** 11 de Dezembro de 2025  
> **Status:** ✅ Implementado

---

## 📋 Visão Geral

Módulo modular para integração com provedores de telefonia (GoTo Connect, Twilio, etc.) com suporte a:

- **Download de chamadas** (metadados + gravações)
- **Transcrição com Whisper** (faster-whisper, sem OpenAI)
- **Pipeline completo** (login → download → transcrição)

### Arquitetura

```
lib/
└── telephony/
    ├── index.ts           # Export principal
    ├── types.ts           # Types compartilhados
    ├── pipeline.ts        # Pipeline end-to-end
    ├── transcriber.ts     # Whisper transcriber
    └── providers/
        ├── index.ts       # Factory pattern
        └── goto.ts        # Provider GoTo Connect

tests/
└── integrations/
    └── goto/
        ├── README.md
        ├── test-connection.ts
        ├── test-download.ts
        ├── test-transcribe.ts
        └── full-pipeline.ts
```

---

## 🚀 Uso Rápido

### 1. Usando o Provider Diretamente

```typescript
import { create_telephony_provider } from '@/lib/telephony';

// Criar provider
const provider = create_telephony_provider('GOTO_CONNECT', company_id);

// Testar conexão
const result = await provider.test_connection();
console.log(result.success ? 'Conectado!' : result.message);

// Buscar chamadas
const calls = await provider.fetch_calls({
  start_date: new Date('2025-01-01'),
  end_date: new Date(),
  answered_only: true,
});

// Baixar gravação
const recording = await provider.download_recording(recording_id, {
  output_dir: './data/calls/recordings',
  filename_prefix: 'empresa',
});
```

### 2. Usando o Transcriber

```typescript
import { create_transcriber } from '@/lib/telephony';

// Criar transcriber
const transcriber = create_transcriber({
  model: 'base', // tiny, base, small, medium, large
  device: 'cpu', // cpu ou cuda
});

// Inicializar (verifica se faster-whisper está instalado)
await transcriber.initialize();

// Transcrever arquivo
const result = await transcriber.transcribe('./recording.mp3');
console.log(result.text);
console.log(result.segments); // Com timestamps
```

### 3. Usando o Pipeline Completo

```typescript
import { run_telephony_pipeline } from '@/lib/telephony';

const result = await run_telephony_pipeline({
  provider: 'GOTO_CONNECT',
  company_id: 'clx123',
  fetch_options: {
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end_date: new Date(),
  },
  download_options: {
    output_dir: './data/calls/recordings',
    filename_prefix: 'performancy',
  },
  transcription_options: {
    model: 'base',
  },
  on_progress: (step, current, total) => {
    console.log(`${step}: ${current}/${total}`);
  },
});

console.log(`Chamadas: ${result.calls.length}`);
console.log(`Gravações: ${result.downloads.length}`);
console.log(`Transcrições: ${result.transcriptions.length}`);
```

---

## 🧪 Scripts de Teste

### Pré-requisitos

1. **faster-whisper instalado:**
   ```bash
   pip install faster-whisper
   ```

2. **Credenciais GoTo configuradas** no banco (via UI de integrações)

### Executar Testes

```bash
# Testar conexão
npx tsx tests/integrations/goto/test-connection.ts

# Baixar chamadas e gravações (últimos 7 dias)
npx tsx tests/integrations/goto/test-download.ts --days=7

# Transcrever gravações
npx tsx tests/integrations/goto/test-transcribe.ts --dir=data/calls/recordings

# Pipeline completo
npx tsx tests/integrations/goto/full-pipeline.ts --days=7 --model=base
```

---

## 📁 Estrutura de Saída

```
data/
└── calls/
    ├── metadata/           # JSONs com metadados das chamadas
    │   ├── calls_empresa_1234567890.json
    │   └── detail_conversation-id.json
    ├── recordings/         # Arquivos de áudio
    │   ├── empresa_rec-id-1.mp3
    │   └── empresa_rec-id-2.wav
    └── transcriptions/     # Transcrições
        ├── empresa_rec-id-1.json  # Com segmentos e metadata
        └── empresa_rec-id-1.txt   # Texto puro
```

---

## 🔧 Configuração do Whisper

| Variável | Valores | Padrão | Descrição |
|----------|---------|--------|-----------|
| `WHISPER_MODEL` | tiny, base, small, medium, large | base | Modelo de transcrição |
| `WHISPER_DEVICE` | cpu, cuda | cpu | Dispositivo de processamento |
| `WHISPER_COMPUTE_TYPE` | int8, float16, float32 | int8 | Tipo de computação |

**Recomendações:**
- **CPU:** Usar `base` ou `small` com `int8`
- **GPU (CUDA):** Usar `medium` ou `large` com `float16`

---

## 📊 Types Principais

### CallMetadata
```typescript
interface CallMetadata {
  id: string;
  provider: TelephonyProvider;
  external_id: string;
  direction: 'INBOUND' | 'OUTBOUND';
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  answered: boolean;
  caller_number?: string;
  callee_number?: string;
  participants?: CallParticipant[];
}
```

### TranscriptionResult
```typescript
interface TranscriptionResult {
  recording_id: string;
  text: string;
  segments: TranscriptionSegment[];
  language: string;
  duration: number;
  model: string;
  transcribed_at: string;
}
```

---

## 🔌 Provedores Suportados

| Provider | Status | Funcionalidades |
|----------|--------|-----------------|
| **GoTo Connect** | ✅ Implementado | Chamadas, Gravações, Transcrição |
| Twilio | 🔜 Planejado | - |
| Aircall | 🔜 Planejado | - |
| RingCentral | 🔜 Planejado | - |

---

## 🔐 Segurança

- Tokens são armazenados **criptografados** no banco
- Refresh automático de tokens expirados
- Multi-tenant: cada empresa tem suas próprias credenciais
- Transcrição local (sem envio para cloud)

---

## 📝 Changelog

### v1.0.0 (11/12/2025)
- ✅ Módulo modular de telefonia
- ✅ Provider GoTo Connect
- ✅ Transcriber com faster-whisper
- ✅ Pipeline end-to-end
- ✅ Scripts de teste
- ✅ Auto-connect ao salvar credenciais na UI
