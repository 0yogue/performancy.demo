/**
 * Mock data for Amanda's conversation analysis
 * Source: data/mock/analise-amanda.md
 */

export const amanda_analysis_data = {
  summary: `Fabio reconectou com Amanda (UpFlux) após anos sem contato. Relação pessoal forte facilitou conversa aberta. Amanda gerencia 19 pessoas (9 BDRs + 10 vendedores) e está **sobrecarregada** com forecast manual (1h+ toda sexta). Acabou de contratar MeetRocks mas identificou **gap crítico**: MeetRocks não oferece inteligência de forecast. 

Fabio mostrou solução complementar focada em RevOps. Amanda **adorou** e pediu material para apresentar aos acionistas em janeiro/2026. Fit é excelente, champion é forte, mas **timeline longo** (2 meses) e **budget incerto** são riscos. Deal tem **50% de probabilidade** mas pode subir para 70%+ se Fabio executar plano de ação (quantificar ROI, mapear acionistas, manter deal quente).

**Recomendação:** **AVANÇAR COM ESTRATÉGIA** - enviar briefing executivo até 15/nov, agendar call em jan/26, fazer follow-ups mensais.`,

  deal_score: 73,
  win_probability: 50,
  forecast_value: 60000,
  expected_close_date: "2026-01-31",
  stage: "EARLY CONSIDERATION",
  
  metrics: {
    meddic_score: 44,
    meddic_max: 60,
    spiced_score: 40,
    spiced_max: 50,
    challenger_score: 21,
    challenger_max: 30,
    performance_score: 41,
    performance_max: 60
  },

  prospect_info: {
    name: "Amanda Feitosa",
    role: "Gerente de Geração de Demanda (360°)",
    company: "UpFlux",
    team_size: 19,
    participants: [
      { name: "Rodrigo", role: "RevOps (não presente na call)" }
    ]
  },

  critical_actions: [
    {
      priority: "critical",
      action: "WhatsApp para Amanda pedindo budget disponível e quem são acionistas",
      deadline: "Hoje",
      status: "pending"
    },
    {
      priority: "high",
      action: "Criar calculadora ROI (forecast manual = R$ 96k/ano desperdiçado)",
      deadline: "Amanhã",
      status: "pending"
    },
    {
      priority: "critical",
      action: "Enviar briefing executivo (2 pág) + dashboard mockup + cases",
      deadline: "15/nov",
      status: "pending"
    },
    {
      priority: "critical",
      action: "Agendar call 15/jan/26 às 14h com Amanda + Rodrigo",
      deadline: "20/nov",
      status: "pending"
    },
    {
      priority: "medium",
      action: "Follow-ups mensais para manter deal quente",
      deadline: "Mensal (dez, jan)",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Timeline longo (2 meses até janeiro)",
      description: "Deal pode esfriar. Prioridades podem mudar. Amanda pode esquecer.",
      severity: "high",
      action: "Manter follow-ups mensais (nov, dez, jan)"
    },
    {
      title: "Budget já comprometido",
      description: "Gastaram R$ 130k+ em ferramentas (MeetRocks R$ 45k + Cortex R$ 84k + HubSpot upgrade).",
      severity: "high",
      action: "Confirmar budget disponível URGENTE"
    },
    {
      title: "Stakeholders não mapeados",
      description: "Não sabe quem são os acionistas. Não sabe critérios de aprovação.",
      severity: "high",
      action: "Mapear em próximo contato"
    },
    {
      title: "Rodrigo não está vendido ainda",
      description: "Não participou da call. É usuário final (RevOps). Pode ter opinião diferente.",
      severity: "medium",
      action: "Garantir que ele esteja na call de janeiro"
    }
  ],

  green_flags: [
    {
      title: "Champion MUITO forte",
      description: "Amanda super engajada. Relação pessoal sólida. Ela PEDIU material para acionistas."
    },
    {
      title: "Timing perfeito",
      description: "Fechamento de orçamento 2026. Momento de avaliar fornecedores. Janela clara (janeiro)."
    },
    {
      title: "Dor real e crescente",
      description: "Forecast manual insustentável. Time vai dobrar (mais dor). Amanda mostrando burnout."
    },
    {
      title: "Gap claro vs MeetRocks",
      description: "MeetRocks não faz forecast automático. Fabio mostrou diferencial claramente. Amanda reconheceu valor."
    },
    {
      title: "Budget histórico existente",
      description: "Gastam pesado em ferramentas. Maior investimento é HubSpot. Cultura de investir em tech."
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Rapport excepcional", score: 9 },
      { title: "Identificou gap competitivo", score: 8 },
      { title: "Discovery melhor que Thais", score: 6 },
      { title: "Transparência sobre produto", score: 8 },
      { title: "Timing perfeito", score: 8 }
    ],
    weaknesses: [
      { title: "Quantificar ROI", score: 2, critical: true },
      { title: "Próximos passos específicos", score: 4, critical: true },
      { title: "Mapear acionistas", score: 3, critical: true },
      { title: "Confirmar budget", score: 2, critical: true },
      { title: "Criar urgência", score: 4 }
    ]
  },

  revenue_architecture: {
    arr_year_1: 60000,
    setup_fee: 6500,
    mrr: 5000,
    users: 20,
    ltv_3_years: 300000,
    expansion_potential: 35000,
    churn_risk: "low-medium"
  }
};
