# Guia de Teste - Realtime Coaching

Este guia explica como testar a funcionalidade de Realtime Coaching no Performancy.

## Pré-requisitos

### 1. Servidores Rodando

```bash
# Terminal 1 - Next.js App
cd /Users/marcioferreira/projects/performancy
npm run start

# Terminal 2 - Coach API
cd /Users/marcioferreira/projects/performancy/coach/coach-api
npm run dev
```

### 2. Verificar Coach API
Acesse http://localhost:3001 para confirmar que está rodando.

### 3. Seed dos Playbooks
```bash
cd /Users/marcioferreira/projects/performancy
npx ts-node scripts/seed-roleplay.ts
```

---

## Arquitetura do Realtime Coaching

```
┌─────────────────┐    WebSocket/HTTP    ┌─────────────────┐
│   Browser       │ ◄──────────────────► │   Coach API     │
│   (Extension)   │                      │   (port 3001)   │
└─────────────────┘                      └────────┬────────┘
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │  Whisper/OpenAI │
                                         │  (Transcrição)  │
                                         └─────────────────┘
```

---

## Opção 1: Teste via Extensão Chrome (Completo)

### Instalando a Extensão

1. **Abrir Chrome** e ir para `chrome://extensions/`

2. **Ativar "Modo do desenvolvedor"** (toggle no canto superior direito)

3. **Carregar extensão**:
   - Clique em "Carregar sem compactação"
   - Selecione a pasta: `/Users/marcioferreira/projects/performancy/coach/chrome-extension`

4. **Configurar a extensão**:
   - Clique no ícone da extensão
   - Configure a URL do Coach API: `http://localhost:3001`

### Usando a Extensão

1. **Acesse o Google Meet** (https://meet.google.com/new)

2. **Inicie uma chamada**

3. **Clique no ícone da extensão** para ativar o coaching

4. **Fale durante a chamada** - a extensão vai:
   - Capturar o áudio
   - Enviar para transcrição via Coach API
   - Exibir sugestões em tempo real

---

## Opção 2: Teste via API (Desenvolvimento)

### Testar Transcrição

```bash
# Enviar áudio para transcrição (base64)
curl -X POST http://localhost:3001/transcription/stream \
  -H "Content-Type: application/json" \
  -d '{
    "audio_chunk": "<base64_encoded_audio>",
    "call_id": "test-123",
    "timestamp": 1234567890,
    "speaker_hint": "seller"
  }'
```

### Testar Sessão de Coaching

```bash
# Criar sessão
curl -X POST http://localhost:3001/coaching/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "call_id": "test-123",
    "playbook_id": "<playbook_uuid>"
  }'

# Enviar transcrição para análise
curl -X POST http://localhost:3001/coaching/sessions/test-123/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "Olá, gostaria de saber mais sobre o produto...",
    "speaker": "client"
  }'
```

---

## Opção 3: Teste via WebSocket

```javascript
// Conectar via WebSocket
const ws = new WebSocket('ws://localhost:3001/coaching/realtime');

ws.onopen = () => {
  // Iniciar sessão
  ws.send(JSON.stringify({
    type: 'start_session',
    call_id: 'test-123',
    playbook_id: '<playbook_uuid>'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Sugestão recebida:', data);
};

// Enviar transcrição
ws.send(JSON.stringify({
  type: 'transcript',
  text: 'O cliente disse que está interessado no produto',
  speaker: 'client'
}));
```

---

## Fluxo de Teste Completo

### 1. Login no Sistema
- URL: http://localhost:3000/login
- Email: `agent@skyone.solutions`
- Senha: `demo123`

### 2. Acessar Inbox
- URL: http://localhost:3000/skyone/inbox
- Ver card "Role Play Diário"

### 3. Iniciar Role Play
- Clicar em "Iniciar Role Play"
- Selecionar um playbook (SPICED, SPIN, etc.)
- Clicar em "Iniciar Role Play"

### 4. Na Página de Sessão
- Clicar em "Abrir Google Meet"
- (Em produção: a extensão captura o áudio)
- Clicar em "Finalizar Sessão"

### 5. Ver Resultados
- Página de análise com scores
- Acessar Performance para ver histórico

---

## Troubleshooting

### Coach API não inicia
```bash
# Verificar se a porta está em uso
lsof -ti:3001

# Matar processo se necessário
lsof -ti:3001 | xargs kill -9

# Reinstalar dependências
cd coach/coach-api && npm install
```

### Whisper não funciona
```bash
# Verificar Python
python3 --version

# Instalar faster-whisper
pip3 install faster-whisper

# Verificar instalação
python3 -c "import faster_whisper; print('OK')"
```

### Playbooks não carregam
```bash
# Executar seed
npx ts-node scripts/seed-roleplay.ts

# Verificar no banco
npx prisma studio
# Acessar http://localhost:5555 e verificar tabela Playbook
```

### Extensão não aparece
1. Recarregar a extensão em `chrome://extensions/`
2. Verificar console da extensão (clique em "Inspecionar")
3. Verificar se a URL do Coach API está correta

---

## Endpoints da Coach API

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/health` | GET | Status da API |
| `/transcription/stream` | POST | Transcrição de áudio |
| `/coaching/sessions` | POST | Criar sessão |
| `/coaching/sessions/:id` | GET | Buscar sessão |
| `/coaching/sessions/:id/analyze` | POST | Analisar transcrição |
| `/coaching/realtime` | WS | WebSocket para tempo real |

---

## Próximos Passos

1. **Integração completa com Google Meet** via Chrome Extension
2. **Sugestões em tempo real** baseadas no playbook selecionado
3. **Análise de sentimento** durante a chamada
4. **Dashboard de métricas** de coaching em tempo real
