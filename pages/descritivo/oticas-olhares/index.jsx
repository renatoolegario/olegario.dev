import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarClock,
  CalendarDays,
  Globe,
  Instagram,
  ListTodo,
  MapPinned,
  MessageCircle,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import Reveal from '../../../components/molecules/Reveal';

const pillars = [
  {
    icon: Target,
    title: 'Mais oportunidades de venda',
    description:
      'Sua empresa passa a aparecer nos canais certos para atrair mais pessoas com intenção real de compra.',
  },
  {
    icon: Workflow,
    title: 'Atendimento mais organizado',
    description:
      'Leads, agendas, produtos e atendimento ficam organizados para evitar perda de tempo e de oportunidades.',
  },
  {
    icon: Bot,
    title: 'Mais velocidade na resposta',
    description:
      'WhatsApp Oficial, agente de IA humanizado e automações ajudam sua equipe a responder melhor e converter com mais consistência.',
  },
  {
    icon: BarChart3,
    title: 'Mais clareza sobre resultados',
    description:
      'Campanhas, cliques, custos, ações e vendas passam a ser acompanhados para você entender o que realmente está trazendo retorno.',
  },
];

const deliverableGroups = [
  {
    icon: Search,
    eyebrow: 'Presença e captação',
    title: 'Sua empresa passa a atrair mais demanda qualificada',
    description:
      'A base do projeto é fazer sua empresa aparecer melhor, ser encontrada com mais facilidade e transformar interesse em contato.',
    items: [
      'Google Business Profile otimizado para fortalecer sua presença local e facilitar o contato.',
      'Landing page com identidade visual da empresa, paleta de cores, logo e foco em conversão.',
      'Portfólio de produtos integrado para apresentar melhor o que sua empresa vende.',
      'Tráfego direcionado para WhatsApp, Instagram, portfólio de produtos e agendamentos.',
    ],
  },
  {
    icon: MessageCircle,
    eyebrow: 'Conversão e atendimento',
    title: 'Seus contatos chegam com mais organização e resposta mais rápida',
    description:
      'O objetivo não é apenas gerar cliques, mas transformar interesse em conversa, atendimento bem conduzido e mais chances reais de venda.',
    items: [
      'WhatsApp Oficial como canal principal para centralizar o atendimento.',
      'Agente de IA humanizado e treinado para apoiar atendimento e qualificação.',
      'Automação de tagueamento, criação de tags e vínculo com o agente.',
      'Lista de leads estruturada para facilitar o acompanhamento comercial.',
    ],
  },
  {
    icon: Settings2,
    eyebrow: 'Gestão e operação',
    title: 'Sua equipe passa a trabalhar com mais clareza e controle',
    description:
      'Para o tráfego gerar resultado de verdade, a operação também precisa estar organizada. Aqui entra a parte que sustenta o crescimento.',
    items: [
      'Área administrativa centralizada.',
      'Criação e edição de produtos com nome, descrição, preço e imagens.',
      'Criação e gerenciamento da organização de agendas.',
      'Fluxo pensado para manter catálogo, atendimento e rotina comercial alinhados.',
    ],
  },
  {
    icon: BarChart3,
    eyebrow: 'Controle e crescimento',
    title: 'Você passa a enxergar melhor o que está dando resultado',
    description:
      'A mensuração fecha o ciclo: você entende de onde vem cada resultado, onde investir melhor e como crescer com mais segurança.',
    items: [
      'Rastreamento de campanhas com cliques, visualizações, custo investido, ações e vendas realizadas.',
      'Afiliação com cadastro de nomes e geração de link exclusivo; quando utilizado em UTM de campanha ou por link específico, o resultado é contabilizado corretamente.',
      'Leitura mais clara do desempenho por canal, campanha e tipo de ação.',
      'Integrações com API do Google e API do Facebook quando necessário para automação e acompanhamento.',
      'Mais previsibilidade comercial para investir melhor e crescer com mais controle.',
    ],
  },
];

