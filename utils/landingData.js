export const LANDING_BASELINE_YEAR = 2014;

export const projects = [
  {
    id: 'falauai',
    title: 'FalaUai',
    description:
      'Extensao web que atua como ponte entre empresas e clientes, facilitando a comunicacao via WhatsApp de forma automatizada.',
    details:
      'Negocio proprio com 4 anos de mercado. Arquitetura serverless com rotinas de automacao e modelo de assinaturas recorrentes.',
    highlights: [
      'Escalabilidade serverless para atender multiplas empresas.',
      'Integracao com WhatsApp e automacoes operacionais.',
      'Estrutura de pagamentos recorrentes e ciclo de renovacao.',
    ],
    model: 'negocio_proprio',
    techs: ['React', 'Next.js', 'PostgreSQL', 'Serverless', 'Extensao Web', 'Checkout (Mercado Pago)', 'Neon', 'Vercel', 'REST API'],
    link: '#',
    image: null,
    isFeatured: true,
  },
  {
    id: 'futplaybr',
    title: 'FutPlayBr',
    description:
      'Plataforma de streaming Pay Per View com distribuicao de conteudo em larga escala e experiencia mobile.',
    details:
      'Negocio proprio em sociedade. Infraestrutura hibrida combinando serverless e VPS com foco em alta disponibilidade.',
    highlights: [
      'Infraestrutura hibrida para reduzir custo e ampliar resiliencia.',
      'Camada CDN para entrega de video com baixa latencia.',
      'Experiencia mobile com abordagem PWA.',
    ],
    model: 'negocio_proprio',
    techs: ['Next.js', 'Docker', 'PWA', 'CDN (Cloudflare)', 'Checkout PIX', 'Serverless', 'VPS', 'PostgreSQL'],
    link: '#',
    image: null,
    isFeatured: true,
  },
  {
    id: 'nabrasa',
    title: 'NaBrasa Hamburgueria',
    description:
      'Site institucional para apresentacao da marca com foco em SEO, performance e presenca digital.',
    details:
      'Projeto para terceiros com entrega enxuta, com estrutura orientada a conversao local e rastreio essencial.',
    highlights: [
      'Arquitetura simples para publicacao rapida.',
      'Melhorias de SEO tecnico e performance.',
      'Estrutura pronta para campanhas regionais.',
    ],
    model: 'terceiros',
    techs: ['React', 'Next.js', 'Monolito Serverless', 'SEO', 'Google Tag Manager', 'Meta Pixel'],
    link: '#',
    image: null,
    isFeatured: false,
  },
  {
    id: 'mestrestarlink',
    title: 'Mestre Starlink',
    description:
      'Landing page de vendas focada em educacao para economia na compra e instalacao da Starlink.',
    details:
      'Negocio proprio com foco em conversao comercial, checkout integrado e rastreio de funil de ponta a ponta.',
    highlights: [
      'Fluxo de venda orientado por dados de conversao.',
      'Checkout conectado para reduzir friccao.',
      'Rastreamento com GTM e Meta Pixel.',
    ],
    model: 'negocio_proprio',
    techs: ['Next.js', 'Monolito Serverless', 'PostgreSQL', 'Checkout', 'Google Tag Manager', 'Meta Pixel'],
    link: '#',
    image: null,
    isFeatured: false,
  },
  {
    id: 'facilita-agro',
    title: 'Facilita Agro',
    description:
      'Startup voltada a agricultura de precisao com uso de dados, mapas e inteligencia artificial.',
    details:
      'Projeto para terceiros com microservicos em VPS, automacao por IA e processamento de dados para tomada de decisao.',
    highlights: [
      'Arquitetura baseada em microservicos.',
      'Automacoes com IA para classificacao e analise.',
      'Pipeline de dados para operacao de campo.',
    ],
    model: 'terceiros',
    techs: ['React', 'Next.js', 'Zustand', 'IA (ChatGPT)', 'Microservicos', 'PostgreSQL', 'VPS', 'Resend', 'Google Tag Manager'],
    link: '#',
    image: null,
    isFeatured: false,
  },
];
