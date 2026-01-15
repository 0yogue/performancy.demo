# Documentação Técnica \- Sistema de Revenue Operations

### **Menu para Perfil Estratégico (C-levels e Diretores)**

**Versão:** 1.0

**Data:** Dezembro 2024

**Objetivo:** Documentação completa das funcionalidades e especificações técnicas para desenvolvimento do sistema

## **Índice**

1\. Visão Geral do Sistema

2\. Dashboard Executivo

3\. Análise de Receita (RevOps)

4\. Estratégia e Metas

5\. Conversas (Versão Estratégica)

6\. Playbooks

7\. Chat IA

8\. Especificações Técnicas Gerais

9\. Integrações Necessárias

## 

## **1\. Visão Geral do Sistema**

### **1.1 Objetivo do Perfil Estratégico**

O menu estratégico é projetado para C-levels e Diretores que precisam de visão holística da operação de receita, tomada de decisões baseada em dados e identificação de oportunidades estratégicas.

### **1.2 Princípios de Design**

* **Navegação Contextual:** Menu adaptado ao perfil do usuário

* **Dashboard como Ponto de Partida:** Primeira página oferece visão mais crítica

* **Terminologia Clara:** Uso de termos familiares aos profissionais de receita

* **Agrupamento Lógico:** Funcionalidades relacionadas sob mesmo item de menu

### **1.3 Estrutura do Menu**

1\. Dashboard Executivo

2\. Análise de Receita (RevOps)

3\. Estratégia e Metas

4\. Conversas

5\. Playbooks

6\. Chat IA

## 

## **2\. Dashboard Executivo**

### **2.1 Objetivo**

Fornecer visão imediata e de alto nível sobre a saúde das operações de receita em tempo real.

### **2.2 Estrutura da Página**

#### ***2.2.1 Header/Controles de Filtro***

**Filtros Principais:**

* **Período:** Dropdown (Hoje, Esta Semana, Este Mês, Este Trimestre, Este Ano)

* **Comparação:** Toggle "Comparar com" \+ Dropdown (Período anterior, Mesmo período ano passado, Período customizado)

* **Segmentação:** Dropdowns dinâmicos baseados na configuração do cliente:

* Região/País (Ex: Brasil, Argentina, México)

* Produto/Linha (Ex: Enterprise, SMB, Freemium)

* Squad/Time (Ex: Squad A, Squad B, Inside Sales)

* Canal (Ex: Inbound, Outbound, Parceiros)

**Modo Comparação:** Quando ativo, todos os widgets mostram duas colunas/barras

#### ***2.2.2 KPIs Principais com Metas***

**Cards Expandidos (6 cards principais):**

* **Receita Total:** Valor realizado vs. Meta \+ % atingimento \+ variação vs. comparação

* **Revenue Growth:** % crescimento vs. período comparado \+ impacto na meta anual

* **ARR/MRR:** Valor atual vs. Meta \+ projeção para fim do ano

* **Customer Retention:** % retenção \+ impacto no LTV \+ comparação

* **Pipeline Total:** Valor \+ % probabilidade \+ cobertura da meta

* **CAC vs LTV:** Ratio atual \+ tendência \+ impacto na margem

#### ***2.2.3 Alertas Críticos Baseados em Impacto na Meta***

**Sistema de Priorização:**

* 🔴 **Crítico:** Impacto \>15% na meta anual

* 🟡 **Atenção:** Impacto 5-15% na meta anual

* 🟢 **Monitorar:** Impacto \<5% na meta anual

**Exemplos de Alertas:**

* "CAC aumentou 25% \- Risco de 18% na meta de margem anual"

* "Retention caiu para 85% \- Impacto de R$2.3M na receita recorrente"

* "Conversão MQL→SQL em 12% \- 22% abaixo da meta, risco na pipeline"

#### ***2.2.4 Funil de Receita com Comparação***

**Funil Visual Duplo:** Quando comparação ativa, mostra dois funis lado a lado**Métricas por Etapa:**

* Números absolutos \+ % conversão \+ variação vs. comparação

* **Código de Cores:** Verde (acima da meta), Amarelo (próximo), Vermelho (abaixo)

* **Velocidade vs. Meta:** Tempo médio por etapa vs. tempo ideal

#### ***2.2.5 Performance por Área***

**Quadrantes (Marketing, Pré-vendas, Vendas, CS):**

