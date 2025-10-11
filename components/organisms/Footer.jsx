import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.grey[800]}`,
        py: 6,
        px: 3,
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
          Desde 2012 até 2025
        </Typography>
      </Container>
    </Box>
  );
}