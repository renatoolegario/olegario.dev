import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import LandingSection from 'components/organisms/LandingSection';

export default function LandingPageTemplate({ sections }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top right, #e3f2fd 0%, #f8fbff 45%, #ffffff 100%)',
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={2.5}>
                <Chip label="Landing Page • Expert / Infoproduto" color="primary" sx={{ width: 'fit-content', fontWeight: 700 }} />
                <Typography component="h1" variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                  Olegário Dev
                </Typography>
                <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Arquiteto de software, fundador técnico e especialista em MVPs enxutos.
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  Transformo ideias em produtos digitais prontos para vender, escalar e operar com eficiência técnica desde o primeiro deploy.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button variant="contained" href="https://api.whatsapp.com/send/?phone=5534992399036" target="_blank">
                    Falar no WhatsApp
                  </Button>
                  <Button variant="outlined" href="https://github.com/renatoolegario" target="_blank">
                    Ver GitHub
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 6,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  boxShadow: '0 18px 45px rgba(30, 41, 59, 0.16)',
                  lineHeight: 0,
                }}
              >
                <Image src="/olegario.jpeg" alt="Foto Olegário Dev" width={650} height={700} priority style={{ width: '100%', height: 'auto' }} />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {[
              { label: 'Projetos próprios', value: '4+ anos com operação real' },
              { label: 'Arquitetura', value: 'Serverless + VPS + IA' },
              { label: 'Modelo', value: 'Execução full-cycle (produto + infra)' },
            ].map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 4 }}>
                <Box sx={{ p: 2.5, borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{item.label}</Typography>
                  <Typography sx={{ fontWeight: 800, mt: 0.5 }}>{item.value}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {sections.map((section) => (
            <LandingSection key={section.id} section={section} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
