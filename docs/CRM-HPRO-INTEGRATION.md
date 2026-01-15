# Integração CRM HPro - Industria Simples

**Última atualização**: 23 de Dezembro de 2025

## Visão Geral

Integração com o CRM HPro da Industria Simples para envio automático de atividades baseadas em ligações analisadas pelo Gemini AI.

## Fluxo de Funcionamento

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GoTo Connect  │ -> │  Gemini AI      │ -> │   CRM HPro      │
│   (Ligação)     │    │  (Análise)      │    │   (Atividade)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                     │                      │
         v                     v                      v
   Transcrição          Resumo, Tipo,           HistoricoAtivadade
   Duração              Interesse,              TipoAtividade
   Vendedor             Próximo Passo           PlanoAcao
   Telefone             Produtos,               Data, Hora
                        Objeções
```

## API Endpoints

### POST `/api/conversations/[id]/send-to-crm`

Envia uma conversa analisada para o CRM HPro.

**Requisitos:**
- Conversa deve ter sido analisada com Gemini (ter `summary`)
- Vendedor deve estar mapeado GoTo → HPro
- Usuário autenticado na empresa

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Atividade enviada com sucesso ao CRM HPro!",
  "details": {
    "empresa": 2,
    "celula": 7,
    "cliente": 15,
    "vendedor": 31,
    "tipo_atividade": 14,
    "data": "2025-12-23",
    "hora": "1430"
  }
}
```

### GET `/api/conversations/[id]/send-to-crm`

Retorna status do envio para o CRM.

**Resposta:**
```json
{
  "sent": true,
  "status": "sent",
  "sent_at": "2025-12-23T14:30:00.000Z",
  "details": {
    "empresa": 2,
    "celula": 7,
    "cliente": 15,
    "vendedor": 31
  }
}
```

## Campos Enviados ao HPro

### Parâmetros URL (obrigatórios)
| Campo | Descrição | Valor |
|-------|-----------|-------|
| Token | Token de autenticação | Automático |
| Empresa | Código da empresa | 2 (IS) |
| Celula | Código da célula | Do mapeamento |
| Cliente | Código do cliente | Por telefone ou 15 (genérico) |
| Vendedor | Código do vendedor | Do mapeamento GoTo→HPro |

### Body JSON (atividade)
| Campo | Descrição | Origem |
|-------|-----------|--------|
| Data | Data da ligação | `conversation_date` |
| Hora | Hora da ligação | `conversation_date` |
| HistoricoAtivadade | Resumo completo | Gemini + detalhes |
| TipoAtividade | Tipo de atividade | Gemini (`tipo_atividade`) |
| PlanoAcao | Próximo passo | Gemini (`proximo_passo`) |

### Conteúdo do HistoricoAtivadade

```
📋 RESUMO DA LIGAÇÃO:
[resumo gerado pelo Gemini]

📌 Tipo: Followup Pós Visita
🎯 Interesse: ALTO
💬 Sentimento: 😊 Positivo
📦 Produtos: Produto A, Produto B
⚠️ Objeções: Preço alto; Prazo longo
✅ Positivo: Bom rapport; Cliente interessado
🔧 Melhorar: Faltou apresentar benefícios
⏱️ Duração: 5min 30s

[Gerado automaticamente pelo Performancy - 23/12/2025]
```

## Mapeamento de Vendedores

### Sincronização Automática

```bash
npx tsx scripts/is-sync-vendedores.ts
```

Este script:
1. Busca vendedores ativos do HPro
2. Compara por nome com vendedores GoTo
3. Cria mapeamento na tabela `is_vendedor_mapping`

### Tabela `is_vendedor_mapping`
| Campo | Descrição |
|-------|-----------|
| goto_user_name | Nome do usuário no GoTo |
| goto_user_id | ID do usuário no GoTo |
| hpro_vendedor_codigo | Código no HPro |
| hpro_vendedor_nome | Nome no HPro |
| hpro_celula_codigo | Código da célula HPro |

## Tipos de Atividade HPro

| Código | Descrição |
|--------|-----------|
| 1 | Visita / Reunião Presencial |
| 2 | Visita de Prospecção |
| 3 | Reunião Online |
| 4 | Ligação de Vendas |
| 5 | Envio de Proposta |
| 6 | Negociação |
| 7 | Fechamento |
| 8 | Atendimento Pós-Venda |
| 9 | Suporte Técnico |
| 10 | Treinamento |
| 11 | Pré-Reunião / Preparação |
| 12 | Follow-up |
| 13 | Ligação Administrativa |
| 14 | Fa) Followup Pós Visita ← **padrão** |

## Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `lib/integrations/hpro.ts` | Funções de API HPro |
| `app/api/conversations/[id]/send-to-crm/route.ts` | Endpoint de envio |
| `scripts/is-sync-vendedores.ts` | Sync vendedores |
| `scripts/is-process-call.ts` | Processar chamada (batch) |

## Configuração

### Credenciais HPro (em `lib/integrations/hpro.ts`)

```typescript
const HPRO_CONFIG = {
  base_url: 'http://hda0897nxnd.sn.mynetname.net:9080',
  username: 'IAAGENDA',
  password: '1AG3NDA',
  default_empresa: 2,
  default_celula: 7,
  default_tipo_atividade: 14,
};
```

## Uso na UI

1. Acesse uma conversa em `/[company_slug]/conversations`
2. Clique em **"Analisar"** para gerar análise Gemini
3. Após análise, clique em **"Enviar ao CRM"**
4. Aguarde confirmação de envio
5. Botão muda para "Enviado" após sucesso

## Troubleshooting

### Erro: "Vendedor não mapeado no HPro"

Execute o sync de vendedores:
```bash
npx tsx scripts/is-sync-vendedores.ts
```

### Erro: "Conversa não foi analisada ainda"

Analise a conversa primeiro clicando no botão "Analisar".

### Erro: "Token inválido!" do HPro

Token expirou. A próxima requisição irá renovar automaticamente.

### Erro: "Não existe vínculo entre vendedor, cliente e célula!"

O vendedor não tem permissão para criar atividades neste cliente/célula no HPro. Verifique as permissões no CRM.

## Histórico de Alterações

### 2026-01-12
- ✅ Extração automática de `data_atividade_combinada` pelo Gemini
- ✅ Data combinada usada ao enviar atividade ao CRM (ao invés da data da ligação)
- ✅ Card visual na UI mostrando a data combinada com cliente
- ✅ Verificação automática do status de envio ao carregar conversa
- ✅ Ícone ✓ verde na lista de conversas para itens já enviados ao CRM
- ✅ Botão "Enviado" fica ativo quando conversa já foi enviada

### 2025-12-23
- ✅ Implementada API `/api/conversations/[id]/send-to-crm`
- ✅ Botão "Enviar ao CRM" funcional na UI
- ✅ Envio de todos os campos da análise Gemini
- ✅ Mapeamento automático de vendedores
- ✅ Busca de cliente por telefone
- ✅ Registro de envios em `is_atividade_enviada`
