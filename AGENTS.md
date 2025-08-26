📌 Tecnologias e Frameworks

Next.js — framework principal para o front-end e rotas.

React — biblioteca base para componentes.

@mui — biblioteca de UI (Material UI).

Zustand — gerenciamento de estado global.

Serverless (Vercel) — backend e rotas sem servidor.

Blob Storage (Vercel) — armazenamento de arquivos.

CryptoJS — criptografia e segurança.

GitHub — versionamento e colaboração.

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

Props utilizadas

Funções internas

Descrição do que a página faz

Resultado esperado

/hooks/* → gerenciamento de estado com Zustand (armazenamento e consumo de dados).

/pages/app/ → páginas do aplicativo (interface principal).

/pages/api/webhook/ → ponto de entrada público para requisições externas, redirecionando para /api/*.

/public/ → arquivos estáticos (favicon, imagens, vídeos, etc).

/theme/ → constantes de layout, estilos globais e definição de temas.

/utils/ → funções auxiliares (tratamento de dados, helpers, etc).

Estrutura da API

/api/V*/routes/ → todas as rotas possíveis da versão.

/api/V*/webhook/ → tratamento de requisições recebidas em /pages/api/webhook.

/api/V*/db.js → conexão com o banco de dados (pool).

/api/V*/utils.js → funções internas:

Criptografia e descriptografia

Tratamento e formatação de dados

Funções auxiliares da API

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
  ├── app
  └── api
      └── webhook

/api
  └── V1
      ├── routes
      ├── webhook
      ├── db.js
      └── utils.js

/public
/theme
/utils

✅ Boas Práticas

Documentar cada página em /docs para facilitar onboardings.

Manter versionamento de rotas da API em /api/V*.

Centralizar estado global em Zustand via /hooks.

Utilizar utils apenas para funções puras e reutilizáveis.

Separar claramente a entrypoint pública (/pages/api/webhook) do processamento real (/api/V*/webhook).

