import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsightsIcon from "@mui/icons-material/Insights";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PaymentsIcon from "@mui/icons-material/Payments";
import DownloadIcon from "@mui/icons-material/Download";
import LaunchIcon from "@mui/icons-material/Launch";

const pillars = [
  {
    title: "Clareza e organização",
    description:
      "Fluxo de caixa controlado revela para onde o dinheiro vai e te permite decidir com consciência.",
    icon: InsightsIcon,
    color: "primary",
  },
  {
    title: "Disciplina com pró-labore",
    description:
      "Trate-se como funcionária da empresa: salário fixo, contas pessoais ajustadas e nada de retirar extra do caixa.",
    icon: SavingsIcon,
    color: "secondary",
  },
  {
    title: "Proteção empresarial",
    description:
      "CNPJ ativo, contas separadas e contador parceiro criam a barreira jurídica que protege o seu patrimônio.",
    icon: AccountBalanceIcon,
    color: "info",
  },
];

const timeline = [
  {
    title: "INÍCIO — Conexão, emoção e autoridade",
    duration: "5 minutos",
    objective:
      "Gerar identificação imediata com as empreendedoras e mostrar vulnerabilidade para criar confiança.",
    highlights: [
      "Cumprimente com energia, celebre a presença e faça a pergunta sobre o dinheiro que some levantando a mão junto.",
      "Compartilhe as quebras de 2014 e 2022 com pausa dramática, destacando os dois erros: misturar finanças e dispensar o contador.",
      "Reforce que a queda não foi por falta de clientes, e sim por falta de organização e clareza.",
    ],
    quote:
      "O que quebra a gente não é a falta de dinheiro — é a falta de organização e clareza.",
  },
  {
    title: "MEIO — O aprendizado e a virada",
    duration: "10 minutos",
    objective:
      "Transformar consciência em ação prática com técnicas simples, mudança de hábito e ferramentas acessíveis.",
    highlights: [
      "Explique que informação é barata, mas solução exige mudança de mentalidade e rotina.",
      "Apresente as três pessoas para quem nunca devemos mentir (cônjuge, advogado e contador) e conecte com impostos indevidos.",
      "Mostre o contador como médico financeiro da empresa e convide quem não tem CNPJ a abrir amanhã, listando os benefícios.",
      "Conte o segredo do pró-labore: salário fixo para a dona, metáfora da gasolina e divisão em três potes (caixa, pró-labore, reserva).",
      "Indique MarketUp, Mercado Pago e a planilha do Pai Pobre como ferramentas gratuitas e direcione para esta página.",
    ],
    quote:
      "É igual tirar gasolina do carro para acender a churrasqueira: resolve hoje, mas amanhã você fica a pé.",
  },
  {
    title: "FINAL — Emoção, engajamento e ação",
    duration: "5 minutos",
    objective:
      "Selar o compromisso emocional com o controle financeiro e gerar participação da plateia.",
    highlights: [
      "Confesse que quebrou por falta de controle e mostre que quem não controla o dinheiro é controlado por ele.",
      "Entregue o primeiro passo: abrir o CNPJ, separar o dinheiro e anotar cada movimento.",
      "Descreva a sensação de liberdade e sono tranquilo quando o fluxo de caixa está em ordem.",
      "Anuncie o sorteio de três exemplares de Pai Rico, Pai Pobre e peça que levantem a mão prometendo não misturar mais as contas.",
      "Finalize reforçando que a ação muda a história e repita o link olegario.dev/festival-meta-2025.",
    ],
    quote: "Quem controla o dinheiro é quem decide o rumo da própria liberdade.",
  },
];

const metaphors = [
  "Quem mente para o contador paga imposto sobre dinheiro que nem existe.",
  "O pró-labore é o seu salário — sem ele, você tira combustível do crescimento.",
  "Separar conta pessoal da empresarial constrói a muralha jurídica que protege família e patrimônio.",
  "Informação é barata. O que muda o jogo é agir todos os dias sobre o que você registra.",
];

