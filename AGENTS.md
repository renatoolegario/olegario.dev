📌 Tecnologias e Frameworks

Next.js — framework principal para o front-end e rotas.
React — biblioteca base para componentes.
@mui — biblioteca de UI (Material UI).
Zustand — gerenciamento de estado global.
Serverless (Vercel) — backend e rotas sem servidor.
Blob Storage (Vercel) — armazenamento de arquivos.
CryptoJS — criptografia e segurança.
GitHub — versionamento e colaboração.
Migrations (node-pg-migrate) — controle de versão e histórico de mudanças no banco.
Jest — testes automatizados de unidade e integração.
uuid - Para gerar hash uui4
🔎 Observação: não vamos utilizar TypeScript, todo o projeto será feito em JavaScript/JSX.

📂 Estrutura de Pastas
Configuração
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}

Diretórios principais

/components/atomic → componentes básicos reutilizáveis (botões, inputs, ícones).
/components/molecules → combinações simples de componentes (form fields, cards).
/components/organisms → blocos funcionais maiores (listas, tabelas, modais).
/components/template → layouts de página ou estruturas de tela.
/docs/*.md → documentação específica de cada página:
-Props utilizadas
-Funções internas
-Descrição do que a página faz
-Resultado esperado

/hooks/ → gerenciamento de estado com Zustand (armazenamento e consumo de dados).
/pages/app/ → páginas do aplicativo (interface principal).
/pages/api/webhook/ → ponto de entrada público para requisições externas, redirecionando para /api/*.
/api/v*/routes/* → todas as rotas possíveis da versão.
/api/v*/webhook/* → tratamento de requisições recebidas em /pages/api/webhook.
/api/v*/utils.js* → funções internas da API:
-Criptografia e descriptografia
-Tratamento e formatação de dados
-Funções auxiliares da API
/infra/database/migrations/ → arquivos de migrations para versionamento do banco (node-pg-migrate).
/infra/database/database.js
/infra/tests/ → testes automatizados com Jest.
/public/ → arquivos estáticos (favicon, imagens, vídeos, etc).
/theme/ → constantes de layout, estilos globais e definição de temas.
/utils/ → funções auxiliares (tratamento de dados, helpers, etc).

🌳 Exemplo de Estrutura
/components
  ├── atomic
  ├── molecules
  ├── organisms
  └── template

/docs
  └── Home.md

/hooks
  └── useUserStore.js

/pages
  ├── index.js
  ├── _app.js
  ├── app
  └── api
      └── webhook

/api
  └── V1
      ├── routes
      └── index.js <-- Orquestrador
      └── utils.js

/infra/database/
/infra/database/migrations/ <-- versionamento do bd
/infra/tests/ <-- Testes automatizados via JEST 
/public <-- Arquivos publicos e Favicons
/theme <-- arquivo CSS Glboal
/utils <--  Funções Gerais 

✅ Boas Práticas

Documentar cada página em /docs para facilitar onboardings.
Manter versionamento de rotas da API em /api/v*.
Centralizar estado global em Zustand via /hooks.
Utilizar utils apenas para funções puras e reutilizáveis.
Separar claramente a entrypoint pública (/pages/api/webhook) do processamento real (/api/v*/index).
Controlar evolução do banco com migrations (não alterar schema manualmente).
Criar testes automatizados com Jest, cobrindo unidades críticas e integrações de API.