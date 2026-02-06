import { useMemo } from 'react';
import LandingPageTemplate from 'components/template/LandingPageTemplate';

export default function HomePage() {
  const sections = useMemo(
    () => [
      {
        id: 'posicionamento',
        label: 'Expert em MVP & Infoprodutos',
        title: 'Arquitetura impecável, custo enxuto e produto pronto para crescer',
        paragraphs: [
          'Atuo há 12 anos no mercado desenvolvendo sistemas, produtos digitais e plataformas SaaS, com foco em tirar ideias do papel e colocá-las no mercado da forma mais rápida e econômica possível.',
          'Sou especialista em criação de MVPs, priorizando tempo de lançamento, custo operacional mínimo e arquitetura sólida desde o primeiro dia.',
          'Meu objetivo não é apenas “fazer funcionar”, mas entregar produto com infraestrutura eficiente, escalável e financeiramente sustentável.',
        ],
        highlights: ['12 anos de mercado', 'Foco em MVP', 'Serverless + VPS', 'Arquitetura orientada a escala'],
      },
      {
        id: 'areas-atuacao',
        label: 'Áreas de atuação',
        title: 'Especialidades técnicas para operação e crescimento',
        bullets: [
          'Desenvolvimento de sistemas web e plataformas SaaS',
          'Automação de processos e integrações',
          'Sistemas orientados a WhatsApp e funis inteligentes',
          'Integrações com IA e processamento de dados',
          'Arquitetura backend, APIs e infraestrutura',
          'Gestão técnica de tráfego pago (integração, tracking e automação)',
        ],
      },
      {
        id: 'stack',
        label: 'Stack principal',
        title: 'Linguagens, plataformas e bibliotecas open source',
        groups: [
          {
            title: 'Linguagens & Plataformas',
            badges: ['PHP', 'JavaScript', 'Node.js', 'React', 'Next.js'],
          },
          {
            title: 'Frontend',
            badges: ['MUI (Material UI)', 'Zustand', 'ESLint', 'Prettier'],
          },
          {
            title: 'Backend & Automação',
            badges: ['wa-js', 'Baileys (WhatsApp Web API)', 'ticketz', 'node-pg-migrate', 'Crypto', 'Codex'],
          },
          {
            title: 'Mapas & Geoprocessamento',
            badges: ['Mapbox', 'Turf.js'],
          },
          {
            title: 'Infra & Serviços',
            bullets: [
              'Vercel (deploy, backend serverless, cron jobs)',
              'Neon (PostgreSQL serverless)',
              'Contabo (VPS para WebSocket, automações e serviços persistentes)',
              'Docker, Cloudflare, GitHub CI/CD',
            ],
          },
          {
            title: 'Dados, APIs e IA',
            bullets: [
              'PostgreSQL (Neon), MySQL e Blob Storage',
              'REST APIs, WhatsApp Oficial (Meta API), checkout e pagamentos',
              'Classificação e análise de mensagens',
              'Embeddings, respostas automáticas e automação de fluxos inteligentes',
            ],
          },
        ],
      },
      {
        id: 'projetos',
        label: 'Projetos e arquitetura',
        title: 'Experiência real em negócios próprios e projetos para terceiros',
        groups: [
          {
            title: 'FalaUai',
            paragraphs: ['Extensão web que conecta empresas e clientes via WhatsApp com automação inteligente. Modelo: negócio próprio (4 anos de mercado).'],
            bullets: [
              'Arquitetura serverless escalável',
              'Assinaturas e pagamentos recorrentes',
              'React, Next.js, PostgreSQL (Neon), Vercel e Webhooks',
            ],
          },
          {
            title: 'FutPlayBr',
            paragraphs: ['Plataforma PPV com distribuição em larga escala. Modelo: negócio próprio + sócio.'],
            bullets: [
              'Infraestrutura híbrida (Serverless + VPS)',
              'PWA, notificações push e CDN',
              'Checkout PIX e automações de entrega',
            ],
          },
          {
            title: 'Facilita Agro',
            paragraphs: ['Startup de agricultura de precisão com dados, mapas e IA. Modelo: projeto para terceiros.'],
            bullets: [
              'Microserviços em VPS e agente IA para análise',
              'React, Next.js, Zustand, PostgreSQL, Resend e GTM',
            ],
          },
          {
            title: 'Outros cases',
            bullets: [
              'NaBrasa Hamburgueria: institucional com foco em performance e SEO',
              'Mestre Starlink: landing de vendas com rastreamento avançado e checkout integrado',
            ],
          },
        ],
      },
      {
        id: 'github-breakout',
        label: 'Atualização técnica recente',
        title: 'Sessão reutilizável de github-breakout com endpoint API dedicado',
        paragraphs: [
          'Criei a sessão reutilizável em utils/githubBreakoutSession.js com createGithubBreakoutSession usando process.env.GITHUB_TOKEN, usuário padrão renatoolegario e exigência de enableGhostBricks boolean.',
          'A sessão executa generateSVG com paddleColor, ballColor e bricksColors, garantindo customização do SVG de saída.',
          'Adicionei o endpoint POST /api/github-breakout/session em pages/api/github-breakout/session.js para receber parâmetros no body, chamar a utilitária e retornar o SVG em JSON.',
          'Abaixo você vê a integração funcionando com renderização do SVG gerado pela lib e um mapa de contribuições do GitHub.',
          'Também adicionei testes unitários cobrindo ausência de GITHUB_TOKEN e enableGhostBricks inválido. Commit de referência: 046af88, com PR registrado: “feat: criar sessão de github-breakout com endpoint API”.',
        ],
        showGithubBreakout: true,
      },
      {
        id: 'modelo-sociedade',
        label: 'MVPs, negócio e sociedade',
        title: 'Posso atuar como sócio técnico em ideias com potencial real de mercado',
        bullets: [
          'Abro mão do custo inicial de desenvolvimento em projetos selecionados',
          'Participo da definição do produto e estratégia técnica',
          'Executo arquitetura, infraestrutura cloud e sistema ponta a ponta',
          'Todos os meus negócios próprios começaram nesse modelo',
        ],
      },
      {
        id: 'contato',
        label: 'Conecte-se comigo',
        title: 'Portfólio técnico e canais de contato',
        contacts: [
          { label: '1. GitHub', description: 'Código, projetos e experimentos', href: 'https://github.com/renatoolegario' },
          { label: '2. LinkedIn', description: 'Networking profissional e experiências', href: 'https://www.linkedin.com/in/olegariodev/' },
          { label: '3. WhatsApp', description: 'Atendimento direto e rápido', href: 'https://api.whatsapp.com/send/?phone=5534992399036' },
          { label: '4. Email', description: 'multiplas.fr@gmail.com', href: 'mailto:multiplas.fr@gmail.com' },
          { label: '5. YouTube', description: 'Conteúdo técnico e educacional', href: 'https://www.youtube.com/@olegario-dev' },
          { label: '6. Instagram', description: 'Conteúdo técnico e bastidores', href: 'https://www.instagram.com/olegario.dev/' },
          { label: '7. Udemy', description: 'Cursos e materiais educacionais', href: 'https://www.udemy.com/user/renato-olegario-alves-ferreira/' },
        ],
      },
    ],
    []
  );

  return <LandingPageTemplate sections={sections} />;
}