* **Métrica Principal \+ % da Meta Atingida**

* **Tendência** (↗️ ↘️ ➡️)

* **Impacto Calculado:** "Se manter esse ritmo, impacto de \+/-X% na meta anual"

#### ***2.2.6 Projeções e Cenários***

* **Projeção Atual:** Onde chegará no fim do ano com base no ritmo atual

* **Cenários:** Melhor caso, Caso base, Pior caso

* **Gap para Meta:** Quanto precisa acelerar para atingir as metas

### **2.3 Funcionalidades Técnicas**

* **Drill-down:** Clicar em qualquer métrica leva para análise detalhada

* **Filtros Dinâmicos:** Por período, time, região

* **Exportação:** PDF para apresentações

* **Personalização:** Reorganizar widgets

* **Atualização em Tempo Real:** Dados atualizados automaticamente

## 

## **3\. Análise de Receita (RevOps)**

### **3.1 Objetivo**

Permitir análise profunda das métricas de cada área de receita e do funil de vendas para gerar insights acionáveis.

### **3.2 Estrutura da Página**

#### ***3.2.1 Controles Globais***

* **Filtros:** Mesmos do Dashboard (Período, Comparação, Segmentação)

* **Exportação:** PDF/Excel com dados da aba ativa

* **Agendamento:** Envio automático por email

* **Modo Visualização:** Toggle entre números absolutos e percentuais

#### ***3.2.2 Aba 1: Funil End-to-End***

**Funil Visual Interativo:**

1\. Visitantes → 2\. Leads → 3\. MQLs → 4\. SQLs → 5\. Oportunidades → 6\. Clientes → 7\. Clientes Ativos

**Para cada etapa:**

* **Volume:** Número absoluto \+ % do total inicial

* **Taxa de Conversão:** % para próxima etapa \+ comparação

* **Tempo Médio:** Dias para avançar

* **Custo Acumulado:** Investimento até essa etapa

* **Indicador Visual:** Verde/Amarelo/Vermelho baseado na meta

**Análise de Gargalos:**Tabela identificando onde estão as maiores perdas:

* Etapa com maior gap vs. meta

* Impacto na receita de cada gargalo

* Ações sugeridas pela IA

**Análise de Coorte:**

* Tabela por mês de entrada dos leads

* % de leads que ainda estão ativos por período

* Identificação de padrões sazonais

#### ***3.2.3 Aba 2: Modelagem e Previsão***

**Forecasting Automático:**

* Gráfico com histórico \+ projeção baseada em pipeline

* Banda de confiança com margem de erro

* Tabela mensal com intervalos de confiança

**Simulador de Cenários:**

* Controles deslizantes para ajustar variáveis

* Resultado em tempo real

* Cenários pré-configurados (Otimista, Pessimista, etc.)

**Análise de Sazonalidade:**

* Padrões históricos por mês

* Ajustes automáticos de metas

* Recomendações de alocação de budget

**Análise de Sensibilidade:**

* Matriz mostrando impacto de melhorias em cada métrica

* Heatmap de priorização

* Ranking de ações com melhor ROI

#### ***3.2.4 Aba 3: Análise por Área***

**Sub-Aba Marketing:**

* Geração de leads por canal

* Custo por lead e qualidade

* Performance de campanhas

* Análise de atribuição

**Sub-Aba Pré-Vendas:**

* Taxa de qualificação MQL→SQL

* Performance por SDR

* Análise de horários de maior conversão

* Scripts com melhor performance

**Sub-Aba Vendas:**

* Pipeline por estágio

* Ciclo de vendas por segmento

* Motivos de perda categorizados

* Forecast accuracy

**Sub-Aba Customer Success:**

* Análise de churn por segmento

* Revenue expansion

* Health score distribution

* Métricas de suporte

#### ***3.2.5 Aba 4: Análise de Eficiência***

**CAC Detalhado:**

* CAC por canal e segmento

* Composição do CAC (Marketing, Vendas, Ferramentas)

* Tendência temporal

* Benchmark vs. metas

**LTV Analysis:**

* LTV por segmento e coorte

* Componentes (Receita inicial \+ Expansão \- Churn)

* Ratio LTV:CAC com target

**ROI de Investimentos:**

* Tabela com ROI por investimento

* Análise de sensibilidade

* Payback period por canal

