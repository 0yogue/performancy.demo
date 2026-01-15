# 💎 Sistema de Planos e Licenças - Performancy

> **Sistema de monetização e controle de features por empresa**

---

## 📋 Visão Geral

O Performancy utiliza um sistema de planos baseado em **tiers** para controlar acesso a features e impor limites de uso por empresa. Cada empresa possui um plano contratado que determina quais funcionalidades estão disponíveis e os limites de uso.

---

## 🎯 Planos Disponíveis

### 🆓 FREE
**Plano gratuito para teste e pequenas empresas**

**Features:**
- ❌ AI Analysis
- ❌ Bots
- ❌ Auto CRM Fill
- ❌ Playbook Generation
- ❌ Ranking Visibility
- ❌ Advanced Analytics
- ❌ Custom Playbooks
- ❌ API Access
- ❌ White Label
- ❌ Priority Support

**Limites:**
- Usuários: 3
- Squads: 1
- AI Requests/mês: 100
- Bot Messages/dia: 50
- Playbooks: 3
- Integrações: 1
- Retenção de conversas: 30 dias

---

### 🚀 STARTER
**Plano inicial para pequenas equipes**

**Features:**
- ✅ AI Analysis
- ❌ Bots
- ✅ Auto CRM Fill
- ❌ Playbook Generation
- ✅ Ranking Visibility
- ❌ Advanced Analytics
- ❌ Custom Playbooks
- ❌ API Access
- ❌ White Label
- ❌ Priority Support

**Limites:**
- Usuários: 10
- Squads: 3
- AI Requests/mês: 1,000
- Bot Messages/dia: 200
- Playbooks: 10
- Integrações: 3
- Retenção de conversas: 90 dias

---

### 💼 PROFESSIONAL
**Plano profissional para equipes em crescimento**

**Features:**
- ✅ AI Analysis
- ✅ Bots
- ✅ Auto CRM Fill
- ✅ Playbook Generation
- ✅ Ranking Visibility
- ✅ Advanced Analytics
- ✅ Custom Playbooks
- ❌ API Access
- ❌ White Label
- ✅ Priority Support

**Limites:**
- Usuários: 50
- Squads: 10
- AI Requests/mês: 10,000
- Bot Messages/dia: 1,000
- Playbooks: 50
- Integrações: 10
- Retenção de conversas: 365 dias

---

### 🏢 ENTERPRISE
**Plano empresarial com recursos completos**

**Features:**
- ✅ AI Analysis
- ✅ Bots
- ✅ Auto CRM Fill
- ✅ Playbook Generation
- ✅ Ranking Visibility
- ✅ Advanced Analytics
- ✅ Custom Playbooks
- ✅ API Access
- ✅ White Label
- ✅ Priority Support

**Limites:**
- Usuários: **Ilimitado**
- Squads: **Ilimitado**
- AI Requests/mês: **Ilimitado**
- Bot Messages/dia: **Ilimitado**
- Playbooks: **Ilimitado**
- Integrações: **Ilimitado**
- Retenção de conversas: **Ilimitado**

---

## 🔧 Implementação Técnica

### Schema Prisma

```prisma
enum CompanyPlan {
  FREE
  STARTER
  PROFESSIONAL
  ENTERPRISE
}

model Company {
  id                String                    @id @default(cuid())
  name              String
  slug              String                    @unique
  plan              CompanyPlan               @default(FREE)
  feature_overrides CompanyFeatureOverride[]
  // ... outros campos
}

model CompanyFeatureOverride {
  id         String    @id @default(cuid())
  company_id String
  feature    String    // FeatureFlag name
  enabled    Boolean
  reason     String?   // Motivo do override
  expires_at DateTime? // Para trials temporários
  created_at DateTime  @default(now())
  updated_at DateTime  @updatedAt
  
  company Company @relation(fields: [company_id], references: [id])
  
  @@unique([company_id, feature])
  @@map("company_feature_overrides")
}
```

### Helpers Disponíveis

**Arquivo:** `lib/features.ts`

