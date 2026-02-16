export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const username = req.query.username;
        if (!username) return res.status(400).json({ error: "username é obrigatório" });

        const token = process.env.GITHUB_TOKEN; // ✅ server-only

        // Handle missing token gracefully with mock data
        if (!token) {
            console.warn("GITHUB_TOKEN não configurado. Retornando dados mock/vazios.");
            return res.status(200).json(generateMockData());
        }

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
             // Fallback to mock data on API error instead of crashing
             console.error("Erro GitHub API:", json.errors?.[0]?.message);
             return res.status(200).json(generateMockData());
        }

        const calendar =
            json?.data?.user?.contributionsCollection?.contributionCalendar;

        // Cache no CDN (Vercel) por 6h (ajuste como quiser)
        res.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");

        return res.status(200).json(calendar);
    } catch (e) {
        console.error("Erro interno:", e);
        // Fallback to mock data on exception
        return res.status(200).json(generateMockData());
    }
}

function generateMockData() {
    // Generates a blank calendar structure
    const weeks = [];
    // Approximate 52 weeks
    for (let i = 0; i < 53; i++) {
        const days = [];
        for (let j = 0; j < 7; j++) {
            days.push({
                date: "2023-01-01", // Dummy date
                contributionCount: 0,
                color: "#161b22", // Default dark color
                weekday: j
            });
        }
        weeks.push({ contributionDays: days });
    }

    return {
        totalContributions: 0,
        colors: ["#0e4429", "#006d32", "#26a641", "#39d353"], // Standard GitHub greens
        weeks: weeks
    };
}
