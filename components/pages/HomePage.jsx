"use client";
import SplitText from "components/SplitText";
import FuzzyText from "components/FuzzyText";
import { useEffect, useMemo, useState } from "react";
import { Box, Fade, IconButton, Stack, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import { keyframes } from "@mui/system";

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

const navigationButtonSx = {
  bgcolor: "rgba(15,23,42,0.6)",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.35)",
  transition: "background-color 0.25s ease",
  "&:hover": {
    bgcolor: "rgba(15,23,42,0.8)",
  },
  "&.Mui-disabled": {
    bgcolor: "rgba(15,23,42,0.35)",
    color: "rgba(255,255,255,0.4)",
  },
};

const devBackgrounds = [
  "linear-gradient(135deg, rgba(125, 211, 252, 0.95), rgba(56, 189, 248, 0.6))",
  "linear-gradient(135deg, rgba(129, 140, 248, 0.9), rgba(14, 165, 233, 0.65))",
  "linear-gradient(135deg, rgba(236, 72, 153, 0.85), rgba(14, 116, 144, 0.7))",
  "linear-gradient(135deg, rgba(45, 212, 191, 0.9), rgba(99, 102, 241, 0.7))",
];

const shimmerAnimation = keyframes`
  0% { transform: translateX(-120%); }
  50% { transform: translateX(60%); }
  100% { transform: translateX(120%); }
`;

const glowPulse = keyframes`
  0% { opacity: 0.35; box-shadow: 0 0 18px rgba(125, 211, 252, 0.45); }
  50% { opacity: 0.7; box-shadow: 0 0 28px rgba(56, 189, 248, 0.65); }
  100% { opacity: 0.35; box-shadow: 0 0 18px rgba(125, 211, 252, 0.45); }
`;

export default function HomePage() {
  const [devBackgroundIndex, setDevBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevBackgroundIndex((index) => (index + 1) % devBackgrounds.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

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

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = sections[activeIndex];
  const totalSections = sections.length;
  const currentSection = activeIndex + 1;
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
          px: { xs: 2.5, md: 6 },
          pt: { xs: 3, md: 6 },
          pb: { xs: 1.5, md: 2 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          "& canvas": {
            maxWidth: "min(280px, 90vw)",
            width: "100%",
            height: "auto",
          },
        }}
      >
        {/* <SplitText text="Olegário.Dev" delay={100} duration={0.6} /> */}

        <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
          Olegário.Dev
        </FuzzyText>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          px: { xs: 2, sm: 4, md: 10 },
          pb: { xs: 4, md: 8 },
        }}
      >
        <Stack
          spacing={{ xs: 2, md: 2.5 }}
          alignItems="center"
          sx={{
            width: "100%",
            maxWidth: { xs: 480, sm: 600, md: 720 },
            minHeight: { md: 520 },
            justifyContent: { xs: "flex-start", md: "space-between" },
            py: { xs: 1.5, md: 0 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <IconButton
              onClick={handlePrevious}
              disabled={!hasPrevious}
              aria-label="Seção anterior"
              sx={{ ...navigationButtonSx, flexShrink: 0 }}
            >
              <KeyboardArrowLeftIcon fontSize="medium" />
            </IconButton>

            <Stack spacing={0.5} alignItems="center">
              <Typography
                variant="caption"
                sx={{
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Seções
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                }}
              >
                {String(currentSection).padStart(2, "0")} /
                {" "}
                {String(totalSections).padStart(2, "0")}
              </Typography>
            </Stack>

            <IconButton
              onClick={handleNext}
              disabled={!hasNext}
              aria-label="Próxima seção"
              sx={{ ...navigationButtonSx, flexShrink: 0 }}
            >
              <KeyboardArrowRightIcon fontSize="medium" />
            </IconButton>
          </Box>

          <IconButton
            onClick={handlePrevious}
            disabled={!hasPrevious}
            aria-label="Seção anterior"
            sx={{
              ...navigationButtonSx,
              display: { xs: "none", md: "inline-flex" },
              visibility: hasPrevious ? "visible" : "hidden",
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
                  p: { xs: 2.5, md: 4 },
                  backdropFilter: "blur(6px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.8, md: 2 },
                  boxShadow: "0 20px 45px rgba(8,15,35,0.45)",
                  transition: "transform 0.3s ease",
                  maxHeight: { xs: "70vh", md: "unset" },
                  overflow: { xs: "auto", md: "visible" },
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

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 1.8, md: 2 },
                  }}
                >
                  {activeSection.body}
                </Box>
              </Box>
            </Fade>
          </Box>

          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              width: "100%",
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sections.map(({ title }, index) => (
              <Box
                key={title}
                sx={{
                  width: index === activeIndex ? 24 : 8,
                  height: 6,
                  borderRadius: 999,
                  bgcolor:
                    index === activeIndex
                      ? accentColor
                      : "rgba(255,255,255,0.35)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Stack>

          <IconButton
            onClick={handleNext}
            disabled={!hasNext}
            aria-label="Próxima seção"
            sx={{
              ...navigationButtonSx,
              display: { xs: "none", md: "inline-flex" },
              visibility: hasNext ? "visible" : "hidden",
            }}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
