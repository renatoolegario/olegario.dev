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
        if (alive) setErr(e?.message || "Erro ao carregar calendário");
      }
    })();

    return () => (alive = false);
  }, [username]);

  const weeks = useMemo(() => data?.weeks || [], [data]);

  if (err) {
    return (
      <div className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
        Não foi possível carregar as contribuições do GitHub agora. Tente novamente em alguns minutos.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-200">
        Carregando contribuições reais do GitHub...
      </div>
    );
  }

  const CELL = 8;
  const GAP = 1.5;
  const width = weeks.length * (CELL + GAP);
  const height = 7 * (CELL + GAP);

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: 18,
        background:
          "linear-gradient(180deg, rgba(11, 18, 32, 0.96), rgba(2, 6, 23, 0.98))",
        border: "1px solid rgba(30, 41, 59, 0.9)",
        color: "#e2e8f0",
        fontFamily: "var(--font-body)",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          marginBottom: 10,
          opacity: 0.9,
          fontSize: "0.9rem",
          lineHeight: 1.5,
        }}
      >
        <strong>{data.totalContributions.toLocaleString("pt-BR")}</strong> contribuições nos últimos 12 meses
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Calendário de contribuições do GitHub"
        preserveAspectRatio="xMinYMin meet"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
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
                rx={1.5}
                ry={1.5}
                fill={d.color}
              >
                <title>{`${d.date}: ${d.contributionCount} contribuições`}</title>
              </rect>
            );
          })
        )}
      </svg>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          gap: 6,
          alignItems: "center",
          opacity: 0.85,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 10 }}>Menos</span>
        <div style={{ display: "flex", gap: 3 }}>
          {data.colors.map((c) => (
            <span
              key={c}
              style={{
                width: CELL,
                height: CELL,
                borderRadius: 1.5,
                background: c,
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 10 }}>Mais</span>
      </div>
    </div>
  );
}
