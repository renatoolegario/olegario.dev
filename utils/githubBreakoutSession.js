const DEFAULT_GITHUB_USERNAME = 'renatoolegario';

function loadGithubBreakoutModule() {
  try {
    const requireFn = eval('require');
    return requireFn('github-breakout');
  } catch (error) {
    throw new Error(
      'Dependência "github-breakout" não encontrada. Instale o pacote antes de usar esta sessão.',
    );
  }
}

export async function createGithubBreakoutSession({
  username = DEFAULT_GITHUB_USERNAME,
  enableGhostBricks,
  paddleColor,
  ballColor,
  bricksColors,
} = {}) {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('Defina GITHUB_TOKEN no ambiente para gerar o SVG do breakout.');
  }

  if (typeof enableGhostBricks !== 'boolean') {
    throw new Error('O campo "enableGhostBricks" é obrigatório e deve ser boolean.');
  }

  const { generateSVG } = loadGithubBreakoutModule();

  const svg = await generateSVG(username, token, {
    enableGhostBricks,
    paddleColor,
    ballColor,
    bricksColors,
  });

  return {
    username,
    svg,
  };
}
