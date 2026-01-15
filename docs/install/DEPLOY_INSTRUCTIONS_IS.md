# Guia de Deploy - Industria Simples (Atualizado)

Este guia descreve os passos finais para colocar a integração da Industria Simples em produção, focando na configuração das credenciais do HPro.

## 1. Variáveis de Ambiente

O código foi atualizado para não deixar credenciais hardcoded (fixas no código). Agora, é **obrigatório** configurar as seguintes variáveis de ambiente no servidor de produção (ou no arquivo `.env` local de produção):

```bash
# Configuração HPro CRM (Industria Simples)
HPRO_BASE_URL="http://hda0897nxnd.sn.mynetname.net:9080"
HPRO_USERNAME="IAAGENDA"
HPRO_PASSWORD="<A_SENHA_AQUI>"
HPRO_EMPRESA_ID="2"
HPRO_CELULA_ID="7"
HPRO_TIPO_ATIVIDADE_ID="14"
```

> **Nota:** A "chave da API" do HPro é na verdade um Token gerado dinamicamente a partir do `Username` e `Password`. Portanto, para "atualizar a chave", basta atualizar a variável `HPRO_PASSWORD` com a senha correta.

## 2. Verificar Conexão

Foi criado um script de teste para validar se as credenciais estão corretas e se o sistema consegue se conectar ao HPro:

```bash
# Executar teste de autenticação
npx tsx scripts/test-hpro-auth.ts
```

Se o teste retornar "Token obtido com sucesso" e listar os vendedores, a conexão está OK.

## 3. Preparar Ambiente de Produção

Se for o primeiro deploy neste servidor:

1.  **Atualizar Código:**
    ```bash
    git pull origin main
    npm ci
    npm run build
    ```

2.  **Configurar Banco de Dados:**
    ```bash
    npx prisma migrate deploy
    ```

3.  **Seed Inicial (Cria empresa e usuário manager):**
    ```bash
    npx tsx scripts/seed-industria-simples.ts
    ```

4.  **Sincronizar Vendedores (HPro -> Performancy):**
    ```bash
    npx tsx scripts/is-sync-vendedores.ts
    ```
    *Este passo depende das variáveis de ambiente estarem configuradas corretamente.*

5.  **Carregar Vendedores como Usuários:**
    ```bash
    npx tsx scripts/is-load-vendedores.ts
    ```

## 4. Configurar Cron Jobs (Agendamento)

Para manter o sistema rodando automaticamente, configure o `crontab` do usuário no servidor:

```bash
crontab -e
```

Adicione:

```cron
# Renovar token GoTo (a cada 45 min)
0,45 * * * * cd /path/to/performancy && /usr/bin/npx tsx scripts/goto-refresh-token.ts >> /var/log/performancy/goto-refresh.log 2>&1

# Sincronizar Vendedores HPro (diariamente às 06:00)
0 6 * * * cd /path/to/performancy && /usr/bin/npx tsx scripts/is-sync-vendedores.ts >> /var/log/performancy/is-sync.log 2>&1

# Processar Chamadas e Enviar p/ HPro (a cada hora comercial)
0 8-19 * * 1-5 cd /path/to/performancy && /usr/bin/npx tsx scripts/is-process-call.ts --all --limit 50 --send >> /var/log/performancy/is-process.log 2>&1
```

## 5. Troubleshooting

*   **Erro de Autenticação HPro:** Verifique `HPRO_USERNAME` e `HPRO_PASSWORD` no `.env`.
*   **Vendedores não aparecem:** Rode o `scripts/is-sync-vendedores.ts` manualmente e verifique o output.
