import { Box, Button, Container, Typography } from "@mui/material";
import { Phone as PhoneIcon } from "@mui/icons-material";

const pulse = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
`;

export default function ContactSection() {
  return (
    <Box component="section" id="contact" sx={{ py: 10, px: 3 }}>
      <style>{pulse}</style>
      <Container maxWidth="md">
        <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}>
          Fale Comigo
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Button
            variant="contained"
            href="https://wa.me/5534992399036"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<PhoneIcon />}
            sx={{
              bgcolor: "green.500",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "green.600",
                "& .MuiSvgIcon-root": {
                  animation: "pulse 1s infinite",
                },
              },
            }}
          >
            <Typography sx={{ fontSize: "1.125rem", fontWeight: 600 }}>
              WhatsApp
            </Typography>
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">
              <Typography component="span" sx={{ fontWeight: 600 }}>E-mail:</Typography> multiplas.fr@gmail.com
            </Typography>
            <Typography variant="h6">
              <Typography component="span" sx={{ fontWeight: 600 }}>CNPJ:</Typography> 37398466000105
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}