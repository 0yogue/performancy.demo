# 🔐 PERFORMANCY - Security Whitepaper

**Documento de Segurança para Clientes Corporativos**  
**Versão:** 1.0  
**Data:** Dezembro 2025  
**Classificação:** Confidencial

---

## 📋 Sumário Executivo

A Performancy implementa uma arquitetura de segurança multicamadas, projetada para proteger dados sensíveis de operações de vendas B2B. Este documento detalha as medidas de segurança implementadas, conformidade regulatória e práticas de proteção de dados.

### Resumo de Segurança

| Área | Implementação | Status |
|------|---------------|--------|
| **Criptografia em Trânsito** | TLS 1.3 | ✅ Produção |
| **Criptografia em Repouso** | AES-256-GCM | ✅ Produção |
| **Autenticação** | NextAuth + JWT | ✅ Produção |
| **Autorização** | RBAC 4 níveis | ✅ Produção |
| **Multi-tenancy** | Isolamento por company_id | ✅ Produção |
| **Anonimização para LLMs** | Biblioteca própria | ✅ Produção |
| **Rate Limiting** | Upstash Redis | ✅ Produção |
| **Audit Logging** | PostgreSQL | ✅ Produção |
| **2FA** | TOTP | 🔜 Q1 2026 |
| **SSO/SAML** | Enterprise | 🔜 Q2 2026 |

---

## 🏗️ Arquitetura de Segurança

### Camadas de Proteção

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      CAMADAS DE SEGURANÇA                                │
└─────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────────┐
                    │     CAMADA 1: EDGE/CDN         │
                    │                                 │
                    │  • DDoS Protection (Vercel)    │
                    │  • WAF (Web Application FW)    │
                    │  • SSL/TLS Termination         │
                    │  • Geographic Routing          │
                    └─────────────────┬───────────────┘
                                      │
                    ┌─────────────────▼───────────────┐
                    │     CAMADA 2: APLICAÇÃO        │
                    │                                 │
                    │  • Rate Limiting               │
                    │  • Input Validation (Zod)      │
                    │  • CORS Restrictions           │
                    │  • Security Headers            │
                    └─────────────────┬───────────────┘
                                      │
                    ┌─────────────────▼───────────────┐
                    │     CAMADA 3: AUTENTICAÇÃO     │
                    │                                 │
                    │  • NextAuth.js v5              │
                    │  • JWT com expiração           │
                    │  • Refresh token rotation      │
                    │  • Session management          │
                    └─────────────────┬───────────────┘
                                      │
                    ┌─────────────────▼───────────────┐
                    │     CAMADA 4: AUTORIZAÇÃO      │
                    │                                 │
                    │  • RBAC (4 roles)              │
                    │  • Permission helpers          │
                    │  • Multi-tenant isolation      │
                    │  • Resource-level access       │
                    └─────────────────┬───────────────┘
                                      │
                    ┌─────────────────▼───────────────┐
                    │     CAMADA 5: DADOS            │
                    │                                 │
                    │  • Criptografia AES-256-GCM    │
                    │  • Hash bcrypt (senhas)        │
                    │  • Anonimização para LLMs      │
                    │  • Backup criptografado        │
                    └─────────────────────────────────┘
```

---

## 🔒 Criptografia

### Em Trânsito (Transport)

| Protocolo | Versão | Cipher Suites |
|-----------|--------|---------------|
| TLS | 1.3 | TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256 |
| HTTPS | Obrigatório | HSTS habilitado |

### Em Repouso (At-Rest)

| Dado | Algoritmo | Key Size | Implementação |
|------|-----------|----------|---------------|
| Tokens de Integração | AES-256-GCM | 256 bits | `lib/crypto.ts` |
| Senhas | bcrypt | N/A (hash) | `lib/crypto.ts` |
| Banco de Dados | Encryption at rest | Provider-managed | PostgreSQL |
| Backups | AES-256 | 256 bits | Automated |

### Implementação de Criptografia

```typescript
// lib/crypto.ts

