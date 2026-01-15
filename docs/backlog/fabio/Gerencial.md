# Documentação Técnica \- Sistema de Revenue Operations

### **Menu para Perfil Tático/Gerencial (Líderes de Área)**

**Versão:** 1.0

**Data:** Dezembro 2024

**Objetivo:** Documentação completa das funcionalidades e especificações técnicas para desenvolvimento do sistema

## **ÍNDICE**

1\. Visão Geral do Sistema

2\. Dashboard de Equipe

3\. Gestão de Pipeline

4\. Performance do Time

5\. Treinamento & Coaching

6\. Processos e Fluxos de Trabalho

7\. Conversas (Versão Tática)

8\. Playbooks (Versão Tática)

9\. Chat IA (Versão Tática)

10\. Especificações Técnicas Gerais

11\. Integrações Necessárias

12\. Cronograma de Desenvolvimento

## 

## **1\. VISÃO GERAL DO SISTEMA**

### **1.1 Objetivo do Perfil Tático/Gerencial**

O menu tático é projetado para líderes de área que precisam gerenciar equipes, otimizar performance individual, implementar processos e desenvolver pessoas através de coaching e treinamento operacional.

### **1.2 Princípios de Design**

* **Foco em Gestão de Equipe:** Ferramentas para liderança operacional diária

* **Ações Imediatas:** Interface que permite intervenções rápidas e efetivas

* **Desenvolvimento de Pessoas:** Recursos abrangentes para coaching e crescimento

* **Otimização de Processos:** Ferramentas para melhoria contínua e padronização

### **1.3 Estrutura do Menu**

1\. Dashboard de Equipe

2\. Gestão de Pipeline

3\. Performance do Time

4\. Treinamento & Coaching

5\. Processos e Fluxos de Trabalho

6\. Conversas

7\. Playbooks

8\. Chat IA

### **1.4 Diferencial do Perfil Tático**

* **Granularidade Operacional:** Foco em métricas e ações do dia a dia

* **Ferramentas de Coaching:** Recursos específicos para desenvolvimento de equipe

* **Gestão de Processos:** Controle detalhado de aderência e execução

* **Análise Individual:** Drill-down profundo em performance de cada membro

## 

## **2\. DASHBOARD DE EQUIPE**

### **2.1 Objetivo**

Fornecer visão imediata sobre a saúde e performance da equipe, permitindo identificação rápida de problemas e oportunidades de intervenção gerencial.

### **2.2 Estrutura da Página**

#### ***2.2.1 Header/Controles de Filtro***

**Filtros Principais:**

* **Período:** Hoje, Esta Semana, Este Mês, Este Trimestre

* **Comparação:** Toggle "Comparar com" \+ Dropdown (Período anterior, Mesmo período ano passado)

* **Equipe/Membros:** Dropdown para selecionar toda equipe ou membros específicos

* **Tipo de Atividade:** Todas, Calls, E-mails, Reuniões, Demos

* **Segmentação:** Por produto, região, canal (se aplicável)

#### ***2.2.2 Resumo Executivo da Equipe (Cards Principais)***

**6 Cards de KPIs Críticos:**

1\. **Meta da Equipe**

2\. % atingido da meta mensal/trimestral \+ valor absoluto

3\. Indicador visual de progresso

4\. Comparação com período anterior

5\. **Pipeline da Equipe**

6\. Valor total \+ cobertura da meta (quantas vezes a meta está coberta)

7\. Distribuição por estágio

8\. Tendência de crescimento

9\. **Atividades Totais**

10\. Calls \+ E-mails \+ Reuniões realizadas vs. meta de atividades

11\. Breakdown por tipo de atividade

12\. Performance por membro

13\. **Taxa de Conversão Média**

14\. % média da equipe por etapa do funil

15\. Comparação com benchmarks

16\. Identificação de gargalos

17\. **Ticket Médio da Equipe**

18\. Valor médio dos deals \+ comparação com período anterior

19\. Oportunidades de upsell identificadas

20\. Análise por segmento

21\. **Velocidade Média do Ciclo**

22\. Dias médios para fechar deals \+ tendência

23\. Comparação por tipo de deal

24\. Gargalos no processo

#### ***2.2.3 Performance Individual da Equipe***

**Tabela Ranking dos Membros:**

