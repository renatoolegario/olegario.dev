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

  // Medidas parecidas com GitHub
  const CELL = 11;
  const GAP = 2;
  const width = weeks.length * (CELL + GAP);
  const height = 7 * (CELL + GAP);

  return (
    <div style={{
      padding: 16,
      borderRadius: 12,
      background: "#0b1220",
      border: "1px solid #1e293b",
      overflowX: "auto",
      color: "#e2e8f0",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    }}>
      <div style={{ marginBottom: 10, opacity: 0.9 }}>
        <strong>{data.totalContributions.toLocaleString("pt-BR")}</strong> contributions in the last year
      </div>

      <svg width={Math.max(width, 640)} height={height} role="img" aria-label="GitHub contribution calendar">
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
                rx={2}
                ry={2}
                fill={d.color} // ✅ vem do GitHub (já é a cor oficial do tema light)
              >
                <title>{`${d.date}: ${d.contributionCount} contributions`}</title>
              </rect>
            );
          })
        )}
      </svg>

      <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center", opacity: 0.85 }}>
        <span style={{ fontSize: 12 }}>Less</span>
        <div style={{ display: "flex", gap: 4 }}>
          {data.colors.map((c) => (
            <span key={c} style={{
              width: 11,
              height: 11,
              borderRadius: 2,
              background: c,
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.06)"
            }} />
          ))}
        </div>
        <span style={{ fontSize: 12 }}>More</span>
      </div>
    </div>
  );
}
