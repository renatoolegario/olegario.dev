import { Box, Card, Grid, Link, Typography } from "@mui/material";

export default function PortfolioCard({ card }) {
  if (card.href) {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ bgcolor: "grey.800", p: 3, height: '100%', color: "text.primary", "&:hover": { bgcolor: "grey.700" } }}>
          <Link href={card.href} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1.5 }}>
              {card.title}
            </Typography>
          </Link>
          <Typography sx={{ color: "text.secondary", mb: 2 }}>
            {card.description}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {card.tags.map(tag => (
              <Link key={tag.name} href={tag.href} target="_blank" rel="noopener noreferrer" sx={{ bgcolor: "primary.main", color: 'black', fontSize: "0.75rem", px: 1.5, py: 0.5, borderRadius: 1, textDecoration: 'none', "&:hover": { bgcolor: "primary.dark" } }}>
                {tag.name}
              </Link>
            ))}
          </Box>
        </Card>
      </Grid>
    )
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card sx={{ bgcolor: "grey.800", p: 3, color: "text.primary" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1.5 }}>
          {card.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          {card.description}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {card.tags.map(tag => (
            <Link key={tag.name} href={tag.href} target="_blank" rel="noopener noreferrer" sx={{ bgcolor: "primary.main", color: 'black', fontSize: "0.75rem", px: 1.5, py: 0.5, borderRadius: 1, textDecoration: 'none', "&:hover": { bgcolor: "primary.dark" } }}>
              {tag.name}
            </Link>
          ))}
        </Box>
      </Card>
    </Grid>
  );
}