| Membro | Meta | Realizado | % Meta | Pipeline | Atividades | Conversão | Ciclo (dias) | Status |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| João Silva | R$50k | R$65k | 130% ✅ | R$120k | 145/120 | 18% | 35 | 🟢 Acima |
| Maria Santos | R$50k | R$42k | 84% 🟡 | R$95k | 98/120 | 15% | 42 | 🟡 Atenção |
| Pedro Costa | R$50k | R$38k | 76% 🔴 | R$75k | 87/120 | 12% | 48 | 🔴 Abaixo |

**Funcionalidades da Tabela:**

* **Ordenação:** Por qualquer coluna

* **Drill-down:** Clicar no nome leva para análise individual detalhada

* **Código de Cores:** Verde (acima da meta), Amarelo (próximo), Vermelho (abaixo)

* **Ações Rápidas:** Botões para \[Coaching\] \[1:1\] \[Ver Pipeline\] para cada membro

#### ***2.2.4 Sistema de Alertas Inteligentes***

**Algoritmo de Saúde do Funil:**

* **Verde:** Pipeline \>3x meta restante \+ \>85% meta atual

* **Amarelo:** Pipeline 2-3x meta restante \+ 70-85% meta atual

* **Vermelho:** Pipeline \<2x meta restante \+ \<70% meta atual

**Ações Automáticas Sugeridas pelos Alertas:**

* **Redistribuir Leads:** Quando um membro está sobrecarregado

* **Agendar Coaching:** Para membros com baixa conversão

* **Acelerar Pipeline:** Para deals parados há muito tempo

* **Ajustar Metas:** Quando metas estão muito desalinhadas

* **Treinamento Específico:** Baseado em gaps identificados

### **2.3 Especificações Técnicas**

#### ***2.3.1 Estrutura de Dados da Equipe***

{  \\"equipe\\": {    \\"id\\": \\"team\_001\\",    \\"nome\\": \\"Vendas Enterprise\\",    \\"lider\\": \\"user\_manager\_001\\",    \\"membros\\": \[\\"user\_001\\", \\"user\_002\\", \\"user\_003\\"\],    \\"metas\\": {      \\"mensal\\": 150000,      \\"trimestral\\": 450000,      \\"atividades\_meta\\": 120,      \\"conversao\_meta\\": 18,      \\"ciclo\_meta\\": 35    },    \\"performance\_atual\\": {      \\"receita\\": 127000,      \\"pipeline\\": 290000,      \\"atividades\\": 330,      \\"conversao\_media\\": 16.5,      \\"ciclo\_medio\\": 38    },    \\"alertas\_configurados\\": {      \\"performance\_baixa\\": {\\"threshold\\": 70, \\"ativo\\": true},      \\"pipeline\_insuficiente\\": {\\"threshold\\": 2.0, \\"ativo\\": true},      \\"atividade\_baixa\\": {\\"threshold\\": 80, \\"ativo\\": true}    },    \\"configuracao\_metas\\": {      \\"permite\_ajuste\_lider\\": true,      \\"herda\_okr\_corporativo\\": false,      \\"distribuicao\_automatica\\": true    }  },  \\"membro\\": {    \\"id\\": \\"user\_001\\",    \\"nome\\": \\"João Silva\\",    \\"cargo\\": \\"Account Executive\\",    \\"nivel\\": \\"senior\\",    \\"data\_contratacao\\": \\"2023-01-15\\",    \\"meta\_individual\\": 50000,    \\"meta\_configuravel\\": true,    \\"performance\\": {      \\"receita\\": 65000,      \\"pipeline\\": 120000,      \\"atividades\\": 145,      \\"conversao\\": 18,      \\"ciclo\_medio\\": 35,      \\"ticket\_medio\\": 25000    },    \\"status\_saude\\": \\"acima\_meta\\",    \\"alertas\_ativos\\": \[\],    \\"proxima\_acao\\": \\"mentorear\_pedro\\",    \\"historico\_performance\\": \[      {        \\"mes\\": \\"2024-11\\",        \\"receita\\": 58000,        \\"meta\\": 50000,        \\"percentual\\": 116      }    \]  }}

#### ***2.3.2 Métricas Calculadas em Tempo Real***

* **% de Meta Atingida:** (Realizado / Meta) \* 100

* **Cobertura de Pipeline:** Pipeline / Meta Restante

* **Velocity:** Receita / Dias no período

* **Eficiência de Atividades:** Resultados / Atividades realizadas

* **Score de Saúde:** Algoritmo composto baseado em múltiplas métricas

#### ***2.3.3 Integrações Necessárias***

* **CRM:** Dados de pipeline, atividades, resultados