```typescript
// Verificar se plano tem feature
plan_has_feature(plan: CompanyPlan, feature: FeatureFlag): boolean

// Obter todas as features do plano
get_plan_features(plan: CompanyPlan): CompanyFeatures

// Obter limites do plano
get_plan_limits(plan: CompanyPlan): PlanLimits

// Verificar feature da empresa (async - query DB)
has_feature(company_id: string, feature: FeatureFlag): Promise<boolean>

// Obter limites da empresa (async - query DB)
get_feature_limits(company_id: string): Promise<PlanLimits>
```

---

## 🎨 Features Disponíveis

### Core Features
- **ai_analysis**: Análise de conversas com IA
- **bots**: Automação de follow-ups
- **auto_crm_fill**: Preenchimento automático do CRM
- **playbook_generation**: Geração de playbooks com IA
- **ranking_visibility**: Visualização de ranking entre agents

### Advanced Features
- **advanced_analytics**: Analytics avançados e dashboards
- **custom_playbooks**: Criação de playbooks personalizados
- **api_access**: Acesso à API REST
- **white_label**: Personalização completa (logo, cores)
- **priority_support**: Suporte prioritário

---

## 📊 Tabela Comparativa

| Feature | FREE | STARTER | PROFESSIONAL | ENTERPRISE |
|---------|------|---------|--------------|------------|
| **Usuários** | 3 | 10 | 50 | ∞ |
| **Squads** | 1 | 3 | 10 | ∞ |
| **AI Analysis** | ❌ | ✅ | ✅ | ✅ |
| **Bots** | ❌ | ❌ | ✅ | ✅ |
| **Auto CRM Fill** | ❌ | ✅ | ✅ | ✅ |
| **Playbook Gen** | ❌ | ❌ | ✅ | ✅ |
| **Ranking** | ❌ | ✅ | ✅ | ✅ |
| **Advanced Analytics** | ❌ | ❌ | ✅ | ✅ |
| **Custom Playbooks** | ❌ | ❌ | ✅ | ✅ |
| **API Access** | ❌ | ❌ | ❌ | ✅ |
| **White Label** | ❌ | ❌ | ❌ | ✅ |
| **Priority Support** | ❌ | ❌ | ✅ | ✅ |
| **AI Requests/mês** | 100 | 1K | 10K | ∞ |
| **Integrações** | 1 | 3 | 10 | ∞ |
| **Retenção** | 30d | 90d | 365d | ∞ |

---

## 🛠️ Como Usar

### 1. Verificar Feature em API Route

```typescript
import { has_feature } from '@/lib/features';

export async function POST(request: NextRequest) {
  const company_id = 'clx123...';
  
  // Verificar se empresa tem feature de bots
  const can_use_bots = await has_feature(company_id, 'bots');
  
  if (!can_use_bots) {
    return NextResponse.json(
      { error: 'Feature não disponível no seu plano' },
      { status: 403 }
    );
  }
  
  // Continuar com lógica...
}
```

### 2. Verificar Limites

```typescript
import { get_feature_limits } from '@/lib/features';

const limits = await get_feature_limits(company_id);

if (current_users >= limits.max_users) {
  throw new Error(`Limite de ${limits.max_users} usuários atingido. Upgrade seu plano.`);
}
```

### 3. Verificar Feature no Frontend

```typescript
'use client';

import { useEffect, useState } from 'react';
import { has_feature } from '@/lib/features';

export function BotButton({ company_id }: { company_id: string }) {
  const [can_use_bots, set_can_use_bots] = useState(false);
  
  useEffect(() => {
    has_feature(company_id, 'bots').then(set_can_use_bots);
  }, [company_id]);
  
  if (!can_use_bots) {
    return (
      <Button disabled>
        Bots (Disponível em PROFESSIONAL+)
      </Button>
    );
  }
  
  return <Button>Criar Bot</Button>;
}
```

---

## 🎛️ Gerenciamento de Overrides (ADMIN)

### Interface de Admin

**Acesso:** `/admin/features` (apenas ADMIN)