const resources = [
  {
    title: "MarketUp",
    description:
      "Software gratuito para controlar estoque, vendas, fluxo de caixa e emitir notas fiscais sem complicação.",
    href: "https://www.marketup.com/",
    icon: LightbulbIcon,
    color: "primary",
  },
  {
    title: "Mercado Pago",
    description:
      "Soluções para pagamentos e recebimentos do dia a dia, integrando vendas presenciais e online.",
    href: "https://pages.mercadopago.com.br/",
    icon: PaymentsIcon,
    color: "secondary",
  },
  {
    title: "Planilha de gestão pessoal (Pai Pobre)",
    description:
      "Planilha simples para mapear cada gasto pessoal e não confundir com o caixa da empresa.",
    href: "/downloads/planilha-gestao-pessoal.csv",
    icon: DownloadIcon,
    color: "info",
  },
];

const participantChecklist = [
  "Abrir ou regularizar o CNPJ e criar conta bancária exclusiva da empresa.",
  "Definir um valor mensal de pró-labore e ajustar o padrão de vida pessoal a esse salário.",
  "Registrar entradas e saídas diariamente usando a planilha ou o MarketUp.",
  "Separar o dinheiro em três potes: caixa da empresa, pró-labore e reserva.",
  "Agendar uma conversa com o contador para revisar o cenário atual e alinhar impostos.",
  "Voltar para esta página sempre que precisar de reforço ou novos materiais.",
];

const presenterReminders = [
  "Entre com sorriso, postura aberta e contato visual. Energia alta desde o primeiro segundo.",
  "Use as pausas dramáticas após contar as quebras para que a mensagem assente.",
  "Levante a mão junto com a plateia e ria com elas para quebrar a tensão.",
  "Reforce o link olegario.dev/festival-meta-2025 em cada transição importante.",
  "Feche comemorando quem se comprometeu a separar contas: peça energia e celebre.",
];

const impactPhrases = [
  "Quem não controla o dinheiro é controlado por ele.",
  "Abrir empresa não é só para vender mais — é para proteger o que é seu.",
  "Fluxo de caixa organizado é liberdade para decidir o futuro do seu negócio.",
];

