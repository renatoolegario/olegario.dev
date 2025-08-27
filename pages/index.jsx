"use client";
import { useState } from "react";
import {
  AppBar, Box, Button, Card, Container, Grid, IconButton, Link, Toolbar, Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  Extension as ExtensionIcon,
  SmartToy as SmartToyIcon,
  Psychology as PsychologyIcon,
  BusinessCenter as BusinessCenterIcon,
  RocketLaunch as RocketLaunchIcon,
} from "@mui/icons-material";
import ParticlesHero from "utils/vercel-logo-particles";

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

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Início", id: "home" },
    { label: "Sobre", id: "about" },
    { label: "Tecnologias", id: "technologies" },
    { label: "Portfólio", id: "portfolio" },
    { label: "Contato", id: "contact" },
  ];

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

  const socialLinks = [
    {
      icon: GitHubIcon,
      name: "GitHub",
      href: "https://github.com/renatoolegario",
    },
    {
      icon: LinkedInIcon,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/renato-oleg%C3%A1rio-3b28a3147/",
    },
    {
      icon: InstagramIcon,
      name: "Instagram",
      href: "https://www.instagram.com/olegario.dev/",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <style>{pulse}</style>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(4px)",
          borderBottom: (theme) => `1px solid ${theme.palette.grey[800]}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}
            >
              Olegário.Dev
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  color="inherit"
                  onClick={() => scrollToSection(link.id)}
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleMenu}
              sx={{ display: { md: "none" } }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
          {isMenuOpen && (
            <Box sx={{ display: { md: "none" }, p: 2 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.id}
                  fullWidth
                  color="inherit"
                  onClick={() => scrollToSection(link.id)}
                  sx={{ justifyContent: "flex-start", "&:hover": { color: "primary.main" } }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}
        </Container>
      </AppBar>

      <Box component="section" id="home" sx={{ position: "relative" }}>
        <ParticlesHero />
        <Box>
          

        </Box>
      </Box>

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

      <Box component="section" id="technologies" sx={{ py: 10, px: 3, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}>
            Tecnologias
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {technologies.map((tech) => (
              <Grid item key={tech.name} xs={6} sm={4} md={2} sx={{ textAlign: "center" }}>
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
                  <tech.icon sx={{ fontSize: 50, color: tech.color }} />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {tech.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="portfolio" sx={{ py: 10, px: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}>
            Bibliotecas e utilitárioss
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ bgcolor: "grey.800", p: 3, color: "text.primary" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1.5 }}>
                  Mapas
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 2 }}>
                  Bibliotecas de Mapas
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Link href="https://docs.mapbox.com/mapbox-gl-js/api/" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: "primary.main", color: 'black', fontSize: "0.75rem", px: 1.5, py: 0.5, borderRadius: 1, textDecoration: 'none', "&:hover": { bgcolor: "primary.dark" } }}>
                    mapbox-gl
                  </Link>
                  <Link href="https://turfjs.org/" target="_blank" rel="noopener noreferrer" sx={{ bgcolor: "primary.main", color: 'black', fontSize: "0.75rem", px: 1.5, py: 0.5, borderRadius: 1, textDecoration: 'none', "&:hover": { bgcolor: "primary.dark" } }}>
                    turf
                  </Link>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Link href="https://resend.com/emails" target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none' }}>
                <Card sx={{ bgcolor: "grey.800", p: 3, height: '100%', color: "text.primary", "&:hover": { bgcolor: "grey.700" } }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1.5 }}>
                    E-mails
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 2 }}>
                    Resend: API de e-mail para desenvolvedores.
                  </Typography>
                  <Box sx={{ bgcolor: "primary.main", color: 'black', fontSize: "0.75rem", px: 1.5, py: 0.5, borderRadius: 1, display: 'inline-block' }}>
                    resend
                  </Box>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: 10, px: 3, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}>
            Redes Sociais
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "grey.800",
                    p: 2,
                    borderRadius: "50%",
                    transition: "background-color 0.3s",
                    "&:hover": { bgcolor: "primary.main" },
                  }}
                >
                  <social.icon fontSize="large" />
                </Box>
                <Typography variant="caption">{social.name}</Typography>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section" id="contact" sx={{ py: 10, px: 3 }}>
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
    </Box>
  );
}
