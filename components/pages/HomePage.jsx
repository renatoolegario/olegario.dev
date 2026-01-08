"use client";

import Head from "next/head";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const whatsappLink = "https://wa.me/5534992399036";
const emailLink = "mailto:multiplas.fr@gmail.com";
const callLink = "https://cal.com";
const xLink = "https://x.com/olegario_dev";
const linkedInLink = "https://www.linkedin.com/in/olegariodev/";
const githubLink = "https://github.com/renatoolegario";

const sections = [
  { id: "inicio", label: "Início" },
  { id: "solucao", label: "Solução" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "provas", label: "Provas" },
  { id: "projetos", label: "Projetos" },
  { id: "conteudo", label: "Conteúdo" },
  { id: "contato", label: "Contato" },
];

const cardSx = {
  border: "1px solid rgba(15, 23, 42, 0.08)",
  borderRadius: 3,
  p: { xs: 2.5, md: 3 },
  bgcolor: "#fff",
  boxShadow: "0 20px 50px rgba(15, 23, 42, 0.06)",
};

const sectionTitleSx = {
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "#0f172a",
};

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "#f6f9ff", color: "#0f172a" }}>
      <Head>
        <title>
          Olegario — Automação no WhatsApp com IA | Founder Técnico
        </title>
        <meta
          name="description"
          content="Automação inteligente no WhatsApp com IA para vender mais e reduzir trabalho manual. Founder técnico e arquiteto de sistemas focado em soluções de produção."
        />
        <meta
          property="og:title"
          content="Olegario — Automação no WhatsApp com IA | Founder Técnico"
        />
        <meta
          property="og:description"
          content="Automação inteligente no WhatsApp com IA para vender mais e reduzir trabalho manual. Founder técnico e arquiteto de sistemas focado em soluções de produção."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/olegario.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Olegario — Automação no WhatsApp com IA | Founder Técnico"
        />
        <meta
          name="twitter:description"
          content="Automação inteligente no WhatsApp com IA para vender mais e reduzir trabalho manual. Founder técnico e arquiteto de sistemas focado em soluções de produção."
        />
        <meta name="twitter:image" content="/olegario.png" />
      </Head>

      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, md: 72 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, letterSpacing: "0.08em" }}
          >
            OLEGARIO
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {sections.map((section) => (
              <Button
                key={section.id}
                href={`#${section.id}`}
                sx={{
                  color: "#0f172a",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                {section.label}
              </Button>
            ))}
          </Stack>
          <Button
            variant="contained"
            color="primary"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            sx={{
              bgcolor: "#0f172a",
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              "&:hover": { bgcolor: "#111827" },
            }}
          >
            Falar no WhatsApp
          </Button>
        </Toolbar>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            px: 2,
            pb: 1.5,
          }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            sx={{
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { height: 4 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(15, 23, 42, 0.2)",
                borderRadius: 999,
              },
            }}
          >
            {sections.map((section) => (
              <Button
                key={section.id}
                href={`#${section.id}`}
                size="small"
                sx={{
                  color: "#0f172a",
                  fontWeight: 600,
                  textTransform: "none",
                  border: "1px solid rgba(15, 23, 42, 0.12)",
                  borderRadius: 999,
                  px: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {section.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </AppBar>

      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 8, md: 10 } }}>
        <Stack spacing={{ xs: 6, md: 10 }}>
          <Stack id="inicio" spacing={3} sx={{ scrollMarginTop: 120 }}>
            <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={2.5}>
                  <Typography variant="h1" sx={{ fontSize: { xs: "2.2rem", md: "3.4rem" }, fontWeight: 700, lineHeight: 1.1 }}>
                    Automação inteligente no WhatsApp com IA — para vender mais e reduzir trabalho manual.
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(15, 23, 42, 0.75)", fontWeight: 400 }}>
                    Sou founder técnico e arquiteto de sistemas. Construo produtos e automações que organizam o atendimento, criam follow-ups e transformam conversas em processo.
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      "Funis e follow-up automáticos (sem planilha e sem caos)",
                      "IA aplicada com contexto: classifica, prioriza e sugere ações",
                      "Arquitetura robusta: integrações, eventos, webhooks e escalabilidade",
                    ].map((item) => (
                      <Typography key={item} variant="body1" sx={{ color: "rgba(15, 23, 42, 0.85)" }}>
                        • {item}
                      </Typography>
                    ))}
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ textTransform: "none", fontWeight: 600, bgcolor: "#0f172a", "&:hover": { bgcolor: "#111827" } }}
                    >
                      Falar no WhatsApp
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      href="#projetos"
                      sx={{ textTransform: "none", fontWeight: 600, borderColor: "#0f172a", color: "#0f172a" }}
                    >
                      Ver projetos
                    </Button>
                  </Stack>
                  <Typography variant="caption" sx={{ color: "rgba(15, 23, 42, 0.6)", letterSpacing: "0.04em" }}>
                    Sem hype: foco em sistemas que funcionam todos os dias, em produção.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box sx={{ ...cardSx, bgcolor: "#fdfdfd" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                    Antes x Depois
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="overline" sx={{ color: "rgba(15, 23, 42, 0.6)" }}>
                        Antes
                      </Typography>
                      <Typography variant="body1">Atendimento manual, leads esquecidos, retrabalho</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="overline" sx={{ color: "rgba(15, 23, 42, 0.6)" }}>
                        Depois
                      </Typography>
                      <Typography variant="body1">Fluxo automatizado, priorização, rotina organizada</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Stack>

          <Stack id="solucao" spacing={3} sx={{ scrollMarginTop: 120 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              O problema que eu resolvo
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(15, 23, 42, 0.8)", maxWidth: 760 }}>
              Muita empresa usa o WhatsApp como canal principal, mas opera no improviso: mensagens se perdem, follow-up falha, ninguém sabe a prioridade e o dono vira gargalo.
            </Typography>
            <Grid container spacing={2}>
              {[
                "Leads sem resposta ou resposta tardia",
                "Atendimento sem processo e sem histórico",
                "Vendas dependem de uma pessoa só",
                "Pós-venda e cobrança esquecidos",
                "Equipe sem padrão de atendimento",
              ].map((item) => (
                <Grid key={item} item xs={12} sm={6} md={4}>
                  <Box sx={cardSx}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" sx={{ color: "rgba(15, 23, 42, 0.9)", fontWeight: 600 }}>
              Eu transformo esse cenário em fluxo: entrada → qualificação → próximo passo → acompanhamento.
            </Typography>
          </Stack>

          <Stack id="como-funciona" spacing={3} sx={{ scrollMarginTop: 120 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              Como eu construo (na prática)
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(15, 23, 42, 0.8)" }}>
              Arquitetura antes de interface. Resultado antes de feature.
            </Typography>
            <Grid container spacing={2}>
              {[
                {
                  title: "Diagnóstico rápido",
                  text: "Entendo o funil, as dores e onde a automação gera retorno imediato.",
                },
                {
                  title: "Desenho do fluxo",
                  text: "Mapeio etapas e gatilhos: entrada, qualificação, follow-up e handoff humano.",
                },
                {
                  title: "Implementação",
                  text: "Integrações, automações, Webhooks/WebSocket, banco e IA aplicada com contexto.",
                },
                {
                  title: "Entrega e evolução",
                  text: "Métricas, ajustes finos e expansão do fluxo conforme o negócio cresce.",
                },
              ].map((item, index) => (
                <Grid key={item.title} item xs={12} md={6}>
                  <Box sx={cardSx}>
                    <Typography variant="overline" sx={{ color: "rgba(15, 23, 42, 0.6)" }}>
                      {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(15, 23, 42, 0.75)" }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={cardSx}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                O que você recebe
              </Typography>
              <Stack spacing={1}>
                {[
                  "Um sistema que reduz trabalho manual e organiza o WhatsApp",
                  "Dashboards/visão de tickets e próximos passos",
                  "Base pronta para crescer com novos módulos",
                ].map((item) => (
                  <Typography key={item} variant="body2" sx={{ color: "rgba(15, 23, 42, 0.8)" }}>
                    • {item}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Stack>

          <Stack id="provas" spacing={3} sx={{ scrollMarginTop: 120 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              Por que isso funciona (sem mágica)
            </Typography>
            <Grid container spacing={2}>
              {[
                {
                  title: "IA como bastidor",
                  text: "IA não é enfeite: ela classifica, prioriza, sugere ações e cria rotinas.",
                },
                {
                  title: "Sistemas orientados a eventos",
                  text: "Webhooks, filas e mensagens: menos acoplamento, mais confiabilidade.",
                },
                {
                  title: "Escala e custo",
                  text: "Desenho pensando em latência, resiliência e custo por usuário.",
                },
                {
                  title: "Simplicidade para o usuário",
                  text: "O cliente não precisa entender a arquitetura. Ele só vê o resultado.",
                },
              ].map((item) => (
                <Grid key={item.title} item xs={12} md={6}>
                  <Box sx={cardSx}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(15, 23, 42, 0.75)" }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "rgba(15, 23, 42, 0.9)" }}>
              Se o usuário precisa entender sua automação para usar, você já perdeu.
            </Typography>
          </Stack>

          <Stack id="projetos" spacing={3} sx={{ scrollMarginTop: 120 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              Projetos (com contexto e objetivo)
            </Typography>
            <Grid container spacing={2}>
              {[
                {
                  name: "uaiStack",
                  problem:
                    "WhatsApp virava bagunça: leads esquecidos, follow-up falho e operação manual.",
                  solution:
                    "Plataforma com automações, funis e IA aplicada para organizar conversas e transformar atendimento em processo.",
                  stack:
                    "Node.js, Postgres, Webhooks/WebSocket, IA (classificação/embeddings), React",
                  detailsLink: "https://falauai.com.br",
                  repoLink: "https://github.com/renatoolegario",
                },
                {
                  name: "FacilitAgro",
                  problem:
                    "Equipe comercial sem padrão de follow-up e dificuldade para priorizar oportunidades.",
                  solution:
                    "Fluxo automatizado com qualificação, histórico e próximos passos centralizados no WhatsApp.",
                  stack:
                    "Node.js, Postgres, Webhooks, React, Automação",
                  detailsLink: "https://facilitagro.com.br",
                },
                {
                  name: "Mestre Starlink",
                  problem:
                    "Atendimento espalhado entre canais e pouca visibilidade do funil.",
                  solution:
                    "Centralização do atendimento e automações para reduzir retrabalho e acelerar resposta.",
                  stack:
                    "Node.js, WhatsApp API, Webhooks, React",
                  detailsLink: "https://mestrestarlink.com.br",
                },
              ].map((project) => (
                <Grid key={project.name} item xs={12} md={4}>
                  <Box sx={cardSx}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2, color: "rgba(15, 23, 42, 0.75)" }}>
                      <strong>Problema:</strong> {project.problem}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.2, color: "rgba(15, 23, 42, 0.75)" }}>
                      <strong>Solução:</strong> {project.solution}
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block", color: "rgba(15, 23, 42, 0.7)", mb: 2 }}>
                      <strong>Stack:</strong> {project.stack}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Button
                        size="small"
                        variant="outlined"
                        href={project.detailsLink}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ textTransform: "none", borderColor: "#0f172a", color: "#0f172a" }}
                      >
                        Ver detalhes
                      </Button>
                      {project.repoLink && (
                        <Button
                          size="small"
                          variant="text"
                          href={project.repoLink}
                          target="_blank"
                          rel="noreferrer"
                          sx={{ textTransform: "none", color: "#0f172a" }}
                        >
                          Código/Repo
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Stack id="conteudo" spacing={3} sx={{ scrollMarginTop: 120 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              O que eu publico e penso
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(15, 23, 42, 0.8)", maxWidth: 760 }}>
              Eu escrevo sobre automação, IA aplicada e construção de sistemas que precisam funcionar em produção — sem hype.
            </Typography>
            <Grid container spacing={2}>
              {[
                "WhatsApp como sistema operacional de vendas",
                "IA aplicada: menos resposta automática, mais decisão e fluxo",
                "Arquitetura pragmática: escala, custo e confiabilidade",
              ].map((item) => (
                <Grid key={item} item xs={12} md={4}>
                  <Box sx={cardSx}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="outlined"
                href={xLink}
                target="_blank"
                rel="noreferrer"
                sx={{ textTransform: "none", borderColor: "#0f172a", color: "#0f172a" }}
              >
                Me acompanhe no X
              </Button>
              <Button
                variant="outlined"
                href={linkedInLink}
                target="_blank"
                rel="noreferrer"
                sx={{ textTransform: "none", borderColor: "#0f172a", color: "#0f172a" }}
              >
                Conectar no LinkedIn
              </Button>
            </Stack>
          </Stack>

          <Stack id="contato" spacing={3} sx={{ scrollMarginTop: 120 }}>
            <Typography variant="h3" sx={sectionTitleSx}>
              Vamos transformar seu WhatsApp em processo?
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(15, 23, 42, 0.8)", maxWidth: 760 }}>
              Se você quer organizar atendimento, criar follow-up automático e reduzir trabalho manual, me chame. Eu te respondo com o caminho mais curto para gerar resultado.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                sx={{ textTransform: "none", fontWeight: 600, bgcolor: "#0f172a", "&:hover": { bgcolor: "#111827" } }}
              >
                Falar no WhatsApp
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<MailOutlineIcon />}
                href={emailLink}
                sx={{ textTransform: "none", borderColor: "#0f172a", color: "#0f172a" }}
              >
                Enviar e-mail
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<CalendarTodayIcon />}
                href={callLink}
                target="_blank"
                rel="noreferrer"
                sx={{ textTransform: "none", color: "#0f172a" }}
              >
                Agendar call
              </Button>
            </Stack>
            <Box sx={cardSx}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Enviar rápido
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Nome" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Empresa" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth select label="Objetivo" variant="outlined" defaultValue="">
                    {[
                      "Vender mais",
                      "Organizar atendimento",
                      "Cobrança",
                      "Suporte",
                      "Outro",
                    ].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", fontWeight: 600, bgcolor: "#0f172a", "&:hover": { bgcolor: "#111827" } }}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Container>

      <Box component="footer" sx={{ borderTop: "1px solid rgba(15, 23, 42, 0.08)", py: 4, bgcolor: "#f6f9ff" }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "rgba(15, 23, 42, 0.7)" }}>
              Construído com foco em performance, clareza e resultado.
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton aria-label="X" href={xLink} target="_blank" rel="noreferrer">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" href={linkedInLink} target="_blank" rel="noreferrer">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="GitHub" href={githubLink} target="_blank" rel="noreferrer">
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <IconButton
        aria-label="Falar no WhatsApp"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: "#25D366",
          color: "#fff",
          boxShadow: "0 16px 32px rgba(37, 211, 102, 0.35)",
          display: { xs: "flex", md: "none" },
          "&:hover": { bgcolor: "#1ebe5d" },
        }}
      >
        <WhatsAppIcon />
      </IconButton>
    </Box>
  );
}
