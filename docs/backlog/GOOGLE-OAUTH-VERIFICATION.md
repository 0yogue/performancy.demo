# Guia: Verificação do Google OAuth App

## Status Atual
- **App Name**: Performancy
- **Client ID**: 393268247076-v3qeg780d1e7oi3a3miq1m21hoir17mk.apps.googleusercontent.com
- **Status**: Em modo de teste (máximo 100 usuários de teste)

---

## 1. Pré-requisitos para Verificação

### 1.1 Domínio Verificado
Antes de submeter, você precisa verificar a propriedade do domínio `performancy.com.br`:

1. Acesse: https://search.google.com/search-console
2. Clique em **"Adicionar propriedade"**
3. Selecione **"Domínio"** e digite: `performancy.com.br`
4. Copie o registro TXT fornecido
5. No painel DNS do seu domínio (DigitalOcean, Cloudflare, etc), adicione:
   ```
   Tipo: TXT
   Nome: @
   Valor: google-site-verification=XXXXX (código fornecido)
   ```
6. Aguarde propagação (até 48h) e clique em **"Verificar"**

### 1.2 Política de Privacidade
Crie uma página pública com sua política de privacidade:
- URL sugerida: `https://performancy.com.br/privacy`
- Deve explicar quais dados são coletados e como são usados
- Mencionar especificamente os dados do Google (Calendar, Gmail, etc)

### 1.3 Termos de Uso (Recomendado)
- URL sugerida: `https://performancy.com.br/terms`
- Termos de uso do serviço

---

## 2. Configurar OAuth Consent Screen

### 2.1 Acessar Console
1. Acesse: https://console.cloud.google.com/apis/credentials/consent
2. Selecione o projeto **"Performancy - google"**

### 2.2 Preencher Informações do App

| Campo | Valor |
|-------|-------|
| **App name** | Performancy |
| **User support email** | suporte@performancy.com.br |
| **App logo** | Logo da empresa (120x120px, PNG/JPG) |
| **Application home page** | https://performancy.com.br |
| **Application privacy policy link** | https://performancy.com.br/privacy |
| **Application terms of service link** | https://performancy.com.br/terms |
| **Authorized domains** | performancy.com.br |
| **Developer contact information** | yogue@fluxos.co |

### 2.3 Escopos Solicitados
Os seguintes escopos estão configurados:

| Escopo | Justificativa |
|--------|---------------|
| `calendar.readonly` | Ler eventos do calendário para exibir na plataforma |
| `calendar.events` | Criar/editar eventos de reuniões de vendas |
| `gmail.readonly` | Analisar comunicações com clientes |
| `gmail.send` | Enviar emails pela plataforma |
| `drive.file` | Salvar documentos gerados |
| `documents` | Criar/editar documentos de propostas |
| `meetings.space.created` | Criar reuniões Google Meet |
| `meetings.space.readonly` | Ler informações de reuniões |
| `userinfo.email` | Identificar o usuário |
| `userinfo.profile` | Nome e foto do perfil |

---

## 3. Submeter para Verificação

### 3.1 Publicar o App
1. No OAuth consent screen, clique em **"Publish App"**
2. Confirme que deseja sair do modo de teste

### 3.2 Iniciar Processo de Verificação
1. Clique em **"Prepare for verification"**
2. Preencha o formulário:

#### Seção: App Information
- Confirme todas as informações do app

#### Seção: Scopes Justification
Para cada escopo, explique **por que** é necessário:

**calendar.readonly + calendar.events:**
```
Performancy é uma plataforma de Revenue Operations (RevOps) que sincroniza eventos de calendário 
dos vendedores para análise de produtividade. Os eventos são exibidos em um calendário integrado 
e a plataforma permite criar reuniões de vendas diretamente, que aparecem tanto na plataforma 
quanto no Google Calendar do usuário.
```

**gmail.readonly + gmail.send:**
```
A plataforma analisa comunicações comerciais para insights de vendas. Os emails são processados 
para identificar oportunidades, follow-ups pendentes e métricas de engajamento com clientes. 
O envio de emails permite que vendedores respondam diretamente pela plataforma.
```

**drive.file + documents:**
```
Performancy gera documentos de propostas comerciais e relatórios. Esses documentos são salvos 
no Google Drive do usuário e podem ser compartilhados com clientes diretamente.
```

**meetings.space.created + meetings.space.readonly:**
```
A plataforma cria links de Google Meet automaticamente ao agendar reuniões de vendas, 
facilitando o workflow dos vendedores sem precisar sair da ferramenta.
```

#### Seção: Demo Video (Opcional mas Recomendado)
Grave um vídeo de 3-5 minutos mostrando:
1. Tela de login/conexão com Google
2. Como os dados do Google são usados
3. Onde os dados aparecem na plataforma
4. Benefício para o usuário

Upload em: YouTube (não listado) ou Google Drive

#### Seção: Additional Information
```
Performancy é uma plataforma B2B de Revenue Operations para empresas de vendas. 
Nossos usuários são profissionais de vendas que conectam suas contas Google para 
ter uma visão unificada de suas atividades comerciais. Os dados são criptografados 
em repouso e em trânsito, seguindo práticas de segurança da indústria.
```

### 3.3 Submeter
1. Revise todas as informações
2. Clique em **"Submit for verification"**

---

## 4. Processo de Revisão

### 4.1 Timeline
- **Revisão inicial**: 1-2 semanas
- **Revisão completa**: 2-4 semanas
- **Se pedirem alterações**: +1-2 semanas cada ciclo

### 4.2 Possíveis Solicitações do Google
O Google pode pedir:
- Demonstração ao vivo do app
- Auditoria de segurança (para escopos sensíveis)
- Documentação adicional
- Alterações na política de privacidade

### 4.3 Comunicação
- Todas as comunicações serão enviadas para o email de contato do desenvolvedor
- Responda rapidamente para não atrasar o processo

---

## 5. Enquanto Aguarda Verificação

### 5.1 Modo de Teste
O app pode ser usado por até **100 usuários de teste**:
1. Acesse: OAuth consent screen > **Audience**
2. Em **"Test users"**, clique em **"+ Add users"**
3. Adicione os emails dos usuários de teste

### 5.2 Limitações do Modo de Teste
- Máximo 100 usuários
- Usuários veem aviso de "app não verificado"
- Tokens expiram após 7 dias (usuário precisa reconectar)

---

## 6. Alternativa: App Interno

Se o Performancy for usado **apenas por empresas com Google Workspace**:

1. Configure o app como **"Internal"** em vez de "External"
2. Não precisa de verificação
3. Funciona apenas para usuários do mesmo domínio Workspace

**Quando usar**:
- Apps corporativos internos
- Clientes que têm Google Workspace
- Não precisa de usuários Gmail pessoais

---

## 7. Referências

- [Google OAuth Verification](https://support.google.com/cloud/answer/9110914)
- [OAuth Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)
- [Brand Verification](https://support.google.com/cloud/answer/13461498)

---

## Checklist Final

- [ ] Domínio verificado no Search Console
- [ ] Política de privacidade publicada
- [ ] Termos de uso publicados
- [ ] Logo da empresa configurado
- [ ] Informações do app completas
- [ ] Justificativas dos escopos escritas
- [ ] Vídeo de demonstração (opcional)
- [ ] App publicado (sair do modo teste)
- [ ] Verificação submetida
