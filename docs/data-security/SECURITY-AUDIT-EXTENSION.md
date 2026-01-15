# 🔒 AUDITORIA DE SEGURANÇA - EXTENSÃO CHROME & APIs

**Data:** 29 de Novembro de 2025  
**Auditor:** Cascade AI  
**Escopo:** Autenticação da extensão Chrome, APIs expostas, proteção de dados sensíveis

---

## 🚨 RESUMO EXECUTIVO

| Categoria | Nível de Risco | Status |
|-----------|----------------|--------|
| Token da Extensão | 🔴 **CRÍTICO** | Requer correção imediata |
| CORS Configuration | 🟠 **ALTO** | Requer correção |
| Rate Limiting | 🟠 **ALTO** | Desabilitado em dev |
| Brute Force Protection | 🟠 **ALTO** | Ausente na extensão |
| Criptografia at-rest | 🟢 **OK** | AES-256-GCM implementado |
| Autenticação Web | 🟢 **OK** | NextAuth com JWT |
| RBAC | 🟢 **OK** | Implementado corretamente |
| Multi-tenancy | 🟢 **OK** | Isolamento de dados |

---

## 🔴 VULNERABILIDADES CRÍTICAS

### 1. Token da Extensão Inseguro

**Arquivo:** `app/api/extension-login/route.ts` (linha 61)

**Problema:**
```typescript
// Token atual - INSEGURO
const auth_token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
```

**Riscos:**
- ❌ Token facilmente decodificável (base64 não é criptografia)
- ❌ Qualquer pessoa pode criar um token falso com um user.id conhecido
- ❌ Não há verificação server-side do token
- ❌ Não tem expiração controlada
- ❌ Não é invalidado no logout

**Impacto:** Um atacante que conheça um user.id pode se autenticar como qualquer usuário.

**Severidade:** 🔴 CRÍTICA

---

### 2. CORS Permissivo Demais

**Arquivo:** `middleware.ts` (linha 18)

**Problema:**
```typescript
'Access-Control-Allow-Origin': '*'
```

**Riscos:**
- ❌ Qualquer site pode fazer requisições à API
- ❌ Possibilita ataques CSRF
- ❌ Expõe APIs a scripts maliciosos

**Impacto:** Sites maliciosos podem fazer requisições autenticadas em nome do usuário.

**Severidade:** 🟠 ALTA

---

### 3. Rate Limiting Desabilitado

**Arquivo:** `lib/rate-limit.ts`

**Problema:**
```typescript
// Mock rate limiter for development
export const login_limiter = {
  limit: async (identifier: string) => ({ success: true, ... }),
};
```

**Riscos:**
- ❌ Ataques de brute force ilimitados
- ❌ Credential stuffing attacks
- ❌ DDoS em APIs

**Impacto:** Atacantes podem tentar milhares de senhas por segundo.

**Severidade:** 🟠 ALTA (em produção)

---

### 4. Endpoint de Extensão sem Rate Limiting

**Arquivo:** `app/api/extension-login/route.ts`

**Problema:** O endpoint `/api/extension-login` não aplica rate limiting.

**Riscos:**
- ❌ Brute force de credenciais
- ❌ Enumeration de usuários (timing attacks)

**Severidade:** 🟠 ALTA

---

## 🟢 PONTOS POSITIVOS

### ✅ Criptografia de Dados Sensíveis
- AES-256-GCM para tokens de integração
- IV único por operação
- Auth tag para integridade

### ✅ Hashing de Senhas
- bcrypt com salt (10 rounds)
- Nunca armazena senhas em texto

### ✅ Autenticação Web
- NextAuth com estratégia JWT
- Sessão de 7 dias
- NEXTAUTH_SECRET obrigatório

### ✅ RBAC Implementado
- 4 roles: ADMIN, DIRECTOR, MANAGER, AGENT
- Verificação em APIs críticas
- Multi-tenant isolation

### ✅ Validação de Input
- Zod para validação de schemas
- Prisma ORM (proteção contra SQL injection)

---

## 🛠️ SOLUÇÕES RECOMENDADAS

### Solução 1: Implementar JWT Seguro para Extensão

```typescript
// lib/extension-auth.ts
import jwt from 'jsonwebtoken';

const EXTENSION_SECRET = process.env.EXTENSION_JWT_SECRET!;
const TOKEN_EXPIRY = '24h';

export function generate_extension_token(user_id: string, company_id: string): string {
  return jwt.sign(
    { 
      user_id, 
      company_id,
      type: 'extension',
      iat: Math.floor(Date.now() / 1000)
    },
    EXTENSION_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

export function verify_extension_token(token: string): { user_id: string; company_id: string } | null {
  try {
    const decoded = jwt.verify(token, EXTENSION_SECRET) as any;
    if (decoded.type !== 'extension') return null;
    return { user_id: decoded.user_id, company_id: decoded.company_id };
  } catch {
    return null;
  }
}
```

### Solução 2: Restringir CORS

```typescript
// middleware.ts
function cors_headers(request: NextRequest) {
  // Permitir apenas extensões Chrome (ID específico)
  const origin = request.headers.get('origin');
  const allowed_origins = [
    'chrome-extension://[SEU_EXTENSION_ID]',
    process.env.NEXT_PUBLIC_APP_URL,
  ];
  
  const allowed_origin = allowed_origins.find(o => origin?.startsWith(o)) || '';
  
  return {
    'Access-Control-Allow-Origin': allowed_origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}
```

### Solução 3: Ativar Rate Limiting em Produção

```typescript
// lib/rate-limit.ts - ATIVAR EM PRODUÇÃO
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Login: 5 tentativas por 15 minutos
export const login_limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:login',
});

// Extension login: 10 tentativas por hora
export const extension_login_limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  prefix: 'ratelimit:extension',
});
```

