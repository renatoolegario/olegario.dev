"use client";

import { useEffect, useMemo, useState } from "react";

export default function GithubContribCalendar({ username = "renatoolegario" }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setErr("");
        const r = await fetch(`/api/github/contributions?username=${encodeURIComponent(username)}`);
        const json = await r.json();
        if (!r.ok) throw new Error(json?.error || "Falha ao buscar contribuições");
        if (alive) setData(json);
      } catch (e) {
        if (alive) setErr(e?.message || "Erro");
      }
    })();

    return () => (alive = false);
  }, [username]);

  const weeks = useMemo(() => data?.weeks || [], [data]);

  if (err) return <div style={{ color: "#fca5a5" }}>{err}</div>;
  if (!data) return <div style={{ color: "#cbd5e1" }}>Carregando contribuições…</div>;

  // --- AJUSTE DE ESCALA ---
  const CELL = 8;     // Era 11, agora 8 (tamanho do quadrado)
  const GAP = 1.5;    // Era 2, agora 1.5 (distância entre eles)
  const width = weeks.length * (CELL + GAP);
  const height = 7 * (CELL + GAP);

  return (
    <div style={{
      padding: "12px", // Reduzi um pouco o padding interno
      borderRadius: 12,
      background: "#0b1220",
      border: "1px solid #1e293b",
      overflowX: "auto",
      color: "#e2e8f0",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      width: "fit-content" // Garante que o container siga o tamanho do SVG
    }}>
      <div style={{ marginBottom: 8, opacity: 0.9, fontSize: "0.85rem" }}>
        <strong>{data.totalContributions.toLocaleString("pt-BR")}</strong> contributions in the last year
      </div>

      {/* Removido o Math.max(width, 640) para o SVG não ocupar espaço vazio desnecessário */}
      <svg width={width} height={height} role="img" aria-label="GitHub contribution calendar">
        {weeks.map((w, wi) =>
          w.contributionDays.map((d, di) => {
            const x = wi * (CELL + GAP);
            const y = d.weekday * (CELL + GAP);

            return (
              <rect
                key={`${d.date}-${wi}-${di}`}
                x={x}
                y={y}
                width={CELL}
                height={CELL}
                rx={1.5} // Arredondamento um pouco menor para combinar com o tamanho
                ry={1.5}
                fill={d.color}
              >
                <title>{`${d.date}: ${d.contributionCount} contributions`}</title>
              </rect>
            );
          })
        )}
      </svg>

      <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center", opacity: 0.85 }}>
        <span style={{ fontSize: 10 }}>Less</span>
        <div style={{ display: "flex", gap: 3 }}>
          {data.colors.map((c) => (
            <span key={c} style={{
              width: CELL,      // Segue o mesmo tamanho dos quadrados do gráfico
              height: CELL,
              borderRadius: 1.5,
              background: c,
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.06)"
            }} />
          ))}
        </div>
        <span style={{ fontSize: 10 }}>More</span>
      </div>
    </div>
  );
}