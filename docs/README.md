# 📚 Documentação - Performancy

> **🎯 Para nova conversa com IA/Chat: Carregue [STATUS.md](./STATUS.md)**

Documentação técnica completa do projeto Performancy.

---

## 🚀 Início Rápido

### ⭐ Documento Principal: [STATUS.md](./STATUS.md)

**Este é o único documento que você precisa carregar em uma nova conversa.**

Contém:
- ✅ Stack técnica atual
- ✅ Implementações completas (Sprints 1-4.5)
- ✅ RBAC e rotas principais
- ✅ Convenções obrigatórias
- ✅ Próximos passos
- ✅ Setup rápido

**~490 linhas** com tudo que você precisa saber.

---

## 📋 Estrutura da Documentação

### 📁 Organização por Tema

```
docs/
├── 📄 Documentos Principais (raiz)
├── 🔒 data-security/     ← Segurança, LGPD, RBAC, Schema
├── ⚡ features/          ← Coach ao Vivo, Role Play, Integrações
├── 📦 install/           ← Guias de instalação
├── 📊 planning/          ← Planos, roadmap técnico, profiling
└── 🧪 testing/           ← Guias de testes
```

---

### 🟢 Documentos Principais (Raiz)

| Documento | Descrição | Quando Usar |
|-----------|-----------|-------------|
| **[STATUS.md](./STATUS.md)** | Status completo do projeto | ⭐ **Início de conversa** |
| **[ROADMAP.md](./ROADMAP.md)** | Roadmap unificado 2025 | Planejamento estratégico |
| **[APIs-COMPLETAS.md](./APIs-COMPLETAS.md)** | Documentação de APIs REST | Implementar/consumir APIs |
| **[CHANGELOG.md](./CHANGELOG.md)** | Histórico de versões | Ver mudanças recentes |

---

### 🔒 Segurança e Dados (`data-security/`)

| Documento | Descrição |
|-----------|-----------|
| **[RBAC.md](./data-security/RBAC.md)** | Sistema de permissões (4 roles) |
| **[SCHEMA.md](./data-security/SCHEMA.md)** | Database schema completo |
| **[LGPD-COMPLIANCE.md](./data-security/LGPD-COMPLIANCE.md)** | Conformidade LGPD + NIST |
| **[DATA-FLOW-ANONYMIZATION.md](./data-security/DATA-FLOW-ANONYMIZATION.md)** | Fluxo de dados e anonimização |
| **[SECURITY-WHITEPAPER.md](./data-security/SECURITY-WHITEPAPER.md)** | Whitepaper de segurança |
| **[SECURITY-TESTS.md](./data-security/SECURITY-TESTS.md)** | Testes de segurança RBAC |
| **[SECURITY-AUDIT-EXTENSION.md](./data-security/SECURITY-AUDIT-EXTENSION.md)** | Auditoria da extensão Chrome |

---

### ⚡ Features (`features/`)

| Documento | Descrição |
|-----------|-----------|
| **[COACH_AO_VIVO.md](./features/COACH_AO_VIVO.md)** | Chrome Extension de coaching em tempo real |
| **[ROLEPLAY.md](./features/ROLEPLAY.md)** | Sistema de treinamento com gamificação |
| **[INTEGRATION-OVERVIEW.md](./features/INTEGRATION-OVERVIEW.md)** | Integrações: Google Meet, ZOHO CRM |
| **[REALTIME-COACHING-TEST.md](./features/REALTIME-COACHING-TEST.md)** | Guia de teste do coaching |

---

### 📊 Planejamento (`planning/`)

| Documento | Descrição |
|-----------|-----------|
| **[PLANS.md](./planning/PLANS.md)** | Sistema de planos e feature flags |
| **[PROJECT-PROFILING.md](./planning/PROJECT-PROFILING.md)** | Análise de esforço para produção |

---

### 🧪 Testes (`testing/`)

| Documento | Descrição |
|-----------|-----------|
| **[TESTING-GUIDE.md](./testing/TESTING-GUIDE.md)** | Guia completo de testes |

---

### 📦 Instalação (`install/`)

| Documento | Descrição |
|-----------|-----------|
| **[EXTENSION-INSTALL-GUIDE.md](./install/EXTENSION-INSTALL-GUIDE.md)** | Instalação da extensão Chrome |

---

## 🎯 Fluxo de Uso

