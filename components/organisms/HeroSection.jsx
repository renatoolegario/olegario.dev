import { Box } from "@mui/material";
import ParticlesHero from "utils/vercel-logo-particles";

export default function HeroSection() {
  return (
    <Box component="section" id="home" sx={{ position: "relative" }}>
      <ParticlesHero />
      <Box>
        {}
      </Box>
    </Box>
  );
}