# 🧪 Guia de Testes - Role Play & Realtime Coaching

> **Última Atualização:** 29 de Novembro de 2025

Este guia detalha como testar completamente as funcionalidades de Role Play e Coaching em Tempo Real.

---

## 📋 Pré-requisitos

### 1. Ambiente de Desenvolvimento

```bash
# Certifique-se de estar no diretório do projeto
cd /Users/marcioferreira/projects/performancy

# Instalar dependências (se necessário)
npm install

# Gerar Prisma Client
npx prisma generate

# Aplicar schema no banco
npx prisma db push
```

### 2. Variáveis de Ambiente

Verifique se o arquivo `.env` contém:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="sk-ant-..."  # Para análise IA do Role Play
```

### 3. Popular Dados de Teste

```bash
# Executar seed principal
npx prisma db seed

# Executar seed específico de Role Play (playbooks + battle cards)
npx ts-node scripts/seed-roleplay.ts
```

---

## 🎭 Testando o Role Play

### Passo 1: Iniciar o Servidor

```bash
npm run dev
```

Acesse: http://localhost:3000

### Passo 2: Login

Use uma das credenciais de teste:

| Role | Email | Senha |
|------|-------|-------|
| **Admin** | fabio@performancy.com.br | FabioPerformancy2025! |
| **Director** | director@skyone.solutions | demo123 |
| **Manager** | manager@skyone.solutions | demo123 |
| **Agent** | agent@skyone.solutions | demo123 |

### Passo 3: Acessar Role Play

1. Após login, navegue para: `/{company_slug}/roleplay`
   - Ex: http://localhost:3000/skyone/roleplay

2. Você verá o **Dashboard do AGENT** com:
   - Card de atividade diária
   - Estatísticas (sessões, score médio, streak, badges)
   - Ranking
   - Histórico de sessões

### Passo 4: Iniciar uma Sessão

1. Clique em **"Iniciar Role Play"**
2. Selecione um **Playbook** na lista (ex: "Discovery Call - SPICED")
3. Clique em **"Iniciar Role Play"**
4. Você será redirecionado para a página da sessão

### Passo 5: Executar o Role Play

1. Na página da sessão, clique em **"Abrir Google Meet"**
2. Uma nova aba abrirá com o Google Meet
3. Faça sua apresentação de vendas (monólogo)
4. **Importante:** O plugin de transcrição (Chrome Extension) deve estar instalado para capturar a transcrição

### Passo 6: Finalizar e Ver Análise

1. Volte à aba da sessão
2. Clique em **"Finalizar Sessão"**
3. A análise IA será processada automaticamente
4. Veja os resultados:
   - **Scores:** Mental, Emocional, Técnico
   - **Análise detalhada:** por dimensão
   - **Pontos fortes:** com exemplos do transcript
   - **Áreas de melhoria:** com sugestões práticas
   - **Plano de estudo:** imediato, curto e longo prazo

### Passo 7: Testar Gamificação

1. Complete mais sessões para ganhar **badges**
2. Faça role play em dias consecutivos para aumentar **streak**
3. Veja sua posição no **ranking** (company/squad)

### Passo 8: Dashboard do MANAGER

1. Faça login como Manager ou Director
2. Acesse: `/{company_slug}/team/roleplay`
3. Veja:
   - Estatísticas do time
   - Calendário de atividades
   - Ranking do time
   - Metas (criar/gerenciar)

---

## 🎯 Testando o Realtime Coaching

### Pré-requisitos Adicionais

#### 1. Backend do Coach (faster-whisper)

```bash
# Instalar faster-whisper
pip install faster-whisper

# Iniciar backend do coach
cd coach/coach-api
npm install
npm run dev
```

O servidor estará em: http://localhost:3001

#### 2. Chrome Extension

```bash
# Build da extensão
cd coach/coach-extension
npm install
npm run build
```

#### 3. Instalar no Chrome

1. Abra `chrome://extensions/`
2. Ative **"Modo do desenvolvedor"** (toggle no canto superior direito)
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta `coach/coach-extension/dist`

### Testando o Coaching

#### Passo 1: Configurar Reunião

1. No Performancy, crie uma reunião com deal associado:
   - Acesse `/api/v1/meetings` ou use a interface
   - Associe um playbook à reunião

#### Passo 2: Iniciar Call

1. Entre em uma call do **Google Meet**
2. O widget do Coach aparecerá automaticamente (canto direito)
3. Clique no ícone do Coach se estiver minimizado

#### Passo 3: Durante a Call

Observe o widget mostrando:
- **Métricas em tempo real:**
  - Talk Ratio (ideal: 30-45%)
  - Palavras por minuto (ideal: 120-150)
  - Contagem de perguntas (abertas vs fechadas)
  - Alertas de monólogo (>60s)
  - Pausas longas (>3s)

