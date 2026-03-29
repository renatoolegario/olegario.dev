export const LANDING_BASELINE_YEAR = 2014;

export const projects = [
  {
    id: 'falauai',
    title: 'FalaUai',
    description:
      'Extensão web que atua como ponte entre empresas e clientes, facilitando a comunicação via WhatsApp de forma automatizada.',
    details:
      'Negócio próprio com 4 anos de mercado. Arquitetura serverless com rotinas de automação e modelo de assinaturas recorrentes.',
    highlights: [
      'Escalabilidade serverless para atender múltiplas empresas.',
      'Integração com WhatsApp e automações operacionais.',
      'Estrutura de pagamentos recorrentes e ciclo de renovação.',
    ],
    model: 'negocio_proprio',
    techs: ['React', 'Next.js', 'PostgreSQL', 'Serverless', 'Extensão Web', 'Checkout (Mercado Pago)', 'Neon', 'Vercel', 'REST API'],
    link: 'https://falauai.com.br/',
    image: null,
    isFeatured: true,
  },
  {
    id: 'futplaybr',
    title: 'FutPlayBr',
    description:
      'Plataforma de streaming Pay Per View com distribuição de conteúdo em larga escala e experiência mobile.',
    details:
      'Negócio próprio em sociedade. Infraestrutura híbrida combinando serverless e VPS com foco em alta disponibilidade.',
    highlights: [
      'Infraestrutura híbrida para reduzir custo e ampliar resiliência.',
      'Camada CDN para entrega de vídeo com baixa latência.',
      'Experiência mobile com abordagem PWA.',
    ],
    model: 'negocio_proprio',
    techs: ['Next.js', 'Docker', 'PWA', 'CDN (Cloudflare)', 'Checkout PIX', 'Serverless', 'VPS', 'PostgreSQL'],
    link: 'https://futplaybr.com.br/',
    image: null,
    isFeatured: true,
  },
  {
    id: 'facilita-agro',
    title: 'Facilita Agro',
    description:
      'Startup voltada à agricultura de precisão com uso de dados, mapas e inteligência artificial.',
    details:
      'Projeto para terceiros com microsserviços em VPS, automação por IA e processamento de dados para tomada de decisão.',
    highlights: [
      'Arquitetura baseada em microsserviços.',
      'Automações com IA para classificação e análise.',
      'Pipeline de dados para operação de campo.',
    ],
    model: 'terceiros',
    techs: ['React', 'Next.js', 'Zustand', 'IA (ChatGPT)', 'Microsserviços', 'PostgreSQL', 'VPS', 'Resend', 'Google Tag Manager'],
    link: 'https://facilitagro.com.br/',
    image: null,
    isFeatured: false,
  },
  {
    id: 'cafe-essencias-do-brasil',
    title: 'Café Essências do Brasil',
    description:
      'Sistema de gestão para controle de estoque, vendas e financeiro, com integração ao Asaas para cobranças e rotina comercial.',
    details:
      'Projeto para terceiros com backoffice completo para organizar compras, produção, contas a pagar, contas a receber e operação diária em um único sistema.',
    highlights: [
      'Controle de estoque e produção conectados ao fluxo operacional.',
      'Vendas e recebimentos integrados com Asaas para cobranças e acompanhamento financeiro.',
      'Rotina comercial e administrativa centralizada para reduzir retrabalho.',
    ],
    model: 'terceiros',
    techs: ['React', 'Next.js', 'Serverless', 'Asaas', 'PostgreSQL', 'Zustand', 'Vercel', 'REST API'],
    link: 'https://cafe-essencias-do-brasil.vercel.app/',
    image: null,
    isFeatured: false,
  },
];