### **3.3 Especificações Técnicas**

* **APIs:** Conectar com CRM, Marketing Automation, Analytics

* **ETL:** Processo para limpar e normalizar dados

* **Cache:** Sistema para consultas complexas

* **Performance:** Lazy loading, paginação, filtros otimizados

## 

## **4\. Estratégia e Metas**

### **4.1 Objetivo**

Definir, acompanhar e ajustar objetivos estratégicos conectando visão de longo prazo com execução operacional.

### **4.2 Estrutura da Página**

#### ***4.2.1 Controles Globais***

* **Filtros:** Ciclo (Trimestre/Ano), Área, Nível (Empresa/Área/Time/Individual)

* **Ações:** Nova Meta, Importar Metas, Exportar Relatório, Configurar Ciclo

#### ***4.2.2 Visão Geral Estratégica***

**Dashboard de OKRs Corporativos:**Cards com 3-5 objetivos principais mostrando:

* Título do objetivo

* Progresso geral (barra \+ %)

* Status visual (🟢🟡🔴)

* Meta vs. atual

* Prazo \+ dias restantes

**Indicadores de Saúde:**

* Scorecard geral (% metas no prazo vs. atrasadas)

* Tendência de aceleração/desaceleração

* Forecast de atingimento

#### ***4.2.3 Hierarquia de Metas***

**Visualização em Árvore:**Estrutura hierárquica expandível:

* 🏢 EMPRESA: Objetivo principal

* 📈 ÁREA: Objetivos por departamento

* 👤 TIME: Objetivos por equipe

* 👤 INDIVIDUAL: Metas pessoais

**Funcionalidades:**

* Clique para expandir/colapsar

* Código de cores por status

* Hover com detalhes

* Drag & drop para realocação

#### ***4.2.4 Gestão de OKRs***

**Aba Objetivos Ativos:**Tabela com todos objetivos mostrando:

* Objetivo, Responsável, Área, Progresso, Status, Prazo, Ações

**Aba Key Results:**Detalhamento de cada KR:

* Descrição, Métrica, Baseline, Meta, Atual

* Fonte de dados, Frequência de update

* Histórico de evolução

**Aba Iniciativas:**Projetos específicos para atingir objetivos:

* Lista de iniciativas por objetivo

* Responsável e status

* Impacto esperado

#### ***4.2.5 Acompanhamento e Análise***

**Check-ins:**

* Sistema de acompanhamento configurável

* Template: Progresso, Conquistas, Obstáculos, Próximos Passos

* Histórico e comentários

**Análise de Performance:**

* Burn-up charts

* Velocity de progresso

* Forecast de atingimento

* Alertas automáticos

#### ***4.2.6 Planejamento de Ciclos***

**Configuração de Novos Ciclos:**

* Wizard de criação

* Templates por tipo de objetivo

* Atribuição de responsáveis

* Configuração de cadência

#### ***4.2.7 Análise de Recursos***

**Alocação de Budget:**

* Budget por objetivo

* ROI projetado

* Simulador de cenários

**Recursos Humanos:**

* Pessoas alocadas por objetivo

* Análise de capacidade vs. demanda

* Sugestões de contratação

### **4.3 Funcionalidades Avançadas**

* **IA:** Sugestões de metas, iniciativas, alertas preditivos

* **Integração:** Conexão automática com outras páginas

* **Notificações:** Sistema de alertas e lembretes

## 

## **5\. Conversas (Versão Estratégica)**

### **5.1 Objetivo**

Visão executiva das conversas para identificar oportunidades de apoio aos deals estratégicos através de contatos e influência C-level.

### **5.2 Estrutura da Página**

#### ***5.2.1 Controles Globais***

* **Filtros:** Período, Valor do Deal, Probabilidade, Área/Time, Status

* **Busca:** Por empresa, responsável ou palavra-chave

#### ***5.2.2 Dashboard de Conversas***

**Cards de Métricas:**

* Total de conversas ativas \+ valor total

* Pipeline qualificado (\>40% probabilidade)

* Deals estratégicos (\>R$200k)

* Taxa de conversão executiva

* Valor médio por deal

* Tempo médio de ciclo

**Gráficos Estratégicos:**

* Pipeline por tamanho de deal

* Distribuição por probabilidade

* Evolução do pipeline

* Performance por responsável

