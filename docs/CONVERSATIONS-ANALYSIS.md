# Análise de Conversas - Industria Simples

## Visão Geral

Sistema de análise de ligações telefônicas integrado com GoTo Connect e Gemini AI.

## Funcionalidades Implementadas

### 1. Listagem de Conversas
- Paginação com 64 itens por página
- Filtro por busca (vendedor, lead, empresa)
- Exibição em linha única: `Vendedor | Data/Hora - Duração`
- Exclusão automática de conversas de usuário "Não Identificado"

### 2. Análise com Gemini AI
- **Modelo**: `gemini-2.0-flash` (não usa thinking tokens)
- **maxOutputTokens**: 8192
- **Campos analisados**:
  - `resumo` - Análise detalhada da conversa
  - `sentimento` - POSITIVE, NEUTRAL, NEGATIVE
  - `tipo_atividade` - Classificação da ligação (followup, proposta, etc)
  - `interesse_cliente` - alto, medio, baixo, nenhum
  - `proximo_passo` - Ação sugerida
  - `produtos_mencionados` - Lista de produtos citados
  - `objecoes` - Objeções identificadas
  - `pontos_positivos` - O que o vendedor fez bem
  - `pontos_melhoria` - O que poderia melhorar

### 3. Persistência de Dados
- Análise salva no campo `methodology_scores` como JSON
- Campos adicionais: `summary`, `sentiment`, `suggested_actions`
- Tracking de tokens e custos: `ai_tokens_input`, `ai_tokens_output`, `ai_cost_usd`

### 4. Interface de Usuário
- **Aba Sumário**: Resumo, classificação, próximo passo, produtos, objeções, pontos positivos/melhoria
- **Aba Transcrição**: Transcrição formatada com cores para vendedor/cliente
- **Aba Metadados**: Todos os metadados da conversa (ID, data, duração, participantes, custos IA)

## Arquivos Principais

```
components/conversations/
├── conversations-view.tsx      # Lista de conversas com paginação
└── conversation-analysis.tsx   # Painel de análise detalhada

app/api/conversations/
├── route.ts                    # GET - listar conversas
└── [id]/analyze/route.ts       # POST - analisar com Gemini

lib/integrations/
└── gemini.ts                   # Integração com Gemini AI
```

## Tipos de Atividade (CRM)

| ID | Descrição |
|----|-----------|
| 6 | Proposta Comercial |
| 8 | Negociação |
| 14 | Followup |
| 16 | Reclamação |
| 40 | Fora do setor |
| 41 | Cliente com interesse |
| 42 | Sem interesse |

## Deploy em Produção

### 1. Restaurar Dump do Banco

```bash
# Copiar dump para servidor de produção
scp /tmp/performancy_dump_20241222.sql user@production:/tmp/

# No servidor de produção, restaurar dados
psql -h localhost -U <user> -d <database> < /tmp/performancy_dump_20241222.sql
```

### 2. Variáveis de Ambiente Necessárias

```env
DATABASE_URL="postgresql://..."
GOOGLE_GEMINI_API_KEY="..."
```

### 3. Build e Deploy

```bash
npm run build
npm run start
```

### 4. Verificar Conversas

```bash
# Contar conversas
psql -c "SELECT COUNT(*) FROM conversations"

# Verificar análises
psql -c "SELECT COUNT(*) FROM conversations WHERE methodology_scores IS NOT NULL"
```

## Custos Estimados (Gemini 2.0 Flash)

- **Input**: $0.10 / 1M tokens
- **Output**: $0.40 / 1M tokens
- **Média por análise**: ~4000 tokens input, ~800 tokens output
- **Custo médio**: ~$0.0007 por análise

## Histórico de Alterações

### 2024-12-22
- Implementado sistema de análise com Gemini AI
- Adicionada aba de metadados
- Persistência completa dos dados de análise no `methodology_scores`
- Correção de duplicatas no banco (1236 registros removidos)
- Aumentado `maxOutputTokens` de 1024 para 8192
- UI para exibir todos os campos da análise
- **FIX**: Trocado modelo de `gemini-2.5-flash` para `gemini-2.0-flash`
  - O 2.5-flash usa "thinking tokens" que consumiam o limite de output
  - Resultado: respostas truncadas com apenas resumo parcial
  - O 2.0-flash não tem esse problema e retorna JSON completo