* **Calendário:** Agendamento de 1:1s e reuniões

* **Sistema de Metas:** Conexão com OKRs da empresa

* **Notificações:** Alertas para situações que precisam atenção

## 

## **3\. GESTÃO DE PIPELINE**

### **3.1 Objetivo**

Permitir gestão ativa do pipeline da equipe, acompanhamento de deals individuais e tomada de ações para acelerar fechamentos através de ferramentas específicas para líderes.

### **3.2 Estrutura da Página**

#### ***3.2.1 Controles e Filtros (Topo da Página)***

**Filtros Principais:**

* **Membro da Equipe:** Todos, Individual específico

* **Estágio:** Todos os estágios ou estágio específico

* **Valor do Deal:** R$10k, R$10k-50k, R$50k-100k, \>R$100k

* **Probabilidade:** Alta (\>70%), Média (40-70%), Baixa (\<40%)

* **Data de Fechamento:** Esta semana, Este mês, Este trimestre, Atrasados

* **Última Atividade:** Últimas 24h, Última semana, \>1 semana sem atividade

**Ações Rápidas:**

* **Reunião de Pipeline:** Agendar review com a equipe

* **Exportar Pipeline:** Relatório completo em Excel/PDF

* **Distribuir Leads:** Ferramenta de redistribuição

#### ***3.2.2 Visão Geral do Pipeline (Cards Superiores)***

**5 Cards Principais:**

1\. **Pipeline Total**

2\. Valor total \+ cobertura da meta (Ex: "3.2x da meta restante")

3\. Distribuição por membro da equipe

4\. Comparação com período anterior

5\. **Deals Ativos**

6\. Quantidade total \+ distribuição por estágio

7\. Deals novos vs. deals antigos

8\. Taxa de progressão semanal

9\. **Fechamentos Previstos**

10\. Valor previsto para este mês \+ % de probabilidade

11\. Breakdown por membro responsável

12\. Confiabilidade do forecast

13\. **Deals em Risco**

14\. Quantidade \+ valor de deals sem atividade \>7 dias

15\. Deals com probabilidade decrescente

16\. Ações de recuperação sugeridas

17\. **Velocity Média**

18\. Tempo médio para mover entre estágios

19\. Comparação com benchmarks

20\. Gargalos identificados

#### ***3.2.3 Lista Detalhada de Oportunidades***

**Tabela Principal de Deals:**

| Deal/Empresa | Responsável | Valor | Estágio | Probabilidade | Próxima Ação | Data Fechamento | Última Atividade | Status | Ações |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| TechCorp \- CRM | João Silva | R$85k | Proposta | 75% 🟢 | Negociação | 20/12/24 | Ontem | 🟢 Ativo | \[Ver\]\[Acelerar\] |
| StartupABC \- Analytics | Maria Santos | R$45k | Discovery | 40% 🟡 | Demo | 15/12/24 | 3 dias | 🟡 Atenção | \[Ver\]\[Coaching\] |
| MegaCorp \- Enterprise | Pedro Costa | R$120k | Qualificação | 30% 🔴 | Follow-up | 10/12/24 | 8 dias | 🔴 Risco | \[Ver\]\[Redistribuir\] |

**Código de Cores por Status:**

* 🟢 **Ativo:** Progredindo normalmente

* 🟡 **Atenção:** Precisa de acompanhamento

* 🔴 **Risco:** Sem atividade ou probabilidade baixa

* ⚫ **Parado:** Sem movimento há \>14 dias

#### ***3.2.4 Ferramentas de Gestão Ativa***

**Redistribuição de Leads/Deals:**

* **Interface Arrastar e Soltar:** Mover deals entre membros da equipe

* **Critérios Automáticos:** Sugestões baseadas em carga de trabalho, especialização, performance

* **Histórico:** Rastrear todas as redistribuições e motivos

**Aceleração de Pipeline:**

* **Calls de Apoio:** Agendar call do líder com o cliente

* **Recursos Adicionais:** Alocar especialistas técnicos ou comerciais

* **Escalação:** Envolver níveis superiores quando necessário

* **Incentivos:** Aplicar incentivos específicos para deals prioritários

### **3.3 Especificações Técnicas**

#### ***3.3.1 Estrutura de Dados do Pipeline***

