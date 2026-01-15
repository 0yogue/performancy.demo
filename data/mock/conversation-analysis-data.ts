/**
 * Mock data for Thais's conversation analysis
 * Source: data/mock/analise-thais.md
 */

export const thais_analysis_data = {
  summary: `Fabio apresentou sua plataforma de Revenue Intelligence para Thais (Gestora Comercial), Bruno (RevOps) e Robson (conector). O fit produto-problema é **excelente** - Thais confirmou múltiplas vezes que a solução resolve dores críticas. **Champions fortes** (Thais + Bruno) e **timing perfeito** (kick-off jan/fev) são pontos positivos. 

**Porém:** Fabio falhou em fazer discovery profundo, não quantificou ROI, não mapeou blocker técnico crítico, e não estabeleceu próximos passos específicos. Deal tem **55% de probabilidade** mas pode aumentar para 75%+ se Fabio executar plano de ação (mapear área técnica, confirmar budget, quantificar ROI, agendar follow-up).

**Recomendação:** **AVANÇAR COM URGÊNCIA** mas corrigir gaps críticos nas próximas 48h.`,

  deal_score: 67,
  win_probability: 55,
  forecast_value: 500000,
  expected_close_date: "2025-02-15",
  stage: "CONSIDERATION",
  
  metrics: {
    meddic_score: 40,
    meddic_max: 60,
    spiced_score: 39,
    spiced_max: 50,
    challenger_score: 18,
    challenger_max: 30,
    performance_score: 31,
    performance_max: 60
  },

  prospect_info: {
    name: "Thais de Souza Rui Cano",
    role: "Gestora Comercial / Head de Vendas",
    company: "Empresa Grande (não identificada)",
    team_size: 100,
    participants: [
      { name: "Bruno Lachi Siqueira de Farias", role: "RevOps/Heavy Ops" },
      { name: "Robson Aparecido Del Fiol", role: "Conector/Influencer" }
    ]
  },

  critical_actions: [
    {
      priority: "critical",
      action: "WhatsApp para Thais pedindo budget e contato da área técnica",
      deadline: "Hoje 23h",
      status: "pending"
    },
    {
      priority: "high",
      action: "Investigar Zorro CRM API/documentação",
      deadline: "Amanhã",
      status: "pending"
    },
    {
      priority: "high",
      action: "Preparar ROI calculator e case B2B similar",
      deadline: "Quarta",
      status: "pending"
    },
    {
      priority: "critical",
      action: "Agendar call com área técnica",
      deadline: "Quinta/Sexta",
      status: "pending"
    },
    {
      priority: "critical",
      action: "Enviar proposta completa com premissas técnicas",
      deadline: "Sexta 8/nov",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Blocker técnico não mapeado",
      description: "Time técnico pode vetar solução. Área técnica gosta de fazer tudo em casa.",
      severity: "critical",
      action: "Mapear stakeholder técnico URGENTE"
    },
    {
      title: "Budget não confirmado",
      description: "Nenhuma discussão de valores. Não sabe se tem orçamento aprovado.",
      severity: "high",
      action: "Perguntar em próximo contato"
    },
    {
      title: "Produto muito novo (5 semanas)",
      description: "Pode gerar insegurança. Falta social proof robusto.",
      severity: "medium",
      action: "Oferecer piloto/POC para mitigar risco"
    }
  ],

  green_flags: [
    {
      title: "Champion MUITO forte",
      description: "Thais super engajada, Bruno também vendendo internamente, Robson dando credibilidade"
    },
    {
      title: "Dor real e urgente",
      description: "Não é nice to have. Preciso resolver o mais rápido possível. Evento crítico em jan/fev."
    },
    {
      title: "Fit perfeito produto-problema",
      description: "Você pegou exatamente as dores. Solução maior ainda juntando isso."
    },
    {
      title: "Timing perfeito",
      description: "Pegando na janela de implementação. Antes do caos de ter 100 pessoas sem estrutura."
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Apresentação visual estruturada", score: 8 },
      { title: "Rapport e conexão humana", score: 8 },
      { title: "Identificou fit rapidamente", score: 7 },
      { title: "Demonstrou conhecimento das dores", score: 7 },
      { title: "Value Proposition", score: 7 }
    ],
    weaknesses: [
      { title: "Discovery/Questionamento", score: 3, critical: true },
      { title: "Controle da Conversa", score: 4, critical: true },
      { title: "Closing Techniques", score: 4, critical: true },
      { title: "Handling Objections", score: 5 },
      { title: "ROI quantificado", score: 1, critical: true }
    ]
  },

  revenue_architecture: {
    arr_year_1: 500000,
    setup_fee: 12500,
    mrr: 42000,
    users: 100,
    ltv_3_years: 2250000,
    expansion_potential: 255000,
    churn_risk: "medium"
  }
};