const ALGORITHM = 'aes-256-gcm';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 256 bits hex

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);  // IV único por operação
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const auth_tag = cipher.getAuthTag();  // Tag de autenticação
  
  // Formato: iv:authTag:encryptedData
  return `${iv.toString('hex')}:${auth_tag.toString('hex')}:${encrypted}`;
}
```

### Gerenciamento de Chaves

| Aspecto | Implementação |
|---------|---------------|
| Geração | `openssl rand -hex 32` |
| Armazenamento | Variáveis de ambiente (não em código) |
| Rotação | Manual, com migração de dados |
| Backup | Seguro, separado dos dados |

---

## 🔐 Autenticação

### NextAuth.js v5

| Configuração | Valor |
|--------------|-------|
| Estratégia | JWT |
| Expiração de Sessão | 7 dias |
| Algoritmo JWT | HS256 |
| Secret | NEXTAUTH_SECRET (32+ caracteres) |

### Fluxo de Autenticação

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Usuário │     │  Frontend    │     │   Backend    │
└────┬─────┘     └──────┬───────┘     └──────┬───────┘
     │                  │                    │
     │  1. Email/Senha  │                    │
     ├─────────────────▶│                    │
     │                  │  2. POST /api/auth │
     │                  ├───────────────────▶│
     │                  │                    │
     │                  │  3. Validate:      │
     │                  │  • Email exists    │
     │                  │  • bcrypt compare  │
     │                  │  • Rate limit      │
     │                  │◀───────────────────┤
     │                  │                    │
     │                  │  4. Generate JWT   │
     │                  │  • user_id         │
     │                  │  • company_id      │
     │                  │  • role            │
     │                  │  • exp (7 days)    │
     │                  │◀───────────────────┤
     │                  │                    │
     │  5. Set Cookie   │                    │
     │◀─────────────────┤                    │
     │                  │                    │
```

### Proteções de Senha

| Medida | Implementação |
|--------|---------------|
| Hash Algorithm | bcrypt (10 rounds) |
| Salt | Gerado automaticamente |
| Complexidade | Mínimo 8 caracteres |
| Força Bruta | Rate limiting (5 tentativas/15min) |

---

## 🛡️ Autorização (RBAC)

### Hierarquia de Roles

```
                    ┌─────────────┐
                    │    ADMIN    │  Acesso total, todas empresas
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  DIRECTOR   │  Acesso total, própria empresa
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   MANAGER   │  Gerencia squads, própria empresa
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    AGENT    │  Apenas dados próprios
                    └─────────────┘
```

### Matriz de Permissões

| Permissão | ADMIN | DIRECTOR | MANAGER | AGENT |
|-----------|-------|----------|---------|-------|
| Ver todas empresas | ✅ | ❌ | ❌ | ❌ |
| Ver dados da empresa | ✅ | ✅ | ✅ | ❌ |
| Ver dados próprios | ✅ | ✅ | ✅ | ✅ |
| Criar usuários | ✅ | ✅ | ✅ | ❌ |
| Editar usuários | ✅ | ✅ | ✅* | ❌ |
| Gerenciar features | ✅ | ❌ | ❌ | ❌ |
| Acessar configurações | ✅ | ✅ | ✅* | ❌ |
| Ver analytics | ✅ | ✅ | ✅ | ❌ |

*MANAGER: apenas squads sob sua gestão

### Implementação RBAC

```typescript
// lib/permissions.ts

export function can_create_user(user_role: Role): boolean {
  return ['ADMIN', 'DIRECTOR', 'MANAGER'].includes(user_role);
}

export function can_view_company_data(
  user: User, 
  target_company_id: string
): boolean {
  if (user.role === 'ADMIN') return true;
  return user.company_id === target_company_id;
}

export function can_manage_feature_flags(user_role: Role): boolean {
  return user_role === 'ADMIN';
}
```

---

## 🏢 Multi-Tenancy

### Isolamento de Dados

```sql
-- TODAS as queries incluem filtro de company_id

-- ✅ CORRETO
SELECT * FROM deals WHERE company_id = $1;

-- ❌ ERRADO (nunca permitido)
SELECT * FROM deals;
```

### Arquitetura Multi-Tenant

| Aspecto | Implementação |
|---------|---------------|
| Modelo | Shared database, shared schema |
| Isolamento | Row-level (company_id FK) |
| Roteamento | URL-based (`/{company_slug}/...`) |
| Validação | Middleware + API level |

### Verificação em APIs

```typescript
// Middleware de verificação
export async function validate_company_access(
  user: User,
  target_company_id: string
): Promise<boolean> {
  // ADMIN pode acessar qualquer empresa
  if (user.role === 'ADMIN') return true;
  
  // Demais roles: apenas própria empresa
  return user.company_id === target_company_id;
}
```

---

## 📊 Audit Logging

### Eventos Auditados

| Evento | Dados Capturados |
|--------|------------------|
| Login | user_id, IP, timestamp, success/failure |
| Logout | user_id, timestamp |
| Criação de usuário | created_by, new_user_id, role |
| Edição de usuário | edited_by, user_id, changes |
| Acesso a dados sensíveis | user_id, resource_type, resource_id |
| Feature flag change | admin_id, company_id, feature, old_value, new_value |
| Integração OAuth | user_id, provider, action |

### Schema de Audit Log

