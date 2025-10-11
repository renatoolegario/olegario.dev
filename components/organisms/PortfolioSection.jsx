import { Box, Container, Grid, Typography } from "@mui/material";
import PortfolioCard from "../molecules/PortfolioCard";

const portfolioCards = [
  {
    title: "Mapas",
    description: "Bibliotecas de Mapas",
    tags: [
      { name: "mapbox-gl", href: "https://docs.mapbox.com/mapbox-gl-js/api/" },
      { name: "turf", href: "https://turfjs.org/" },
    ]
  },
  {
    title: "E-mails",
    description: "Resend: API de e-mail para desenvolvedores.",
    href: "https://resend.com/emails",
    tags: [{ name: "resend", href: "https://resend.com/docs/introduction" }]
  }
]

export default function PortfolioSection() {
  return (
    <Box component="section" id="portfolio" sx={{ py: 10, px: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}>
          Bibliotecas e utilitários
        </Typography>
        <Grid container spacing={4}>
          {portfolioCards.map(card => <PortfolioCard key={card.title} card={card} />)}
        </Grid>
      </Container>
    </Box>
  );
}