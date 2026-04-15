export const appTasks = [
  {
    slug: 'youtube',
    title: 'Movimentação do YouTube',
    href: '/app/tasks/youtube',
    summary: 'Organizar conteúdos, posicionamento e frequência para fortalecer o canal.',
    objective: 'Criar uma frente clara de produção para atrair atenção, gerar autoridade e abrir oportunidades comerciais.',
    bullets: [
      'Definir linha editorial com temas que conectem conteúdo, autoridade e oferta.',
      'Separar formatos principais, como cortes, aulas rápidas, bastidores e chamadas para ação.',
      'Manter consistência de publicação com foco em crescimento e recorrência.',
    ],
  },
  {
    slug: 'instagram',
    title: 'Movimentação do Instagram',
    href: '/app/tasks/instagram',
    summary: 'Estruturar presença, narrativa e rotina de postagem para manter o perfil ativo.',
    objective: 'Transformar o Instagram em um canal de relacionamento, prova de valor e captação de interesse.',
    bullets: [
      'Alinhar feed, stories e reels com uma comunicação mais objetiva e comercial.',
      'Criar sequência de conteúdos que mostrem rotina, resultado, processo e bastidores.',
      'Usar o perfil para reforçar autoridade e gerar tráfego para as ofertas principais.',
    ],
  },
  {
    slug: 'uaistack',
    title: 'Criação UaiStack',
    href: '/app/tasks/uaistack',
    summary: 'Documentar a criação da frente UaiStack como produto, staff e apoio operacional.',
    objective: 'Posicionar o UaiStack como ferramenta de suporte que reduz esforço, organiza demandas e acelera execução.',
    bullets: [
      'Definir proposta de valor, promessa principal e aplicação no dia a dia do cliente.',
      'Estruturar a comunicação de benefício para operação, atendimento e acompanhamento.',
      'Conectar o produto às dores reais que já aparecem nos contatos e atendimentos.',
    ],
  },
  {
    slug: 'estrategias',
    title: 'Criação de Estratégias',
    href: '/app/tasks/estrategias',
    summary: 'Concentrar a abordagem estratégica que será usada nas lives, treinamentos e suporte.',
    objective: 'Mostrar ao cliente como resolver uma dor real dele, com aplicação prática e apoio do UaiStack.',
    bullets: [
      'Fazer lives dando treinamento e suporte a pessoas em tráfego pago, mostrando estratégias de aplicação.',
      'Sempre trazer foco em utilizar o UaiStack como ferramenta de staff, mostrando ganho e benefício.',
      'Conduzir a conversa estratégica com foco em resolver uma dor concreta do cliente.',
    ],
  },
];

export function getAppTaskBySlug(taskSlug) {
  return appTasks.find((task) => task.slug === taskSlug) || null;
}