- **Progresso da metodologia:**
  - Etapas SPICED/SPIN/MEDDIC
  - % de cobertura

- **Detecção de objeções:**
  - Alertas quando cliente levanta objeções
  - Battle cards com sugestões de resposta

- **Transcrição:**
  - Captura automática via legendas nativas
  - Fallback para Whisper ou Web Speech API

#### Passo 4: Após a Call

1. Finalize a call
2. Os dados são salvos automaticamente
3. Acesse o histórico em `/conversations`
4. Veja métricas agregadas em `/insights`

---

## 🔧 Testando via API

### Role Play API

```bash
# Listar sessões
curl http://localhost:3000/api/v1/roleplay \
  -H "Cookie: next-auth.session-token=..."

# Criar sessão
curl -X POST http://localhost:3000/api/v1/roleplay \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"playbook_id": "..."}'

# Finalizar sessão
curl -X PATCH http://localhost:3000/api/v1/roleplay/{id} \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{"status": "COMPLETED", "transcript": {...}, "duration_seconds": 600}'

# Disparar análise
curl -X POST http://localhost:3000/api/v1/roleplay/{id}/analyze \
  -H "Cookie: next-auth.session-token=..."

# Ver badges
curl http://localhost:3000/api/v1/roleplay/badges \
  -H "Cookie: next-auth.session-token=..."

# Ver streaks
curl http://localhost:3000/api/v1/roleplay/streaks \
  -H "Cookie: next-auth.session-token=..."

# Ver ranking
curl http://localhost:3000/api/v1/roleplay/ranking?level=company \
  -H "Cookie: next-auth.session-token=..."
```

### Coach API (localhost:3001)

```bash
# Iniciar call
curl -X POST http://localhost:3001/api/v1/calls/start \
  -H "Content-Type: application/json" \
  -d '{"meeting_id": "...", "user_id": "..."}'

# Transcrição HTTP
curl -X POST http://localhost:3001/api/v1/transcription/stream \
  -H "Content-Type: application/json" \
  -d '{"audio_base64": "...", "language": "pt"}'

# Battle cards
curl http://localhost:3001/api/v1/battle-cards

# Finalizar call
curl -X POST http://localhost:3001/api/v1/calls/{id}/end
```

---

## 📊 Verificação de Dados

### Prisma Studio

```bash
npx prisma studio
```

Acesse http://localhost:5555 e verifique:

- **RolePlaySession:** Sessões criadas
- **RolePlayBadge:** Badges conquistados
- **RolePlayStreak:** Streaks dos usuários
- **RolePlayGoal:** Metas definidas
- **CoachSession:** Sessões de coaching
- **Playbook:** Playbooks disponíveis
- **BattleCard:** Cards de objeções

---

## 🐛 Troubleshooting

### Role Play

| Problema | Solução |
|----------|---------|
| "Role Play não disponível" | Verificar se empresa tem plano STARTER+ |
| Playbooks não aparecem | Executar `npx ts-node scripts/seed-roleplay.ts` |
| Análise IA falha | Verificar ANTHROPIC_API_KEY no .env |
| Badges não atualizam | Verificar logs do servidor |

### Realtime Coaching

| Problema | Solução |
|----------|---------|
| Widget não aparece | Verificar se extensão está ativa no Chrome |
| Transcrição não funciona | Ativar legendas no Google Meet |
| Backend não conecta | Verificar se coach-api está rodando na porta 3001 |
| Whisper lento | Considerar GPU ou usar legendas nativas |

### Erros Comuns

```bash
# Erro de schema Prisma
npx prisma generate
npx prisma db push

# Erro de dependências
rm -rf node_modules
npm install

# Erro de sessão
# Limpar cookies do navegador e fazer login novamente
```

---

## ✅ Checklist de Testes

### Role Play

- [ ] Login como AGENT funciona
- [ ] Dashboard carrega corretamente
- [ ] Lista de playbooks aparece
- [ ] Sessão é criada ao iniciar
- [ ] Finalização atualiza status
- [ ] Análise IA é gerada
- [ ] Scores são calculados
- [ ] Badges são concedidos
- [ ] Streak é atualizado
- [ ] Ranking é calculado
- [ ] Dashboard MANAGER funciona
- [ ] Metas podem ser criadas

### Realtime Coaching

- [ ] Extensão carrega no Chrome
- [ ] Widget aparece no Google Meet
- [ ] Transcrição funciona
- [ ] Métricas são calculadas
- [ ] Objeções são detectadas
- [ ] Battle cards aparecem
- [ ] Dados são salvos ao finalizar
- [ ] Histórico mostra sessões

---

## 📞 Suporte

Se encontrar problemas não listados aqui, verifique:
1. Logs do console do navegador (F12)
2. Logs do terminal (Next.js e coach-api)
3. Dados no Prisma Studio
