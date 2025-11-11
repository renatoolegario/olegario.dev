"use client";
import FuzzyText from "components/FuzzyText";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  ButtonBase,
  Fade,
  IconButton,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

const panelListItemSx = {
  borderRadius: 2,
  px: 1.5,
  py: 1.1,
  gap: 1.1,
  alignItems: "center",
  justifyContent: "flex-start",
  color: "rgba(255,255,255,0.85)",
  textDecoration: "none",
  bgcolor: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.08)",
  transition:
    "transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease",
  "&:hover": {
    bgcolor: accentColor,
    color: "#0f172a",
    borderColor: "transparent",
    transform: "translateY(-2px)",
  },
  "&:focus-visible": {
    outline: `2px solid ${accentColor}`,
    outlineOffset: 2,
  },
};

export default function HomePage() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const sections = useMemo(() => {
    const technologies = [
      "PHP",
      "React",
      "Next.js",
      "MySQL",
      "PostgreSQL",
      "BlobStorage",
      "Docker",
      "VPS",
      "Extensões Web",
      "IA (Gemini / ChatGPT)",
      "Vercel",
      "Neon",
      "Checkouts (Asaas / Kirvano)",
      "Migrations",
      "REST API",
      "GitHub",
      "Facebook",
      "API WhatsApp Oficial",
      "Google Cloud",
      "Cloudflare",
    ];

    const frameworks = [
      "Turf",
      "Mapbox",
      "Resend",
      "Crypto",
      "Codex",
      "Jules",
      "node-pg-migrate",
      "MUI",
      "Zustand",
      "ESLint",
      "Prettier",
      "wa-js",
      "whaticket",
      "whiskey baileys",
      "ticketz",
    ];

    const contactMethods = [
      {
        key: "phone",
        icon: PhoneIphoneIcon,
        value: "(34) 99239-9036",
        href: "https://wa.me/5534992399036",
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
        href: "https://www.instagram.com/olegario.dev/",
      },
      {
        key: "linkedin",
        icon: LinkedInIcon,
        value: "LinkedIn",
        href: "https://www.linkedin.com/in/olegariodev/",
      },
      {
        key: "youtube",
        icon: YouTubeIcon,
        value: "YouTube",
        href: "https://www.youtube.com/@olegario-dev",
      },
      {
        key: "github",
        icon: GitHubIcon,
        value: "GitHub",
        href: "https://github.com/renatoolegario  ",
      },
    ];

    const companyDetails = [
      {
        text: "CNPJ: 37.398.466/0001-05",
        href: "https://cnpj.biz/37398466000105",
      },
      {
        text: "Multiplasfr Sistema de Cobrança e Informática LTDA",
      },
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
        subtitle: "Mais com menos",
        body: (
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.6,
              textAlign: { xs: "left", sm: "justify" },
            }}
          >
            Cada projeto nasce com o objetivo de entregar mais com menos no
            menor tempo possível. Unimos estratégia, tecnologia e execução
            enxuta para transformar desafios em resultados mensuráveis.
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
                textAlign: { xs: "left", sm: "justify" },
              }}
            >
              Construímos soluções sob medida utilizando uma base moderna e
              flexível que garante performance, escalabilidade e integrações
              rápidas.
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.2}
              justifyContent="flex-start"
            >
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
        subtitle: "Ferramentas que potencializam ",
        body: (
          <Stack spacing={1.5}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
                textAlign: { xs: "left", sm: "justify" },
              }}
            >
              Integramos bibliotecas e serviços especializados para acelerar a
              entrega e manter a qualidade em cada etapa do ciclo de vida dos
              produtos digitais.
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.2}
              justifyContent="flex-start"
            >
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
              textAlign: { xs: "left", sm: "justify" },
            }}
          >
            Nosso foco é transformar a visão do cliente em realidade de forma
            pragmática, combinando automação, inteligência e design funcional
            para acelerar operações e gerar valor imediato.
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
                textAlign: { xs: "left", sm: "justify" },
              }}
            >
              Estamos prontos para discutir novos desafios, parcerias e
              consultorias especializadas.
            </Typography>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1.2}
              justifyContent="flex-start"
            >
              {contactMethods.map(({ key, icon: Icon, value, href }) => (
                <ListItemButton
                  key={key}
                  component={href ? "a" : "div"}
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  sx={{
                    ...panelListItemSx,
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 0.6rem)",
                      md: "calc(50% - 0.6rem)",
                    },
                    maxWidth: { sm: 320 },
                    flex: "1 1 240px",
                  }}
                >
                  <Icon sx={{ fontSize: "1.4rem" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "inherit",
                      letterSpacing: "0.05em",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    {value}
                  </Typography>
                </ListItemButton>
              ))}
            </Stack>
            <Stack spacing={0.8} alignItems="stretch">
              {companyDetails.map((item, index) => (
                <Box
                  key={index}
                  component={item.href ? "a" : "div"}
                  href={item.href}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    transition:
                      "transform 0.25s ease, background-color 0.25s ease",
                    width: "100%",
                    textAlign: "left",
                    "&:hover": {
                      bgcolor: accentColor,
                      color: "#0f172a",
                      transform: "scale(1.02)",
                    },
                    textDecoration: "none", // remove sublinhado do link
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "inherit",
                      letterSpacing: "0.05em",
                      textAlign: { xs: "left", sm: "justify" },
                    }}
                  >
                    {item.text}
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
                textAlign: { xs: "left", sm: "justify" },
              }}
            >
              Soluções digitais criadas para diferentes segmentos, todas com
              foco em resultados reais e expansão contínua.
            </Typography>
            <Stack spacing={0.8} alignItems="stretch">
              {projects.map((item) => (
                <Box
                  key={item}
                  sx={{
                    color: "rgba(255,255,255,0.88)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    transition:
                      "transform 0.25s ease, background-color 0.25s ease",
                    width: "100%",
                    textAlign: "left",
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
                      textAlign: { xs: "left", sm: "justify" },
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
              Novos projetos podem ser adicionados facilmente conforme o
              portfólio evolui.
            </Typography>
          </Stack>
        ),
      },
    ];
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const isPanelOpen = selectedIndex !== null;
  const selectedSection = isPanelOpen ? sections[selectedIndex] : null;
  const totalSections = sections.length;
  const selectedPosition =
    selectedIndex !== null ? selectedIndex + 1 : undefined;

  useEffect(() => {
    if (!isPanelOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isPanelOpen]);

  const panelSx = isMobile
    ? {
        left: 0,
        right: 0,
        bottom: 0,
        height: "82vh",
        maxHeight: "640px",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }
    : {
        top: 0,
        bottom: 0,
        right: 0,
        width: { xs: "100%", sm: "420px", md: "460px", lg: "520px" },
        borderTopLeftRadius: 28,
        borderBottomLeftRadius: 28,
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2.5, md: 8 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Stack
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{ width: "100%", maxWidth: 960 }}
        >
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <FuzzyText
              baseIntensity={0.12}
              hoverIntensity={0.3}
              enableHover={!isMobile}
              fontSize="clamp(2.6rem, 8vw, 5.2rem)"
            >
              Olegário.dev
            </FuzzyText>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 520,
                color: "rgba(255,255,255,0.72)",
                letterSpacing: "0.05em",
              }}
            >
              Escolha um tópico no menu abaixo para mergulhar nos detalhes do
              nosso trabalho.
            </Typography>
          </Box>

          <Stack spacing={1} alignItems="center">
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Menu
            </Typography>
            <Typography
              variant="caption"
              sx={{
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
              }}
            >
              Clique para explorar
            </Typography>
          </Stack>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 1, // bem compacto
            }}
          >
            {sections.map((section, index) => (
              <ListItemButton
                key={section.title}
                onClick={() => setSelectedIndex(index)}
                sx={{
                  borderRadius: 2,
                  minHeight: 56,
                  px: 1.5,
                  py: 1,
                  gap: 1,
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.12)",
                  bgcolor: "rgba(255,255,255,0.02)",
                  transition:
                    "background-color .2s ease, border-color .2s ease",
                  "&:hover": {
                    borderColor: accentColor,
                    bgcolor: "rgba(125,211,252,0.06)",
                  },
                  // foco acessível e discreto
                  "&.Mui-focusVisible": {
                    outline: `2px solid ${accentColor}`,
                    outlineOffset: 2,
                  },
                }}
              >
                {/* índice */}
                <Box
                  sx={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    letterSpacing: ".14em",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 1.5,
                    px: 0.75,
                    py: 0.25,
                    flexShrink: 0,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Box>

                {/* textos */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: "rgba(255,255,255,0.95)",
                      // uma linha somente
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.35,
                      // cortar em 1 linha também
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {section.subtitle}
                  </Typography>
                </Box>

                {/* seta à direita (opcional) */}
                <Box sx={{ ml: "auto", opacity: 0.6 }}>▸</Box>
              </ListItemButton>
            ))}
          </Box>
        </Stack>
      </Box>

      <Fade in={isPanelOpen} timeout={{ enter: 200, exit: 200 }} unmountOnExit>
        <Box
          onClick={() => setSelectedIndex(null)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1290,
            bgcolor: "rgba(15,23,42,0.65)",
            backdropFilter: "blur(6px)",
          }}
        />
      </Fade>

      {selectedSection && (
        <Slide
          direction={isMobile ? "up" : "left"}
          in={isPanelOpen}
          mountOnEnter
          unmountOnExit
        >
          <Box
            role="dialog"
            aria-modal="true"
            aria-labelledby={
              selectedIndex !== null
                ? `home-section-title-${selectedIndex}`
                : undefined
            }
            sx={{
              position: "fixed",
              zIndex: 1400,
              backgroundColor: "rgba(15,23,42,0.92)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 32px 90px rgba(8,15,35,0.55)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, md: 2.5 },
              p: { xs: 2.5, md: 3.5 },
              overflow: "hidden",
              ...panelSx,
            }}
          >
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={2}
              sx={{ width: "100%" }}
            >
              <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  id={`home-section-title-${selectedIndex}`}
                  variant="h4"
                  component="h2"
                  sx={{
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    lineHeight: 1.2,
                    letterSpacing: "0.03em",
                  }}
                >
                  {selectedSection.title}
                </Typography>
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: "0.28em",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {selectedSection.subtitle}
                </Typography>
              </Stack>
              <IconButton
                aria-label="Fechar painel"
                onClick={() => setSelectedIndex(null)}
                sx={{
                  bgcolor: "rgba(15,23,42,0.65)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  "&:hover": {
                    bgcolor: "rgba(15,23,42,0.85)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>

            {selectedPosition && (
              <Typography
                variant="caption"
                sx={{
                  letterSpacing: "0.32em",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                }}
              >
                {String(selectedPosition).padStart(2, "0")} /{" "}
                {String(totalSections).padStart(2, "0")}
              </Typography>
            )}

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                pr: { xs: 0.5, md: 1.5 },
                color: "rgba(255,255,255,0.92)",
                mt: { xs: 1, md: 1.5 },
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(125,211,252,0.4) transparent",
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(125,211,252,0.4)",
                  borderRadius: 999,
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
              }}
            >
              {selectedSection.body}
            </Box>
          </Box>
        </Slide>
      )}
    </Box>
  );
}
