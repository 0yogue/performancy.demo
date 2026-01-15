# Deploy Industria Simples (IS)

Guia de deploy para o cliente Industria Simples no Performancy.

## Pré-requisitos

- Acesso SSH ao servidor de produção
- Banco de dados PostgreSQL configurado
- Variáveis de ambiente configuradas (ver `.env.example`)

## 1. Preparar Servidor

```bash
# No servidor de produção
cd /path/to/performancy
git pull origin main

# Instalar dependências
npm ci

# Aplicar migrações do banco
npx prisma db push
```

## 2. Seed Industria Simples

```bash
# Criar empresa IS e usuária Deborah
npx tsx scripts/seed-industria-simples.ts

# Sync vendedores HPro → mapeamento
npx tsx scripts/is-sync-vendedores.ts

# Carregar vendedores como Users
npx tsx scripts/is-load-vendedores.ts
```

## 3. Processar Chamadas

### Download de Gravações
```bash
# Por mês específico
npx tsx scripts/goto-download-all.ts --month 2024-10  # Outubro
npx tsx scripts/goto-download-all.ts --month 2024-11  # Novembro
npx tsx scripts/goto-download-all.ts --month 2024-12  # Dezembro

# Ou por intervalo de datas
npx tsx scripts/goto-download-all.ts --start 2024-10-01 --end 2024-12-31
```

### Transcrição Local (Python)
```bash
# Transcrever áudios
python3 scripts/transcribe-calls.py --limit 100

# Analisar transcrições (heurística)
python3 scripts/analyze-calls.py --limit 100
```

### Carregar no Banco
```bash
# Sem análise Gemini (usa heurística existente)
npx tsx scripts/is-load-conversations.ts --limit 500

# Com análise Gemini (requer GOOGLE_GEMINI_API_KEY)
npx tsx scripts/is-load-conversations.ts --limit 500 --analyze
```

## 4. Integração HPro

### Processar e Gerar Atividades
```bash
# Apenas gerar saída (validar antes de enviar)
npx tsx scripts/is-process-call.ts --all --limit 10

# Enviar para HPro (produção)
npx tsx scripts/is-process-call.ts --all --limit 10 --send
```

## 5. Configurar Cron Jobs

```bash
# Editar crontab
crontab -e

# Adicionar as seguintes linhas:

# Refresh token GoTo a cada 45 minutos
0,45 * * * * cd /path/to/performancy && npx tsx scripts/goto-refresh-token.ts >> /var/log/goto-refresh.log 2>&1

# Sync HPro a cada hora (horário comercial)
0 8-18 * * 1-5 cd /path/to/performancy && npx tsx scripts/is-process-call.ts --all --limit 50 --send >> /var/log/is-hpro-sync.log 2>&1

# Download novas gravações a cada 2 horas
0 */2 * * * cd /path/to/performancy && npx tsx scripts/goto-download-all.ts --start $(date -d 'yesterday' +%Y-%m-%d) >> /var/log/goto-download.log 2>&1
```

## 6. Variáveis de Ambiente Necessárias

```env
# Banco de dados
DATABASE_URL="postgresql://..."

# Criptografia
ENCRYPTION_KEY="..."

# GoTo Connect (já configurado via Integration)
GOTO_CLIENT_ID="..."
GOTO_CLIENT_SECRET="..."

# Gemini AI (chave mestra)
GOOGLE_GEMINI_API_KEY="..."
```

## 7. Credenciais HPro

```
URL Base: http://hda0897nxnd.sn.mynetname.net:9080
Username: IAAGENDA
Password: 1AG3NDA
Empresa: 2
Célula padrão: 7 (IS Base de dados)
TipoAtividade padrão: 14 (Followup)
```

## 8. Dados IS

| Item | Valor |
|------|-------|
| company_id | cmj7nlj8u0000pjv3lqkc8ovy |
| Deborah (MANAGER) | cmj7nljbc0002pjv3ohwacxpl |
| Vendedores mapeados | 13 |
| Células HPro | 2 (Amatools), 5 (Starrett), 7 (IS Base), 8 (Salvabras) |

## 9. Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `seed-industria-simples.ts` | Cria empresa e Deborah |
| `is-sync-vendedores.ts` | Mapeia vendedores GoTo ↔ HPro |
| `is-load-vendedores.ts` | Cria Users a partir do mapeamento |
| `is-load-conversations.ts` | Carrega transcrições no banco |
| `is-process-call.ts` | Analisa e envia para HPro |
| `goto-download-all.ts` | Download gravações GoTo |
| `goto-refresh-token.ts` | Renova tokens GoTo |
| `transcribe-calls.py` | Transcrição com Whisper |
| `analyze-calls.py` | Análise heurística |

## 10. Troubleshooting

### Token GoTo expirado
```bash
npx tsx scripts/goto-refresh-token.ts
```

### Token HPro inválido
O token HPro expira rapidamente. Os scripts renovam automaticamente.

### Erro de transcrição
Verificar se `faster-whisper` está instalado:
```bash
pip install faster-whisper
```

### Custo Gemini
Estimativa: ~$0.0001 por chamada com Gemini 2.5 Flash
Para 2400 chamadas: ~$0.24

---

**Última atualização:** 2024-12-19