{  \\"deal\\": {    \\"id\\": \\"deal\_001\\",    \\"empresa\\": \\"TechCorp\\",    \\"contato\_principal\\": {      \\"nome\\": \\"João Cliente\\",      \\"cargo\\": \\"CTO\\",      \\"email\\": \\"joao@techcorp.com\\"    },    \\"valor\\": 85000,    \\"valor\_anual\\": 85000,    \\"potencial\_expansao\\": 120000,    \\"estagio\\": \\"proposta\\",    \\"estagio\_anterior\\": \\"discovery\\",    \\"probabilidade\\": 75,    \\"probabilidade\_anterior\\": 60,    \\"responsavel\\": \\"user\_joao\\",    \\"data\_criacao\\": \\"2024-10-15\\",    \\"data\_fechamento\_prevista\\": \\"2024-12-20\\",    \\"data\_fechamento\_original\\": \\"2024-12-15\\",    \\"ultima\_atividade\\": {      \\"data\\": \\"2024-12-14\\",      \\"tipo\\": \\"call\\",      \\"duracao\\": 45,      \\"resultado\\": \\"proposta\_solicitada\\"    },    \\"status\_saude\\": \\"ativo\\",    \\"proxima\_acao\\": \\"negociacao\\",    \\"prazo\_proxima\_acao\\": \\"2024-12-18\\",    \\"stakeholders\\": \[      {        \\"nome\\": \\"João Silva\\",        \\"cargo\\": \\"CTO\\",        \\"influencia\\": \\"decisor\\",        \\"sentimento\\": \\"positivo\\"      }    \],    \\"alertas\\": \[\\"sem\_atividade\_7d\\", \\"prazo\_apertado\\"\],    \\"acoes\_sugeridas\\": \[\\"call\_apoio\\", \\"acelerar\_proposta\\"\]  },  \\"pipeline\_equipe\\": {    \\"total\_valor\\": 1250000,    \\"total\_deals\\": 45,    \\"cobertura\_meta\\": 3.2,    \\"distribuicao\_estagios\\": {      \\"qualificacao\\": {        \\"deals\\": 12,        \\"valor\\": 300000,        \\"tempo\_medio\\": 7,        \\"conversao\\": 75      },      \\"proposta\\": {        \\"deals\\": 8,        \\"valor\\": 450000,        \\"tempo\_medio\\": 14,        \\"conversao\\": 60      }    },    \\"velocity\_media\\": 35,    \\"deals\_em\_risco\\": 8  }}

## 

## **4\. PERFORMANCE DO TIME**

### **4.1 Objetivo**

Análise detalhada da performance individual e coletiva, identificação de gaps de habilidades, comparação de resultados e desenvolvimento de planos de melhoria para cada membro da equipe.

### **4.2 Estrutura da Página**

#### ***4.2.1 Ranking de Performance da Equipe***

**Tabela Detalhada de Performance Individual:**

| Membro | Meta | Realizado | % Meta | Pipeline | Atividades | Conv. Média | Ciclo | Nota Geral | Tendência | Ações |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| João Silva | R$50k | R$68k | 136% 🟢 | R$145k | 165/120 | 22% | 28d | 9.2 ⭐ | ↗️ \+15% | \[Ver\]\[1:1\] |
| Maria Santos | R$50k | R$45k | 90% 🟡 | R$98k | 118/120 | 18% | 35d | 7.8 📈 | ↗️ \+8% | \[Ver\]\[Coaching\] |
| Pedro Costa | R$50k | R$32k | 64% 🔴 | R$75k | 89/120 | 14% | 45d | 6.1 📉 | ↘️ \-12% | \[Ver\]\[PIP\] |

#### ***4.2.2 Matriz de Competências da Equipe***

| Competência | João Silva | Maria Santos | Pedro Costa | Ana Oliveira | Média Equipe |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Prospecção | 9/10 🟢 | 7/10 🟡 | 5/10 🔴 | 8/10 🟢 | 7.2 |
| Qualificação | 9/10 🟢 | 8/10 🟢 | 6/10 🔴 | 8/10 🟢 | 7.8 |
| Apresentação | 8/10 🟢 | 9/10 🟢 | 7/10 🟡 | 9/10 🟢 | 8.2 |
| Negociação | 9/10 🟢 | 6/10 🔴 | 5/10 🔴 | 7/10 🟡 | 6.8 |
| Relacionamento | 8/10 🟢 | 9/10 🟢 | 8/10 🟢 | 9/10 🟢 | 8.5 |

### **4.3 Especificações Técnicas**

#### ***4.3.1 Estrutura de Dados de Performance***

