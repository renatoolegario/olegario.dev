import { Box, Container, Typography } from "@mui/material";

export default function AboutSection() {
  return (
    <Box component="section" id="about" sx={{ py: 10, px: 3 }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
          Sobre Mim
        </Typography>
        <Typography variant="h5" sx={{ color: "text.secondary", textAlign: "center", lineHeight: 1.6 }}>
          Desenvolvedor apaixonado por tecnologia com experiência em desenvolvimento web full stack. Especializado em
          criar aplicações modernas, escaláveis e com foco na experiência do usuário.
        </Typography>
      </Container>
    </Box>
  );
}