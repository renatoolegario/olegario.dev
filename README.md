# UaiStack.com.br

# 🧠 UaiStack — Ecossistema Mineiro de Soluções Digitais

UaiStack é uma plataforma modular e escalável composta por diversos subprodutos que se comunicam entre si. Cada módulo resolve uma dor digital específica — todos conectados sob uma estrutura robusta, otimizada e mineira. 🇧🇷

---

## 📦 Módulos do Sistema

Cada módulo opera sob um subdomínio dedicado, com roteamento inteligente via `middleware.js`.

| Subdomínio                  | Módulo           | Descrição |
|----------------------------|------------------|-----------|
| `uaistack.com.br`          | Core             | Landing page, login, cadastro |
| `academy.uaistack.com.br`  | UaiAcademy       | Plataforma de cursos e estratégias |
| `zap.uaistack.com.br`      | UaiZap           | Envio de mensagens, automações e IA para WhatsApp |
| `delivery.uaistack.com.br` | UaiDelivery      | Catálogo com geração de artes e sistema de pedidos |
| `design.uaistack.com.br`   | UaiDesign        | Geração e gerenciamento de artes visuais |
| `bot.uaistack.com.br`      | UaiBot           | Chatbot inteligente integrado aos fluxos |
| `prompt.uaistack.com.br`   | UaiPrompt        | Geração de textos, ideias e conteúdos com IA |
| `flow.uaistack.com.br`     | UaiFlow (N8N)    | Orquestrador de APIs, automações e integrações |
| `market.uaistack.com.br`   | UaiMarket        | Marketplace de templates, artes e serviços |

---

## 🏗️ Estrutura de Diretórios do Frontend (Next.js)

```bash
/pages
  index.js             # Landing principal
  login.js
  cadastro.js
  /academy/index.js    # Submódulo UaiAcademy
  /zap/index.js        # Submódulo UaiZap
  /delivery/index.js   # Submódulo UaiDelivery
/middleware.js         # Middleware de roteamento por subdomínio
```

## 🧱 Infraestrutura

| Componente               | Stack / Localização                                   |
|--------------------------|--------------------------------------------------------|
| **Frontend**             | Vercel (Next.js)                                       |
| **APIs**                 | Vercel API Routes                                      |
| **Banco principal**      | Neon PostgreSQL (autenticação, produtos, etc.)         |
| **Banco auxiliar**       | PostgreSQL via Docker (dados não sensíveis)            |
| **N8N**                  | Docker em servidor dedicado (48GB RAM / 14 CPUs)       |
| **Gerenciamento de Domínio** | Cloudflare (DNS, SSL, proteção)                    |

---

## 🔁 Fluxo entre os Módulos

- Usuário acessa `uaistack.com.br`, faz login ou cadastro.
- Dependendo do produto, é redirecionado automaticamente para o submódulo correspondente.
- Todos os submódulos compartilham autenticação centralizada e se comunicam via API ou N8N.
- N8N atua como orquestrador para automações, webhooks e integrações externas.

---

## 🚀 Diferenciais Estratégicos

- Arquitetura modular e escalável
- Custo otimizado (Neon + Docker + Vercel)
- Subdomínios com roteamento automático
- Centralização de dados sensíveis com segurança
- Comunicação interna via N8N
- Fácil expansão para novos módulos e serviços


## ✅ Checklist de Execução UaiStack

### 🔹 DOMÍNIO & DNS (Cloudflare)
- [ ] Registrar domínios `uaistack.com` e `uaistack.com.br` (✅ já feito)
- [ ] Delegar DNS ao Cloudflare (✅ já feito)
- [ ] Criar subdomínios: `academy`, `zap`, `delivery`, `n8n`, etc.
- [ ] Configurar CNAMEs apontando para Vercel (`cname.vercel-dns.com`) ou IP direto para NGINX

---

### 🔹 FRONTEND (Vercel + Next.js)
- [ ] Criar projeto no Vercel e conectar repositório
- [ ] Estruturar `/pages` com:
  - [ ] `index.js`, `login.js`, `cadastro.js`
  - [ ] `/academy/index.js`
  - [ ] `/zap/index.js`
  - [ ] `/delivery/index.js`
- [ ] Criar `middleware.js` para roteamento por subdomínio
- [ ] Testar se `academy.uaistack.com.br` renderiza `/academy/index.js`, etc.
- [ ] Ativar domínios personalizados no painel da Vercel

---

### 🔹 BACKEND (APIs + Banco Neon)
- [ ] Criar rotas de API no `/api` do projeto Vercel (auth, produtos, clientes, etc)
- [ ] Conectar banco Neon via variável de ambiente
- [ ] Testar autenticação e persistência básica de dados

---

### 🔹 POSTGRESQL AUXILIAR (Docker)
- [ ] Criar `docker-compose.yml` com volume persistente
- [ ] Configurar porta segura e autenticação
- [ ] Conectar backend local (opcional) a esse banco
- [ ] Implementar rotina básica de backup

---

### 🔹 N8N (Automação)
- [ ] Criar `docker-compose.yml` para N8N
- [ ] Subir N8N em servidor dedicado (porta 5678)
- [ ] Configurar domínio `n8n.uaistack.com.br` com NGINX + SSL
- [ ] Ativar autenticação básica (`N8N_BASIC_AUTH_*`)
- [ ] Criar os primeiros fluxos (testes, webhooks, ping de status)

---

### 🔹 SEGURANÇA & PERFORMANCE
- [ ] Ativar SSL completo no Cloudflare
- [ ] Configurar firewall no servidor (liberar apenas portas 22, 80 e 443)
- [ ] Deixar subdomínios protegidos (proxy laranja ligado no Cloudflare)
- [ ] Configurar backup automatizado do volume N8N e PostgreSQL auxiliar

---

### 🔹 DOCUMENTAÇÃO & ORGANIZAÇÃO
- [ ] Adicionar estrutura no `README.md` (✅ já gerado)
- [ ] Criar pasta `/docs` no repositório para detalhes técnicos internos
- [ ] Registrar tokens e variáveis sensíveis fora do repositório (em `.env` e/ou Vercel env vars)

---

### 🔹 PRÓXIMOS MÓDULOS (Expansão)
- [ ] Iniciar desenvolvimento do UaiAcademy (frontend + fluxo)
- [ ] Iniciar integração do UaiZap (dashboard + API + N8N)
- [ ] Estruturar painel visual do UaiDelivery
- [ ] Conectar frontend com dados reais via API interna

---

> _Dica: Use esse checklist como **README interno** ou como board no Notion/Trello para acompanhar a execução._