{  \\"performance\_individual\\": {    \\"membro\_id\\": \\"user\_pedro\\",    \\"periodo\\": \\"2024-12\\",    \\"metricas\\": {      \\"receita\\": 32000,      \\"meta\\": 50000,      \\"percentual\_meta\\": 64,      \\"pipeline\\": 75000,      \\"atividades\\": {        \\"realizadas\\": 89,        \\"meta\\": 120,        \\"calls\\": 45,        \\"emails\\": 32,        \\"reunioes\\": 12      },      \\"conversao\\": 14,      \\"ciclo\_medio\\": 45,      \\"ticket\_medio\\": 18500,      \\"nota\_geral\\": 6.1    },    \\"competencias\\": {      \\"prospeccao\\": 5,      \\"qualificacao\\": 6,      \\"apresentacao\\": 7,      \\"negociacao\\": 5,      \\"relacionamento\\": 8    },    \\"tendencia\\": {      \\"direcao\\": \\"declinio\\",      \\"percentual\\": \-12,      \\"periodo\_comparacao\\": \\"mes\_anterior\\"    },    \\"status\\": \\"precisa\_atencao\\",    \\"pdi\_ativo\\": {      \\"id\\": \\"pdi\_pedro\_001\\",      \\"objetivo\\": \\"Atingir 85% da meta mensal\\",      \\"prazo\_dias\\": 60,      \\"progresso\\": 45    }  }}

## 

## **5\. TREINAMENTO & COACHING**

### **5.1 Objetivo**

Desenvolvimento contínuo da equipe através de planos de treinamento estruturados, acompanhamento de progresso e ferramentas de coaching para líderes.

### **5.2 Estrutura da Página**

#### ***5.2.1 Dashboard de Desenvolvimento da Equipe***

**Cards de Métricas Principais:**

* **Horas de Treinamento:** Total investido no mês \+ meta vs. realizado

* **Conclusão de Cursos:** % de cursos concluídos no prazo

* **ROI de Treinamento:** Melhoria de performance pós-treinamento

* **Sessões de Coaching:** Quantidade de 1:1s realizados vs. planejados

* **Certificações:** Número de certificações obtidas pela equipe

* **Score de Desenvolvimento:** Nota média de evolução da equipe

#### ***5.2.2 Planos de Desenvolvimento Individual***

**Lista de PDIs Ativos:**

| Membro | Plano Atual | Progresso | Prazo | Foco Principal | Próxima Ação | Status | Ações |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Pedro Costa | Melhoria Performance | 45% | 15 dias | Discovery \+ Prospecção | Roleplay João | 🟡 No prazo | \[Ver\]\[Ajustar\] |
| Maria Santos | Negociação Avançada | 75% | 30 dias | Fechamento deals grandes | Workshop prático | 🟢 Adiantado | \[Ver\]\[Acelerar\] |

### **5.3 Especificações Técnicas**

#### ***5.3.1 Estrutura de Dados de Treinamento***

{  \\"pdi\\": {    \\"membro\_id\\": \\"user\_pedro\\",    \\"plano\_id\\": \\"pdi\_001\\",    \\"objetivo\\": \\"Melhoria Performance\\",    \\"prazo\_dias\\": 60,    \\"progresso\_atual\\": 45,    \\"modulos\\": \[      {        \\"nome\\": \\"Discovery Fundamentals\\",        \\"status\\": \\"concluido\\",        \\"nota\\": 8.5,        \\"data\_conclusao\\": \\"2024-11-15\\",        \\"tempo\_investido\\": 4      }    \],    \\"atividades\_praticas\\": \[      {        \\"tipo\\": \\"shadowing\\",        \\"mentor\\": \\"user\_joao\\",        \\"sessoes\_planejadas\\": 5,        \\"sessoes\_realizadas\\": 3      }    \],    \\"metricas\_baseline\\": {      \\"atividades\\": 65,      \\"conversao\\": 12,      \\"pipeline\\": 75000    },    \\"metricas\_atuais\\": {      \\"atividades\\": 89,      \\"conversao\\": 15,      \\"pipeline\\": 82000    }  }}

## 

## **6\. PROCESSOS E FLUXOS DE TRABALHO**

### **6.1 Objetivo**

Gestão, otimização e padronização dos processos operacionais da equipe, monitoramento de aderência e identificação de gargalos.

### **6.2 Estrutura da Página**

#### ***6.2.1 Dashboard de Processos***

**Cards de Métricas:**

* **Processos Ativos:** Total de processos em uso \+ distribuição por área

