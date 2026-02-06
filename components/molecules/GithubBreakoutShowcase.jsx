import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

const GITHUB_USERNAME = 'renatoolegario';

export default function GithubBreakoutShowcase() {
  const [state, setState] = useState({ status: 'loading', svg: '', error: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadBreakout() {
      try {
        const response = await fetch('/api/github-breakout/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: GITHUB_USERNAME,
            enableGhostBricks: true,
            paddleColor: '#2563eb',
            ballColor: '#0f172a',
            bricksColors: ['#0f172a', '#1d4ed8', '#2563eb', '#38bdf8'],
          }),
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || 'Não foi possível carregar o breakout do GitHub.');
        }

        if (isMounted) {
          setState({ status: 'success', svg: payload.svg, error: '' });
        }
      } catch (error) {
        if (isMounted) {
          setState({ status: 'error', svg: '', error: error.message });
        }
      }
    }

    loadBreakout();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Stack spacing={1.5}>
      <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
        Visual técnico em tempo real consumindo a biblioteca <strong>github-breakout</strong> via endpoint interno.
      </Typography>

      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: '#020617',
          border: '1px solid',
          borderColor: '#1e293b',
          overflowX: 'auto',
          minHeight: 130,
        }}
      >
        {state.status === 'loading' ? (
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <CircularProgress size={20} sx={{ color: '#38bdf8' }} />
            <Typography sx={{ color: '#cbd5e1' }}>Gerando SVG do breakout…</Typography>
          </Stack>
        ) : null}

        {state.status === 'error' ? (
          <Typography sx={{ color: '#fca5a5' }}>
            {state.error}
          </Typography>
        ) : null}

        {state.status === 'success' ? (
          <Box
            sx={{
              minWidth: 640,
              '& svg': { width: '100%', height: 'auto', display: 'block' },
            }}
            dangerouslySetInnerHTML={{ __html: state.svg }}
          />
        ) : null}
      </Box>

      <Box
        component="img"
        src={`https://ghchart.rshah.org/2563eb/${GITHUB_USERNAME}`}
        alt="Mapa de contribuições do GitHub de renatoolegario"
        loading="lazy"
        sx={{
          width: '100%',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: '#0b1220',
        }}
      />
    </Stack>
  );
}