#### ***5.2.3 Lista de Oportunidades Estratégicas***

**Tabela Focada em Apoio Executivo:**Colunas principais:

* **Empresa:** Nome \+ setor \+ tamanho

* **Valor Contrato:** Valor anual \+ tipo \+ potencial expansão

* **Probabilidade:** % \+ código de cores

* **Responsável:** Vendedor responsável

* **Contatos Abordados:** Cargos contatados \+ nível hierárquico

* **Status Atual:** Etapa \+ última interação

* **Apoio Necessário:** Botões de ação para C-levels

**Botões de Ação:**

* 🤝 "Conectar Contato" \- Fazer introdução

* 📞 "Call Executiva" \- Agendar conversa C-level

* ✅ "Validar Proposta" \- Revisar termos

* 🏆 "Apresentar Case" \- Compartilhar referência

* 💼 "Reunião Estratégica" \- Discussão de parceria

#### ***5.2.4 Ações Estratégicas Sugeridas***

**Cards de Alerta:**

* Deal estratégico em risco

* Oportunidade de aceleração

* Potencial de upsell

**Sugestões de Networking:**

* Deals que se beneficiariam de introduções

* Eventos com prospects

* Clientes que podem referenciar

### **5.3 Funcionalidades Executivas**

* **Dashboard de Apoio:** Métricas de impacto C-level

* **Notificações Inteligentes:** Alertas personalizados

* **Integração com Agenda:** Agendamento e preparação automática

## 

## **6\. Playbooks**

### **6.1 Objetivo**

Visão estratégica sobre todos os playbooks da empresa, análise de efetividade, identificação de gaps e otimização de processos.

### **6.2 Estrutura da Página**

#### ***6.2.1 Controles Globais***

* **Filtros:** Área, Status, Performance, Tipo, Última Atualização

* **Busca:** Nome, palavra-chave ou tag

* **Visualização:** Cards ou Lista

#### ***6.2.2 Dashboard de Playbooks***

**Cards de Métricas:**

* Total de playbooks ativos

* Taxa de utilização média

* Performance geral

* ROI dos playbooks

* Playbooks críticos

* Cobertura de cenários

**Gráficos Estratégicos:**

* Performance por área

* Evolução da aderência

* Distribuição de qualidade

* Impacto na receita

#### ***6.2.3 Biblioteca de Playbooks***

**Visualização em Cards por Área:**Cada card mostra:

* Nome do playbook

* Performance score \+ código de cores

* Taxa de uso

* Impacto na receita

* Última atualização

* Badges especiais (High Impact, Best Practice, etc.)

**Áreas Cobertas:**

* **Marketing:** Geração de leads, campanhas

* **Pré-Vendas:** Qualificação, outbound

* **Vendas:** Demo, negociação

* **Customer Success:** Onboarding, upsell

#### ***6.2.4 Análise de Performance***

**Aba Ranking de Efetividade:**Tabela com performance, uso, impacto na receita e ROI

**Aba Gaps e Oportunidades:**

* Cenários não cobertos

* Sugestões de novos playbooks

* Benchmarking interno

**Aba Evolução e Tendências:**

* Performance ao longo do tempo

* Ciclo de vida dos playbooks

* Impacto cumulativo

#### ***6.2.5 Gestão Estratégica***

**Ferramentas de Criação:**

* Novo playbook do zero

* Gerar com IA

* Importar de arquivo

* Biblioteca externa

**Sistema de Aprovação:**Workflow: Criação → Revisão → Teste → Validação → Implementação → Monitoramento

#### ***6.2.6 Análise de ROI***

**Dashboard Financeiro:**

* Investimento total vs. retorno

* ROI por playbook

* Simulador de impacto

* Correlação com resultados

### **6.3 Página de Detalhe do Playbook**

* **Header:** Nome, performance, impacto, atualização

* **Aba Conteúdo:** Estrutura completa do playbook

* **Aba Analytics:** Métricas detalhadas de performance

* **Aba Histórico:** Timeline de mudanças e evolução

## 

## **7\. Chat IA**

### **7.1 Objetivo**

Permitir que C-levels "conversem" com os dados da plataforma, fazendo perguntas em linguagem natural para insights estratégicos.

### **7.2 Layout da Página**

#### ***7.2.1 Interface Principal***

* **Área de Conversa:** Histórico de mensagens scrollable

