# 📦 Guia de Instalação - Performancy Coach Extension

**Versão:** 1.0.0  
**Plataforma:** Google Chrome / Chromium-based browsers

---

## 🎯 Para Clientes (Usuários Finais)

### Opção 1: Chrome Web Store (Recomendado - quando publicado)

1. Acesse a [Chrome Web Store](https://chrome.google.com/webstore)
2. Busque por "Performancy Coach"
3. Clique em **Adicionar ao Chrome**
4. Confirme a instalação

### Opção 2: Instalação Manual (Arquivo .crx)

> ⚠️ **Nota:** Esta opção requer que sua empresa forneça o arquivo da extensão.

1. **Receba o arquivo** `performancy-coach.crx` do seu administrador
2. Abra o Chrome e digite na barra de endereços: `chrome://extensions/`
3. Ative o **Modo de desenvolvedor** (canto superior direito)
4. Arraste o arquivo `.crx` para a página de extensões
5. Clique em **Adicionar extensão**

---

## 🔧 Para Administradores (Deploy em Escala)

### Opção A: Google Workspace (Empresas)

1. Acesse [Google Admin Console](https://admin.google.com)
2. Navegue até: **Dispositivos** → **Chrome** → **Apps e extensões**
3. Adicione a extensão por ID ou URL
4. Configure a política de instalação:
   - **Forçar instalação:** Instala automaticamente em todos os dispositivos
   - **Permitir instalação:** Usuários podem instalar manualmente

### Opção B: Política de Grupo (Windows)

1. Baixe o arquivo ADMX do Chrome
2. Configure a política `ExtensionInstallForcelist`
3. Adicione o ID da extensão

```
ExtensionInstallForcelist = [extension_id];https://seu-servidor.com/updates.xml
```

### Opção C: Deploy Self-Hosted

1. Hospede os arquivos da extensão em seu servidor
2. Configure HTTPS obrigatório
3. Crie um arquivo `updates.xml`:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<gupdate xmlns='http://www.google.com/update2/response' protocol='2.0'>
  <app appid='[EXTENSION_ID]'>
    <updatecheck codebase='https://seu-servidor.com/coach-extension.crx' version='1.0.0' />
  </app>
</gupdate>
```

---

## 🚀 Primeiro Uso

### 1. Clique no ícone da extensão
![Extension Icon](https://via.placeholder.com/40x40.png?text=P)

### 2. Faça login com suas credenciais
- Use o mesmo email/senha do Performancy
- O login é feito diretamente no popup

### 3. Inicie uma chamada de vídeo
A extensão funciona automaticamente em:
- ✅ Google Meet
- ✅ Zoom (navegador)
- ✅ Microsoft Teams (navegador)

### 4. Permita a gravação
Na primeira chamada, você verá um popup solicitando permissão para gravar.

---

## ❓ Perguntas Frequentes

### A extensão funciona no Firefox/Safari?
Não. Atualmente apenas navegadores baseados em Chromium são suportados (Chrome, Edge, Brave, Opera).

### Preciso estar logado no Performancy web também?
Não. A extensão tem seu próprio login independente.

### A gravação é armazenada onde?
Os dados são processados em tempo real e armazenados nos servidores seguros da Performancy, seguindo as normas LGPD.

### Posso desativar a extensão temporariamente?
Sim. Clique com o botão direito no ícone → Gerenciar extensão → Desativar.

---

## 🔐 Privacidade e Segurança

- ✅ Criptografia de ponta a ponta
- ✅ Dados armazenados no Brasil (AWS São Paulo)
- ✅ Conformidade LGPD
- ✅ Não grava sem consentimento explícito
- ✅ Não acessa outras abas ou dados do navegador

---

## 📞 Suporte

**Email:** suporte@performancy.com.br  
**Chat:** Disponível no painel do Performancy  
**Docs:** https://docs.performancy.com.br

---

## 📋 Requisitos Técnicos

| Requisito | Mínimo |
|-----------|--------|
| Chrome | v100+ |
| RAM | 4GB |
| Conexão | 5 Mbps |
| Microfone | Qualquer |

---

**Última atualização:** 29 de Novembro de 2025