const deliverablesSummary = [
  {
    icon: Settings2,
    eyebrow: 'Sistema',
    title: 'Um sistema para centralizar a operação da sua empresa',
    description:
      'Sua empresa passa a contar com um sistema pensado para organizar atendimento, rotina comercial e acompanhamento do dia a dia em um só lugar.',
    items: [
      'Estrutura centralizada para apoiar vendas, atendimento e organização.',
      'Área administrativa para facilitar a gestão da operação.',
      'Base preparada para crescimento com mais controle e menos improviso.',
    ],
  },
  {
    icon: ListTodo,
    eyebrow: 'Módulos do sistema',
    title: 'Tudo o que sua equipe precisa para trabalhar com mais clareza',
    description:
      'Dentro do sistema, sua empresa passa a ter módulos que ajudam a manter o processo comercial mais organizado e produtivo.',
    items: [
      'Cadastro e edição de produtos com nome, descrição, preço e imagens.',
      'Organização e gerenciamento de agendas.',
      'Lista de leads, tags, automações e afiliação com rastreamento.',
    ],
  },
  {
    icon: Target,
    eyebrow: 'Gestão de tráfego',
    title: 'Campanhas para gerar demanda e levar clientes aos canais certos',
    description:
      'A gestão de tráfego entra para colocar sua empresa em movimento, gerar demanda qualificada e direcionar o cliente para os pontos de contato com maior chance de conversão.',
    items: [
      'Google Business Profile, landing page e presença digital voltados à captação.',
      'Campanhas para WhatsApp, Instagram, portfólio de produtos e agendamentos.',
      'Acompanhamento de campanhas, custos, ações e vendas para otimizar resultados.',
    ],
  },
];

const campaignTypes = [
  {
    icon: MapPinned,
    title: 'Campanha de Expansão Local',
    label: 'War / Ganho de Território',
    description:
      'Ideal para ampliar sua presença na região, ocupar mais espaço no mercado e fazer sua marca ser mais lembrada.',
  },
  {
    icon: CalendarClock,
    title: 'Campanha de Antecipação e Confirmação',
    label: 'Ramal / Colônia',
    description:
      'Pensada para estimular ação antes do atendimento, reforçar confirmações e reduzir perda de agenda e de oportunidades.',
  },
  {
    icon: Users,
    title: 'Campanha com Influenciadores de Público Semelhante',
    label: 'Influenciadores com Público Igual',
    description:
      'Voltada para parcerias com influenciadores que falam com o mesmo perfil de público, ampliando alcance qualificado e fortalecendo a confiança na sua marca.',
  },
];

const trafficTypes = [
  { icon: MessageCircle, title: 'Tráfego para WhatsApp' },
  { icon: Instagram, title: 'Tráfego para Instagram' },
  { icon: ShoppingBag, title: 'Tráfego para portfólio de produtos' },
  { icon: CalendarDays, title: 'Tráfego para agendamentos' },
];

const centralizationPoints = [
  'Você passa a receber contatos com mais organização e menos perda no processo.',
  'Seu atendimento deixa de depender do improviso e ganha mais consistência.',
  'Produtos, agendas, leads e tags ficam conectados para facilitar a rotina da equipe.',
  'Você enxerga melhor o que está funcionando e onde vale mais a pena investir.',
];

const diagnosisHighlights = [
  'Elimina barreira de entrada.',
  'Armação gratuita como proposta de valor.',
  'Receita concentrada nas lentes.',
];

const strategicChallenges = [
  'Local físico não estratégico.',
  'Forte dependência de tráfego pago e canais digitais.',
];

const targetAudiences = [
  'Moradores urbanos.',
  'Colônias e ramais.',
  'Público empresarial.',
];