* **Input de Texto:** Campo para perguntas \+ botão enviar

* **Indicador de Status:** "IA digitando…" com animação

* **Botão de Voz:** Opção para perguntas por áudio

#### ***7.2.2 Sidebar Direita***

* **Filtros Ativos:** Período/segmentação aplicados

* **Fontes de Dados:** Sistemas sendo consultados

* **Histórico:** Sessões anteriores salvas

* **Ações Rápidas:** Exportar, compartilhar, agendar

### **7.3 Sugestões de Perguntas**

#### ***7.3.1 Categorias de Perguntas Pré-configuradas***

**Performance Geral:**

* "Qual foi nossa performance de receita no último trimestre vs. meta?"

* "Mostre a evolução do CAC nos últimos 6 meses por canal"

* "Quais KPIs estão mais distantes das metas este mês?"

**Análise de Funil:**

* "Onde estão os principais gargalos no nosso funil de vendas?"

* "Por que a conversão de MQL para SQL caiu este mês?"

* "Qual canal está gerando leads de melhor qualidade?"

**Performance de Equipe:**

* "Quem são os top 3 performers em vendas este mês?"

* "Qual time está mais distante da meta e por quê?"

* "Quais vendedores precisam de mais treinamento?"

**Análise Competitiva:**

* "Quantas vezes perdemos para o concorrente X este trimestre?"

* "Quais são as principais objeções que estamos enfrentando?"

* "Em quais tipos de deal temos maior taxa de sucesso?"

**Oportunidades Estratégicas:**

* "Quais deals acima de R$500k estão em negociação?"

* "Quais clientes têm potencial de upsell este trimestre?"

* "Identifique oportunidades de expansão na base atual"

**Análise Financeira:**

* "Qual é nosso LTV:CAC ratio atual por segmento?"

* "Projeção de receita para o próximo trimestre"

* "ROI de cada canal de marketing nos últimos 6 meses"

### **7.4 Capacidades de Resposta**

#### ***7.4.1 Tipos de Resposta***

**Respostas com Dados Numéricos:**Formato estruturado com:

* Valor principal

* Comparações (vs. período anterior, vs. meta)

* Breakdown por componentes

* Insights contextuais

**Respostas com Gráficos:**

* Gráficos interativos incorporados

* Explicação dos insights principais

* Projeções quando aplicável

**Análises Comparativas:**

* Tabelas comparativas estruturadas

* Identificação de winners/losers

* Recomendações baseadas nos dados

**Insights Preditivos:**

* Análise de probabilidades

* Cenários (conservador/realista/otimista)

* Identificação de riscos

* Ações sugeridas

#### ***7.4.2 Funcionalidades Avançadas***

**Drill-down Interativo:**

* Aprofundamento automático em respostas

* Botões para análises específicas

* Navegação contextual

**Análise Multi-dimensional:**

* Cruzamento de múltiplas variáveis

* Identificação de padrões

* Insights não óbvios

**Simulações e Cenários:**

* What-if analysis

* Projeções baseadas em mudanças

* Análise de ROI de decisões

### **7.5 Integração com Outras Páginas**

#### ***7.5.1 Links Contextuais***

* Navegação direta para páginas relevantes

* Ações diretas (agendar, exportar, alertar)

* Continuidade de análise

#### ***7.5.2 Histórico e Gestão***

* **Conversas Salvas:** Organizadas por data

* **Busca:** Encontrar conversas antigas

* **Templates:** Análises recorrentes automatizadas

* **Compartilhamento:** Enviar para outros executivos

### **7.6 Configurações e Personalização**

* **Filtros Padrão:** Período, segmentação, métricas

* **Estilo de Comunicação:** Tom, nível de detalhe

* **Alertas:** Configuração de notificações automáticas

## 

## **8\. Especificações Técnicas Gerais**

### **8.1 Arquitetura do Sistema**

#### ***8.1.1 Frontend***

* **Framework:** React.js ou Vue.js

* **UI Library:** Material-UI ou Ant Design

* **Charts:** Plotly.js ou D3.js para visualizações

* **Responsividade:** Layout adaptável desktop/tablet

#### ***8.1.2 Backend***

* **API:** RESTful ou GraphQL

* **Database:** PostgreSQL ou MongoDB

* **Cache:** Redis para consultas frequentes

* **Queue:** Para processamento assíncrono

