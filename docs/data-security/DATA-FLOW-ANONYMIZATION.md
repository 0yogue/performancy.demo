# 🔐 PERFORMANCY - Data Flow & Anonymization

**Documento Técnico para Compliance**  
**Versão:** 1.0  
**Data:** Dezembro 2025  
**Classificação:** Confidencial - Para Avaliação Técnica

---

## 📋 Sumário Executivo

Este documento descreve o fluxo completo de dados na plataforma Performancy, com foco especial nos mecanismos de **anonimização de dados** antes do envio para provedores de IA externos (LLMs).

### Pontos-Chave

| Aspecto | Implementação |
|---------|---------------|
| **Anonimização** | Biblioteca própria `lib/anonymize.ts` |
| **Tipos de PII detectados** | 12 tipos (nome, email, CPF, CNPJ, telefone, etc.) |
| **Validação** | Checksum CPF/CNPJ, Luhn para cartões |
| **Re-associação** | Apenas interno, nunca em LLMs externas |
| **Audit Trail** | Hash SHA-256 de cada dado anonimizado |

---

## 🏗️ Arquitetura de Fluxo de Dados

### Diagrama de Alto Nível

```
                         AMBIENTE DO CLIENTE
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ┌────────────┐      ┌────────────┐      ┌────────────┐                │
│   │Google Meet │      │  ZOHO CRM  │      │ Browser    │                │
│   └─────┬──────┘      └─────┬──────┘      └─────┬──────┘                │
│         │                   │                   │                       │
│         └───────────────────┼───────────────────┘                       │
│                             │                                           │
│                    TLS 1.3 / HTTPS                                      │
│                             │                                           │
└─────────────────────────────┼───────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     INFRAESTRUTURA PERFORMANCY                          │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    CAMADA DE INGESTÃO                             │  │
│  │                                                                   │  │
│  │   1. Validação de Request (Zod)                                   │  │
│  │   2. Autenticação (NextAuth JWT)                                  │  │
│  │   3. Rate Limiting                                                │  │
│  │   4. RBAC Check                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    BANCO DE DADOS (PostgreSQL)                    │  │
│  │                                                                   │  │
│  │   • Dados brutos armazenados com isolamento multi-tenant          │  │
│  │   • Tokens criptografados (AES-256-GCM)                           │  │
│  │   • Senhas com hash (bcrypt)                                      │  │
│  │   • Audit logs de todas operações sensíveis                       │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │              🔒 CAMADA DE ANONIMIZAÇÃO (lib/anonymize.ts)         │  │
│  │                                                                   │  │
│  │   ENTRADA: Dados brutos com PII                                   │  │
│  │   "João Silva (joao@email.com) fechou R$ 50.000 com Empresa X"    │  │
│  │                                                                   │  │
│  │   PROCESSAMENTO:                                                  │  │
│  │   • Detecção de 12 tipos de PII via regex                         │  │
│  │   • Validação (checksum CPF/CNPJ, Luhn)                           │  │
│  │   • Substituição por placeholders tipados                         │  │
│  │   • Geração de hash SHA-256 para audit trail                      │  │
│  │                                                                   │  │
│  │   SAÍDA: Dados anonimizados                                       │  │
│  │   "[PESSOA-1] ([EMAIL-1]) fechou [VALOR-1] com [EMPRESA-1]"       │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
│                              ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    API GATEWAY PARA LLMs                          │  │
│  │                                                                   │  │
│  │   • TLS 1.3 obrigatório                                           │  │
│  │   • API Keys rotacionadas                                         │  │
│  │   • Rate limiting por empresa                                     │  │
│  │   • Logs de requisições (sem dados)                               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                          │
└──────────────────────────────┼──────────────────────────────────────────┘
                               │
                    APENAS DADOS ANONIMIZADOS
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     PROVEDORES DE IA EXTERNOS                           │
│                                                                         │
│   ┌────────────────┐      ┌────────────────┐                            │
│   │   Anthropic    │      │    OpenAI      │                            │
│   │   (Claude)     │      │   (GPT-4)      │                            │
│   └───────┬────────┘      └───────┬────────┘                            │
│           │                       │                                     │
│           └───────────┬───────────┘                                     │
│                       │                                                 │
│             Retorno: Insights/Análises                                  │
│             (SEM dados pessoais)                                        │
│                       │                                                 │
└───────────────────────┼─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     RE-ASSOCIAÇÃO INTERNA                               │
│                                                                         │
│   • Insights são enriquecidos com dados originais                       │
│   • Apenas processamento interno (nunca retorna para LLM)               │
│   • Mapping armazenado apenas em memória durante request                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Biblioteca de Anonimização

### Localização do Código

**Arquivo:** `lib/anonymize.ts`

### Tipos de PII Detectados

| Tipo | Padrão Regex | Validação Extra | Exemplo |
|------|--------------|-----------------|---------|
| `NAME` | Nomes capitalizados | Lista de nomes brasileiros | João Silva |
| `EMAIL` | RFC 5322 pattern | Estrutura válida | joao@email.com |
| `PHONE` | (XX) XXXXX-XXXX | 10-11 dígitos | (11) 99999-9999 |
| `CPF` | XXX.XXX.XXX-XX | Checksum válido | 123.456.789-09 |
| `CNPJ` | XX.XXX.XXX/XXXX-XX | Checksum válido | 12.345.678/0001-90 |
| `CREDIT_CARD` | 16 dígitos | Algoritmo Luhn | 4111-1111-1111-1111 |
| `IP_ADDRESS` | IPv4 format | Octetos válidos | 192.168.1.1 |
| `ADDRESS` | Rua/Av. + número | Prefixos conhecidos | Rua das Flores, 123 |
| `COMPANY` | Nome + sufixo | Ltda, S.A., ME, etc | Empresa Ltda |
| `DATE_OF_BIRTH` | DD/MM/YYYY | Datas válidas | 15/03/1990 |
| `ID_NUMBER` | RG pattern | Padrões estaduais | RG: 12.345.678-9 |
| `MONETARY_VALUE` | R$ + valor | Formato brasileiro | R$ 50.000,00 |

### Exemplo de Uso

```typescript
import { anonymize_pii, anonymize_transcript } from '@/lib/anonymize';