* **Aderência Média:** % de execução correta dos processos

* **Tempo de Ciclo Médio:** Duração média dos processos vs. tempo ideal

* **Gargalos Identificados:** Quantos processos com problemas críticos

* **Eficiência Geral:** Score de otimização dos fluxos (0-100)

* **ROI de Processos:** Economia/ganho gerado pela padronização

#### ***6.2.2 Biblioteca de Processos***

**Visualização por Categorias:**

**PROCESSOS DE VENDAS:**

🎯 QUALIFICAÇÃO DE LEADSAderência: 92% ✅ | Tempo Médio: 25min | Última Atualização: 5 diasEtapas: 8 | Responsáveis: SDRs | Frequência: Diária\[Ver Processo\] \[Editar\] \[Analisar Performance\]💼 PROCESSO DE DEMOAderência: 78% 🟡 | Tempo Médio: 55min | Última Atualização: 12 diasEtapas: 12 | Responsáveis: AEs | Frequência: Sob demanda\[Ver Processo\] \[Otimizar\] \[Treinar Equipe\]

### **6.3 Especificações Técnicas**

#### ***6.3.1 Estrutura de Dados de Processo***

{  \\"processo\\": {    \\"id\\": \\"proc\_qualificacao\_001\\",    \\"nome\\": \\"Qualificação de Leads\\",    \\"categoria\\": \\"pre\_vendas\\",    \\"status\\": \\"ativo\\",    \\"versao\\": \\"2.1\\",    \\"criado\_por\\": \\"user\_maria\_leader\\",    \\"objetivo\\": \\"Qualificar leads inbound consistentemente\\",    \\"responsaveis\\": \[\\"sdr\_team\\"\],    \\"frequencia\\": \\"diaria\\",    \\"tempo\_ideal\\": 20,    \\"tempo\_medio\\": 25,    \\"aderencia\\": 92,    \\"execucoes\_mes\\": 450,    \\"taxa\_sucesso\\": 78,    \\"etapas\\": \[      {        \\"ordem\\": 1,        \\"nome\\": \\"Receber Lead\\",        \\"tempo\_ideal\\": 2,        \\"obrigatoria\\": true,        \\"automatizada\\": false,        \\"checklist\\": \[\\"Verificar score\\", \\"Ler observações\\"\]      }    \],    \\"metricas\\": {      \\"kpis\\": \[\\"tempo\_execucao\\", \\"taxa\_sucesso\\", \\"aderencia\\"\],      \\"alertas\\": \[\\"tempo\_excedido\\", \\"baixa\_aderencia\\"\],      \\"benchmarks\\": {\\"tempo\\": 20, \\"aderencia\\": 90}    }  }}

## 

## **7\. CONVERSAS (VERSÃO TÁTICA)**

### **7.1 Objetivo**

Análise de conversas individuais para coaching, controle de qualidade e desenvolvimento da equipe através de insights detalhados das interações.

### **7.2 Estrutura da Página**

#### ***7.2.1 Dashboard de Conversas (Visão Tática)***

**Cards de Métricas:**

* **Total de Conversas:** Número absoluto \+ % vs. período anterior

* **Nota Média das Conversas:** Score geral da equipe \+ tendência individual

* **Taxa de Conversão:** % de conversas que avançaram o negócio

* **Tempo Médio de Conversa:** Duração média \+ comparação com benchmark

* **Aderência aos Playbooks:** % médio de seguimento dos scripts/processos

* **Sentiment Score:** Análise de sentimento médio (cliente \+ vendedor)

#### ***7.2.2 Lista Principal de Conversas***

**Tabela com Filtros Avançados:**

| Data/Hora | Responsável | Cliente/Empresa | Tipo | Duração | Nota IA | Aderência Playbook | Resultado | Coaching | Ações |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| 15/12 14:30 | João Silva | Empresa ABC | Demo | 45min | 8.5 🟢 | 85% ✅ | Proposta Agendada | ⭐ Benchmark | \[Ver\]\[Comentar\] |
| 15/12 10:15 | Maria Santos | Tech Corp | Discovery | 30min | 6.2 🟡 | 72% 🟡 | Follow-up em 1 sem | 📚 Treinar | \[Ver\]\[Coaching\] |

### **7.3 Especificações Técnicas**

#### ***7.3.1 Estrutura de Dados de Conversa (Versão Tática)***

