/**
 * Consolidated conversation analysis data
 * Source: data/mock/analise-*.md
 */

export type ConversationAnalysisData = {
  summary: string;
  deal_score: number;
  win_probability: number;
  forecast_value: number;
  expected_close_date: string;
  stage: string;
  
  metrics: {
    meddic_score: number;
    meddic_max: number;
    spiced_score: number;
    spiced_max: number;
    challenger_score: number;
    challenger_max: number;
    performance_score: number;
    performance_max: number;
  };

  prospect_info: {
    name: string;
    role: string;
    company: string;
    team_size: number;
    participants: Array<{ name: string; role: string }>;
  };

  critical_actions: Array<{
    priority: 'critical' | 'high' | 'medium';
    action: string;
    deadline: string;
    status: 'pending' | 'completed';
  }>;

  red_flags: Array<{
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium';
    action: string;
  }>;

  green_flags: Array<{
    title: string;
    description: string;
  }>;

  performance_analysis: {
    strengths: Array<{ title: string; score: number }>;
    weaknesses: Array<{ title: string; score: number; critical?: boolean }>;
  };

  revenue_architecture: {
    arr_year_1: number;
    setup_fee: number;
    mrr: number;
    users: number;
    ltv_3_years: number;
    expansion_potential: number;
    churn_risk: string;
  };
};

