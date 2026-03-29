import Head from 'next/head';

const levantamento = [
  'Empresa',
  'Público',
  'Produtos',
  'Fluxo do cliente',
  'Instagram',
  'Posicionamento no Google',
  'Página do site',
];

const notasRapidas = [
  'Rio Branco -> 364 mil pessoas',
  'Rondônia',
  'Faz exame de vista com 5 parceiros',
  'Cliente paga só a lente, não paga a consulta e não paga armação',
  'Ótica -> Consultoria -> Ótica',
  'Ramal é colônia',
  'O local não é estratégico',
  '400 na semana com armação gratuita',
  'Ticket médio de R$ 700,00',
  '12%',
  'Ótica faz 3 meses',
  'Planos empresariais',
  'Atende a domicílio',
  'Atende pessoas da colônia',
  'Google Meu Negócio',
  'Influenciadores com indicação de afiliação',
  'Buscar seguidores da cidade e do ramo ótico que possam divulgar algo',
];

const entregaveis = [
  'Otimização do Google Meu Negócio',
  'Site (landing page) com portfólio de produtos, paleta de cores e logo da empresa',
  'Área administrativa',
  'Criação e edição de produtos: nome, descrição, preço e imagens',
  'Criação e gerenciamento da organização de agendas',
  'WhatsApp Oficial',
  'Agente de IA humanizado e treinado',
  'Automação de tagueamentos, criação de tags e vínculo com o agente',
  'Lista de leads',
  'Rastreamento de campanhas: cliques, visualizações, valor utilizado, ações e vendas realizadas',
  'Integração com API Google e API Facebook',
  'Afiliação: cadastro de nomes, Instagram, contato e geração de link de afiliação para contabilização via UTM ou link específico',
];

const tiposCampanha = [
  'War / Ganho de Território',
  'Ramal / Colônia - Antecipação e Confirmação',
  'Influenciadores com público igual',
];

const tiposTrafego = [
  'Tráfego para WhatsApp',
  'Tráfego para Instagram',
  'Tráfego para portfólio de produtos',
  'Tráfego para agendamentos',
];

const publicoAlvo = [
  'Moradores urbanos',
  'Colônias / ramais',
  'Público empresarial',
];

const desafios = [
  'Local físico não estratégico',
  'Forte dependência de tráfego pago e canais digitais',
];

const escala = [
  {
    objetivo: 'Pequeno porte',
    alcance: '190.000 pessoas',
    investimento: 'R$ 250,00',
  },
  {
    objetivo: 'Dominação Rio Branco',
    alcance: '380.000 pessoas',
    investimento: 'R$ 500,00',
  },
  {
    objetivo: 'Expansão regional',
    alcance: '760.000 pessoas',
    investimento: 'R$ 1.000,00',
  },
];

function SimpleSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function OticasOharesDetalhesPage() {
  return (
    <>
      <Head>
        <title>Óticas Ohares | Detalhes Internos</title>
        <meta
          name="description"
          content="Página interna de anotações e planejamento da estratégia da Óticas Ohares."
        />
        <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />
      </Head>

      <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Página interna
            </p>
            <h1 className="mt-2 text-3xl font-black">Eliamara Tráfego Pago</h1>
            <p className="mt-2 text-sm text-slate-600">
              Criado quarta, 25 de março de 2026
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Página simples de apoio, sem links no site, para visualizar o
              planejamento e as anotações de forma rápida.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <SimpleSection title="Levantamento inicial">
              <ul className="space-y-2 text-sm text-slate-700">
                {levantamento.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </SimpleSection>

            <SimpleSection title="Notas rápidas">
              <ul className="space-y-2 text-sm text-slate-700">
                {notasRapidas.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </SimpleSection>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <SimpleSection title="Diagnóstico">
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <strong>Elimina barreira de entrada:</strong> armação gratuita
                </p>
                <p>
                  <strong>Receita concentrada:</strong> lentes
                </p>
                <p>
                  <strong>Localização:</strong> Rio Branco + colônias próximas
                </p>
                <p>
                  <strong>Atendimento:</strong> domicílio, colônias e planos
                  empresariais
                </p>
              </div>
            </SimpleSection>

            <SimpleSection title="Público-alvo">
              <ul className="space-y-2 text-sm text-slate-700">
                {publicoAlvo.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </SimpleSection>

            <SimpleSection title="Desafios">
              <ul className="space-y-2 text-sm text-slate-700">
                {desafios.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </SimpleSection>
          </div>

          <SimpleSection title="Entregáveis">
            <ul className="space-y-2 text-sm text-slate-700">
              {entregaveis.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </SimpleSection>

          <div className="grid gap-6 lg:grid-cols-2">
            <SimpleSection title="Tipos de campanhas">
              <ul className="space-y-2 text-sm text-slate-700">
                {tiposCampanha.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </SimpleSection>

            <SimpleSection title="Tipos de tráfego">
              <ul className="space-y-2 text-sm text-slate-700">
                {tiposTrafego.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </SimpleSection>
          </div>

          <SimpleSection title="Estratégia e investimento">
            <div className="space-y-5 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">
                  Preciso montar um material de estratégia para ela com
                  investimento por mil pessoas.
                </p>
                <p className="mt-2">
                  Baseado na premissa anotada:
                  <strong> 19 mil pessoas = R$ 25,00</strong>
                </p>
                <p className="mt-2">
                  Investimento por dia sugerido:
                  <strong> R$ 30,00 a cada 19.000 pessoas alcançadas</strong>
                </p>
                <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-amber-900">
                  Ponto para validar: existe uma anotação com R$ 25,00 e outra
                  com R$ 30,00 para o mesmo alcance de 19 mil pessoas.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Ticket médio:
                  <span className="font-normal text-slate-700">
                    {' '}
                    R$ 700,00
                  </span>
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-900">
                      <th className="py-2 pr-4 font-semibold">Objetivo</th>
                      <th className="py-2 pr-4 font-semibold">
                        Alcance estimado
                      </th>
                      <th className="py-2 font-semibold">
                        Investimento mensal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {escala.map((row) => (
                      <tr key={row.objetivo} className="border-b border-slate-100">
                        <td className="py-2 pr-4">{row.objetivo}</td>
                        <td className="py-2 pr-4">{row.alcance}</td>
                        <td className="py-2">{row.investimento}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </SimpleSection>
        </div>
      </main>
    </>
  );
}
