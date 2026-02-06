import { useMemo } from "react";
import LandingPageTemplate from "components/template/LandingPageTemplate";

export default function HomePage() {
  const sections = useMemo(
    () => [
      {
        id: "quem-sou",
        emoji: "👨‍💻",
        title: "Quem sou eu",
        paragraphs: [
          "Sou arquiteto de software e fundador técnico com 12 anos de mercado, especializado em tirar MVPs do papel e colocá-los no mercado com o menor custo possível, sem abrir mão de arquitetura sólida e infraestrutura bem planejada.",
          "Atuo desde a ideia até a execução completa do sistema, incluindo arquitetura, backend, frontend, infraestrutura e automações.",
        ],
      },
      {
        id: "areas-atuacao",
        emoji: "🎯",
        title: "Áreas de Atuação",
        bullets: [
          "Desenvolvimento de sistemas web e plataformas SaaS",
          "Automação de processos e integrações",
          "Sistemas orientados a WhatsApp e funis inteligentes",
          "Integrações com IA e processamento de dados",
          "Arquitetura backend, APIs e infraestrutura",
          "Gestão técnica de tráfego pago (integração, tracking e automação)",
        ],
      },
      {
        id: "linguagens-plataformas",
        emoji: "🧠",
        title: "Linguagens & Plataformas",
        badges: ["PHP", "JavaScript", "Node.js", "React", "Next.js"],
      },
      {
        id: "frameworks-bibliotecas",
        emoji: "🧩",
        title: "Frameworks & Bibliotecas (Open Source)",
        groups: [
          {
            title: "Frontend",
            badges: ["MUI (Material UI)", "Zustand", "ESLint", "Prettier"],
          },
          {
            title: "Backend & Automação",
            badges: ["wa-js", "Baileys (WhatsApp Web API)", "ticketz", "node-pg-migrate", "Crypto", "Codex"],
          },
          {
            title: "Mapas & Geoprocessamento",
            badges: ["Mapbox", "Turf.js"],
          },
          {
            title: "Comunicação & Serviços",
            badges: ["Resend"],
          },
        ],
      },
      {
        id: "bancos-dados",
        emoji: "🗄️",
        title: "Bancos de Dados & Armazenamento",
        badges: ["PostgreSQL (Neon – serverless)", "MySQL", "Blob Storage"],
      },
      {
        id: "apis-integracoes",
        emoji: "🔗",
        title: "APIs & Integrações",
        bullets: [
          "REST APIs",
          "WhatsApp Oficial (Meta API)",
          "Checkouts e sistemas de pagamento",
          "Integração com IA (LLMs, embeddings, automações)",
        ],
      },
      {
        id: "infra-devops",
        emoji: "☁️",
        title: "Infraestrutura & DevOps",
        groups: [
          {
            title: "Cloud & Serverless",
            bullets: [
              "Vercel (deploy, backend serverless, cron jobs)",
              "Neon (PostgreSQL serverless)",
            ],
          },
          {
            title: "VPS & Orquestração",
            bullets: [
              "Contabo (VPS para WebSocket, automações e serviços persistentes)",
              "Docker",
            ],
          },
          {
            title: "Rede & Segurança",
            bullets: ["Cloudflare (CDN, DNS, proteção e cache)"],
          },
          {
            title: "Versionamento & Entrega",
            bullets: [
              "GitHub (versionamento e pipelines CI/CD)",
              "Migrations de banco de dados",
            ],
          },
        ],
      },
      {
        id: "inteligencia-artificial",
        emoji: "🤖",
        title: "Inteligência Artificial",
        bullets: [
          "Classificação e análise de mensagens",
          "Geração de respostas automáticas",
          "Embeddings e aprendizado de comportamento",
          "Automação de fluxos inteligentes",
        ],
      },
      {
        id: "projetos-arquiteturas",
        emoji: "🏗️",
        title: "Projetos & Arquiteturas Desenvolvidas",
        paragraphs: [
          "Em todos os projetos abaixo: arquitetura completa do sistema (planejamento, desenho e execução), infraestrutura cloud e deploy definidos e implementados por mim, uso de migrations, Atomic Design, Serverless Functions, integrações via REST API e Webhooks.",
        ],
        groups: [
          {
            title: "FalaUai",
            paragraphs: [
              "Extensão web que atua como ponte entre empresas e clientes, facilitando a comunicação via WhatsApp de forma automatizada.",
              "Modelo: Negócio próprio (4 anos de mercado)",
              "Destaques técnicos:",
            ],
            bullets: [
              "Arquitetura serverless escalável",
              "Integração com WhatsApp e automações",
              "Sistema de assinaturas e pagamentos recorrentes",
              "Tecnologias: React, JavaScript, Next.js, REST API e Webhooks, Checkout (Assinatura e PIX – Mercado Pago), Backend Serverless (Vercel), PostgreSQL (Neon), Extensão Web",
            ],
          },
          {
            title: "FutPlayBr",
            paragraphs: [
              "Plataforma de streaming Pay Per View com distribuição de conteúdo em larga escala.",
              "Modelo: Negócio próprio + sócio",
              "Destaques técnicos:",
            ],
            bullets: [
              "Infraestrutura híbrida (Serverless + VPS)",
              "Alta disponibilidade com CDN",
              "Notificações e experiência mobile (PWA)",
              "Tecnologias: React, JavaScript, Next.js, Extensão Web, Servidor em Docker (VPS), Monolito Serverless (Vercel), PostgreSQL (Neon), REST API e Webhooks, Checkout (PIX – Mercado Pago), PWA e Notificações Push, Cloudflare CDN",
            ],
          },
          {
            title: "NaBrasa Hamburgueria",
            paragraphs: [
              "Site institucional para apresentação da marca e presença digital.",
              "Modelo: Projeto para terceiros",
              "Destaques técnicos:",
            ],
            bullets: [
              "Performance e SEO",
              "Estrutura simples e objetiva",
              "Tecnologias: React, JavaScript, Next.js, Monolito Serverless (Vercel), Google Tag Manager, Meta (Facebook) Pixel",
            ],
          },
          {
            title: "Mestre Starlink",
            paragraphs: [
              "Landing page de vendas focada em educação para economia na compra e instalação da Starlink.",
              "Modelo: Negócio próprio",
              "Destaques técnicos:",
            ],
            bullets: [
              "Conversão e rastreamento avançado",
              "Checkout integrado",
              "Tecnologias: React, JavaScript, Next.js, Monolito Serverless (Vercel), PostgreSQL (Neon), Checkout, Google Tag Manager, Meta (Facebook) Pixel",
            ],
          },
          {
            title: "Facilita Agro",
            paragraphs: [
              "Startup voltada à agricultura de precisão com uso de dados, mapas e inteligência artificial.",
              "Modelo: Projeto para terceiros",
              "Destaques técnicos:",
            ],
            bullets: [
              "Microserviços em VPS",
              "Agente de IA para automação e análise",
              "Escalabilidade e processamento de dados",
              "Tecnologias: React, JavaScript, Next.js, Zustand, Serverless (Vercel), PostgreSQL (Neon), Microserviços em VPS, Agente IA (ChatGPT), Resend, Google Tag Manager",
            ],
          },
        ],
      },
      {
        id: "automacao-trading",
        emoji: "📈",
        title: "Automação & Trading Algorítmico (Projetos Complementares)",
        paragraphs: [
          "Atuação em projetos de automação para mercado financeiro, com desenvolvimento de robôs e estratégias automatizadas para plataformas de trading.",
          "Projetos recorrentes, focados em lógica de negociação, automação de estratégias e execução de ordens.",
        ],
        badges: ["MQL4", "MQL5", "cBot (cTrader)", "Integração com corretoras (ex: Pepperstone)"],
      },
      {
        id: "posicionamento",
        emoji: "🧭",
        title: "Posicionamento & Forma de Trabalho",
        paragraphs: [
          "Atuo há 12 anos no mercado desenvolvendo sistemas, produtos digitais e plataformas SaaS, com foco em tirar ideias do papel e colocá-las no mercado da forma mais rápida e econômica possível.",
          "Sou especialista em criação de MVPs, priorizando tempo de lançamento, custo operacional mínimo e arquitetura sólida desde o primeiro dia.",
          "Meu objetivo não é apenas “fazer funcionar”, mas entregar um produto com infraestrutura eficiente, escalável e financeiramente sustentável, evitando desperdícios técnicos e custos desnecessários.",
        ],
      },
      {
        id: "mvps-negocio-sociedade",
        emoji: "🤝",
        title: "MVPs, Negócio & Sociedade",
        paragraphs: [
          "Quando identifico uma ideia com potencial real de mercado, posso atuar também como sócio técnico do projeto.",
          "Nesse modelo: abro mão do custo inicial de desenvolvimento; participo da definição do produto, arquitetura e estratégia técnica; assumo toda a execução da infraestrutura e do sistema.",
          "Todos os meus negócios próprios começaram exatamente dessa forma.",
        ],
      },
      {
        id: "arquitetura-diferencial",
        emoji: "⚙️",
        title: "Arquitetura como Diferencial",
        paragraphs: [
          "Em todos os projetos, toda a arquitetura do sistema é desenhada por mim.",
          "Planejamento, execução e entrega da infraestrutura cloud ficam sob minha responsabilidade.",
          "A stack é escolhida sempre com foco em melhor custo-benefício, escalabilidade real (não teórica) e manutenibilidade a longo prazo.",
          "A meta é simples: arquitetura impecável, custo enxuto e produto pronto para crescer.",
        ],
      },
      {
        id: "conecte-se",
        emoji: "📬",
        title: "Conecte-se comigo",
        paragraphs: [
          "Entre em contato ou acompanhe meu trabalho pelas plataformas abaixo.",
          "Ordem do portfólio técnico: GitHub, LinkedIn, WhatsApp, Email, YouTube, Instagram, Udemy.",
        ],
        contacts: [
          {
            label: "1. GitHub",
            description: "Código, projetos e experimentos — https://github.com/renatoolegario",
            href: "https://github.com/renatoolegario",
          },
          {
            label: "2. LinkedIn",
            description: "Networking profissional e experiências — https://www.linkedin.com/in/olegariodev/",
            href: "https://www.linkedin.com/in/olegariodev/",
          },
          {
            label: "3. WhatsApp",
            description: "Atendimento direto e rápido — https://api.whatsapp.com/send/?phone=5534992399036",
            href: "https://api.whatsapp.com/send/?phone=5534992399036",
          },
          {
            label: "4. Email",
            description: "multiplas.fr@gmail.com",
            href: "mailto:multiplas.fr@gmail.com",
          },
          {
            label: "5. YouTube",
            description: "Conteúdo técnico e educacional — https://www.youtube.com/@olegario-dev",
            href: "https://www.youtube.com/@olegario-dev",
          },
          {
            label: "6. Instagram",
            description: "Conteúdo técnico, bastidores e projetos — https://www.instagram.com/olegario.dev/",
            href: "https://www.instagram.com/olegario.dev/",
          },
          {
            label: "7. Udemy",
            description: "Cursos e materiais educacionais — https://www.udemy.com/user/renato-olegario-alves-ferreira/",
            href: "https://www.udemy.com/user/renato-olegario-alves-ferreira/",
          },
        ],
      },
    ],
    []
  );

  return <LandingPageTemplate sections={sections} />;
}
