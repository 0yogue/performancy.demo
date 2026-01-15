# 🗺️ Roadmap Unificado - Performancy

> **Versão:** 3.0  
> **Data:** 3 de Dezembro de 2025  
> **Visão:** Plataforma de Revenue Intelligence com dados 100% confiáveis baseados em conversas reais

---

## 📊 Status Atual do Produto

| Área | Status | Pronto para Produção |
|------|--------|----------------------|
| **Core Platform** (Auth, RBAC, Multi-tenant) | ✅ 100% | ✅ Sim |
| **Coach ao Vivo** (Chrome Extension) | ✅ 95% | 🟡 Falta testar em produção |
| **Role Play** (Treinamento + Gamificação) | ✅ 90% | 🟡 Falta dashboard MANAGER |
| **OKRs de Receita** | ✅ 95% | 🟡 Falta job de sync |
| **Dashboard** | 🟡 70% | ❌ Dados mockados |
| **Pipeline/Kanban** | 🟡 70% | ❌ Dados mockados |
| **Integrações CRM** | 🔴 20% | ❌ ZOHO parcial |
| **Governança de Dados** | 🔴 30% | ❌ Falta detecção de anomalias |
| **Forecast/Previsibilidade** | 🔴 0% | ❌ Não iniciado |

### Backlog - Melhorias de UX

| Item | Prioridade | Status |
|------|------------|--------|
| **Redirect pós-login dinâmico** | Alta | ✅ Implementado (v1.9.2) |
| **Menu restrito por empresa** | Alta | ✅ Implementado (v1.9.2) |
| **Configurar menu por empresa via admin** | Média | 🔴 Pendente |
| **Página default configurável por empresa** | Média | 🔴 Pendente |

> **Nota:** Atualmente o redirect pós-login busca o primeiro item do menu do usuário. No futuro, permitir configurar a página default por empresa.

---

## 🎯 Proposta de Valor Central

> *"Uma única plataforma onde você define suas metas de receita e o sistema te diz exatamente o que precisa acontecer para chegar lá, identificando problemas de processo E pessoas, com dados 100% confiáveis baseados em conversas reais."*

### Diferenciais Competitivos (Já Construídos)
1. **Coach ao Vivo** - Coaching em tempo real durante calls (95% pronto)
2. **Role Play com IA** - Treinamento gamificado com análise automática (90% pronto)
3. **OKRs de Receita** - Objetivos com métricas vinculadas a Coach/RolePlay/Pipeline (95% pronto)
4. **Anonimização** - Dados enviados para LLM são anonimizados (100% pronto)
5. **Multi-tenant RBAC** - Isolamento de dados por empresa (100% pronto)

---

## 📅 Roadmap 2025

### Q1 2025 - "Lançamento Comercial" 🚀

**Objetivo:** Primeiro cliente pagante com produto funcional.

#### Sprint 5 (Jan) - Produção Coach ao Vivo
| Item | Esforço | Responsável |
|------|---------|-------------|
| Testar Coach em calls reais (Google Meet) | 20h | Dev |
| Ajustar seletores de legendas | 10h | Dev |
| Dashboard pós-call com métricas | 30h | Dev |
| Conectar CoachSession ao Deal/Lead | 15h | Dev |

**Entregável:** Extensão Chrome funcionando em produção.

#### Sprint 6 (Jan-Fev) - Role Play MANAGER
| Item | Esforço | Responsável |
|------|---------|-------------|
| Dashboard MANAGER com visão do time | 25h | Dev |
| Notificações push (badges, análise pronta) | 20h | Dev |
| Calendário de role plays do time | 15h | Dev |
| Resumo diário às 18h para MANAGER | 10h | Dev |

**Entregável:** MANAGER pode acompanhar e definir metas de treinamento.

#### Sprint 7 (Fev) - Dashboard Real
| Item | Esforço | Responsável |
|------|---------|-------------|
| Substituir mock do Dashboard por dados reais | 40h | Dev |
| Criar tabelas de métricas agregadas | 20h | Dev |
| Jobs para cálculo diário de KPIs | 15h | Dev |
| Alertas quando meta não será atingida | 15h | Dev |

