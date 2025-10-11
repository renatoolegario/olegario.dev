import { Box, Container, Grid, Typography } from "@mui/material";
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  Extension as ExtensionIcon,
  SmartToy as SmartToyIcon,
  Psychology as PsychologyIcon,
  RocketLaunch as RocketLaunchIcon,
} from "@mui/icons-material";
import TechnologyCard from "../molecules/TechnologyCard";

const technologies = [
  { name: "PHP", icon: CodeIcon, color: "secondary.main" },
  { name: "React", icon: RocketLaunchIcon, color: "primary.main" },
  { name: "Next.js", icon: RocketLaunchIcon, color: "text.primary" },
  { name: "MySQL", icon: StorageIcon, color: "orange.main" },
  { name: "PostgreSQL", icon: StorageIcon, color: "blue.main" },
  { name: "VPS", icon: DnsIcon, color: "green.500" },
  { name: "Extensões Web", icon: ExtensionIcon, color: "error.main" },
  { name: "Automações", icon: SmartToyIcon, color: "yellow.main" },
  { name: "N8N", icon: SmartToyIcon, color: "indigo.main" },
  { name: "IA", icon: PsychologyIcon, color: "secondary.main" },
];

export default function TechnologiesSection() {
  return (
    <Box component="section" id="technologies" sx={{ py: 10, px: 3, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}>
          Tecnologias
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {technologies.map((tech) => (
            <TechnologyCard key={tech.name} technology={tech} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}