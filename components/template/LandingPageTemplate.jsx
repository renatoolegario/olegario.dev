import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SectionCard from "components/molecules/SectionCard";

export default function LandingPageTemplate({ sections, onSelectSection }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 36%, #eff6ff 100%)",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border: "1px solid #dbeafe",
              backgroundColor: "#ffffff",
              borderRadius: 4,
              p: { xs: 2, md: 3 },
            }}
          >
            <Stack spacing={1.2}>
              <Image src="/logotipo.png" alt="Logotipo Olegario Dev" width={180} height={180} priority />
              <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: 800 }}>
                Olegário Dev
              </Typography>
              <Typography sx={{ color: "#334155", maxWidth: 620 }}>
                Arquiteto de software e fundador técnico, especializado em MVPs,
                automações e plataformas SaaS com foco em custo enxuto e arquitetura escalável.
              </Typography>
            </Stack>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #dbeafe",
                lineHeight: 0,
              }}
            >
              <Image src="/olegario.jpeg" alt="Foto de Olegário" width={270} height={320} />
            </Box>
          </Stack>

          <Typography sx={{ color: "#334155" }}>
            Clique em cada bloco para abrir os modais com detalhes completos do meu posicionamento técnico,
            stack, projetos e formas de contato.
          </Typography>

          <Grid container spacing={1.5}>
            {sections.map((section, index) => (
              <Grid item xs={12} sm={6} md={4} key={section.title}>
                <SectionCard
                  index={index}
                  title={section.title}
                  subtitle={section.subtitle}
                  onClick={() => onSelectSection(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