**Entregável:** Dashboard com dados reais, não mais mockado.

---

### Q2 2025 - "Governança + Metas" 🎯

**Objetivo:** C-Level consegue definir metas e confiar nos dados.

#### Sprint 8-9 (Mar) - Input de Metas
| Item | Esforço | Responsável |
|------|---------|-------------|
| Modelo Prisma: Goal, Target, Metric | 15h | Dev |
| Tela para C-Level inputar metas anuais | 25h | Dev |
| Breakdown automático (ano → trimestre → mês → semana) | 20h | Dev |
| Comparação real vs planejado no dashboard | 20h | Dev |

**Entregável:** C-Level define metas, sistema mostra progresso.

#### Sprint 10-11 (Abr) - Governança de Dados
| Item | Esforço | Responsável |
|------|---------|-------------|
| Tracking de origem do lead (inbound vs manual) | 20h | Dev |
| Alertas de anomalia estatística | 30h | Dev |
| Obrigatoriedade de gravação para contabilizar | 15h | Dev |
| Dashboard de "saúde dos dados" | 25h | Dev |

**Entregável:** Sistema detecta dados fraudulentos/inconsistentes.

#### Sprint 12-13 (Mai-Jun) - Integração ZOHO Completa
| Item | Esforço | Responsável |
|------|---------|-------------|
| Sync bidirecional de Leads | 30h | Dev |
| Sync bidirecional de Deals | 30h | Dev |
| Webhook handlers | 20h | Dev |
| Mapeamento de campos customizados | 20h | Dev |

**Entregável:** ZOHO CRM sincronizado em tempo real.

---

### Q3 2025 - "Inteligência + Gestão" 📊

**Objetivo:** Identificar problemas por área e por pessoa.

#### Sprint 14-15 (Jul) - Insights por Área
| Item | Esforço | Responsável |
|------|---------|-------------|
| Menu Insights com 4 áreas (Marketing, Pré-vendas, Vendas, CS) | 30h | Dev |
| Métricas específicas por área | 25h | Dev |
| Alertas operacionais por área | 20h | Dev |
| Headlines com ações sugeridas | 15h | Dev |

**Entregável:** Visão segmentada por área com alertas proativos.

#### Sprint 16-17 (Ago) - Gestão por Pessoa
| Item | Esforço | Responsável |
|------|---------|-------------|
| Dashboard individual de performance | 30h | Dev |
| Detecção de padrões de falha | 25h | Dev |
| Sugestões automáticas (roleplay, delegação, foco) | 20h | Dev |
| Comparação individual vs média do time | 15h | Dev |

**Entregável:** MANAGER sabe exatamente onde cada pessoa está falhando.

#### Sprint 18-19 (Set) - Drill-Down de Métricas
| Item | Esforço | Responsável |
|------|---------|-------------|
| Click em qualquer métrica → exploração profunda | 30h | Dev |
| Filtros por: pessoa, área, segmento, período | 25h | Dev |
| Export de relatórios | 15h | Dev |

**Entregável:** Análise granular de qualquer métrica.

---

### Q4 2025 - "Previsibilidade + Produtividade" 🔮

**Objetivo:** Sistema prevê resultados e otimiza tempo do vendedor.

#### Sprint 20-21 (Out) - Forecast Automático
| Item | Esforço | Responsável |
|------|---------|-------------|
| Engine de forecast baseado em histórico | 50h | Dev |
| Análise de ciclo de venda, ticket médio | 30h | Dev |
| Projeção por dia/semana/mês/trimestre | 25h | Dev |
| Indicação de esforço necessário para bater meta | 20h | Dev |

**Entregável:** Previsão de receita baseada em dados reais.

#### Sprint 22-23 (Nov) - Central de Produtividade
| Item | Esforço | Responsável |
|------|---------|-------------|
| Agenda inteligente com bloqueios de tempo | 30h | Dev |
| Cálculo de horas úteis | 15h | Dev |
| Priorização automática de atividades | 25h | Dev |
| Integração com Google Calendar | 30h | Dev |

