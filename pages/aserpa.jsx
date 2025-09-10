"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

// Registra o Chart.js apenas uma vez (escopo de módulo)
Chart.register(...registerables);

export default function Aserpa() {
  // Evita divergência entre SSR e CSR
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  // REFs dos gráficos
  const currentCostsRef = useRef<HTMLCanvasElement | null>(null);
  const pieAtualRef = useRef<HTMLCanvasElement | null>(null);
  const pieNovoRef = useRef<HTMLCanvasElement | null>(null);
  const projectionRef = useRef<HTMLCanvasElement | null>(null);

  // Guarda instâncias para destruir corretamente ao recriar/desmontar
  const instancesRef = useRef<Record<string, Chart>>({});

  // Dados (mantidos aqui para fácil ajuste futuro)
  const chartData = {
    currentCosts: {
      labels: ["Custo de Emissão de Boleto", "Custo de VOIP"],
      data: [8940, 1400],
      colors: ["#EF4444", "#F97316"],
    },
    pieAtual: {
      labels: ["Custo Total", "Receita Bruta"],
      data: [10340, 16800],
      colors: ["#EF4444", "#3B82F6"],
    },
    pieNovo: {
      labels: ["Custo Projetado", "Receita Bruta"],
      data: [1326.5, 16800],
      colors: ["#22C55E", "#3B82F6"],
    },
    projection: {
      labels: [
        "Out/25",
        "Nov/25",
        "Dez/25",
        "Jan/26",
        "Fev/26",
        "Mar/26",
        "Abr/26",
        "Mai/26",
        "Jun/26",
        "Jul/26",
        "Ago/26",
        "Set/26",
        "Out/26",
        "Nov/26",
        "Dez/26",
      ],
      datasets: [
        { label: "Custo WhatsApp", data: Array(15).fill(480), bg: "#22C55E" },
        {
          label: "Custo Asaas",
          data: [
            696.5, 748.24, 801.97, 860.88, 923.36, 991.02, 1064.65, 1142.26,
            1227.83, 1317.38, 1412.9, 1518.37, 1630.81, 1753.19, 1880.55,
          ],
          bg: "#8B5CF6",
        },
        { label: "Custo VPS", data: Array(15).fill(150), bg: "#F97316" },
      ],
    },
  };

  // Função auxiliar para criar/destruir instâncias
  const makeChart = (key: string, ctx: CanvasRenderingContext2D, config: any) => {
    if (instancesRef.current[key]) {
      try {
        instancesRef.current[key].destroy();
      } catch {}
    }
    instancesRef.current[key] = new Chart(ctx, config);
  };

  useEffect(() => {
    if (!hasMounted) return;

    // Gráfico: composição de custos atuais
    if (currentCostsRef.current) {
      makeChart(
        "currentCosts",
        currentCostsRef.current.getContext("2d") as CanvasRenderingContext2D,
        {
          type: "doughnut",
          data: {
            labels: chartData.currentCosts.labels,
            datasets: [
              {
                data: chartData.currentCosts.data,
                backgroundColor: chartData.currentCosts.colors,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { position: "bottom" }, title: { display: true, text: "Composição dos Custos Atuais" } },
          },
        }
      );
    }

    // Gráfico: pizza cenário atual
    if (pieAtualRef.current) {
      makeChart("pieAtual", pieAtualRef.current.getContext("2d") as CanvasRenderingContext2D, {
        type: "doughnut",
        data: {
          labels: chartData.pieAtual.labels,
          datasets: [
            { data: chartData.pieAtual.data, backgroundColor: chartData.pieAtual.colors },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: "bottom" }, title: { display: true, text: "Cenário Atual" } },
        },
      });
    }

    // Gráfico: pizza novo cenário (1º mês)
    if (pieNovoRef.current) {
      makeChart("pieNovo", pieNovoRef.current.getContext("2d") as CanvasRenderingContext2D, {
        type: "doughnut",
        data: {
          labels: chartData.pieNovo.labels,
          datasets: [
            { data: chartData.pieNovo.data, backgroundColor: chartData.pieNovo.colors },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: "bottom" }, title: { display: true, text: "Projeção do Primeiro Mês" } },
        },
      });
    }

    // Gráfico: projeção empilhada
    if (projectionRef.current) {
      makeChart("projection", projectionRef.current.getContext("2d") as CanvasRenderingContext2D, {
        type: "bar",
        data: {
          labels: chartData.projection.labels,
          datasets: chartData.projection.datasets.map((d) => ({
            label: d.label,
            data: d.data,
            backgroundColor: d.bg,
            stack: "a",
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Projeção de Custos (Out/25 - Dez/26)" },
          },
          scales: {
            x: { stacked: true, title: { display: true, text: "Mês" } },
            y: { stacked: true, beginAtZero: true, title: { display: true, text: "Custo (R$)" } },
          },
        },
      });
    }

    // Cleanup ao desmontar
    return () => {
      Object.values(instancesRef.current).forEach((c) => {
        try {
          c.destroy();
        } catch {}
      });
      instancesRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMounted]); // sem deps de dados para não recriar sem necessidade

  if (!hasMounted) return null; // evita hydration mismatch

  return (
    <div className="bg-gray-50 text-gray-800" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.92rem" }}>
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Transformando Custos em Lucro</h1>
          <p className="text-base md:text-lg text-gray-600">Uma Análise de ROI para a Automação do Processo de Cobrança</p>
        </header>

        {/* Seção do problema / cenário atual */}
        <section id="problema" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-2">O Cenário Atual: Ineficiência e Custos Elevados</h2>
            <p className="max-w-3xl mx-auto text-gray-600">
              O processo manual atual gera custos fixos altos, baixa conversão e perda de contato com milhares de clientes, resultando em um grande volume de receita não capturada.
            </p>
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
                <p className="text-gray-600 mb-4">
                  <strong className="text-red-600">Custo de Emissão (R$ 8.940):</strong> O maior vilão. O cliente paga R$ 1,49 por cada um dos 6.000 boletos, independentemente se o cliente
                  final paga ou não. Isso representa 86% do custo total.
                </p>
                <p className="text-gray-600">
                  <strong className="text-orange-500">Custo de VOIP (R$ 1.400):</strong> Um custo fixo significativo para tentativas de contato manual, com baixa escalabilidade e eficiência.
                </p>
              </div>
              <div className="chart-container h-64 md:h-80 max-h-80">
                <canvas ref={currentCostsRef} aria-label="Gráfico de pizza da composição dos custos atuais" />
              </div>
            </div>
          </div>
        </section>

        {/* Cards pizza atual vs novo */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Cenário Atual</h2>
              <div className="relative h-[300px] md:h-[400px]">
                <canvas ref={pieAtualRef} aria-label="Gráfico de pizza do cenário atual" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Projeção do Primeiro Mês</h2>
              <div className="relative h-[300px] md:h-[400px]">
                <canvas ref={pieNovoRef} aria-label="Gráfico de pizza da projeção do primeiro mês" />
              </div>
            </div>
          </div>
        </section>

        {/* Projeção de custos empilhada */}
        <section className="mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Projeção de Custos</h2>
            <div className="relative h-[300px] md:h-[480px]">
              <canvas ref={projectionRef} aria-label="Gráfico de barras empilhadas da projeção de custos" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
