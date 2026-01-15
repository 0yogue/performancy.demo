# 📞 Backlog - Página de Conversas

> **Versão:** 1.0  
> **Data:** 22 de Dezembro de 2025  
> **Status:** Em desenvolvimento

---

## 🎯 Objetivo

Transformar a página `/[company_slug]/conversations` em uma ferramenta completa de análise de chamadas, removendo dados mockados e implementando análise de IA real.

---

## 📊 Estado Atual

| Item | Status | Observação |
|------|--------|------------|
| Lista de conversas | ✅ Dados reais | Ordenado por `conversation_date` |
| Transcrição | ✅ Dados reais | Diarizado (VENDEDOR/CLIENTE) |
| Resumo | ⚠️ Heurísticas | Script Python com keywords |
| Análise IA | 🔴 Não implementado | Gemini pronto mas não integrado |
| Atribuição de usuário | ⚠️ Placeholder | Todas atribuídas ao MANAGER |
| Lead | ⚠️ Placeholder | Lead genérico "Chamadas sem Lead" |
| Playbook Score | 🔴 Não implementado | Campo existe mas não calculado |
| Key Moments | 🔴 Não implementado | Campo existe mas não preenchido |

---

## 🚀 Backlog de Melhorias

### P0 - Crítico (Próxima Sprint)

| ID | Item | Esforço | Descrição |
|----|------|---------|-----------|
| CONV-001 | Integrar análise Gemini | 8h | Rodar `analyze_call_with_gemini()` para todas conversas |
| CONV-002 | Melhorar resumo | 4h | Usar Gemini para gerar resumos de qualidade |
| CONV-003 | Identificar lead por telefone | 6h | Extrair número do GoTo e vincular a Lead existente |

### P1 - Importante (Q1 2025)

| ID | Item | Esforço | Descrição |
|----|------|---------|-----------|
| CONV-004 | Atribuir usuário correto | 8h | Mapear ramal GoTo → User no sistema |
| CONV-005 | Key Moments automáticos | 10h | IA identifica objeções, compromissos, fechamento |
| CONV-006 | Playbook Score | 15h | Comparar conversa com playbook e calcular aderência |
| CONV-007 | Filtros avançados | 6h | Por vendedor, período, duração, sentimento |

### P2 - Nice to Have (Q2 2025)

| ID | Item | Esforço | Descrição |
|----|------|---------|-----------|
| CONV-008 | Player de áudio | 10h | Ouvir gravação sincronizada com transcrição |
| CONV-009 | Exportar análise | 4h | PDF/CSV com dados da conversa |
| CONV-010 | Coaching sugerido | 8h | IA sugere pontos de melhoria para o vendedor |
| CONV-011 | Comparativo de performance | 12h | Métricas agregadas por vendedor |

---

## 🎨 Referência Visual (Página Mock)

A página mockada em `/data/mock/all-conversations-data.ts` tinha:

- **Sumário Executivo** com Deal Score, Win Probability, Valor Previsto
- **Métricas** com scores MEDDIC, SPICED, Challenger Sale
- **Insights** com Red Flags e Green Flags
- **Ações Críticas** com prioridade e deadline
- **Arquitetura de Receita** com ARR, MRR, LTV

Esses componentes devem ser reimplementados com dados reais quando tivermos:
- Deals vinculados a Conversations
- Playbooks com scores calculados
- IA gerando insights estruturados

---

## 📝 Decisões Técnicas

### Armazenamento de Prompts

**Decisão:** Prompts armazenados no filesystem em `/lib/prompts/`

**Motivo:** 
- Versionável com Git
- Fácil de revisar em PR
- Histórico de mudanças
- Não precisa de migration para alterar

**Estrutura proposta:**
```
lib/prompts/
├── call-analysis.ts      # Análise de chamadas
├── call-summary.ts       # Resumo de chamadas
├── sentiment.ts          # Análise de sentimento
└── key-moments.ts        # Extração de momentos-chave
```

### Ordenação de Conversas

**Decisão:** Usar `conversation_date` (data real da ligação)

**Motivo:**
- `created_at` = quando foi inserido no banco (batch)
- `conversation_date` = quando a ligação realmente aconteceu

---

## 📚 Documentação Relacionada

- **[ROADMAP.md](../ROADMAP.md)** - Roadmap geral do produto
- **[TELEPHONY.md](../features/TELEPHONY.md)** - Integração de telefonia
- **[STATUS.md](../STATUS.md)** - Status atual do projeto

---

**Última Atualização:** 22 de Dezembro de 2025