const investmentScale = [
  {
    objective: 'Pequeno Porte',
    reach: '190.000 pessoas',
    investment: 'R$ 250,00',
  },
  {
    objective: 'Dominação Rio Branco',
    reach: '380.000 pessoas',
    investment: 'R$ 500,00',
  },
  {
    objective: 'Expansão Regional',
    reach: '760.000 pessoas',
    investment: 'R$ 1.000,00',
  },
];

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function OticasOlharesPage() {
  return (
    <>
      <Head>
        <title>Óticas Olhares | Estrutura Comercial Completa</title>
        <meta
          name="description"
          content="Descritivo da estrutura comercial e de tráfego criada para a Óticas Olhares, com captação, atendimento, operação e mensuração integrados."
        />
      </Head>

      <main className="min-h-screen overflow-hidden text-slate-200 antialiased selection:bg-emerald-500/30 selection:text-emerald-100">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_26%),linear-gradient(180deg,#08101d_0%,#020617_100%)]" />
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />

        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <Reveal
            as="header"
            variant="fade"
            className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-950/55 px-5 py-4 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition hover:text-white"
              >
                <span className="text-lg font-black tracking-tight text-white">
                  Olegário<span className="text-emerald-400">.Dev</span>
                </span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
                  Descritivo
                </span>
              </Link>
              <p className="mt-2 text-sm text-slate-400">
                Veja o que sua empresa passa a ter com esta proposta.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#entregaveis"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
              >
                Ver entregáveis
              </a>
              <a
                href="#campanhas"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Estrutura de campanhas
                <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>

          <section className="grid gap-8 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:pt-16">
            <Reveal variant="lift" className="max-w-4xl">
              <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Mais vendas com mais organização
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Sua empresa passa a ter uma estrutura pensada para atrair,
                atender e converter melhor.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Com esta proposta, sua empresa passa a ter tráfego,
                atendimento, organização, automação e acompanhamento de
                resultados trabalhando juntos para gerar mais clareza, mais
                controle e mais oportunidades de venda.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#visao"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Entender a estrutura
                </a>
                <a
                  href="https://cafe-essencias-do-brasil.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/35 hover:bg-emerald-400/10"
                >
                  Referência de landing page
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal
              variant="rise"
              delay={120}
              className="premium-card rounded-[32px] p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                    O que sua empresa recebe
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white">
                    Tudo conectado para vender melhor
                  </h2>
                </div>
                <Sparkles className="mt-1 text-emerald-300" size={22} />
              </div>

              <div className="mt-8 space-y-4">
                {[
                  'Mais entrada de contatos nos canais certos.',
                  'Atendimento centralizado e mais rápido no WhatsApp.',
                  'Rotina comercial mais organizada com produtos, agendas e leads.',
                  'Acompanhamento mais claro de campanhas, custos e vendas.',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-4"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                      <Target size={14} />
                    </span>
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>

            </Reveal>
          </section>

          <section id="entregaveis" className="pb-16">
            <Reveal variant="fade">
              <SectionTitle
                eyebrow="Entregáveis"
                title="O que está incluso na proposta"
                description="Para facilitar sua leitura, os entregáveis foram organizados em três frentes principais: sistema, módulos do sistema e gestão de tráfego."
              />
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {deliverablesSummary.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal
                    key={item.title}
                    variant="rise"
                    delay={index * 100}
                    className="premium-card rounded-[30px] p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                          {item.eyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl font-black text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-200">
                        <Icon size={22} />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {item.items.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3"
                        >
                          <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-400/12 text-emerald-200">
                            <ListTodo size={14} />
                          </span>
                          <p className="text-sm leading-6 text-slate-200">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="visao" className="pb-16">
            <Reveal variant="fade">
              <SectionTitle
                eyebrow="O que muda na prática"
                title="Sua empresa ganha uma operação mais forte para vender com consistência."
                description="Em vez de depender apenas de anúncios soltos, sua empresa passa a contar com uma estrutura completa para atrair, atender, organizar e acompanhar resultados com mais segurança."
              />
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <Reveal
                    key={pillar.title}
                    variant="rise"
                    delay={index * 90}
                    className="premium-card rounded-[28px] p-6"
                  >
                    <div className="inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-200">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {pillar.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="entregaveis-detalhados" className="pb-16">
            <Reveal variant="fade">
              <SectionTitle
                eyebrow="O que você terá"
                title="Entregáveis organizados para gerar resultado no dia a dia"
                description="Cada parte desta proposta foi pensada para melhorar sua captação, facilitar seu atendimento, organizar sua operação e dar mais clareza sobre o retorno das campanhas."
              />
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {deliverableGroups.map((group, index) => {
                const Icon = group.icon;

                return (
                  <Reveal
                    key={group.title}
                    variant="rise"
                    delay={index * 110}
                    className="premium-card rounded-[30px] p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                          {group.eyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl font-black text-white">
                          {group.title}
                        </h3>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-200">
                        <Icon size={22} />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {group.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {group.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3"
                        >
                          <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-400/12 text-emerald-200">
                            <ListTodo size={14} />
                          </span>
                          <p className="text-sm leading-6 text-slate-200">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="diagnostico" className="pb-16">
            <Reveal variant="fade">
              <SectionTitle
                eyebrow="Diagnóstico e posicionamento"
                title="Uma estratégia construída em cima da realidade da sua empresa"
                description="A proposta considera o cenário atual da operação, os diferenciais comerciais, o perfil do público e os desafios de posicionamento para direcionar melhor o investimento."
              />
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Reveal
                variant="rise"
                className="premium-card rounded-[30px] p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                      Diagnóstico estratégico
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-white">
                      O posicionamento pode ser fortalecido com uma oferta que já chama atenção
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-200">
                    <Sparkles size={22} />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {diagnosisHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3"
                    >
                      <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-400/12 text-emerald-200">
                        <Target size={14} />
                      </span>
                      <p className="text-sm leading-6 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
                    Localização
                  </p>
                  <p className="mt-2 text-lg font-bold text-white">
                    Rio Branco (364 mil habitantes) + colônias próximas
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-6">
                <Reveal
                  variant="rise"
                  delay={80}
                  className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/80">
                        Desafios
                      </p>
                      <h3 className="mt-3 text-xl font-black text-white">
                        Pontos que exigem estratégia digital mais forte
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-amber-200">
                      <Search size={22} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {strategicChallenges.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/8 bg-slate-950/45 px-4 py-3"
                      >
                        <p className="text-sm leading-6 text-slate-200">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal
                  variant="rise"
                  delay={140}
                  className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                        Público-alvo
                      </p>
                      <div className="mt-4 space-y-3">
                        {targetAudiences.map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-white/8 bg-slate-950/45 px-4 py-3"
                          >
                            <p className="text-sm leading-6 text-slate-200">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                        Ticket médio
                      </p>
                      <div className="mt-4 rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-5">
                        <p className="text-3xl font-black text-white">
                          R$ 700,00
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          Valor médio considerado para estruturar a leitura de escala, captação e retorno.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="pb-16">
            <Reveal variant="fade">
              <SectionTitle
                eyebrow="Como tudo se conecta"
                title="O resultado aparece quando atração, atendimento e controle trabalham juntos"
                description="O objetivo não é apenas trazer mais contatos, mas fazer sua empresa aproveitar melhor cada oportunidade que chegar."
              />
            </Reveal>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal variant="rise" className="premium-card rounded-[30px] p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-200">
                    <Workflow size={22} />
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    O que sua empresa passa a sentir no dia a dia
                  </h3>
                </div>

                <div className="mt-6 grid gap-3">
                  {centralizationPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-4"
                    >
                      <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cyan-400/12 text-cyan-200">
                        <Sparkles size={14} />
                      </span>
                      <p className="text-sm leading-6 text-slate-200">{point}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal
                variant="rise"
                delay={120}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.95)] backdrop-blur-md sm:p-7"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                  Como funciona
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: Globe,
                      title: 'Atração',
                      description:
                        'Sua empresa aparece melhor e leva o cliente para o canal certo.',
                    },
                    {
                      icon: MessageCircle,
                      title: 'Contato',
                      description:
                        'WhatsApp, Instagram e agendamento recebem a demanda de forma mais organizada.',
                    },
                    {
                      icon: Users,
                      title: 'Organização',
                      description:
                        'Leads, tags, agendas e produtos ficam controlados para facilitar a rotina.',
                    },
                    {
                      icon: BarChart3,
                      title: 'Crescimento com direção',
                      description:
                        'Cliques, custo, ações e vendas ajudam a decidir com mais segurança os próximos passos.',
                    },
                  ].map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.title}
                        className="rounded-2xl border border-white/8 bg-slate-950/45 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-emerald-200">
                            <Icon size={18} />
                          </span>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Etapa {index + 1}
                            </p>
                            <h4 className="text-lg font-bold text-white">
                              {step.title}
                            </h4>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>

          <section id="campanhas" className="pb-16">
            <Reveal variant="fade">
              <SectionTitle
                eyebrow="Campanhas e canais"
                title="Campanhas pensadas para trazer movimento e fortalecer a marca"
                description="Cada tipo de campanha atende um objetivo diferente, sempre com foco em gerar demanda qualificada e apoiar o crescimento da empresa."
              />
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {campaignTypes.map((campaign, index) => {
                const Icon = campaign.icon;

                return (
                  <Reveal
                    key={campaign.title}
                    variant="rise"
                    delay={index * 120}
                    className="premium-card rounded-[30px] p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                          {campaign.label}
                        </p>
                        <h3 className="mt-3 text-2xl font-black text-white">
                          {campaign.title}
                        </h3>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-200">
                        <Icon size={22} />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {campaign.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>

            <div className="mt-10">
              <Reveal variant="rise" className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                      Tipos de tráfego
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-white">
                      Para onde sua demanda pode ser direcionada
                    </h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-300">
                    Cada campanha pode levar o cliente para o canal que faz mais
                    sentido para o objetivo comercial da sua empresa.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {trafficTypes.map((traffic, index) => {
                    const Icon = traffic.icon;

                    return (
                      <Reveal
                        key={traffic.title}
                        variant="rise"
                        delay={index * 80}
                        className="rounded-2xl border border-white/8 bg-slate-950/45 p-4"
                      >
                        <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-200">
                          <Icon size={20} />
                        </div>
                        <p className="mt-4 text-base font-semibold text-white">
                          {traffic.title}
                        </p>
                      </Reveal>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>

          <section id="investimento" className="pb-16">
            <Reveal variant="fade">
              <SectionTitle
                eyebrow="Investimento sugerido"
                title="Uma referência de escala para colocar a estratégia em movimento"
                description="A estrutura abaixo organiza a premissa de mídia e a projeção de investimento para ampliar alcance de forma controlada."
              />
            </Reveal>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal
                variant="rise"
                className="premium-card rounded-[30px] p-6 sm:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                  Premissa de mídia
                </p>
                <h3 className="mt-3 text-2xl font-black text-white">
                  Investimento por dia sugerido
                </h3>

                <div className="mt-6 rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-sm font-semibold text-emerald-100">
                    Premissa considerada
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">
                    R$ 30,00
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    a cada 19.000 pessoas alcançadas.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-4">
                  <p className="text-sm leading-6 text-slate-200">
                    Base de referência:
                    <span className="font-semibold text-white">
                      {' '}
                      R$ 30,00 = 19.000 pessoas
                    </span>
                  </p>
                </div>
              </Reveal>

              <Reveal
                variant="rise"
                delay={120}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                      Projeção de escala
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-white">
                      Estrutura de investimento por alcance
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm leading-6 text-slate-300">
                    Esta leitura ajuda a visualizar o tamanho da operação de mídia de acordo com o objetivo de crescimento.
                  </p>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-left">
                        <th className="py-3 pr-4 text-sm font-semibold text-white">
                          Objetivo
                        </th>
                        <th className="py-3 pr-4 text-sm font-semibold text-white">
                          Alcance estimado
                        </th>
                        <th className="py-3 text-sm font-semibold text-white">
                          Investimento mensal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {investmentScale.map((row) => (
                        <tr key={row.objective} className="border-b border-white/8">
                          <td className="py-4 pr-4 text-sm font-medium text-slate-100">
                            {row.objective}
                          </td>
                          <td className="py-4 pr-4 text-sm text-slate-300">
                            {row.reach}
                          </td>
                          <td className="py-4 text-sm font-semibold text-emerald-200">
                            {row.investment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>
          </section>

          <Reveal
            as="footer"
            variant="fade"
            className="mt-auto rounded-[30px] border border-white/10 bg-slate-950/55 px-6 py-6 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200/80">
                  Resultado esperado
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Sua empresa ganha mais organização para vender melhor e crescer com mais clareza.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Você passa a ter captação, atendimento, operação e leitura de
                  resultados conectados dentro da mesma lógica comercial.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#entregaveis"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-emerald-400/35 hover:bg-emerald-400/10"
                >
                  Revisar entregáveis
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Voltar para o site
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