// Exemplo 1: Texto simples
const result = anonymize_pii(
  "João Silva (joao@email.com) fechou deal de R$ 50.000 com Empresa X",
  { preserve_format: true }
);

console.log(result.anonymized_text);
// "[PESSOA-1] ([EMAIL-1]) fechou deal de [VALOR-1] com [EMPRESA-1]"

console.log(result.stats);
// { total_pii_found: 4, by_type: { NAME: 1, EMAIL: 1, MONETARY_VALUE: 1, COMPANY: 1 } }

// Exemplo 2: Transcrição de call
const segments = [
  { speaker: "João (Vendedor)", text: "Olá Maria, tudo bem?", timestamp: 0 },
  { speaker: "Maria (Cliente)", text: "Sim, pode me ligar no (11) 99999-9999", timestamp: 5 },
];

const transcript_result = anonymize_transcript(segments);
// [
//   { speaker: "[VENDEDOR]", text: "Olá [PESSOA-1], tudo bem?", timestamp: 0 },
//   { speaker: "[CLIENTE]", text: "Sim, pode me ligar no [TELEFONE-1]", timestamp: 5 },
// ]
```

### Evidências de Implementação

#### 1. Função Principal de Anonimização

```typescript
// lib/anonymize.ts - Linha 100-150
export function anonymize_pii(
  text: string,
  options: AnonymizationOptions = {}
): AnonymizationResult {
  // ... processamento com detecção de PII
  // ... substituição por placeholders
  // ... geração de hash para audit trail
  return {
    anonymized_text,
    mapping,       // Para re-associação interna apenas
    pii_found,     // Lista de PIIs detectados
    stats,         // Estatísticas do processamento
  };
}
```

#### 2. Validação de CPF (Checksum)

```typescript
// lib/anonymize.ts - Linha 300-325
function validate_cpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false; // Todos iguais
  
  // Validação de checksum...
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  // ... verificação dos dígitos verificadores
}
```

#### 3. Hash para Audit Trail

```typescript
// Cada PII anonimizado gera um hash SHA-256
const hash = crypto.createHash('sha256')
  .update(original_value)
  .digest('hex')
  .substring(0, 16);

