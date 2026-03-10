import { LANDING_BASELINE_YEAR, projects } from '../../../utils/landingData';

async function fetchGithubContributions({ token, username }) {
  if (!token) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
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
      return null;
    }

    return json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const username = req.query.username || 'renatoolegario';
  const token = process.env.GITHUB_TOKEN;
  const year = new Date().getUTCFullYear();
  const yearsExperience = Math.max(1, year - LANDING_BASELINE_YEAR);
  const ownVentures = projects.filter((project) => project.model === 'negocio_proprio').length;
  const featuredProjects = projects.filter((project) => project.isFeatured).length;
  const githubContributions = await fetchGithubContributions({ token, username });

  return res.status(200).json({
    data: {
      counts: {
        years_experience: yearsExperience,
        own_ventures: ownVentures,
        projects_total: projects.length,
        featured_projects: featuredProjects,
        github_contributions: githubContributions,
      },
      updated_at: new Date().toISOString(),
    },
  });
}