export default function FestivalMeta2025Page() {
  return (
    <>
      <Head>
        <title>Festival Meta 2025 — Material de Apoio | Olegário.Dev</title>
        <meta
          name="description"
          content="Material de apoio da palestra 'Fluxo de Caixa: o divisor de águas entre quebrar e prosperar' — roteiro, ferramentas e checklist de ação."
        />
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            py: { xs: 12, md: 16 },
            background: (theme) =>
              `radial-gradient(circle at 20% 20%, rgba(14,165,233,0.35), transparent 55%),
               radial-gradient(circle at 80% 10%, rgba(45,212,191,0.25), transparent 50%),
               linear-gradient(135deg, ${theme.palette.background.default} 0%, #0f172a 45%, rgba(34,211,238,0.25) 100%)`,
          }}
        >
          <Container maxWidth="lg" id="topo">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={3}>
                  <Chip
                    label="Material de apoio — Festival Meta 2025"
                    color="primary"
                    sx={{
                      alignSelf: { xs: "flex-start", md: "flex-start" },
                      fontWeight: 600,
                      letterSpacing: 1.2,
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.1,
                      color: "common.white",
                      textShadow: "0 0 20px rgba(34,211,238,0.45)",
                    }}
                  >
                    Fluxo de Caixa: o divisor de águas entre quebrar e prosperar
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Use esta página como teleprompter de bolso: roteiro completo,
                    metáforas, ferramentas e checklists para conduzir a palestra
                    com segurança e gerar ação imediata nas participantes.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      component={Link}
                      href="#estrutura"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        boxShadow: "0 10px 30px rgba(34,211,238,0.45)",
                      }}
                    >
                      Ver roteiro minuto a minuto
                    </Button>
                    <Button
                      component={Link}
                      href="#recursos"
                      variant="outlined"
                      color="primary"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          backgroundColor: "rgba(34,211,238,0.1)",
                        },
                      }}
                    >
                      Abrir ferramentas sugeridas
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card
                  sx={{
                    bgcolor: "rgba(15,23,42,0.75)",
                    borderRadius: 4,
                    border: "1px solid rgba(148,163,184,0.2)",
                    boxShadow: "0 30px 60px rgba(15,23,42,0.65)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <CardContent>
                    <Stack spacing={3}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <EventIcon color="primary" sx={{ fontSize: 36 }} />
                        <Typography variant="h6" fontWeight={600}>
                          Festival Meta 2025 — Trilha Finanças
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <LocationOnIcon
                          color="secondary"
                          sx={{ fontSize: 32 }}
                        />
                        <Typography color="text.secondary">
                          Presencial em São Paulo • Transmissão Brasil inteiro
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <AccessTimeIcon color="info" sx={{ fontSize: 30 }} />
                        <Typography color="text.secondary">
                          Duração total: 20 minutos (5 + 10 + 5)
                        </Typography>
                      </Stack>
                      <Divider sx={{ borderColor: "rgba(148,163,184,0.2)" }} />
                      <Typography variant="body2" color="text.secondary">
                        Objetivo: conquistar a confiança de pelo menos cinco
                        novas clientes mostrando clareza, autoridade e caminho,
                        sem pitch agressivo — apenas educação que gera desejo de
                        contratação.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Resumo rápido para o apresentador
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Passe os olhos por estes pilares antes de subir ao palco. Eles
            lembram a essência da mensagem: organização financeira traz
            liberdade, pró-labore garante disciplina e o CNPJ protege o seu
            legado.
          </Typography>
          <Grid container spacing={4}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Grid item xs={12} md={4} key={pillar.title}>
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: "rgba(15,23,42,0.55)",
                      borderRadius: 4,
                      border: (theme) =>
                        `1px solid ${theme.palette[pillar.color]?.main ?? theme.palette.primary.main}`,
                      boxShadow: "0 20px 45px rgba(15,23,42,0.55)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Icon
                          color={pillar.color}
                          sx={{ fontSize: 36 }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {pillar.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {pillar.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }} id="estrutura">
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <PlayCircleFilledWhiteIcon color="primary" sx={{ fontSize: 36 }} />
            <Typography variant="h4" fontWeight={700}>
              Estrutura minuto a minuto
            </Typography>
          </Stack>
          <Typography color="text.secondary" paragraph>
            Tenha à mão os gatilhos de cada bloco. Leia o objetivo, percorra os
            destaques e finalize com a frase de impacto sugerida para fixar a
            mensagem.
          </Typography>
          <Grid container spacing={4}>
            {timeline.map((section) => (
              <Grid item xs={12} md={4} key={section.title}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "rgba(15,23,42,0.6)",
                    borderRadius: 4,
                    border: "1px solid rgba(148,163,184,0.18)",
                    boxShadow: "0 20px 45px rgba(15,23,42,0.55)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: 20, color: "primary.light" }} />
                      <Typography variant="body2" color="primary.light">
                        {section.duration}
                      </Typography>
                    </Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {section.objective}
                    </Typography>
                    <List dense>
                      {section.highlights.map((item) => (
                        <ListItem key={item} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{ color: "text.secondary" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Typography
                      variant="subtitle2"
                      color="secondary.light"
                      sx={{ fontStyle: "italic" }}
                    >
                      “{section.quote}”
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
          <Grid container spacing={6} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <PsychologyAltIcon color="secondary" sx={{ fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700}>
                  Gatilhos e metáforas
                </Typography>
              </Stack>
              <Typography color="text.secondary" paragraph>
                Utilize estas frases para reforçar a mudança de mentalidade. Elas
                ajudam a plateia a visualizar o problema e a solução de forma
                simples.
              </Typography>
              <Card
                sx={{
                  borderRadius: 4,
                  border: "1px solid rgba(148,163,184,0.3)",
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(37,99,235,0.02))",
                }}
              >
                <CardContent>
                  <List>
                    {metaphors.map((item) => (
                      <ListItem key={item} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircleIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ color: "text.secondary" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <AssignmentTurnedInIcon color="info" sx={{ fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700}>
                  Lembretes para condução
                </Typography>
              </Stack>
              <Typography color="text.secondary" paragraph>
                Antes de subir ao palco, revise estes pontos para manter ritmo,
                emoção e clareza durante toda a apresentação.
              </Typography>
              <Card
                sx={{
                  borderRadius: 4,
                  border: "1px solid rgba(148,163,184,0.3)",
                  background:
                    "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(45,212,191,0.08))",
                }}
              >
                <CardContent>
                  <List>
                    {presenterReminders.map((item) => (
                      <ListItem key={item} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircleIcon color="info" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ color: "text.secondary" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{ backgroundColor: "rgba(15,23,42,0.7)", py: { xs: 10, md: 12 } }}
          id="recursos"
        >
          <Container maxWidth="lg">
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <AutoStoriesIcon color="primary" sx={{ fontSize: 34 }} />
              <Typography variant="h4" fontWeight={700}>
                Ferramentas e materiais imediatos
              </Typography>
            </Stack>
            <Typography color="text.secondary" paragraph>
              Compartilhe estes links durante a transmissão ou no grupo pós-evento.
              São gratuitos e permitem que o público comece a mudar o fluxo de
              caixa ainda esta semana.
            </Typography>
            <Grid container spacing={4}>
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <Grid item xs={12} md={4} key={resource.title}>
                    <Card
                      sx={{
                        height: "100%",
                        background:
                          "linear-gradient(160deg, rgba(45,212,191,0.08) 0%, rgba(37,99,235,0.06) 100%)",
                        borderRadius: 4,
                        border: "1px solid rgba(148,163,184,0.18)",
                        boxShadow: "0 25px 55px rgba(15,23,42,0.6)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Icon color={resource.color} sx={{ fontSize: 36 }} />
                        <Typography variant="h6" fontWeight={600}>
                          {resource.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {resource.description}
                        </Typography>
                        <Button
                          component="a"
                          href={resource.href}
                          target={resource.href.startsWith("http") ? "_blank" : undefined}
                          rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          variant="outlined"
                          color={resource.color}
                          endIcon={<LaunchIcon />}
                          sx={{ textTransform: "none", mt: "auto" }}
                        >
                          Acessar agora
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Checklist para as participantes
              </Typography>
              <Typography color="text.secondary" paragraph>
                Entregue estes passos ao final para que cada empreendedora saiba
                por onde começar imediatamente após a palestra.
              </Typography>
              <Card
                sx={{
                  borderRadius: 4,
                  border: "1px solid rgba(148,163,184,0.25)",
                  background:
                    "linear-gradient(145deg, rgba(37,99,235,0.15) 0%, rgba(8,145,178,0.2) 100%)",
                }}
              >
                <CardContent>
                  <List>
                    {participantChecklist.map((item) => (
                      <ListItem key={item} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 42 }}>
                          <CheckCircleIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ color: "text.secondary" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: "1px solid rgba(148,163,184,0.2)",
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(37,99,235,0.08) 100%)",
                  boxShadow: "0 25px 65px rgba(15,23,42,0.65)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Frases para reforçar o chamado à ação
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    Utilize-as nos momentos de transição e no fechamento para
                    deixar o compromisso ainda mais forte.
                  </Typography>
                  <List>
                    {impactPhrases.map((item) => (
                      <ListItem key={item} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ color: "text.secondary" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Stack spacing={2} mt={2}>
                    <Button
                      component={Link}
                      href="/"
                      variant="text"
                      color="inherit"
                      sx={{ textTransform: "none" }}
                    >
                      Voltar para olegario.dev
                    </Button>
                    <Button
                      component={Link}
                      href="#topo"
                      variant="outlined"
                      color="primary"
                      sx={{ textTransform: "none", alignSelf: "flex-start" }}
                    >
                      Revisar o início do roteiro
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
