"use client";
import { useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function Aserpa() {
  useEffect(() => {
    // --- Gráfico composição de custos atuais
    const currentCtx = document
      .getElementById("currentCostsChart")
      ?.getContext("2d");
    if (currentCtx) {
      new Chart(currentCtx, {
        type: "doughnut",
        data: {
          labels: ["Custo de Emissão de Boleto", "Custo de VOIP"],
          datasets: [
            {
              data: [8940, 1400],
              backgroundColor: ["#EF4444", "#F97316"],
            },
          ],
        },
        options: { plugins: { legend: { position: "bottom" } } },
      });
    }

    // --- Gráfico pizza Cenário Atual
    const pieAtualCtx = document.getElementById("pieAtual")?.getContext("2d");
    if (pieAtualCtx) {
      new Chart(pieAtualCtx, {
        type: "doughnut",
        data: {
          labels: ["Custo Total", "Receita Bruta"],
          datasets: [
            {
              data: [10340, 16800],
              backgroundColor: ["#EF4444", "#3B82F6"],
            },
          ],
        },
        options: { plugins: { legend: { position: "bottom" } } },
      });
    }

    // --- Gráfico pizza Novo
    const pieNovoCtx = document.getElementById("pieNovo")?.getContext("2d");
    if (pieNovoCtx) {
      new Chart(pieNovoCtx, {
        type: "doughnut",
        data: {
          labels: ["Custo Projetado", "Receita Bruta"],
          datasets: [
            {
              data: [1326.5, 16800],
              backgroundColor: ["#22C55E", "#3B82F6"],
            },
          ],
        },
        options: { plugins: { legend: { position: "bottom" } } },
      });
    }

    // --- Gráfico Projeção de custos
    const projectionCtx = document
      .getElementById("projectionChart")
      ?.getContext("2d");
    if (projectionCtx) {
      new Chart(projectionCtx, {
        type: "bar",
        data: {
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
            {
              label: "Custo WhatsApp",
              data: Array(15).fill(480),
              backgroundColor: "#22C55E",
              stack: "a",
            },
            {
              label: "Custo Asaas",
              data: [
                696.5, 748.24, 801.97, 860.88, 923.36, 991.02, 1064.65, 1142.26,
                1227.83, 1317.38, 1412.9, 1518.37, 1630.81, 1753.19, 1880.55,
              ],
              backgroundColor: "#8B5CF6",
              stack: "a",
            },
            {
              label: "Custo VPS",
              data: Array(15).fill(150),
              backgroundColor: "#F97316",
              stack: "a",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom" } },
          scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true },
          },
        },
      });
    }
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Transformando Custos em Lucro
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Uma Análise de ROI para a Automação do Processo de Cobrança
          </p>
        </header>

        {/* Exemplo de uso */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Cenário Atual</h3>
              <canvas id="pieAtual"></canvas>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Projeção do Primeiro Mês</h3>
              <canvas id="pieNovo"></canvas>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-2">
              Projeção de Custos
            </h3>
            <div className="chart-container">
              <canvas id="projectionChart"></canvas>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .chart-container {
          position: relative;
          width: 100%;
          height: 300px;
          max-height: 400px;
        }
        @media (min-width: 768px) {
          .chart-container {
            height: 480px;
            max-height: 560px;
          }
        }
      `}</style>
    </div>
  );
}
