"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Fade,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";

const accentColor = "#7dd3fc";

const badgeSx = {
  px: 1.5,
  py: 0.5,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.35)",
  bgcolor: "rgba(15,23,42,0.6)",
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.92)",
  transition: "transform 0.25s ease, background-color 0.25s ease",
  cursor: "default",
  "&:hover": {
    bgcolor: accentColor,
    color: "#0f172a",
    transform: "scale(1.05)",
  },
};

export default function HomePage() {
  const sections = useMemo(() => {
    const technologies = [
      "PHP",
      "React",
      "Next.js",
      "MySQL",
      "PostgreSQL",
      "BlobStorage",
      "VPS",
      "Extensões Web",
      "IA (Gemini / ChatGPT)",
      "Vercel",
      "Neon",
      "Checkouts (Asaas / Kirvano)",
    ];

    const frameworks = [
      "Turf",
      "Mapbox",
      "Resend",
      "Crypto",
      "Codex",
      "Jules",
    ];

    const contactMethods = [
      {
        key: "phone",
        icon: PhoneIphoneIcon,
        value: "(34) 99239-9036",
        href: "tel:+5534992399036",
      },
      {
        key: "email",
        icon: MailOutlineIcon,
        value: "multiplas.fr@gmail.com",
        href: "mailto:multiplas.fr@gmail.com",
      },
      {
        key: "instagram",
        icon: InstagramIcon,
        value: "Instagram",
      },
      {
        key: "linkedin",
        icon: LinkedInIcon,
        value: "LinkedIn",
      },
      {
        key: "youtube",
        icon: YouTubeIcon,
        value: "YouTube",
      },
      {
        key: "github",
        icon: GitHubIcon,
        value: "GitHub",
      },
    ];

    const companyDetails = [
      "CNPJ: 37.398.466/0001-05",
      "Multiplasfr Sistema de Cobrança e Informática LTDA",
    ];

    const projects = [
      "FacilitAgro.com.br",
      "FalaUai.com.br",
      "UaiStack.com.br",
      "MestreStarlink.com.br",
    ];

    return [
      {
        title: "Transformando problemas em soluções eficientes!",
        subtitle: "Frase de impacto",
        body: (
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.6,
              textAlign: "justify",
            }}
          >
            Cada projeto nasce com o objetivo de entregar mais com menos no menor
            tempo possível. Unimos estratégia, tecnologia e execução enxuta para
            transformar desafios em resultados mensuráveis.
          </Typography>
        ),
      },
      {
        title: "Tecnologias",
        subtitle: "Stack principal",
        body: (
          <Stack spacing={1.5}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                textAlign: "justify",
              }}
            >
              Construímos soluções sob medida utilizando uma base moderna e
              flexível que garante performance, escalabilidade e integrações
              rápidas.
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.2}>
              {technologies.map((item) => (
                <Box key={item} sx={badgeSx}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Stack>
        ),
      },
      {
        title: "Frameworks e Suporte",
        subtitle: "Ferramentas que potencializam nossos projetos",
        body: (
          <Stack spacing={1.5}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                textAlign: "justify",
              }}
            >
              Integramos bibliotecas e serviços especializados para acelerar a
              entrega e manter a qualidade em cada etapa do ciclo de vida dos
              produtos digitais.
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.2}>
              {frameworks.map((item) => (
                <Box key={item} sx={badgeSx}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Stack>
        ),
      },
      {
        title: "Objetivo",
        subtitle: "Entregar mais com menos",
        body: (
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.6,
              textAlign: "justify",
            }}
          >
            Nosso foco é transformar a visão do cliente em realidade de forma
            pragmática, combinando automação, inteligência e design funcional para
            acelerar operações e gerar valor imediato.
          </Typography>
        ),
      },
      {
        title: "Contato",
        subtitle: "Vamos construir algo juntos?",
        body: (
          <Stack spacing={1.2}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                textAlign: "justify",
              }}
            >
              Estamos prontos para discutir novos desafios, parcerias e
              consultorias especializadas.
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.2}>
              {contactMethods.map(({ key, icon: Icon, value, href }) => (
                <Box
                  key={key}
                  component={href ? "a" : "div"}
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "rgba(255,255,255,0.85)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    textDecoration: "none",
                    transition: "transform 0.25s ease, background-color 0.25s ease",
                    "&:hover": {
                      bgcolor: accentColor,
                      color: "#0f172a",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: "1.4rem" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "inherit",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Stack spacing={0.8}>
              {companyDetails.map((item) => (
                <Box
                  key={item}
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    transition: "transform 0.25s ease, background-color 0.25s ease",
                    "&:hover": {
                      bgcolor: accentColor,
                      color: "#0f172a",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "inherit",
                      letterSpacing: "0.05em",
                      textAlign: "justify",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        ),
      },
      {
        title: "Projetos em destaque",
        subtitle: "Experiências que impulsionam negócios",
        body: (
          <Stack spacing={1.5}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                textAlign: "justify",
              }}
            >
              Soluções digitais criadas para diferentes segmentos, todas com foco
              em resultados reais e expansão contínua.
            </Typography>
            <Stack spacing={0.8}>
              {projects.map((item) => (
                <Box
                  key={item}
                  sx={{
                    color: "rgba(255,255,255,0.88)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    transition: "transform 0.25s ease, background-color 0.25s ease",
                    "&:hover": {
                      bgcolor: accentColor,
                      color: "#0f172a",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "inherit",
                      letterSpacing: "0.05em",
                      textAlign: "justify",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}
            >
              Novos projetos podem ser adicionados facilmente conforme o portfólio
              evolui.
            </Typography>
          </Stack>
        ),
      },
    ];
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < sections.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setActiveIndex((index) => Math.min(index + 1, sections.length - 1));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url(/olegario.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#ffffff",
      }}
    >
      <Box
        component="nav"
        sx={{
          px: { xs: 3, md: 6 },
          py: { xs: 2, md: 3 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: { xs: 1, md: 1.5 },
            fontWeight: 800,
            letterSpacing: { xs: "0.08em", md: "0.12em" },
            fontSize: { xs: "0.75rem", md: "0.95rem" },
            textTransform: "none",
            color: "#ffffff",
          }}
        >
          <Box component="span" sx={{ color: "#ffffff" }}>
            Olegário
          </Box>
          <Box
            component="span"
            sx={{
              px: { xs: 1, md: 1.5 },
              py: { xs: 0.35, md: 0.45 },
              borderRadius: "999px",
              backgroundColor: "#1e40af",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              letterSpacing: "inherit",
            }}
          >
            .Dev
          </Box>
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 6, md: 10 },
          pb: { xs: 4, md: 8 },
        }}
      >
        <Stack
          spacing={2.5}
          alignItems="center"
          sx={{
            height: { xs: "auto", md: 520 },
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          <IconButton
            onClick={handlePrevious}
            disabled={!hasPrevious}
            sx={{
              bgcolor: "rgba(15,23,42,0.6)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.35)",
              visibility: hasPrevious ? "visible" : "hidden",
              "&:hover": {
                bgcolor: "rgba(15,23,42,0.8)",
              },
            }}
          >
            <KeyboardArrowUpIcon fontSize="large" />
          </IconButton>

          <Box
            key={activeIndex}
            sx={{ width: "100%", maxWidth: { xs: 520, md: 680 } }}
          >
            <Fade in timeout={400}>
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "rgba(15,23,42,0.72)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 4,
                  p: { xs: 3, md: 4 },
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, md: 2 },
                  boxShadow: "0 20px 45px rgba(8,15,35,0.45)",
                  transition: "transform 0.3s ease",
                }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2.4rem" },
                    lineHeight: 1.2,
                    textAlign: "center",
                    letterSpacing: "0.03em",
                  }}
                >
                  {activeSection.title}
                </Typography>

                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    fontSize: { xs: "0.7rem", md: "0.85rem" },
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {activeSection.subtitle}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {activeSection.body}
                </Box>
              </Box>
            </Fade>
          </Box>

          <IconButton
            onClick={handleNext}
            disabled={!hasNext}
            sx={{
              bgcolor: "rgba(15,23,42,0.6)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.35)",
              visibility: hasNext ? "visible" : "hidden",
              "&:hover": {
                bgcolor: "rgba(15,23,42,0.8)",
              },
            }}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
