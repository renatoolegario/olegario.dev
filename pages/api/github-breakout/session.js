import { createGithubBreakoutSession } from '../../../utils/githubBreakoutSession';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { username, enableGhostBricks, paddleColor, ballColor, bricksColors } = req.body || {};

    const session = await createGithubBreakoutSession({
      username,
      enableGhostBricks,
      paddleColor,
      ballColor,
      bricksColors,
    });

    return res.status(200).json(session);
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Não foi possível criar a sessão do github-breakout.',
    });
  }
}
