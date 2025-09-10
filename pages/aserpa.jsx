
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

// Registrar Chart.js uma única vez no escopo do módulo
Chart.register(...registerables);

export default function Aserpa() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [chartData, setChartData] = useState({
    pieAtual: {
      labels: ["Custo Total", "Receita Bruta"],
      data: [10340, 16800],
    },
    pieNovo: {
      labels: ["Custo Projetado", "Receita Bruta"],
      data: [1326.5, 16800],
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
        {
          label: "Custo WhatsApp",
          data: Array(15).fill(480),
          stack: "a",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Custo Asaas",
          data: [
            696.5, 748.24, 801.97, 860.88, 923.36, 991.02, 1064.65, 1142.26,
            1227.83, 1317.38, 1412.9, 1518.37, 1630.81, 1753.19, 1880.55,
          ],
          stack: "a",
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Custo VPS",
          data: Array(15).fill(150),
          stack: "a",
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    },
  });

  const pieAtualRef = useRef(null);
  const pieNovoRef = useRef(null);
  const projectionRef = useRef(null);
  const instancesRef = useRef({});

  useEffect(() => {
    if (!hasMounted) return;

    const makeChart = (key, ctx, config) => {
      if (!ctx) {
        console.warn(`Canvas context for ${key} is null`);
        return;
      }
      if (instancesRef.current[key]) {
        instancesRef.current[key].destroy();
      }
      instancesRef.current[key] = new Chart(ctx, config);
    };

    if (pieAtualRef.current) {
      makeChart("pieAtual", pieAtualRef.current.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: chartData.pieAtual.labels,
          datasets: [
            {
              data: chartData.pieAtual.data,
              backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Cenário Atual" },
          },
          aria: { label: "Gráfico de pizza mostrando o cenário atual de custos e receita" },
        },
      });
    }

    if (pieNovoRef.current) {
      makeChart("pieNovo", pieNovoRef.current.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: chartData.pieNovo.labels,
          datasets: [
            {
              data: chartData.pieNovo.data,
              backgroundColor: ["rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Projeção do Primeiro Mês" },
          },
          aria: { label: "Gráfico de pizza mostrando a projeção de custos e receita do primeiro mês" },
        },
      });
    }

    if (projectionRef.current) {
      makeChart("projection", projectionRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: chartData.projection.labels,
          datasets: chartData.projection.datasets,
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
          aria: { label: "Gráfico de barras empilhadas mostrando a projeção de custos ao longo do tempo" },
        },
      });
    }

    return () => {
      Object.values(instancesRef.current).forEach((chart) => {
        try {
          chart.destroy();
        } catch (error) {
          console.warn("Error destroying chart:", error);
        }
      });
      instancesRef.current = {};
    };
  }, [chartData, hasMounted]);

  if (!hasMounted) {
    return null; // ou um placeholder para evitar renderização no servidor
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Transformando Custos em Lucro
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Uma Análise de ROI para a Automação do Processo de Cobrança
          </p>
        </header>

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

        <section className="mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Projeção de Custos</h2>
            <div className="relative h-[300px] md:h-[480px]">
              <canvas ref={projectionRef} aria-label="Gráfico de barras de projeção de custos" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}