### Solução 4: Rate Limiting no Extension Login

```typescript
// app/api/extension-login/route.ts
import { extension_login_limiter, get_client_ip } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = get_client_ip(request);
  const { success, remaining } = await extension_login_limiter.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 1 hora.' },
      { 
        status: 429,
        headers: { 'X-RateLimit-Remaining': remaining.toString() }
      }
    );
  }
  
  // ... resto do código
}
```

---

## 🧪 TESTES DE SEGURANÇA NÃO REALIZADOS

### Testes que EU NÃO POSSO realizar (requerem ambiente real):

| Teste | Descrição | Ferramenta Recomendada |
|-------|-----------|------------------------|
| **Penetration Test** | Teste de invasão completo | OWASP ZAP, Burp Suite |
| **SQL Injection** | Tentativas de injeção SQL | SQLMap, manual testing |
| **XSS Testing** | Cross-Site Scripting | OWASP ZAP |
| **CSRF Testing** | Cross-Site Request Forgery | Burp Suite |
| **Authentication Bypass** | Tentativas de bypass | Manual testing |
| **Session Hijacking** | Roubo de sessão | Wireshark |
| **Brute Force Real** | Teste de força bruta | Hydra, custom scripts |
| **DDoS Resilience** | Teste de carga | k6, Artillery |
| **SSL/TLS Analysis** | Certificados e cifras | SSL Labs, testssl.sh |
| **Dependency Audit** | Vulnerabilidades em libs | `npm audit`, Snyk |
| **Container Security** | Se usar Docker | Trivy, Clair |

### Comandos para Testes Automáticos:

```bash
# Verificar vulnerabilidades em dependências
npm audit

# Verificar com Snyk (mais completo)
npx snyk test

# Análise estática de segurança
npx eslint --ext .ts,.tsx . --rule 'security/*: error'

# Verificar secrets expostos
npx gitleaks detect

# Teste de headers de segurança
curl -I https://seu-dominio.com
```

---

## 📋 CHECKLIST PRÉ-PRODUÇÃO

### Obrigatório Antes de Deploy:

- [ ] 🔴 Implementar JWT seguro para extensão
- [ ] 🔴 Restringir CORS para origem específica
- [ ] 🔴 Ativar rate limiting com Redis
- [ ] 🔴 Configurar EXTENSION_JWT_SECRET
- [ ] 🔴 Rodar `npm audit` e corrigir vulnerabilidades
- [ ] 🟠 Implementar logs de tentativas de login falhas
- [ ] 🟠 Configurar alertas para atividade suspeita
- [ ] 🟠 Habilitar HTTPS obrigatório
- [ ] 🟠 Configurar Content Security Policy (CSP)
- [ ] 🟢 Revisar permissões da extensão no manifest.json
- [ ] 🟢 Remover console.logs de dados sensíveis

### Headers de Segurança Recomendados:

```typescript
// next.config.ts
const security_headers = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```

---

## 🔐 VARIÁVEIS DE AMBIENTE CRÍTICAS

```env
# Obrigatório em produção
NEXTAUTH_SECRET=       # Mínimo 32 caracteres, gerado aleatoriamente
ENCRYPTION_KEY=        # 64 caracteres hex (256 bits)
EXTENSION_JWT_SECRET=  # Mínimo 32 caracteres, diferente do NEXTAUTH_SECRET

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Gerar secrets seguros:
# openssl rand -base64 32
# openssl rand -hex 32
```

---

## 📊 CLASSIFICAÇÃO LGPD

### Dados Sensíveis Identificados:

| Dado | Classificação | Proteção Atual |
|------|---------------|----------------|
| Senhas | Sensível | ✅ Hash bcrypt |
| Email | Pessoal | ✅ DB criptografado |
| Transcrições de calls | Sensível | ⚠️ Verificar criptografia |
| Tokens de integração | Sensível | ✅ AES-256-GCM |
| Dados de CRM | Comercial | ⚠️ Depende do cliente |

### Recomendações LGPD:

1. **Política de Retenção:** Definir tempo máximo de armazenamento
2. **Direito ao Esquecimento:** Implementar exclusão completa de dados
3. **Exportação de Dados:** Permitir download dos dados do usuário
4. **Consentimento:** Termos de uso claros sobre gravação de calls
5. **DPO:** Definir responsável por dados pessoais

---

## 🎯 PLANO DE AÇÃO PRIORIZADO

### Semana 1 (Crítico):
1. Implementar JWT seguro para extensão
2. Adicionar rate limiting no extension-login
3. Restringir CORS

### Semana 2 (Alto):
4. Ativar rate limiting em produção (Redis)
5. Implementar logs de segurança
6. Configurar headers de segurança

### Semana 3 (Médio):
7. Rodar pentest básico (OWASP ZAP)
8. Audit de dependências
9. Documentar política de segurança

### Mensal:
10. Revisão de logs de segurança
11. Atualização de dependências
12. Teste de backup/restore

---

## 📞 CONTRATAÇÃO DE PENTEST

Para dados sensíveis de clientes, recomendo:

1. **Pentest Profissional:** Contratar empresa especializada
   - Custo: R$ 15.000 - R$ 50.000
   - Duração: 2-4 semanas
   - Empresas: Tempest, Cipher, iDefense

2. **Bug Bounty Program:** Após estabilização
   - Plataformas: HackerOne, Bugcrowd
   - Custo variável por vulnerabilidade encontrada

3. **Compliance:**
   - SOC 2 Type II (para enterprise)
   - ISO 27001 (certificação completa)
   - PCI-DSS (se processar pagamentos)

---

**Próxima Revisão:** Após implementação das correções críticas  
**Responsável:** Time de Desenvolvimento  
**Classificação:** CONFIDENCIAL