#### ***8.1.3 Integrações***

* **CRM:** Salesforce, HubSpot, Pipedrive

* **Marketing:** Google Analytics, Facebook Ads, Google Ads

* **Comunicação:** Zoom, Google Meet, Microsoft Teams

* **Calendário:** Google Calendar, Outlook

### **8.2 Estrutura de Dados**

#### ***8.2.1 Entidades Principais***

{  \\"usuario\\": {    \\"id\\": \\"string\\",    \\"nome\\": \\"string\\",    \\"email\\": \\"string\\",    \\"perfil\\": \\"estrategico|tatico|operacional\\",    \\"permissoes\\": \[\\"dashboard\\", \\"analytics\\", \\"metas\\"\]  },  \\"empresa\\": {    \\"id\\": \\"string\\",    \\"nome\\": \\"string\\",    \\"configuracoes\\": {      \\"segmentacao\\": \[\\"regiao\\", \\"produto\\", \\"canal\\"\],      \\"metas\_anuais\\": {},      \\"integracao\\": {}    }  }}

### **8.3 Performance e Escalabilidade**

#### ***8.3.1 Otimizações***

* **Lazy Loading:** Carregar componentes sob demanda

* **Paginação:** Para grandes volumes de dados

* **Índices:** Otimização de consultas no banco

* **CDN:** Para assets estáticos

#### ***8.3.2 Monitoramento***

* **Logs:** Sistema de logging estruturado

* **Métricas:** Performance de APIs e queries

* **Alertas:** Notificações para problemas críticos

## 

## **9\. Integrações Necessárias**

### **9.1 Integrações de Dados**

#### ***9.1.1 CRM Systems***

* **Salesforce:** Oportunidades, contatos, atividades

* **HubSpot:** Pipeline, deals, comunicações

* **Pipedrive:** Vendas, forecasting

#### ***9.1.2 Marketing Automation***

* **Google Analytics:** Tráfego, conversões

* **Facebook/Google Ads:** Campanhas, custos

* **Mailchimp/Pardot:** Email marketing

#### ***9.1.3 Comunicação***

* **Zoom/Teams:** Gravações de reuniões

* **Telefonia:** Logs de chamadas

* **Email:** Histórico de comunicações

### **9.2 APIs Externas**

#### ***9.2.1 Processamento de IA***

* **OpenAI:** Para Chat IA e análises

* **Google Speech-to-Text:** Transcrição

* **Sentiment Analysis:** Análise de sentimento

#### ***9.2.2 Visualização***

* **Google Charts API:** Gráficos dinâmicos

* **Mapbox:** Visualizações geográficas

### **9.3 Segurança e Compliance**

#### ***9.3.1 Autenticação***

* **OAuth 2.0:** Integração com Google/Microsoft

* **JWT:** Tokens de sessão

* **MFA:** Autenticação multifator

#### ***9.3.2 Proteção de Dados***

* **LGPD/GDPR:** Compliance com regulamentações

* **Criptografia:** Dados em trânsito e repouso

* **Audit Logs:** Rastreamento de acessos

## 

## **10\. Cronograma de Desenvolvimento Sugerido**

### **10.1 Fase 1 \- Fundação (4 semanas)**

* Setup da arquitetura base

* Autenticação e autorização

* Dashboard Executivo básico

* Integrações principais (CRM)

### **10.2 Fase 2 \- Analytics (6 semanas)**

* Análise de Receita completa

* Sistema de métricas e KPIs

* Visualizações interativas

* Cache e otimizações

### **10.3 Fase 3 \- Gestão (4 semanas)**

* Estratégia e Metas

* Sistema de OKRs

* Workflow de aprovação

* Notificações

### **10.4 Fase 4 \- Inteligência (6 semanas)**

* Chat IA

* Processamento de linguagem natural

* Análises preditivas

* Sugestões automáticas

### **10.5 Fase 5 \- Refinamento (4 semanas)**

* Conversas e Playbooks

* Otimizações de performance

* Testes de integração

* Documentação final

## 

## **11\. Critérios de Aceite**

### **11.1 Funcionalidades Obrigatórias**

* \[ \] Dashboard executivo com todos os KPIs principais

* \[ \] Sistema completo de filtros e comparações

* \[ \] Análise de funil end-to-end

* \[ \] Gestão de OKRs e m