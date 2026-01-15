# 🔐 PERFORMANCY - Conformidade e Segurança de Dados

## Apresentação para Clientes
**Data:** Dezembro 2025

---

# SLIDE 1: Conformidade LGPD - Status Atual

## ✅ Medidas Implementadas

### 🔒 Proteção de Dados Pessoais
| Dado | Classificação | Proteção |
|------|---------------|----------|
| **Senhas** | Sensível | Hash bcrypt (nunca armazenadas em texto) |
| **Tokens de Integração** | Sensível | Criptografia AES-256-GCM |
| **Emails e Dados Pessoais** | Pessoal | Banco PostgreSQL com acesso restrito |
| **Transcrições de Calls** | Sensível | Processamento com anonimização |

### 🛡️ Controle de Acesso (RBAC)
- **4 níveis hierárquicos:** ADMIN → DIRECTOR → MANAGER → AGENT
- **Multi-tenant isolation:** Cada empresa só acessa seus próprios dados
- **Audit Logs:** Todas ações sensíveis são registradas com IP, timestamp e usuário

### 🔐 Autenticação & Autorização
- ✅ Sessões JWT seguras (7 dias de expiração)
- ✅ Rate limiting contra ataques de força bruta
- ✅ Validação de input em todas APIs (Zod)
- ✅ HTTPS obrigatório em produção
- ✅ CORS restrito a origens autorizadas

### 📋 Direitos do Titular (Art. 18 LGPD)
- ✅ **Acesso aos dados:** Usuário visualiza todos seus dados na plataforma
- ✅ **Portabilidade:** Exportação de dados disponível (DIRECTOR+)
- 🔜 **Direito ao esquecimento:** Em implementação para Q1/2025
- ✅ **Consentimento:** Termos de uso claros sobre gravação e análise

---

# SLIDE 2: Arquitetura de Dados com Anonimização para LLMs

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FLUXO DE DADOS - PERFORMANCY                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────────┐      ┌───────────────────┐
│   CLIENTE    │      │   PERFORMANCY    │      │   LLMs EXTERNAS   │
│              │      │   (Nossa Infra)  │      │  (OpenAI/Claude)  │
└──────┬───────┘      └────────┬─────────┘      └─────────┬─────────┘
       │                       │                          │
       │  1. Dados Brutos      │                          │
       │  (calls, transcrições)│                          │
       ▼                       │                          │
┌──────────────┐               │                          │
│  Integração  │───────────────┤                          │
│  (CRM, Meet) │               │                          │
└──────────────┘               │                          │
                               ▼                          │
                    ┌──────────────────┐                  │
                    │  📦 BANCO LOCAL  │                  │
                    │  (PostgreSQL)    │                  │
                    │                  │                  │
                    │  • Dados brutos  │                  │
                    │  • Criptografados│                  │
                    │  • Multi-tenant  │                  │
                    └────────┬─────────┘                  │
                             │                            │
                             │  2. Processamento          │
                             ▼                            │
                    ┌──────────────────┐                  │
                    │  🔒 ANONIMIZAÇÃO │                  │
                    │                  │                  │
                    │  • Remove PII    │                  │
                    │  • Mascara nomes │                  │
                    │  • Remove emails │                  │
                    │  • Remove phones │                  │
                    │  • Tokeniza IDs  │                  │
                    └────────┬─────────┘                  │
                             │                            │
                             │  3. Dados Anonimizados     │
                             ▼                            │
                    ┌──────────────────┐                  │
                    │  📤 API SEGURA   │──────────────────▶
                    │                  │   Apenas contexto
                    │  • TLS 1.3       │   sem dados pessoais
                    │  • API Keys      │                  │
                    │  • Rate Limited  │                  │
                    └──────────────────┘                  │
                                                         │
                                                         │
                    ┌──────────────────┐                  │
                    │  📥 RESPOSTA IA  │◀─────────────────┘
                    │                  │   Insights,
                    │  • Análise       │   análises,
                    │  • Insights      │   scores
                    │  • Scores        │
                    └────────┬─────────┘
                             │
                             │  4. Enriquecimento
                             ▼
                    ┌──────────────────┐
                    │  💾 RESULTADO    │
                    │                  │
                    │  Re-associação   │
                    │  com dados       │
                    │  originais       │
                    │  (interno apenas)│
                    └──────────────────┘