**Funcionalidades:**
- ✅ Listar todas as empresas
- ✅ Ver plano atual e features padrão
- ✅ Criar overrides customizados por empresa
- ✅ Habilitar/desabilitar features específicas
- ✅ Definir data de expiração (trials)
- ✅ Adicionar motivo/justificativa
- ✅ Remover overrides (volta ao padrão)
- ✅ Audit log automático

### API de Overrides

**GET** `/api/admin/features?company_id=xxx`
```typescript
// Retorna overrides da empresa
{
  company: { id, name, plan },
  overrides: [
    {
      id: "clx...",
      feature: "bots",
      enabled: true,
      reason: "Trial de 30 dias",
      expires_at: "2025-12-31",
      created_at: "2025-11-16"
    }
  ]
}
```

**POST** `/api/admin/features`
```typescript
// Criar ou atualizar override
{
  company_id: "clx...",
  feature: "bots",
  enabled: true,
  reason: "Cliente VIP - acesso antecipado",
  expires_at: "2026-01-31" // opcional
}
```

**DELETE** `/api/admin/features?override_id=xxx`
```typescript
// Remove override (volta ao padrão do plano)
```

### Como Funciona o Sistema Híbrido

```typescript
// 1. Verificar override primeiro
const override = await prisma.companyFeatureOverride.findFirst({
  where: { 
    company_id,
    feature,
    OR: [
      { expires_at: null },
      { expires_at: { gt: new Date() } }
    ]
  }
});

if (override) {
  return override.enabled; // ⭐ Override tem prioridade
}

// 2. Se não tem override, usar padrão do plano
const company = await prisma.company.findUnique({ 
  where: { id: company_id } 
});

return PLAN_FEATURES[company.plan][feature]; // Padrão
```

### Casos de Uso

#### **1. Trial de Feature**
```typescript
// Liberar bots por 30 dias para empresa FREE
POST /api/admin/features
{
  company_id: "clx123",
  feature: "bots",
  enabled: true,
  reason: "Trial de 30 dias",
  expires_at: "2025-12-16"
}
```

#### **2. Cliente VIP**
```typescript
// Liberar API para cliente PROFESSIONAL
POST /api/admin/features
{
  company_id: "clx456",
  feature: "api_access",
  enabled: true,
  reason: "Cliente VIP - cortesia"
}
```

#### **3. Downgrade Temporário**
```typescript
// Desabilitar feature por não pagamento
POST /api/admin/features
{
  company_id: "clx789",
  feature: "bots",
  enabled: false,
  reason: "Suspensão por não pagamento"
}
```

---

## 🔄 Upgrade de Plano

```typescript
// Atualizar plano da empresa
async function upgrade_company_plan(
  company_id: string,
  new_plan: CompanyPlan
): Promise<void> {
  await prisma.company.update({
    where: { id: company_id },
    data: { plan: new_plan }
  });
  
  // Overrides continuam ativos
  // Features voltam ao novo padrão do plano onde não há override
  
  // Log audit
  await prisma.auditLog.create({
    data: {
      action: 'PLAN_UPGRADED',
      resource_type: 'COMPANY',
      resource_id: company_id,
      details: { new_plan },
      user_id: admin_user_id,
      company_id
    }
  });
}
```

---

## 📝 Convenções

### ✅ FAZER:
- Sempre verificar features antes de permitir uso
- Impor limites no backend (nunca confiar apenas no frontend)
- Retornar mensagens claras quando feature não disponível
- Logar tentativas de uso de features não disponíveis

### ❌ NÃO FAZER:
- Verificar features apenas no frontend
- Permitir bypass de limites
- Mostrar features não disponíveis sem indicação clara
- Hardcoded plan checks (usar helpers)

---

## 🚀 Roadmap

- [ ] Interface de administração para ADMIN alterar plano
- [ ] Página de upgrade para empresas
- [ ] Integração com gateway de pagamento (Stripe)
- [ ] Notificações quando atingir limites
- [ ] Dashboard de uso por plano
- [ ] Trial automático de planos superiores
- [ ] Custom plans para Enterprise

---

**Última Atualização:** Novembro 2025  
**Versão do Sistema:** 1.0