### Para IA/Assistente:

```
1. ✅ Carregar STATUS.md (SEMPRE no início)
2. ❌ NÃO carregar outros documentos automaticamente
3. ✅ Consultar documentos específicos APENAS se necessário:
   - APIs? → APIs-COMPLETAS.md
   - Permissões? → data-security/RBAC.md
   - Banco? → data-security/SCHEMA.md
   - Planos? → planning/PLANS.md
   - Coach? → features/COACH_AO_VIVO.md
   - Role Play? → features/ROLEPLAY.md
   - Roadmap? → ROADMAP.md
```

### Para Desenvolvedores:

```
1. STATUS.md - Visão geral do projeto
2. ROADMAP.md - Planejamento e próximos passos
3. APIs-COMPLETAS.md - Todas as rotas REST
4. data-security/SCHEMA.md - Modelos do banco
5. data-security/RBAC.md - Sistema de permissões
6. features/COACH_AO_VIVO.md - Chrome Extension
7. features/ROLEPLAY.md - Sistema de treinamento
```

---

## ✅ Boas Práticas de Documentação

### 1. 👍 Documento Único de Entrada
- **STATUS.md** é o ponto de entrada
- Contém referências para outros docs
- Nunca carregar múltiplos documentos no chat

### 2. 📊 Mantenha Foco
- Cada documento tem UM propósito
- Evite repetição entre documentos
- Use links para cross-reference

### 3. 🗑️ Manutenção Regular
- Remova docs desatualizados
- Atualize STATUS.md quando houver mudanças

### 4. 🎯 Menos é Mais
- Documentos focados > documentos confusos
- Documente apenas o que está implementado
- Não crie docs para "futuro"

---

## 📊 Métricas da Documentação

```
✅ Documentos na Raiz: 4
✅ Documentos em data-security/: 7
✅ Documentos em features/: 4
✅ Documentos em planning/: 2
✅ Documentos em testing/: 1
✅ Documentos em install/: 1
✅ Total: 19 documentos organizados em 6 categorias
📅 Última Atualização: 5 de Dezembro de 2025
```

---

## 🚨 Regras Obrigatórias

### ❌ NÃO FAÇA:
- Criar documentação fora de `./docs`
- Duplicar informação entre documentos
- Carregar múltiplos docs no chat

### ✅ SEMPRE FAÇA:
- Comece nova conversa com STATUS.md
- Mantenha STATUS.md atualizado
- Delete redundâncias

---

## 📝 Resumo Visual

```
performancy/docs/
├── ⭐ STATUS.md                    ← CARREGUE ESTE NO CHAT
├── README.md                       ← Este arquivo (índice)
├── ROADMAP.md                      ← Planejamento 2025
├── APIs-COMPLETAS.md               ← Endpoints REST (40+)
├── CHANGELOG.md                    ← Histórico de versões
│
├── 🔒 data-security/
│   ├── RBAC.md                     ← 4 roles, permissões
│   ├── SCHEMA.md                   ← Database models (25+ tabelas)
│   ├── LGPD-COMPLIANCE.md          ← Conformidade LGPD + NIST
│   ├── DATA-FLOW-ANONYMIZATION.md  ← Fluxo de anonimização
│   ├── SECURITY-WHITEPAPER.md      ← Whitepaper completo
│   ├── SECURITY-TESTS.md           ← Testes de segurança
│   └── SECURITY-AUDIT-EXTENSION.md ← Auditoria extensão
│
├── ⚡ features/
│   ├── COACH_AO_VIVO.md            ← Chrome Extension
│   ├── ROLEPLAY.md                 ← Treinamento + gamificação
│   ├── INTEGRATION-OVERVIEW.md     ← Google Meet, ZOHO
│   └── REALTIME-COACHING-TEST.md   ← Guia de teste
│
├── 📊 planning/
│   ├── PLANS.md                    ← Feature flags, limites
│   └── PROJECT-PROFILING.md        ← Análise de esforço
│
├── 🧪 testing/
│   └── TESTING-GUIDE.md            ← Guia completo de testes
│
└── 📦 install/
    └── EXTENSION-INSTALL-GUIDE.md  ← Instalação extensão
```

---

**Última Atualização**: 5 de Dezembro de 2025  
**Estrutura**: 19 documentos organizados em 6 categorias  
**Versão**: 2.0