```prisma
model AuditLog {
  id            String   @id @default(cuid())
  company_id    String
  user_id       String?
  action        String   // LOGIN, LOGOUT, CREATE_USER, etc
  resource_type String?  // USER, DEAL, LEAD, etc
  resource_id   String?
  ip_address    String?
  user_agent    String?
  metadata      Json?    // Detalhes adicionais
  created_at    DateTime @default(now())
  
  @@index([company_id, created_at])
  @@index([user_id, created_at])
  @@index([action, created_at])
}
```

### Retenção de Logs

| Ambiente | Retenção |
|----------|----------|
| Produção | 90 dias (padrão), 365 dias (Enterprise) |
| Staging | 30 dias |
| Desenvolvimento | 7 dias |

---

## 🌐 Segurança de Rede

### Headers de Segurança

```typescript
// next.config.ts
const security_headers = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];
```

### CORS Configuration

```typescript
// Origens permitidas (produção)
const allowed_origins = [
  'https://app.performancy.ai',
  'chrome-extension://[EXTENSION_ID]'
];
```

### Rate Limiting

| Endpoint | Limite | Janela |
|----------|--------|--------|
| Login | 5 tentativas | 15 minutos |
| API geral | 100 requests | 1 minuto |
| Webhook | 1000 requests | 1 minuto |
| Extension login | 10 tentativas | 1 hora |

---

## 📋 Conformidade LGPD

### Artigos Implementados

| Artigo | Requisito | Status |
|--------|-----------|--------|
| Art. 6 | Princípios de tratamento | ✅ |
| Art. 7 | Base legal (consentimento) | ✅ |
| Art. 12 | Anonimização de dados | ✅ |
| Art. 18 (I) | Confirmação de existência | ✅ |
| Art. 18 (II) | Acesso aos dados | ✅ |
| Art. 18 (III) | Correção de dados | ✅ |
| Art. 18 (IV) | Anonimização, bloqueio ou eliminação | ✅ |
| Art. 18 (V) | Portabilidade | ✅ |
| Art. 18 (VI) | Eliminação | 🔜 Q1 2026 |
| Art. 46 | Medidas de segurança | ✅ |

### Direitos do Titular

| Direito | Implementação | Prazo |
|---------|---------------|-------|
| Acesso | Perfil do usuário | Imediato |
| Retificação | Edição de perfil | Imediato |
| Portabilidade | Export (JSON/CSV) | 24h |
| Eliminação | Solicitação via suporte | 30 dias |
| Revogação | Logout + exclusão de cookies | Imediato |

---

## 🧪 Testes de Segurança

### Testes Automatizados

| Tipo | Ferramenta | Frequência |
|------|------------|------------|
| Dependency Audit | `npm audit` | Cada PR |
| SAST | ESLint security rules | Cada PR |
| Secret Scanning | Gitleaks | Cada PR |

### Testes Manuais

| Tipo | Frequência | Responsável |
|------|------------|-------------|
| Pentest | Anual | Terceirizado |
| OWASP Top 10 | Trimestral | Time interno |
| Social Engineering | Anual | Terceirizado |

### Checklist OWASP Top 10 (2021)

- [x] A01: Broken Access Control → RBAC + Multi-tenant
- [x] A02: Cryptographic Failures → AES-256-GCM + bcrypt
- [x] A03: Injection → Prisma ORM + Zod validation
- [x] A04: Insecure Design → Security review em cada feature
- [x] A05: Security Misconfiguration → Headers + CORS
- [x] A06: Vulnerable Components → `npm audit` + Dependabot
- [x] A07: Auth Failures → NextAuth + Rate limiting
- [x] A08: Data Integrity → JWT signature + CSRF tokens
- [x] A09: Security Logging → Audit logs completos
- [x] A10: SSRF → Validação de URLs + allowlist

---

## 📞 Contatos de Segurança

| Função | Contato |
|--------|---------|
| Security Team | security@performancy.com.br |
| DPO (LGPD) | dpo@performancy.com.br |
| Incident Response | incident@performancy.com.br |
| Bug Bounty | bugbounty@performancy.com.br |

### Reporte de Vulnerabilidades

Para reportar vulnerabilidades de segurança:

1. **Email:** security@performancy.com.br
2. **PGP Key:** Disponível em https://performancy.com.br/.well-known/pgp-key.txt
3. **Response Time:** 24h para confirmação, 72h para avaliação inicial

---

## 📄 Certificações e Compliance

| Certificação | Status | Previsão |
|--------------|--------|----------|
| LGPD Compliance | ✅ Em conformidade | - |
| NIST CSF | 🟡 Parcial (75%) | Q2 2026 |
| SOC 2 Type II | 📋 Planejado | Q3 2026 |
| ISO 27001 | 📋 Roadmap | 2027 |

---

**Versão:** 1.0  
**Última Atualização:** Dezembro 2025  
**Próxima Revisão:** Dezembro 2025  
**Classificação:** Confidencial - Para Avaliação Técnica
