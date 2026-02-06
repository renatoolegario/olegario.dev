import { useMemo, useState } from "react";
import LandingPageTemplate from "components/template/LandingPageTemplate";
import SectionModal from "components/organisms/SectionModal";

export default function HomePage() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const sections = useMemo(
    () => [
      {
        title: "Quem sou eu",
        subtitle: "Arquitetura sólida e execução ponta a ponta",
        paragraphs: [
          "Sou arquiteto de software e fundador técnico com 12 anos de mercado, especializado em tirar MVPs do papel e colocá-los no mercado com o menor custo possível, sem abrir mão de arquitetura sólida e infraestrutura bem planejada.",
          "Atuo desde a ideia até a execução completa do sistema, incluindo arquitetura, backend, frontend, infraestrutura e automações.",
        ],
      },
      {
        title: "Posicionamento & forma de trabalho",
        subtitle: "Mais velocidade, menos desperdício técnico",
        paragraphs: [
          "Atuo há 12 anos no mercado desenvolvendo sistemas, produtos digitais e plataformas SaaS, com foco em tirar ideias do papel e colocá-las no mercado da forma mais rápida e econômica possível.",
          "Sou especialista em criação de MVPs priorizando tempo de lançamento, custo operacional mínimo e arquitetura sólida desde o primeiro dia.",
          "Meu objetivo não é apenas fazer funcionar, mas entregar um produto com infraestrutura eficiente, escalável e financeiramente sustentável, evitando desperdícios técnicos e custos desnecessários.",
        ],
      },
      {
        title: "Áreas de atuação",
        subtitle: "Especialidades que geram resultado",
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
        title: "Linguagens, plataformas e stack",
        subtitle: "Tecnologia usada em produção",
        groups: [
          {
            title: "Linguagens & Plataformas",
            badges: ["PHP", "JavaScript", "Node.js", "React", "Next.js"],
          },
          {
            title: "Frameworks & Bibliotecas (Frontend)",
            badges: ["MUI", "Zustand", "ESLint", "Prettier"],
          },
          {
            title: "Backend & Automação",
            badges: ["wa-js", "Baileys", "ticketz", "node-pg-migrate", "Crypto", "Codex"],
          },
          {
            title: "Mapas & Geoprocessamento",
            badges: ["Mapbox", "Turf.js"],
          },
          {
            title: "Comunicação & Serviços",
            badges: ["Resend"],
          },
          {
            title: "Bancos de Dados & Armazenamento",
            badges: ["PostgreSQL (Neon)", "MySQL", "Blob Storage"],
          },
          {
            title: "APIs & Integrações",
            badges: [
              "REST APIs",
              "WhatsApp Oficial (Meta API)",
              "Checkouts e sistemas de pagamento",
              "Integração com IA (LLMs, embeddings, automações)",
            ],
          },
          {
            title: "Infraestrutura & DevOps",
            badges: [
              "Vercel",
              "Neon",
              "Contabo",
              "Docker",
              "Cloudflare",
              "GitHub",
              "CI/CD",
              "Migrations de banco de dados",
            ],
          },
        ],
      },
      {
        title: "Inteligência Artificial",
        subtitle: "IA aplicada a operação e crescimento",
        bullets: [
          "Classificação e análise de mensagens",
          "Geração de respostas automáticas",
          "Embeddings e aprendizado de comportamento",
          "Automação de fluxos inteligentes",
        ],
      },
      {
        title: "Automação & Trading Algorítmico",
        subtitle: "Projetos complementares no mercado financeiro",
        paragraphs: [
          "Atuação em projetos de automação para mercado financeiro, com desenvolvimento de robôs e estratégias automatizadas para plataformas de trading.",
          "Projetos recorrentes focados em lógica de negociação, automação de estratégias e execução de ordens.",
        ],
        badges: ["MQL4", "MQL5", "cBot (cTrader)", "Pepperstone e outras corretoras"],
      },
      {
        title: "MVPs, negócio & sociedade",
        subtitle: "Modelo de parceria técnica",
        paragraphs: [
          "Quando identifico uma ideia com potencial real de mercado, posso atuar também como sócio técnico do projeto.",
          "Nesse modelo, abro mão do custo inicial de desenvolvimento, participo da definição do produto e arquitetura, e assumo toda a execução da infraestrutura e do sistema.",
          "Todos os meus negócios próprios começaram exatamente dessa forma.",
        ],
      },
      {
        title: "Arquitetura como diferencial",
        subtitle: "Decisões técnicas orientadas a negócio",
        paragraphs: [
          "Em todos os projetos, toda a arquitetura do sistema é desenhada por mim. Planejamento, execução e entrega da infraestrutura cloud ficam sob minha responsabilidade.",
          "A stack é escolhida com foco em melhor custo-benefício, escalabilidade real e manutenibilidade a longo prazo.",
          "Meta: arquitetura impecável, custo enxuto e produto pronto para crescer.",
        ],
      },
      {
        title: "Projetos e arquiteturas desenvolvidas",
        subtitle: "Portfólio com execução completa",
        paragraphs: [
          "Em todos os projetos abaixo eu executei arquitetura completa do sistema (planejamento, desenho e execução), infraestrutura cloud e deploy, uso de migrations, Atomic Design, Serverless Functions, além de integrações via REST API e Webhooks.",
        ],
        groups: [
          {
            title: "FalaUai",
            paragraphs: [
              "Extensão web que atua como ponte entre empresas e clientes, facilitando a comunicação via WhatsApp de forma automatizada.",
              "Modelo: negócio próprio (4 anos de mercado).",
            ],
            bullets: [
              "Arquitetura serverless escalável",
              "Integração com WhatsApp e automações",
              "Sistema de assinaturas e pagamentos recorrentes",
              "Tecnologias: React, JavaScript, Next.js, REST API, Webhooks, Mercado Pago (Assinatura e PIX), Vercel, PostgreSQL (Neon), extensão web",
            ],
          },
          {
            title: "FutPlayBr",
            paragraphs: [
              "Plataforma de streaming Pay Per View com distribuição de conteúdo em larga escala.",
              "Modelo: negócio próprio + sócio.",
            ],
            bullets: [
              "Infraestrutura híbrida (Serverless + VPS)",
              "Alta disponibilidade com CDN",
              "Notificações e experiência mobile (PWA)",
              "Tecnologias: React, JavaScript, Next.js, extensão web, Docker em VPS, Vercel, PostgreSQL (Neon), REST API, Webhooks, PIX (Mercado Pago), PWA, Push, Cloudflare CDN",
            ],
          },
          {
            title: "NaBrasa Hamburgueria",
            paragraphs: ["Site institucional para apresentação da marca e presença digital."],
            bullets: [
              "Modelo: projeto para terceiros",
              "Destaques: performance e SEO; estrutura simples e objetiva",
              "Tecnologias: React, JavaScript, Next.js, Vercel, Google Tag Manager e Meta Pixel",
            ],
          },
          {
            title: "Mestre Starlink",
            paragraphs: [
              "Landing page de vendas focada em educação para economia na compra e instalação da Starlink.",
            ],
            bullets: [
              "Modelo: negócio próprio",
              "Destaques: conversão e rastreamento avançado; checkout integrado",
              "Tecnologias: React, JavaScript, Next.js, Vercel, PostgreSQL (Neon), checkout, GTM e Meta Pixel",
            ],
          },
          {
            title: "Facilita Agro",
            paragraphs: [
              "Startup voltada à agricultura de precisão com uso de dados, mapas e inteligência artificial.",
            ],
            bullets: [
              "Modelo: projeto para terceiros",
              "Destaques: microserviços em VPS, agente de IA para automação e análise, escalabilidade e processamento de dados",
              "Tecnologias: React, JavaScript, Next.js, Zustand, Vercel, PostgreSQL (Neon), microserviços em VPS, agente IA (ChatGPT), Resend, Google Tag Manager",
            ],
          },
        ],
      },
      {
        title: "Conecte-se comigo",
        subtitle: "Contato direto e portfólio técnico",
        contacts: [
          {
            label: "1. GitHub",
            description: "Código, projetos e experimentos",
            href: "https://github.com/renatoolegario",
          },
          {
            label: "2. LinkedIn",
            description: "Networking profissional e experiências",
            href: "https://www.linkedin.com/in/olegariodev/",
          },
          {
            label: "3. WhatsApp",
            description: "Atendimento direto e rápido",
            href: "https://api.whatsapp.com/send/?phone=5534992399036",
          },
          {
            label: "4. Email",
            description: "multiplas.fr@gmail.com",
            href: "mailto:multiplas.fr@gmail.com",
          },
          {
            label: "5. YouTube",
            description: "Conteúdo técnico e educacional",
            href: "https://www.youtube.com/@olegario-dev",
          },
          {
            label: "6. Instagram",
            description: "Conteúdo técnico, bastidores e projetos",
            href: "https://www.instagram.com/olegario.dev/",
          },
          {
            label: "7. Udemy",
            description: "Cursos e materiais educacionais",
            href: "https://www.udemy.com/user/renato-olegario-alves-ferreira/",
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <LandingPageTemplate sections={sections} onSelectSection={setSelectedIndex} />
      <SectionModal
        open={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        section={selectedIndex !== null ? sections[selectedIndex] : null}
      />
    </>
  );
}