// ============================================================================
// THAIS - Call #1
// ============================================================================
export const thais_analysis: ConversationAnalysisData = {
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
    company: "Skyone",
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

// ============================================================================
// AMANDA - Call #2
// ============================================================================
export const amanda_analysis: ConversationAnalysisData = {
  summary: `Fabio reconectou com Amanda (Gerente de Geração de Demanda na UpFlux) após período sem contato. Amanda está estruturando RevOps e fechando orçamento 2026. **Fit excelente** - solução complementa MeetRocks perfeitamente. Amanda é **Economic Buyer**, tem autonomia e mostrou forte interesse.

**Porém:** Fabio foi muito reativo, não fez discovery profundo, não quantificou ROI, e deixou próximo passo vago (janeiro). **50% de probabilidade** mas pode aumentar se Fabio agendar call com Rodrigo (RevOps) antes de janeiro e enviar caso de uso específico.

**Recomendação:** **AVANÇAR** mas corrigir postura reativa e agendar próximas calls estruturadas.`,

  deal_score: 73,
  win_probability: 50,
  forecast_value: 60000,
  expected_close_date: "2026-01-30",
  stage: "AWARENESS",
  
  metrics: {
    meddic_score: 35,
    meddic_max: 60,
    spiced_score: 32,
    spiced_max: 50,
    challenger_score: 15,
    challenger_max: 30,
    performance_score: 41,
    performance_max: 60
  },

  prospect_info: {
    name: "Amanda Feitosa",
    role: "Gerente de Geração de Demanda",
    company: "UpFlux",
    team_size: 25,
    participants: []
  },

  critical_actions: [
    {
      priority: "high",
      action: "WhatsApp para Amanda oferecendo call com Rodrigo (RevOps) em dezembro",
      deadline: "Hoje",
      status: "pending"
    },
    {
      priority: "high",
      action: "Preparar case específico: forecast automático para SaaS B2B",
      deadline: "Esta semana",
      status: "pending"
    },
    {
      priority: "medium",
      action: "Quantificar ROI: economia de tempo em forecast manual",
      deadline: "Antes da call em janeiro",
      status: "pending"
    },
    {
      priority: "critical",
      action: "Agendar call com Rodrigo + Amanda em dezembro",
      deadline: "Semana que vem",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Timeline muito longo (janeiro)",
      description: "Pode esfriar o deal. Amanda tem muitas prioridades.",
      severity: "medium",
      action: "Antecipar call técnica para dezembro"
    },
    {
      title: "Rodrigo (RevOps) não mapeado",
      description: "Stakeholder técnico crítico não participou da call.",
      severity: "high",
      action: "Incluir Rodrigo na próxima call"
    },
    {
      title: "Budget não discutido",
      description: "Nenhuma discussão de valores ou orçamento disponível.",
      severity: "medium",
      action: "Perguntar range de budget em próxima call"
    }
  ],

  green_flags: [
    {
      title: "Amanda é Economic Buyer",
      description: "Tem caneta para aprovar. Contratou MeetRocks e Cortex sozinha."
    },
    {
      title: "Timing perfeito (orçamento 2026)",
      description: "Está fechando orçamento agora. Janela de oportunidade aberta."
    },
    {
      title: "Fit complementar ao MeetRocks",
      description: "MeetRocks não tem forecast. Solução preenche gap crítico."
    },
    {
      title: "Relacionamento estabelecido",
      description: "Trabalharam juntos antes. Amanda confia no Fabio."
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Rapport excepcional", score: 9 },
      { title: "Ouvir ativamente", score: 8 },
      { title: "Identificou fit rapidamente", score: 8 },
      { title: "Tom apropriado (reconexão)", score: 8 },
      { title: "Respeito ao timing do cliente", score: 7 }
    ],
    weaknesses: [
      { title: "Muito reativo (não conduziu)", score: 3, critical: true },
      { title: "Discovery superficial", score: 4, critical: true },
      { title: "Não quantificou ROI", score: 2, critical: true },
      { title: "Próximos passos vagos", score: 3, critical: true },
      { title: "Não mapeou stakeholders", score: 4 }
    ]
  },

  revenue_architecture: {
    arr_year_1: 60000,
    setup_fee: 5000,
    mrr: 5000,
    users: 25,
    ltv_3_years: 210000,
    expansion_potential: 30000,
    churn_risk: "low"
  }
};

// ============================================================================
// NADIA - Call #8 (Validation)
// ============================================================================
export const nadia_analysis: ConversationAnalysisData = {
  summary: `Call de validação de produto com Nádia (desempregada, buscando oportunidades em Sales Enablement). **NÃO é call de vendas** - é validation/advisory. Nádia validou conceito fortemente e deu **feedback técnico EXCEPCIONAL** sobre: playbook interativo, análise de sentimento/tom, preparação pré-call, aderência ao playbook, e ICP automático.

**Valor:** Nádia pode virar **connector** (indicar empresas) ou **cliente futuro** quando estiver empregada. Ofereceu ajuda espontaneamente.

**Recomendação:** Manter relacionamento, implementar feedbacks valiosos, pedir indicações quando apropriado.`,

  deal_score: 0, // Não aplicável - não é venda
  win_probability: 0, // Não aplicável
  forecast_value: 0, // Futuro potencial desconhecido
  expected_close_date: "N/A",
  stage: "VALIDATION",
  
  metrics: {
    meddic_score: 0,
    meddic_max: 60,
    spiced_score: 0,
    spiced_max: 50,
    challenger_score: 0,
    challenger_max: 30,
    performance_score: 45, // Como validation call
    performance_max: 60
  },

  prospect_info: {
    name: "Nádia Motta",
    role: "Sales Enablement (desempregada)",
    company: "N/A",
    team_size: 0,
    participants: []
  },

  critical_actions: [
    {
      priority: "medium",
      action: "Implementar feedback de playbook interativo",
      deadline: "Roadmap Q1 2025",
      status: "pending"
    },
    {
      priority: "medium",
      action: "Adicionar análise de sentimento/tom de voz",
      deadline: "Roadmap Q1 2025",
      status: "pending"
    },
    {
      priority: "high",
      action: "Quando apropriado, pedir indicações de empresas",
      deadline: "Quando Nádia estiver empregada",
      status: "pending"
    }
  ],

  red_flags: [],

  green_flags: [
    {
      title: "Validação forte do conceito",
      description: "Nunca vi de forma completa e tão mágica. Seria interessante sim."
    },
    {
      title: "Feedback técnico excepcional",
      description: "Nádia deu insights valiosos sobre features futuras."
    },
    {
      title: "Ofereceu ajuda espontaneamente",
      description: "Quer ajudar a testar, dar feedback, indicar pessoas."
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Ouvir feedback", score: 10 },
      { title: "Abertura para críticas", score: 9 },
      { title: "Tom apropriado (validation)", score: 9 },
      { title: "Rapport natural", score: 8 },
      { title: "Não forçou venda", score: 9 }
    ],
    weaknesses: [
      { title: "Não pediu indicações específicas", score: 5 },
      { title: "Não estruturou follow-up", score: 4 }
    ]
  },

  revenue_architecture: {
    arr_year_1: 0,
    setup_fee: 0,
    mrr: 0,
    users: 0,
    ltv_3_years: 0,
    expansion_potential: 0,
    churn_risk: "N/A"
  }
};

// ============================================================================
// JOSEF - Call #3 (Networking)
// ============================================================================
export const josef_analysis: ConversationAnalysisData = {
  summary: `Call de reconexão/networking com Josef Bauman (parceiro na Pio Health Tech). Josef validou a solução e ofereceu ajuda com indicações, especialmente mencionando Baeta (potencial Economic Buyer na Pio). Fabio apresentou bem o produto, mas não estruturou pedidos específicos de indicação nem ofereceu reciprocidade.

**Valor:** Josef é connector em potencial para health tech. **40% de probabilidade** de gerar indicações que virem calls. Precisa de follow-up estruturado com material específico e lista de empresas-alvo.

**Recomendação:** Enviar one-pager para Josef levar ao almoço com Baeta. Estruturar modelo de comissão para indicações.`,

  deal_score: 0,
  win_probability: 40,
  forecast_value: 25000, // Expected value from referrals
  expected_close_date: "N/A",
  stage: "NETWORKING",
  
  metrics: {
    meddic_score: 18,
    meddic_max: 40,
    spiced_score: 14,
    spiced_max: 50,
    challenger_score: 15,
    challenger_max: 30,
    performance_score: 36,
    performance_max: 60
  },

  prospect_info: {
    name: "Josef Bauman",
    role: "Parceiro/Corretor + Consultor",
    company: "Pio Health Tech",
    team_size: 4,
    participants: []
  },

  critical_actions: [
    {
      priority: "critical",
      action: "WhatsApp para Josef oferecendo one-pager para Baeta",
      deadline: "Hoje",
      status: "pending"
    },
    {
      priority: "high",
      action: "Criar one-pager específico para health tech",
      deadline: "Amanhã",
      status: "pending"
    },
    {
      priority: "medium",
      action: "Follow-up após almoço com Baeta",
      deadline: "Próxima semana",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Nenhum ask específico",
      description: "Josef não sabe quem/como indicar. Pedido muito vago.",
      severity: "high",
      action: "Enviar lista de 5-10 empresas health tech alvo"
    },
    {
      title: "Sem reciprocidade oferecida",
      description: "Josef não tem incentivo claro para indicar.",
      severity: "medium",
      action: "Propor comissão ou troca de indicações"
    }
  ],

  green_flags: [
    {
      title: "Josef ofereceu ajuda espontaneamente",
      description: "Quer ajudar, tem network em health tech e vendas B2B"
    },
    {
      title: "Acesso a Baeta (potencial EB)",
      description: "Tem almoço marcado com Baeta na Pio"
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Rapport excepcional", score: 9 },
      { title: "Apresentação visual clara", score: 7 },
      { title: "Tom apropriado (networking)", score: 8 }
    ],
    weaknesses: [
      { title: "Não pediu indicações específicas", score: 1, critical: true },
      { title: "Próximos passos vagos", score: 3, critical: true },
      { title: "Não ofereceu reciprocidade", score: 1, critical: true }
    ]
  },

  revenue_architecture: {
    arr_year_1: 0,
    setup_fee: 0,
    mrr: 0,
    users: 0,
    ltv_3_years: 0,
    expansion_potential: 25000,
    churn_risk: "N/A"
  }
};

// ============================================================================
// EDU ALVES - Call #4
// ============================================================================
export const edu_alves_analysis: ConversationAnalysisData = {
  summary: `Discovery call com Eduardo Alves de empresa tech B2B. Fit moderado - empresa tem dores de previsibilidade e análise de conversas. Eduardo mostrou interesse mas também algumas objeções sobre timing e prioridades. Score moderado devido a discovery incompleto e falta de urgência clara.

**Recomendação:** Agendar demo técnica com time de Eduardo. Quantificar ROI específico para o cenário deles.`,

  deal_score: 62,
  win_probability: 45,
  forecast_value: 180000,
  expected_close_date: "2025-03-30",
  stage: "DISCOVERY",
  
  metrics: {
    meddic_score: 32,
    meddic_max: 60,
    spiced_score: 28,
    spiced_max: 50,
    challenger_score: 16,
    challenger_max: 30,
    performance_score: 35,
    performance_max: 60
  },

  prospect_info: {
    name: "Eduardo Alves",
    role: "Head de Vendas",
    company: "Empresa Tech",
    team_size: 35,
    participants: []
  },

  critical_actions: [
    {
      priority: "high",
      action: "Agendar demo técnica com time",
      deadline: "Esta semana",
      status: "pending"
    },
    {
      priority: "high",
      action: "Preparar ROI calculator específico",
      deadline: "Antes da demo",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Falta de urgência",
      description: "Não tem evento crítico ou deadline pressionando.",
      severity: "medium",
      action: "Criar senso de urgência mostrando custo de não resolver"
    }
  ],

  green_flags: [
    {
      title: "Dores validadas",
      description: "Confirma problemas com forecast manual e análise de conversas"
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Discovery estruturado", score: 6 },
      { title: "Rapport", score: 7 }
    ],
    weaknesses: [
      { title: "Não criou urgência", score: 4, critical: true },
      { title: "ROI não quantificado", score: 3, critical: true }
    ]
  },

  revenue_architecture: {
    arr_year_1: 180000,
    setup_fee: 7500,
    mrr: 15000,
    users: 35,
    ltv_3_years: 630000,
    expansion_potential: 90000,
    churn_risk: "medium"
  }
};

// ============================================================================
// EDU VOL - Call #5
// ============================================================================
export const edu_vol_analysis: ConversationAnalysisData = {
  summary: `Excelente call com Eduardo Volpato de startup em crescimento. Fit muito bom - startup está escalando comercial e precisa de estrutura. Eduardo é decisor e mostrou forte interesse. Score alto pela qualificação e fit. Timing bom para Q1 2025.

**Recomendação:** Avançar rápido. Eduardo é hot lead.`,

  deal_score: 71,
  win_probability: 65,
  forecast_value: 85000,
  expected_close_date: "2025-02-15",
  stage: "INTEREST",
  
  metrics: {
    meddic_score: 42,
    meddic_max: 60,
    spiced_score: 38,
    spiced_max: 50,
    challenger_score: 20,
    challenger_max: 30,
    performance_score: 44,
    performance_max: 60
  },

  prospect_info: {
    name: "Eduardo Volpato",
    role: "Co-founder / Head Comercial",
    company: "StartupXYZ",
    team_size: 15,
    participants: []
  },

  critical_actions: [
    {
      priority: "critical",
      action: "Enviar proposta comercial",
      deadline: "48h",
      status: "pending"
    },
    {
      priority: "high",
      action: "Agendar call com CTO para validação técnica",
      deadline: "Esta semana",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Startup pode ter budget limitado",
      description: "Precisa validar orçamento disponível.",
      severity: "medium",
      action: "Confirmar budget na proposta"
    }
  ],

  green_flags: [
    {
      title: "Decisor direto",
      description: "Eduardo é co-founder, pode decidir sozinho"
    },
    {
      title: "Timing de crescimento",
      description: "Startup escalando comercial, momento perfeito"
    },
    {
      title: "Fit excelente",
      description: "Precisa estruturar processo desde o início"
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Identificou urgência", score: 8 },
      { title: "Discovery completo", score: 7 },
      { title: "Rapport", score: 8 }
    ],
    weaknesses: [
      { title: "Não discutiu budget", score: 4 },
      { title: "Próximos passos poderiam ser mais específicos", score: 6 }
    ]
  },

  revenue_architecture: {
    arr_year_1: 85000,
    setup_fee: 5000,
    mrr: 7000,
    users: 15,
    ltv_3_years: 300000,
    expansion_potential: 120000,
    churn_risk: "low"
  }
};

// ============================================================================
// GIAN - Call #6
// ============================================================================
export const gian_analysis: ConversationAnalysisData = {
  summary: `Call complexa com Gian Carlo de empresa Enterprise. Múltiplos stakeholders envolvidos, processo de decisão longo. Fit técnico bom mas vendas complexas. Precisa de approach multi-threading e mapeamento completo de stakeholders. Score moderado pela complexidade.

**Recomendação:** Mapear todos stakeholders. Preparar material para campeão interno.`,

  deal_score: 58,
  win_probability: 40,
  forecast_value: 650000,
  expected_close_date: "2025-06-30",
  stage: "EARLY_DISCOVERY",
  
  metrics: {
    meddic_score: 28,
    meddic_max: 60,
    spiced_score: 25,
    spiced_max: 50,
    challenger_score: 14,
    challenger_max: 30,
    performance_score: 32,
    performance_max: 60
  },

  prospect_info: {
    name: "Gian Carlo",
    role: "Gerente Comercial",
    company: "Enterprise Corp",
    team_size: 200,
    participants: []
  },

  critical_actions: [
    {
      priority: "critical",
      action: "Mapear todos stakeholders no comitê de compra",
      deadline: "Esta semana",
      status: "pending"
    },
    {
      priority: "high",
      action: "Identificar Economic Buyer real",
      deadline: "Próxima call",
      status: "pending"
    },
    {
      priority: "high",
      action: "Preparar material para champion interno",
      deadline: "10 dias",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Processo de decisão não mapeado",
      description: "Não sabe quem decide e como é processo de aprovação.",
      severity: "critical",
      action: "Perguntar em próxima call"
    },
    {
      title: "Múltiplos stakeholders",
      description: "Precisa convencer várias áreas (TI, Comercial, Financeiro).",
      severity: "high",
      action: "Multi-threading strategy"
    }
  ],

  green_flags: [
    {
      title: "Deal size grande",
      description: "Empresa grande, potencial de ARR alto"
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Identificou complexidade", score: 7 }
    ],
    weaknesses: [
      { title: "Não mapeou stakeholders", score: 3, critical: true },
      { title: "Discovery superficial", score: 4, critical: true }
    ]
  },

  revenue_architecture: {
    arr_year_1: 650000,
    setup_fee: 25000,
    mrr: 54000,
    users: 200,
    ltv_3_years: 2500000,
    expansion_potential: 400000,
    churn_risk: "low"
  }
};

// ============================================================================
// LETICIA - Call #7
// ============================================================================
export const leticia_analysis: ConversationAnalysisData = {
  summary: `Excelente call com Letícia Santos, líder RevOps em empresa growth-stage. Score mais alto de todas as calls - Letícia é champion forte, tem dores claras e urgentes, budget confirmado e autoridade de decisão. Fit perfeito. Fabio teve performance muito boa nesta call: fez discovery profundo, quantificou ROI, estabeleceu próximos passos claros.

**Recomendação:** Avançar full speed. Deal muito qualificado e com alta probabilidade de fechar.`,

  deal_score: 79,
  win_probability: 75,
  forecast_value: 240000,
  expected_close_date: "2025-01-30",
  stage: "QUALIFIED",
  
  metrics: {
    meddic_score: 52,
    meddic_max: 60,
    spiced_score: 44,
    spiced_max: 50,
    challenger_score: 24,
    challenger_max: 30,
    performance_score: 51,
    performance_max: 60
  },

  prospect_info: {
    name: "Letícia Santos",
    role: "Head de RevOps",
    company: "Growth Company",
    team_size: 60,
    participants: []
  },

  critical_actions: [
    {
      priority: "critical",
      action: "Enviar proposta comercial detalhada",
      deadline: "Amanhã",
      status: "pending"
    },
    {
      priority: "critical",
      action: "Agendar demo técnica com time de TI",
      deadline: "Esta semana",
      status: "pending"
    },
    {
      priority: "high",
      action: "Preparar contrato e documentação de segurança",
      deadline: "Próxima semana",
      status: "pending"
    }
  ],

  red_flags: [
    {
      title: "Aprovação de TI necessária",
      description: "Precisa passar por security review.",
      severity: "medium",
      action: "Preparar documentação de segurança"
    }
  ],

  green_flags: [
    {
      title: "Champion fortíssimo",
      description: "Letícia vendendo internamente, tem orçamento aprovado"
    },
    {
      title: "Dor crítica e urgente",
      description: "Precisa resolver antes de Q1. Evento crítico mapeado."
    },
    {
      title: "ROI quantificado e aceito",
      description: "Letícia validou ROI apresentado por Fabio"
    },
    {
      title: "Budget confirmado",
      description: "Tem orçamento aprovado de R$ 300k para RevOps tools"
    }
  ],

  performance_analysis: {
    strengths: [
      { title: "Discovery profundo", score: 9 },
      { title: "Quantificou ROI", score: 8 },
      { title: "Próximos passos claros", score: 8 },
      { title: "Rapport excelente", score: 9 },
      { title: "Controle da conversa", score: 7 }
    ],
    weaknesses: [
      { title: "Poderia ter aprofundado mais em objeções técnicas", score: 6 }
    ]
  },

  revenue_architecture: {
    arr_year_1: 240000,
    setup_fee: 10000,
    mrr: 20000,
    users: 60,
    ltv_3_years: 840000,
    expansion_potential: 120000,
    churn_risk: "low"
  }
};

// ============================================================================
// Dictionary mapping conversation IDs to analysis data
// ============================================================================
export const conversations_analysis_map: Record<string, ConversationAnalysisData> = {
  'conv-thais-001': thais_analysis,
  'conv-amanda-001': amanda_analysis,
  'conv-nadia-001': nadia_analysis,
  'conv-josef-001': josef_analysis,
  'conv-edu-alves-001': edu_alves_analysis,
  'conv-edu-vol-001': edu_vol_analysis,
  'conv-gian-001': gian_analysis,
  'conv-leticia-001': leticia_analysis,
};
