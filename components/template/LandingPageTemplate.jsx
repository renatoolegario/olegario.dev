import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import LandingSection from "components/organisms/LandingSection";

export default function LandingPageTemplate({ sections }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%)",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2.5}>
          <Box
            sx={{
              bgcolor: "#ffffff",
              border: "1px solid #dbeafe",
              borderRadius: 4,
              p: { xs: 2, md: 3 },
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
            >
              <Stack spacing={1.2}>
                <Image src="/logotipo.png" alt="Logotipo Olegário Dev" width={140} height={140} priority />
                <Typography component="h1" variant="h3" sx={{ fontWeight: 900, color: "#0f172a" }}>
                  Olegário Dev
                </Typography>
                <Typography sx={{ color: "#334155", maxWidth: 760, lineHeight: 1.7 }}>
                  Sou arquiteto de software e fundador técnico com 12 anos de mercado, especializado em tirar MVPs do papel e colocá-los no mercado com o menor custo possível, sem abrir mão de arquitetura sólida e infraestrutura bem planejada.
                </Typography>
                <Typography sx={{ color: "#334155", maxWidth: 760, lineHeight: 1.7 }}>
                  Atuo desde a ideia até a execução completa do sistema, incluindo arquitetura, backend, frontend, infraestrutura e automações.
                </Typography>
              </Stack>

              <Box sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #bfdbfe", lineHeight: 0 }}>
                <Image src="/olegario.jpeg" alt="Foto de Olegário" width={260} height={320} />
              </Box>
            </Stack>
          </Box>

          {sections.map((section) => (
            <LandingSection key={section.id} section={section} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
