"use client";
import Head from 'next/head';
import Script from 'next/script';

export default function Aserpa() {
  const initializeCharts = () => {
    if (typeof window.Chart === 'undefined') {
      console.error('Chart.js is not loaded.');
      return;
    }

    // Gráfico composição de custos atuais
    const currentCtx = document.getElementById('currentCostsChart').getContext('2d');
    new window.Chart(currentCtx, {
      type: 'doughnut',
      data: {
        labels: ['Custo de Emissão de Boleto', 'Custo de VOIP'],
        datasets: [{ data: [8940, 1400], backgroundColor: ['#EF4444', '#F97316'] }]
      },
      options: { plugins: { legend: { position: 'bottom' } } }
    });

    // Gráfico pizza Cenário Atual
    const pieAtualCtx = document.getElementById('pieAtual').getContext('2d');
    new window.Chart(pieAtualCtx, {
      type: 'doughnut',
      data: {
        labels: ['Custo Total', 'Receita Bruta'],
        datasets: [{ data: [10340, 16800], backgroundColor: ['#EF4444', '#3B82F6'] }]
      },
      options: { plugins: { legend: { position: 'bottom' } } }
    });

    // Gráfico pizza Novo
    const pieNovoCtx = document.getElementById('pieNovo').getContext('2d');
    new window.Chart(pieNovoCtx, {
      type: 'doughnut',
      data: {
        labels: ['Custo Projetado', 'Receita Bruta'],
        datasets: [{ data: [1326.5, 16800], backgroundColor: ['#22C55E', '#3B82F6'] }]
      },
      options: { plugins: { legend: { position: 'bottom' } } }
    });

    // Gráfico Projeção de custos
    const projectionCtx = document.getElementById('projectionChart').getContext('2d');
    new window.Chart(projectionCtx, {
      type: 'bar',
      data: {
        labels: ['Out/25','Nov/25','Dez/25','Jan/26','Fev/26','Mar/26','Abr/26','Mai/26','Jun/26','Jul/26','Ago/26','Set/26','Out/26','Nov/26','Dez/26'],
        datasets: [
          { label: 'Custo WhatsApp', data: Array(15).fill(480), backgroundColor: '#22C55E', stack: 'a' },
          { label: 'Custo Asaas', data: [696.50,748.24,801.97,860.88,923.36,991.02,1064.65,1142.26,1227.83,1317.38,1412.90,1518.37,1630.81,1753.19,1880.55], backgroundColor: '#8B5CF6', stack: 'a' },
          { label: 'Custo VPS', data: Array(15).fill(150), backgroundColor: '#F97316', stack: 'a' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
      }
    });
  };

  return (
    <>
      <Head>
        <title>Proposta de Automação e Análise de ROI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" onLoad={initializeCharts} />

      <div className="bg-gray-50 text-gray-800" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem' }}>
        <div className="container mx-auto p-4 md:p-8">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Transformando Custos em Lucro</h1>
            <p className="text-base md:text-lg text-gray-600">Uma Análise de ROI para a Automação do Processo de Cobrança</p>
          </header>

          <main>
            {/* Cenário Atual */}
            <section id="problema" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-red-600 mb-2">O Cenário Atual: Ineficiência e Custos Elevados</h2>
                <p className="max-w-3xl mx-auto text-gray-600">O processo manual atual gera custos fixos altos, baixa conversão e perda de contato com milhares de clientes, resultando em um grande volume de receita não capturada.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-500">Custo Mensal Total</h3>
                  <p className="text-4xl font-bold text-red-500">R$ 10.340</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-500">Receita Mensal Atual</h3>
                  <p className="text-4xl font-bold text-gray-800">R$ 16.800</p>
                  <span className="text-sm text-gray-500">(300 pagantes)</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-500">Lucro Líquido Mensal</h3>
                  <p className="text-4xl font-bold text-gray-800">R$ 6.460</p>
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-center mb-6">Análise dos Custos Atuais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-600 mb-4"><strong className="text-red-600">Custo de Emissão (R$ 8.940):</strong> O maior vilão. O cliente paga R$ 1,49 por cada um dos 6.000 boletos, independentemente se o cliente final paga ou não. Isso representa 86% do custo total.</p>
                    <p className="text-gray-600"><strong className="text-orange-500">Custo de VOIP (R$ 1.400):</strong> Um custo fixo significativo para tentativas de contato manual, com baixa escalabilidade e eficiência.</p>
                  </div>
                  <div className="chart-container h-64 md:h-80 max-h-80">
                    <canvas id="currentCostsChart"></canvas>
                  </div>
                </div>
              </div>
            </section>

            {/* Solução Proposta */}
            <section id="solucao" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-600 mb-2">A Solução Proposta: Automação Inteligente</h2>
                <p className="max-w-3xl mx-auto text-gray-600">Implementar um sistema que automatiza a comunicação via WhatsApp e integra a cobrança com o Asaas, transformando custos fixos em variáveis e escalando a capacidade de recebimento.</p>
              </div>
            </section>

            {/* Primeiro Mês */}
            <section id="primeiro-mes" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Análise Detalhada: Primeiro Mês</h2>
                <p className="max-w-3xl mx-auto text-gray-600">A solução trará resultados imediatos, transformando a ineficiência em crescimento real desde o primeiro mês.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Cenário Atual</h3>
                  <canvas id="pieAtual" className="pie-container"></canvas>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Projeção do Primeiro Mês</h3>
                  <canvas id="pieNovo" className="pie-container"></canvas>
                </div>
              </div>
            </section>

            {/* Projeção */}
            <section id="projecao" className="mb-16">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-2">Projeção de Custos (Out/2025 a Dez/2026)</h3>
                <div className="chart-container">
                  <canvas id="projectionChart"></canvas>
                </div>
                <div className="mt-6 table-wrap">
                  <h4 className="text-lg font-semibold text-center mb-3">Evolução de conversão por mês</h4>
                  <table className="conversion-table w-full text-sm bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th>Out/25</th><th>Nov/25</th><th>Dez/25</th><th>Jan/26</th><th>Fev/26</th><th>Mar/26</th><th>Abr/26</th><th>Mai/26</th><th>Jun/26</th><th>Jul/26</th><th>Ago/26</th><th>Set/26</th><th>Out/26</th><th>Nov/26</th><th>Dez/26</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>300</td><td>322</td><td>346</td><td>372</td><td>400</td><td>430</td><td>462</td><td>496</td><td>532</td><td>571</td><td>612</td><td>656</td><td>702</td><td>751</td><td>815</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Modal de Funcionamento */}
            <section id="modal-funcionamento" className="mb-12">
              <div className="bg-white p-5 rounded-xl shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-3">Como Vai Funcionar o Processo</h3>
                <p className="text-gray-700 mb-3">Existem duas opções de implementação do fluxo de cobrança:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>ASAAS + ManyChat</strong>: gerenciamento de WhatsApp e clientes dentro do ManyChat, com custo de <strong>R$ 150,00/mês</strong>, utilizando a API oficial do WhatsApp. <a href="https://manychat.com/pt/pricing" target="_blank" className="text-blue-600 underline">Página de referência</a>.</li>
                  <li><strong>Sistema próprio sob demanda</strong>: controle do WhatsApp dentro da nossa ferramenta e cobrança pelo Asaas, com custo de <strong>R$ 120,00 servidor + R$ 70,00 backup/mês</strong>.</li>
                </ul>
                <p className="text-gray-700 mt-3">Fluxo em ambos os cenários:</p>
                <div className="flow-diagram">
                  <div className="flow-step flow-planilha">Planilha de inadimplentes</div>
                  <div className="arrow">➡️</div>
                  <div className="flow-step flow-whatsapp">Envio WhatsApp</div>
                  <div className="arrow">➡️</div>
                  <div className="flow-step flow-whatsapp">Atendimento/Negociação</div>
                  <div className="arrow">➡️</div>
                  <div className="flow-step flow-asaas">Cobrança Asaas</div>
                  <div className="arrow">➡️</div>
                  <div className="flow-step flow-asaas">Link de pagamento</div>
                  <div className="arrow">➡️</div>
                  <div className="flow-step flow-monitor">Monitoramento</div>
                </div>
              </div>
            </section>

            {/* Observações */}
            <section id="observacoes" className="mb-12">
              <div className="bg-white p-5 rounded-xl shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-3">Melhorias e Técnicas Futuras</h3>
                <p className="text-gray-700 mb-3">Objetivo: reduzir inadimplência e elevar a taxa de recebimento, além de aumentar faturamento com os clientes já existentes.</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Lembretes no WhatsApp</strong>: custo estimado <strong>22.000 usuários × 3 × R$ 0,08 = R$ 5.280</strong> por ciclo. Para justificar ROI ≥ 2x, é necessário recuperar pelo menos <strong>95 inadimplentes</strong> (R$ 56 cada) dos 6.000 atuais.</li>
                  <li><strong>Renegociação automatizada via Asaas</strong>: se toda a cobrança iniciar no Asaas, habilitar proposta automática para atrasos &gt; <em>X</em> dias.</li>
                  <li><strong>Higienização de base</strong>: validar telefones/e-mails e segmentar por comportamento para reduzir emissões (meta: -15% das 6.000/mês).</li>
                  <li><strong>Pesquisa de NPS</strong> mensal para detectar atritos e priorizar ações de retenção/reativação.</li>
                  <li><strong>Ofertas de incentivo</strong> (desconto para pagamento antecipado) e <strong>política de reativação</strong> para churn &lt; 30 dias.</li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style jsx>{`
        .chart-container { position: relative; width: 100%; height: 300px; max-height: 400px; }
        .pie-container { position: relative; width: 100%; height: 220px; }
        @media (min-width: 768px) {
          .chart-container { height: 480px; max-height: 560px; }
          .pie-container { height: 240px; }
        }
        .conversion-table th, .conversion-table td { white-space: nowrap; text-align: center; padding: .5rem; }
        .flow-diagram { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem; }
        .flow-step { border-radius: 0.5rem; padding: 0.75rem 1rem; text-align: center; font-size: 0.85rem; font-weight: 600; min-width: 120px; color: #fff; }
        .flow-whatsapp { background: #22C55E; }
        .flow-asaas { background: #8B5CF6; }
        .flow-monitor { background: #3B82F6; }
        .flow-planilha { background: #F97316; }
        .arrow { font-size: 1.5rem; color: #6B7280; }
      `}</style>
    </>
  );
}

