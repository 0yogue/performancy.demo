# Deploy em Produção - Performancy

**Última atualização**: 23 de Dezembro de 2025

## ✅ Status do Deploy

| Item | Status | Data |
|------|--------|------|
| Schema atualizado | ✅ Completo | 2025-12-23 |
| Dados Industria Simples | ✅ 4.857 conversas | 2025-12-23 |
| Análise Gemini | ✅ Configurado | 2025-12-22 |
| Transcrições | ✅ Completas | 2025-12-22 |

## Pré-requisitos

- Acesso ao banco de dados de produção (DATABASE_URL)
- Node.js e npm instalados
- Prisma CLI

## Passo 1: Adicionar Colunas Faltantes (OBRIGATÓRIO)

Execute este script antes de restaurar os dados:

```bash
# Arquivo: /tmp/add_missing_columns.sql
psql "postgresql://USER:PASS@HOST:PORT/DATABASE" < /tmp/add_missing_columns.sql
```

Ou execute manualmente:

```sql
-- Colunas de IA
ALTER TABLE conversations 
ADD COLUMN IF NOT EXISTS ai_tokens_input INT,
ADD COLUMN IF NOT EXISTS ai_tokens_output INT,
ADD COLUMN IF NOT EXISTS ai_cost_usd FLOAT,
ADD COLUMN IF NOT EXISTS ai_model VARCHAR(255),
ADD COLUMN IF NOT EXISTS ai_analyzed_at TIMESTAMP;

-- Colunas de gravação GoTo Connect
ALTER TABLE conversations
ADD COLUMN IF NOT EXISTS recording_id TEXT,
ADD COLUMN IF NOT EXISTS caller_name TEXT,
ADD COLUMN IF NOT EXISTS caller_number TEXT;

-- Criar índice
CREATE INDEX IF NOT EXISTS conversations_recording_id_idx ON conversations(recording_id);
```

## Passo 2: Restaurar Dados (APENAS Industria Simples)

**Arquivo final**: `/tmp/is_data_final_safe.sql` (14MB, 4.874 INSERTs)

```bash
# Copiar para servidor de produção
scp /tmp/is_data_final_safe.sql user@production:/tmp/

# No servidor de produção, restaurar:
psql "postgresql://USER:PASS@HOST:PORT/DATABASE" < /tmp/is_data_final_safe.sql

# Se precisar de SSL (Neon/Supabase/Railway)
psql "postgresql://USER:PASS@HOST:PORT/DATABASE?sslmode=require" < /tmp/is_data_final_safe.sql
```

**Dados que serão inseridos**:
- 1 empresa (Industria Simples)
- 15 usuários
- 1 lead
- 4.857 conversas com transcrições completas

**Proteção contra duplicação**:
- ✅ Todos os INSERTs têm `ON CONFLICT (id) DO NOTHING`
- ✅ Se o registro já existir, será ignorado (não duplica)
- ✅ Pode executar múltiplas vezes sem problemas
- ✅ Sem `session_replication_role` (não requer superuser)

## Passo 3: Verificar Dados

```bash
# Contar registros
psql "postgresql://..." -c "SELECT COUNT(*) FROM conversations"
# Esperado: 4857

psql "postgresql://..." -c "SELECT COUNT(*) FROM users"
# Esperado: 19

psql "postgresql://..." -c "SELECT COUNT(*) FROM companies"
# Esperado: 5
```

## Passo 4: Configurar Variáveis de Ambiente (CRÍTICO)

**⚠️ IMPORTANTE**: Estas variáveis DEVEM ser configuradas no painel da Netlify/Vercel:

```env
# OBRIGATÓRIO - URL base da aplicação (sem barra no final)
NEXTAUTH_URL="https://app.performancy.com.br"

# OBRIGATÓRIO - Secret para JWT
NEXTAUTH_SECRET="QNNIjjN2tOqee/LZi2a4w0/vG39kKe0XYN/XfSmxFm8="

# Banco de dados
DATABASE_URL="postgresql://..."

# Google Gemini (para análise de conversas)
GOOGLE_GEMINI_API_KEY="..."

# Google OAuth (se usar)
GOOGLE_REDIRECT_URI="https://app.performancy.com.br/api/integrations/google/callback"

# GoTo Connect
GOTO_REDIRECT_URI="https://app.performancy.com.br/api/integrations/goto/callback"
```

**No Netlify**: Site Settings → Environment Variables → Add variable

## Passo 5: Build e Deploy

```bash
npm install
npm run build
npm run start
```

## Troubleshooting

### Erro: "column does not exist"
Execute o Passo 1 para adicionar colunas faltantes.

### Erro: "invalid command \n"
Use o dump limpo (`performancy_dump_clean.sql`) em vez do dump com COPY.

### Erro: "P3005 database schema is not empty"
Não precisa rodar migrations, apenas adicione as colunas manualmente (Passo 1).

## Dados Incluídos no Dump

- ✅ 4.857 conversas com transcrições
- ✅ 19 usuários
- ✅ 5 empresas
- ✅ 1 lead
- ✅ ~9 MB de transcrições
- ✅ 2.260 conversas com resumo
- ✅ 1 conversa com análise completa (methodology_scores)

## Próximos Passos Após Deploy

1. Testar login na aplicação
2. Verificar listagem de conversas
3. Testar análise com Gemini AI
4. Verificar custos de IA (visível apenas para ADMIN)