**Entregável:** Vendedor sabe exatamente o que fazer a cada momento.

#### Sprint 24 (Dez) - Playbook Versionado
| Item | Esforço | Responsável |
|------|---------|-------------|
| Versionamento de playbooks | 20h | Dev |
| Fluxo de aprovação (DIRECTOR aprova mudanças) | 15h | Dev |
| Histórico de versões | 10h | Dev |
| Diff visual entre versões | 15h | Dev |

**Entregável:** Playbooks evoluem de forma controlada.

---

## 🔄 O Ciclo Completo (Visão de Produto)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1. C-Level inputa metas                                       │
│         ↓                                                       │
│   2. Sistema calcula esforço necessário (baseado em histórico)  │
│         ↓                                                       │
│   3. Dashboard mostra realidade vs meta                         │
│         ↓                                                       │
│   4. Insights apontam onde está o problema (área/pessoa)        │
│         ↓                                                       │
│   5. Coach ao Vivo melhora performance em tempo real            │
│         ↓                                                       │
│   6. Role Play treina skills específicos                        │
│         ↓                                                       │
│   7. Playbook guia processo de vendas                           │
│         ↓                                                       │
│   8. Produtividade remove distrações                            │
│         ↓                                                       │
│   9. Forecast ajusta expectativas                               │
│         ↓                                                       │
│   10. VOLTA PARA O PASSO 1 (melhoria contínua)                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📈 Métricas de Sucesso por Fase

| Fase | Métrica | Meta |
|------|---------|------|
| Q1 2025 | Primeiro cliente pagante | 1 |
| Q1 2025 | Calls analisadas por Coach | 100+ |
| Q2 2025 | Clientes ativos | 5-10 |
| Q2 2025 | Score de confiança nos dados | >90% |
| Q3 2025 | Clientes ativos | 20-30 |
| Q3 2025 | NPS | >50 |
| Q4 2025 | ARR | R$ 500k+ |
| Q4 2025 | Precisão do forecast | >80% |

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Dados mockados atrasam vendas | Alta | Alto | Priorizar Sprint 7 (Dashboard Real) |
| Integração ZOHO mais complexa | Média | Médio | Começar com sync unidirecional |
| Adoção lenta de vendedores | Média | Alto | Focar em produtividade (menos trabalho) |
| Complexidade técnica do forecast | Alta | Médio | MVP simples, iterar com dados |
| Burn rate vs tempo para receita | Alta | Crítico | Foco total em Q1 para primeiro cliente |

---

## 🚫 O que NÃO Faremos em 2025

Para manter foco, as seguintes features ficam para 2026:

- ❌ Mobile App (React Native)
- ❌ White-label (ENTERPRISE)
- ❌ SSO/SAML
- ❌ Internacionalização (i18n)
- ❌ Suporte a Zoom/Teams (apenas Google Meet em 2025)
- ❌ Integrações com Salesforce/HubSpot
- ❌ Scraping de redes sociais (Reclame Aqui, Instagram)

---

## 📚 Documentação Relacionada

- **[STATUS.md](./STATUS.md)** - Status atual do projeto
- **[COACH_AO_VIVO.md](./COACH_AO_VIVO.md)** - Documentação técnica do Coach
- **[APIs-COMPLETAS.md](./APIs-COMPLETAS.md)** - Referência de APIs
- **[PLANS.md](./PLANS.md)** - Sistema de planos e features
- **[SCHEMA.md](./SCHEMA.md)** - Schema do banco de dados

---

## 📝 Histórico de Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 3.0 | 03/12/2025 | Unificação: visão estratégica + código existente |
| 2.0 | 03/12/2025 | Roadmap técnico baseado no código |
| 1.0 | 03/12/2025 | Roadmap Fábio (visão de produto) |

---

**Última Atualização:** 3 de Dezembro de 2025  
**Próxima Revisão:** 10 de Janeiro de 2025 (após Sprint 5)
