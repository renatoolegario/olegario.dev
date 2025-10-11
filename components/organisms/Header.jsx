"use client";
import { useState } from "react";
import {
  AppBar, Box, Button, Container, IconButton, Toolbar, Typography,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

export default function Header() {
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

  return (
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
  );
}