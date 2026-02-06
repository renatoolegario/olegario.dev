export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const username = req.query.username;
        if (!username) return res.status(400).json({ error: "username é obrigatório" });

        const token = process.env.GITHUB_TOKEN; // ✅ server-only
        if (!token) return res.status(500).json({ error: "GITHUB_TOKEN não configurado" });

        const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              colors
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                  weekday
                }
              }
            }
          }
        }
      }
    `;

        const r = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query, variables: { login: username } }),
        });

        const json = await r.json();

        if (!r.ok || json.errors?.length) {
            return res.status(500).json({
                error: json.errors?.[0]?.message || "Erro ao consultar GitHub GraphQL",
                details: json.errors || null,
            });
        }

        const calendar =
            json?.data?.user?.contributionsCollection?.contributionCalendar;

        // Cache no CDN (Vercel) por 6h (ajuste como quiser)
        res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");

        return res.status(200).json(calendar);
    } catch (e) {
        return res.status(500).json({ error: e?.message || "Erro interno" });
    }
}
