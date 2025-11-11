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
              justifyContent={{ xs: "center", sm: "flex-start" }}
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
        subtitle: "Ferramentas que potencializam nossos projetos",
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
              justifyContent={{ xs: "center", sm: "flex-start" }}
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
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {contactMethods.map(({ key, icon: Icon, value, href }) => (
                <Box
                  key={key}
                  component={href ? "a" : "div"}
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "rgba(255,255,255,0.85)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    textDecoration: "none",
                    transition:
                      "transform 0.25s ease, background-color 0.25s ease",
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: "center",
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
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Stack
              spacing={0.8}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              {companyDetails.map((item) => (
                <Box
                  key={item}
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    transition:
                      "transform 0.25s ease, background-color 0.25s ease",
                    width: { xs: "100%", sm: "auto" },
                    textAlign: "center",
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
                      textAlign: { xs: "center", sm: "justify" },
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
                textAlign: { xs: "left", sm: "justify" },
              }}
            >
              Soluções digitais criadas para diferentes segmentos, todas com
              foco em resultados reais e expansão contínua.
            </Typography>
            <Stack
              spacing={0.8}
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
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
                    width: { xs: "100%", sm: "auto" },
                    textAlign: "center",
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
                      textAlign: { xs: "center", sm: "justify" },
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
              gap: { xs: 1.5, md: 2.5 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },
            }}
          >
            {sections.map((section, index) => (
              <ButtonBase
                key={section.title}
                focusRipple
                onClick={() => setSelectedIndex(index)}
                aria-label={`Abrir seção ${section.title}`}
                sx={{
                  width: "100%",
                  borderRadius: 3,
                  textAlign: "left",
                  p: 0,
                  overflow: "hidden",
                  "&:focus-visible > div": {
                    borderColor: accentColor,
                    boxShadow: "0 0 0 3px rgba(125,211,252,0.28)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.18)",
                    bgcolor: "rgba(15,23,42,0.68)",
                    backdropFilter: "blur(6px)",
                    px: { xs: 2, md: 2.6 },
                    py: { xs: 2, md: 2.8 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    transition:
                      "transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
                    boxShadow: "0 18px 44px rgba(8,15,35,0.4)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: accentColor,
                      bgcolor: "rgba(15,23,42,0.78)",
                    },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: "0.32em",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: "1.1rem", md: "1.28rem" },
                      fontWeight: 600,
                      lineHeight: 1.35,
                      color: "rgba(255,255,255,0.96)",
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.6,
                    }}
                  >
                    {section.subtitle}
                  </Typography>
                </Box>
              </ButtonBase>
            ))}
          </Box>
        </Stack>
      </Box>

      <Fade
        in={isPanelOpen}
        timeout={{ enter: 200, exit: 200 }}
        unmountOnExit
      >
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
              selectedIndex !== null ? `home-section-title-${selectedIndex}` : undefined
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
                {String(selectedPosition).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
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