```

## 🔐 O Que NUNCA Enviamos às LLMs:
- ❌ Nomes reais de pessoas
- ❌ Emails ou telefones
- ❌ CPF/CNPJ
- ❌ Dados de cartão ou financeiros
- ❌ IDs internos do cliente
- ❌ Informações de localização

## ✅ O Que Enviamos (Anonimizado):
- ✅ Contexto da conversa com "[VENDEDOR]" e "[CLIENTE]"
- ✅ Estrutura da negociação sem valores específicos
- ✅ Perguntas e respostas genéricas
- ✅ Metodologia de vendas aplicada

---

# SLIDE 3: Roadmap NIST e Adequações Enterprise

## 📊 Framework NIST Cybersecurity (CSF 2.0)

| Função | Status Atual | Próximos Passos |
|--------|--------------|-----------------|
| **IDENTIFY** (Identificar) | ✅ 85% | Inventário de ativos completo |
| **PROTECT** (Proteger) | ✅ 90% | Criptografia, RBAC, Multi-tenant |
| **DETECT** (Detectar) | 🟡 70% | Logs de auditoria, alertas |
| **RESPOND** (Responder) | 🟡 60% | Plano de resposta a incidentes |
| **RECOVER** (Recuperar) | 🟡 65% | Backups diários, DR Plan |

## 🎯 Adequações Disponíveis por Necessidade do Cliente

### Tier 1 - Padrão (Incluído)
- ✅ LGPD Compliance
- ✅ Criptografia AES-256
- ✅ RBAC 4 níveis
- ✅ Audit Logs
- ✅ Backups diários

### Tier 2 - Enhanced Security (Sob Demanda)
- 🔜 2FA (Two-Factor Authentication)
- 🔜 SSO (Single Sign-On) via SAML/OAuth
- 🔜 IP Whitelist para acessos
- 🔜 Retenção customizada de dados
- 🔜 Logs exportáveis para SIEM

### Tier 3 - Enterprise Compliance (Sob Contrato)
- 📋 SOC 2 Type II Certification
- 📋 ISO 27001 Alignment
- 📋 Pentest anual por terceiros
- 📋 DPA (Data Processing Agreement) customizado
- 📋 Ambiente dedicado (single-tenant)
- 📋 SLA de 99.9% uptime

## 📞 Processo de Adequação

```
1. ASSESSMENT          2. PLANEJAMENTO        3. IMPLEMENTAÇÃO       4. VALIDAÇÃO
   ┌─────────┐           ┌─────────┐           ┌─────────┐           ┌─────────┐
   │Levantamento│         │Cronograma│          │ Deploy  │           │ Testes  │
   │de requisitos│───────▶│  e SLA   │─────────▶│ Features│──────────▶│  e Doc  │
   │do cliente│           │          │          │         │           │         │
   └─────────┘           └─────────┘           └─────────┘           └─────────┘
     1-2 dias              1 semana             2-4 semanas            1 semana
```

---

# 📎 ANEXO: Documentação Técnica Disponível

| Documento | Descrição |
|-----------|-----------|
| `RBAC.md` | Sistema completo de permissões (4 roles) |
| `SECURITY-TESTS.md` | Testes de segurança realizados |
| `SECURITY-AUDIT-EXTENSION.md` | Auditoria da extensão Chrome |
| `SCHEMA.md` | Estrutura do banco de dados |
| `API.md` | Documentação das APIs |

## 🔒 Certificações e Compliance

| Item | Status |
|------|--------|
| **LGPD** | ✅ Em conformidade |
| **NIST CSF** | 🟡 Parcialmente implementado |
| **SOC 2** | 📋 Disponível sob demanda |
| **ISO 27001** | 📋 Roadmap 2025 |
| **GDPR** | 🟡 Parcialmente (se necessário para EU) |

---

## 💬 Perguntas Frequentes

**Q: Os dados do meu time ficam seguros?**
> Sim. Utilizamos criptografia AES-256-GCM para dados sensíveis, isolamento multi-tenant (sua empresa só vê seus dados), e controle de acesso granular por função.

**Q: A IA externa (ChatGPT/Claude) vê os dados dos meus clientes?**
> Não. Antes de enviar qualquer dado para análise de IA, removemos todos os dados pessoais identificáveis (PII). A IA recebe apenas contexto anonimizado como "[VENDEDOR] disse X para [CLIENTE]".

**Q: Vocês guardam as gravações das calls?**
> Armazenamos transcrições com consentimento explícito. O cliente pode solicitar exclusão a qualquer momento (Direito ao Esquecimento - LGPD Art. 18).

**Q: Posso ter um ambiente dedicado?**
> Sim. No plano Enterprise, oferecemos single-tenant deployment com banco de dados isolado e infraestrutura dedicada.

---

**Contato para Compliance:**  
📧 compliance@performancy.ai  
📞 Suporte: Central do Cliente

**Versão:** 1.0  
**Última atualização:** Dezembro 2025