{  \\"conversa\_tatica\\": {    \\"id\\": \\"conv\_001\\",    \\"responsavel\\": \\"user\_joao\\",    \\"cliente\\": \\"Empresa ABC\\",    \\"tipo\\": \\"demo\\",    \\"data\\": \\"2024-12-15T14:30:00Z\\",    \\"duracao\_segundos\\": 2700,    \\"nota\_ia\\": 8.5,    \\"breakdown\_nota\\": {      \\"tecnica\\": 9.0,      \\"processo\\": 8.0,      \\"resultado\\": 8.5,      \\"relacionamento\\": 8.0    },    \\"aderencia\_playbook\\": {      \\"playbook\_id\\": \\"pb\_demo\_enterprise\\",      \\"score\\": 85,      \\"etapas\_executadas\\": \[\\"abertura\\", \\"discovery\\", \\"demo\\"\],      \\"etapas\_perdidas\\": \[\\"fechamento\_assertivo\\"\],      \\"desvios\\": \[\\"tempo\_excedido\\", \\"stakeholder\_missing\\"\]    },    \\"analise\_coaching\\": {      \\"pontos\_fortes\\": \[\\"rapport\\", \\"conhecimento\_tecnico\\"\],      \\"areas\_melhoria\\": \[\\"fechamento\\", \\"gestao\_tempo\\"\],      \\"acoes\_sugeridas\\": \[\\"roleplay\_fechamento\\", \\"shadowing\_joao\\"\],      \\"prioridade\\": \\"media\\"    },    \\"transcricao\\": \\"texto completo...\\",    \\"momentos\_coaching\\": \[      {        \\"timestamp\\": 2520,        \\"tipo\\": \\"oportunidade\_perdida\\",        \\"descricao\\": \\"Não explorou dor de integração mencionada\\",        \\"acao\_coaching\\": \\"Treinar discovery mais profundo\\"      }    \]  }}

## 

## **8\. PLAYBOOKS (VERSÃO TÁTICA)**

### **8.1 Objetivo**

Gestão operacional dos playbooks, criação, edição, treinamento da equipe e monitoramento da execução prática dos playbooks no dia a dia.

### **8.2 Estrutura da Página**

#### ***8.2.1 Dashboard de Playbooks (Visão Tática)***

**Cards Operacionais:**

* **Playbooks da Área:** Total ativos \+ distribuição por processo

* **Taxa de Uso da Equipe:** % médio de aderência aos playbooks

* **Performance Média:** Score médio de execução dos playbooks

* **Playbooks Críticos:** Quantos precisam de atenção/atualização

* **Treinamento Pendente:** Membros que precisam de capacitação

* **Impacto na Performance:** Melhoria atribuível aos playbooks

#### ***8.2.2 Biblioteca de Playbooks da Área***

**Visualização por Processo (Cards Organizados):**

**PROSPECÇÃO E OUTBOUND:**

📞 COLD CALLING B2BUso Equipe: 92% ✅ | Performance: 8.2/10 | Atualizado: 3 diasExecuções: 145 este mês | Tempo médio: 12min | Conversão: 18%Responsável: João Silva | Última revisão: Maria (Líder)\[Usar\] \[Editar\] \[Treinar\] \[Analisar\]📧 SEQUÊNCIA EMAIL OUTBOUND  Uso Equipe: 88% ✅ | Performance: 7.8/10 | Atualizado: 1 semanaExecuções: 89 este mês | Tempo médio: 8min | Conversão: 12%Responsável: Pedro Costa | Última revisão: Maria (Líder)\[Usar\] \[Editar\] \[Treinar\] \[Analisar\]

### **8.3 Especificações Técnicas**

#### ***8.3.1 Estrutura de Dados de Playbook (Versão Tática)***

