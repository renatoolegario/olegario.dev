import { Box, Grid, Typography } from "@mui/material";

export default function TechnologyCard({ technology }) {
  return (
    <Grid item xs={6} sm={4} md={2} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          bgcolor: "grey.800",
          width: 100,
          height: 100,
          borderRadius: 2,
          mx: "auto",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <technology.icon sx={{ fontSize: 50, color: technology.color }} />
      </Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {technology.name}
      </Typography>
    </Grid>
  );
}