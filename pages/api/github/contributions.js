export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'username e obrigatorio' });
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(503).json({ error: 'Integracao GitHub indisponivel no momento.' });
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

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { login: username } }),
    });

    const json = await response.json();
    if (!response.ok || json?.errors?.length) {
      return res.status(502).json({ error: 'Nao foi possivel buscar dados reais do GitHub agora.' });
    }

    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return res.status(404).json({ error: 'Calendario de contribuicoes nao encontrado.' });
    }

    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json(calendar);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao consultar contribuicoes do GitHub.' });
  }
}