{  \\"playbook\_tatico\\": {    \\"id\\": \\"pb\_discovery\_001\\",    \\"nome\\": \\"Discovery Call Estruturado\\",    \\"categoria\\": \\"discovery\\",    \\"area\_responsavel\\": \\"pre\_vendas\\",    \\"criado\_por\\": \\"user\_maria\_leader\\",    \\"versao\\": \\"2.3\\",    \\"status\\": \\"ativo\\",    \\"nivel\\": \\"intermediario\\",    \\"duracao\_estimada\\": 35,    \\"objetivo\\": \\"Qualificar oportunidades através de discovery estruturado\\",    \\"cenario\_uso\\": \\"Primeira call comercial com lead qualificado\\",    \\"pre\_requisitos\\": \[      \\"Research da empresa (15min)\\",      \\"Verificação LinkedIn do contato\\",      \\"Agenda confirmada 24h antes\\"    \],    \\"estrutura\\": {      \\"etapas\\": \[        {          \\"ordem\\": 1,          \\"nome\\": \\"Abertura e Rapport\\",          \\"duracao\_min\\": 3,          \\"duracao\_max\\": 5,          \\"obrigatoria\\": true,          \\"objetivo\\": \\"Criar conexão e confirmar agenda\\",          \\"script\\": \\"Oi \[Nome\], tudo bem? Obrigado por separar...\\",          \\"dicas\\": \[\\"Sorrir\\", \\"Tom amigável\\", \\"Confirmar tempo\\"\],          \\"criterios\_sucesso\\": \[\\"Cliente relaxado\\", \\"Agenda confirmada\\"\]        }      \]    },    \\"metricas\\": {      \\"uso\_equipe\\": 94,      \\"performance\_media\\": 8.5,      \\"conversao\_meta\\": 75,      \\"conversao\_atual\\": 78,      \\"tempo\_medio\\": 35,      \\"execucoes\_mes\\": 89    },    \\"treinamento\\": {      \\"certificacao\_obrigatoria\\": true,      \\"modulos\\": \[\\"fundamentos\\", \\"pratica\\", \\"certificacao\\"\],      \\"validade\_meses\\": 6,      \\"membros\_certificados\\": \[\\"user\_joao\\", \\"user\_ana\\"\],      \\"membros\_pendentes\\": \[\\"user\_pedro\\"\]    }  }}

## 

## **9\. CHAT IA (VERSÃO TÁTICA)**

### **9.1 Objetivo**

Permitir que líderes façam perguntas específicas sobre gestão de equipe, performance operacional e coaching, com foco em ações táticas e desenvolvimento da equipe.

### **9.2 Layout da Página**

#### ***9.2.1 Interface Principal***

**Área de Conversa:** Histórico de mensagens scrollable com contexto tático**Sidebar Direita:** Filtros ativos, dados em contexto, histórico por tema, ações rápidas

### **9.3 Sugestões de Perguntas Táticas**

#### ***9.3.1 Categorias Específicas para Líderes***

**Gestão de Equipe:**

* "Quem da minha equipe está abaixo da meta este mês?"

* "Compare a performance individual dos últimos 3 meses"

* "Identifique oportunidades de redistribuição de leads"

**Coaching e Desenvolvimento:**

* "Quais habilidades minha equipe mais precisa desenvolver?"

* "Sugira planos de coaching individualizados"

* "Identifique oportunidades de mentoria cruzada"

**Processos e Pipeline:**

* "Analise a execução dos processos esta semana"

* "Quais deals da minha equipe estão em risco?"

* "Sugira otimizações baseadas nos dados"

### **9.4 Especificações Técnicas**

#### ***9.4.1 Estrutura de Dados para Chat Tático***

{  \\"chat\_tatico\\": {    \\"usuario\_id\\": \\"leader\_maria\\",    \\"equipe\_ids\\": \[\\"user\_joao\\", \\"user\_pedro\\", \\"user\_ana\\"\],    \\"contexto\\": {      \\"area\\": \\"vendas\_smb\\",      \\"periodo\_analise\\": \\"ultimo\_mes\\",      \\"metricas\_foco\\": \[\\"conversao\\", \\"atividades\\", \\"pipeline\\"\],      \\"alertas\_ativos\\": \[\\"performance\_baixa\\", \\"processo\_desvio\\"\]    },    \\"capacidades\\": {      \\"analise\_individual\\": true,      \\"comparacao\_equipe\\": true,      \\"coaching\_suggestions\\": true,      \\"forecast\_tatico\\": true,      \\"otimizacao\_processos\\": true,      \\"roi\_treinamento\\": true    },    \\"integracao\\": {      \\"crm\\": \[\\"pipeline\\", \\"atividades\\", \\"resultados\\"\],      \\"conversas\\": \[\\"qualidade\\", \\"aderencia\\", \\"coaching\\"\],      \\"playbooks\\": \[\\"uso\\", \\"performance\\", \\"gaps\\"\],      \\"treinamento\\": \[\\"progresso\\", \\"roi\\", \\"necessidades\\"\]    }  }}

## 

## **10\. ESPECIFICAÇÕES TÉCNICAS GERAIS**

### **10.1 Arquitetura do Sistema**

#### ***10.1.1 Fron***