/**
 * Mock conversations list with analysis data
 * Includes deal values and win probabilities for activities ranking
 */

export const mock_conversations_list = [
  {
    id: 'conv-thais-001',
    lead_name: 'Thais de Souza Rui Cano',
    company: 'Skyone',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 3420, // 57 minutes
    created_at: new Date('2024-11-06T14:30:00'),
    sentiment: 'POSITIVE',
    playbook_score: 67,
    tags: ['enterprise', 'high-value', 'qualified'],
    deal_value: 150000, // R$ 150k ARR
    win_probability: 65, // 65% chance
    stage: 'qualified' // discovery, qualified, proposal, negotiation, won, lost
  },
  {
    id: 'conv-amanda-001',
    lead_name: 'Amanda Feitosa',
    company: 'UpFlux',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 2580, // 43 minutes
    created_at: new Date('2024-11-05T10:00:00'),
    sentiment: 'POSITIVE',
    playbook_score: 73,
    tags: ['saas', 'revops', 'follow-up-jan'],
    deal_value: 80000,
    win_probability: 40,
    stage: 'discovery'
  },
  {
    id: 'conv-nadia-001',
    lead_name: 'Nádia Motta',
    company: 'N/A (Validation Call)',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 1800, // 30 minutes
    created_at: new Date('2024-10-29T15:00:00'),
    sentiment: 'POSITIVE',
    playbook_score: 0, // N/A - validation call
    tags: ['validation', 'product-feedback', 'advisor'],
    deal_value: 0,
    win_probability: 0,
    stage: 'lost'
  },
  {
    id: 'conv-josef-001',
    lead_name: 'Josef Bauman',
    company: 'Pio Health',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 2100, // 35 minutes
    created_at: new Date('2024-11-08T16:00:00'),
    sentiment: 'POSITIVE',
    playbook_score: 0, // N/A - networking call
    tags: ['networking', 'health-tech', 'connector'],
    deal_value: 200000,
    win_probability: 75,
    stage: 'discovery'
  },
  {
    id: 'conv-edu-alves-001',
    lead_name: 'Eduardo Alves',
    company: 'Empresa Tech',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 2700, // 45 minutes
    created_at: new Date('2024-11-10T10:30:00'),
    sentiment: 'NEUTRAL',
    playbook_score: 62,
    tags: ['discovery', 'b2b', 'qualified'],
    deal_value: 120000,
    win_probability: 55,
    stage: 'qualified'
  },
  {
    id: 'conv-edu-vol-001',
    lead_name: 'Eduardo Volpato',
    company: 'StartupXYZ',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 3000, // 50 minutes
    created_at: new Date('2024-11-11T14:00:00'),
    sentiment: 'POSITIVE',
    playbook_score: 71,
    tags: ['startup', 'saas', 'hot-lead'],
    deal_value: 300000,
    win_probability: 80,
    stage: 'proposal'
  },
  {
    id: 'conv-gian-001',
    lead_name: 'Gian Carlo',
    company: 'Enterprise Corp',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 2400, // 40 minutes
    created_at: new Date('2024-11-12T11:00:00'),
    sentiment: 'NEUTRAL',
    playbook_score: 58,
    tags: ['enterprise', 'complex-sale', 'multiple-stakeholders'],
    deal_value: 50000,
    win_probability: 20,
    stage: 'discovery'
  },
  {
    id: 'conv-leticia-001',
    lead_name: 'Letícia Santos',
    company: 'Growth Company',
    user_name: 'Fabio El Beck',
    channel: 'CALL',
    duration: 2850, // 47 minutes
    created_at: new Date('2024-11-13T09:30:00'),
    sentiment: 'POSITIVE',
    playbook_score: 79,
    tags: ['growth-stage', 'revops', 'champion'],
    deal_value: 450000,
    win_probability: 90,
    stage: 'negotiation'
  }
];