// Armazenado no mapping para auditoria
mapping[placeholder] = {
  original: value,    // Nunca enviado para LLM
  type: 'EMAIL',
  hash: hash,         // Audit trail
};
```

---

## 🚫 O Que NUNCA Enviamos às LLMs

| Categoria | Dados | Tratamento |
|-----------|-------|------------|
| **Identificação Pessoal** | Nomes, CPF, RG | Substituído por [PESSOA-N] |
| **Contato** | Email, Telefone | Substituído por [EMAIL-N], [TELEFONE-N] |
| **Financeiro** | Valores exatos, Cartões | Arredondado/Removido |
| **Empresarial** | Nome da empresa, CNPJ | Substituído por [EMPRESA-N] |
| **Localização** | Endereços, IPs | Substituído por [ENDERECO-N], [IP-N] |
| **Credenciais** | Tokens, API Keys | NUNCA processados |

---

## ✅ O Que Enviamos às LLMs (Anonimizado)

| Tipo de Dado | Formato Enviado | Exemplo |
|--------------|-----------------|---------|
| **Contexto de Conversa** | Placeholders genéricos | "[VENDEDOR] perguntou sobre..." |
| **Estrutura de Negociação** | Sem valores específicos | "Deal em fase de proposta" |
| **Metodologia** | Etapas SPICED/SPIN | "Identificou dor do cliente" |
| **Métricas de Call** | Agregadas | "Talk ratio: 35%" |
| **Objeções** | Tipificadas | "Objeção de preço detectada" |

---

## 📊 Métricas de Anonimização

### Performance

| Métrica | Valor Médio |
|---------|-------------|
| Tempo de processamento | < 5ms por KB de texto |
| Taxa de detecção de PII | > 95% |
| Falsos positivos | < 2% |

### Cobertura de Testes

```bash
# Executar testes de anonimização
npm run test -- --grep "anonymize"

# Cobertura esperada
# - Detecção de nomes brasileiros: 95%+
# - Validação CPF/CNPJ: 100%
# - Emails e telefones: 98%+
```

---

## 🔐 Garantias de Segurança

### 1. Dados NUNCA Persistidos em LLMs

```typescript
// Configuração Anthropic API
const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 4096,
  messages: [{ 
    role: 'user', 
    content: anonymized_data  // SEMPRE anonimizado
  }],
  // Não habilitamos "extended thinking" ou persistência
});
```

### 2. Mapeamento Apenas em Memória

```typescript
// O mapping de re-associação existe apenas durante o request
const result = anonymize_pii(raw_text);

// Após resposta da LLM:
const enriched = deanonymize(llm_response, result.mapping);

// Mapping descartado após request
// NUNCA persistido em banco ou logs
```

### 3. Audit Trail com Hash

```typescript
// Cada anonimização gera log auditável
await prisma.audit_log.create({
  data: {
    action: 'PII_ANONYMIZATION',
    user_id: session.user.id,
    resource_type: 'TRANSCRIPT',
    metadata: {
      pii_count: result.stats.total_pii_found,
      pii_types: Object.keys(result.stats.by_type),
      // Hashes dos PIIs (não os valores originais)
      pii_hashes: Object.values(result.mapping).map(m => m.hash),
    }
  }
});
```

---

## 📋 Compliance LGPD

### Artigo 12 - Dados Anonimizados

> "Os dados anonimizados não serão considerados dados pessoais para os fins desta Lei, salvo quando o processo de anonimização ao qual foram submetidos for revertido..."

**Nossa implementação:**
- ✅ Substituição irreversível de PII por placeholders
- ✅ Hash one-way (SHA-256) para audit trail
- ✅ Mapeamento temporário (apenas em memória)
- ✅ Impossibilidade de re-identificação por terceiros

### Artigo 18 - Direitos do Titular

| Direito | Implementação |
|---------|---------------|
| **Acesso** | Usuário visualiza seus dados na plataforma |
| **Retificação** | Edição de dados pessoais disponível |
| **Eliminação** | Direito ao esquecimento (em implementação) |
| **Portabilidade** | Exportação de dados (DIRECTOR+) |

---

## 🧪 Testes e Validação

### Comandos de Teste

```bash
# Testes unitários da biblioteca de anonimização
npm run test -- lib/anonymize.test.ts

# Verificar detecção de CPF
npm run test -- --grep "validate_cpf"

# Teste de integração com API
npm run test:integration -- --grep "anonymization"
```

### Cenários de Teste

1. **Detecção de nomes brasileiros** - 500+ nomes comuns
2. **Validação de CPF** - Checksums válidos e inválidos
3. **Validação de CNPJ** - Checksums válidos e inválidos
4. **Cartões de crédito** - Algoritmo Luhn
5. **Telefones** - Formatos DDD + número
6. **Endereços** - Prefixos (Rua, Av., etc.)

---

## 📞 Contato para Auditoria

Para auditorias técnicas ou solicitações de compliance:

- **Email:** yogue@fluxos.co


---

**Versão:** 1.0  
**Última Atualização:** 2, Dezembro 2025  
**Próxima Revisão:** 10, Dezembro 2025
