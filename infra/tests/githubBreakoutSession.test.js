import { createGithubBreakoutSession } from '../../utils/githubBreakoutSession';

describe('createGithubBreakoutSession', () => {
  const originalGithubToken = process.env.GITHUB_TOKEN;

  afterEach(() => {
    if (originalGithubToken === undefined) {
      delete process.env.GITHUB_TOKEN;
      return;
    }

    process.env.GITHUB_TOKEN = originalGithubToken;
  });

  test('deve falhar quando GITHUB_TOKEN não está configurado', async () => {
    delete process.env.GITHUB_TOKEN;

    await expect(
      createGithubBreakoutSession({
        enableGhostBricks: true,
      }),
    ).rejects.toThrow('Defina GITHUB_TOKEN no ambiente para gerar o SVG do breakout.');
  });

  test('deve falhar quando enableGhostBricks não é boolean', async () => {
    process.env.GITHUB_TOKEN = 'fake-token';

    await expect(
      createGithubBreakoutSession({
        enableGhostBricks: 'true',
      }),
    ).rejects.toThrow('O campo "enableGhostBricks" é obrigatório e deve ser boolean.');
  });
});
