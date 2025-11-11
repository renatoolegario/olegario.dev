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
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Todos os que estão lá me vendo esta no subconciente o que eu ganho com isso!
// Como eu ajudo essa pessoa a resolver problema ?

// Eu tenho que dar um show
// Eu tenho que conquistar o celebro dessa pessoa
// Eu tenho que mostrar os pontos para mudar a VIDA
// Estrutura Inicio - Meio e Fim
// Informação é barato
// Solução é CARO
// Eu tenho fazer a pessoa ver que tem um problema, mostrar a causa do problema, e dar o passo a passo da solução
// Faça a pessoa se emocionar se frustar com o problema , logo em seguida apresento a solução
// Eu tenho que estimular a angustia
// Chamar para participação engajamento, sempre com encaixe no próximo tema
// Algo que eu falo é que existe 3 pessoas que não devemos mentir nunca, 1º é sua mulher seu esposo, 2º para o advogado, 3º par ao contador
// Quem aqui já tem CNPJ aberto ?
// Quem não tem vai amanhã e abre, e te digo porque seus beneficios são esses: x , y e z
// No final vou entregar 3 Livros do Pai Rico e Pai Pobre.
// O objetivo é fazer 5 vendas (tenho que ganhar o coração do povo para que saia 5 vendas sem vender)

const experiences = [
  {
    title: "Metaverse Experience",
    description:
      "Imersão completa em ambientes digitais com realidade mista e avatares inteligentes para networking e cocriação.",
  },
  {
    title: "Innovation Stages",
    description:
      "Trilhas temáticas com especialistas em IA, realidade estendida e computação espacial apresentando cases e demos.",
  },
  {
    title: "Creator Lab",
    description:
      "Espaço dedicado a artistas e developers explorarem ferramentas de criação digital acelerada com suporte técnico.",
  },
];

const highlights = [
  "Keynotes internacionais sobre o futuro da presença digital",
  "Sessões hands-on com plataformas meta-humans e produção volumétrica",
  "Área de negócios com matchmaking inteligente entre startups e investidores",
  "Estúdio 360° para experiências gamificadas e transmissão ao vivo",
];

const agenda = [
  {
    title: "Dia 1 — Vision",
    items: [
      "Keynote de abertura com previsões para 2030",
      "Demo Arena com lançamentos de parceiros de hardware",
      "Talks sobre identidade digital e privacidade no metaverso",
    ],
  },
  {
    title: "Dia 2 — Build",
    items: [
      "Workshops de criação de mundos persistentes",
      "Laboratórios de IA generativa aplicada a experiências imersivas",
      "Painel sobre interoperabilidade e padrões abertos",
    ],
  },
  {
    title: "Dia 3 — Scale",
    items: [
      "Casos reais de adoção corporativa",
      "Rodadas de pitch com startups XR",
      "Showcase com performances interativas e artistas digitais",
    ],
  },
];

const presentationBlocks = [
  {
    title: "O que a plateia pensa",
    accent: "primary",
    points: [
      "Todos que estão lá me vendo estão no subconsciente perguntando \"o que eu ganho com isso?\"",
      "Mostre de cara como ajudamos a resolver o problema deles e por que aquela solução vale a nova realidade que desejam.",
    ],
  },
  {
    title: "Tom e ritmo da narrativa",
    accent: "secondary",
    points: [
      "É um show completo: conquiste o cérebro e o coração com início, meio e fim bem definidos.",
      "Reforce que informação é barata, mas a solução que entregamos é cara porque transforma a vida.",
    ],
  },
  {
    title: "Emoção e engajamento",
    accent: "info",
    points: [
      "Faça o público se emocionar e até se frustrar com o problema antes de apresentar o passo a passo da solução.",
      "Estímulo de angústia seguido por um chamado para participação, sempre com gancho para o próximo tema.",
    ],
  },
];

const closingActions = [
  {
    title: "Integridade e conexão",
    description:
      "Fale das três pessoas a quem não devemos mentir (esposa, advogado, contador) para reforçar total transparência.",
  },
  {
    title: "Credenciais práticas",
    description:
      "Pergunte quem já tem CNPJ aberto, estimule quem ainda não tem a abrir amanhã e liste os benefícios X, Y e Z.",
  },
  {
    title: "Fechamento emocional",
    description:
      "No fim, entregue os três livros do Pai Rico, Pai Pobre e mostre que a missão é conquistar cinco vendas de coração.",
  },
];

export default function FestivalMeta2025Page() {
  return (
    <>
      <Head>
        <title>Festival Meta 2025 | Olegário.Dev</title>
        <meta
          name="description"
          content="Festival Meta 2025 — três dias de inovação em metaverso, IA e experiências imersivas com o mesmo visual neon da experiência Imagine."
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
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={3}>
                  <Chip
                    label="Festival Meta 2025"
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
                    O futuro imersivo em três dias de experiências híbridas
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Conecte-se a líderes globais, desenvolvedores visionários e
                    criadores digitais em uma jornada que combina metaverso,
                    inteligência artificial e storytelling interativo no mesmo
                    clima neon e futurista da experiência Imagine.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      component={Link}
                      href="#inscricoes"
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
                      Garantir ingresso
                    </Button>
                    <Button
                      component={Link}
                      href="/imagine"
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
                      Explorar Imagine
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
                          12 — 14 de Setembro, 2025
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <LocationOnIcon
                          color="secondary"
                          sx={{ fontSize: 32 }}
                        />
                        <Typography color="text.secondary">
                          São Paulo Expo • Transmissão Imersiva Global
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <AccessTimeIcon color="info" sx={{ fontSize: 30 }} />
                        <Typography color="text.secondary">
                          Acesso híbrido com programação 24/7 no hub digital
                        </Typography>
                      </Stack>
                      <Divider sx={{ borderColor: "rgba(148,163,184,0.2)" }} />
                      <Typography variant="body2" color="text.secondary">
                        Networking em tempo real com IA, lounges temáticos e
                        experiências exclusivas para quem garantir presença
                        antecipada.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Material de apoio da apresentação
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Use este roteiro para transformar a narrativa em um show que coacha o público sobre como o Festival Meta 2025
            resolve dores reais em linguagem emocional.
          </Typography>
          <Grid container spacing={4}>
            {presentationBlocks.map((block) => (
              <Grid item xs={12} md={4} key={block.title}>
                <Card
                  sx={(theme) => ({
                    height: "100%",
                    backgroundColor: "rgba(15,23,42,0.55)",
                    borderRadius: 4,
                    border: `1px solid ${theme.palette[block.accent]?.main ?? theme.palette.primary.main}`,
                    boxShadow: "0 20px 45px rgba(15,23,42,0.55)",
                    backdropFilter: "blur(10px)",
                  })}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {block.title}
                    </Typography>
                    <List dense>
                      {block.points.map((point) => (
                        <ListItem key={point} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <CheckCircleIcon
                              sx={(theme) => ({
                                color:
                                  theme.palette[block.accent]?.main ?? theme.palette.primary.main,
                              })}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={point}
                            primaryTypographyProps={{ color: "text.secondary" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={3} sx={{ mt: 6 }}>
            {closingActions.map((action) => (
              <Card
                key={action.title}
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(148,163,184,0.3)",
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(37,99,235,0.02))",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {action.title}
                  </Typography>
                  <Typography color="text.secondary">{action.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
          <Grid container spacing={6}>
            {experiences.map((experience) => (
              <Grid item xs={12} md={4} key={experience.title}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "rgba(15,23,42,0.6)",
                    borderRadius: 4,
                    border: "1px solid rgba(148,163,184,0.18)",
                    boxShadow: "0 20px 45px rgba(15,23,42,0.55)",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 30px 60px rgba(14,116,144,0.35)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {experience.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {experience.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: { xs: 10, md: 14 } }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Por que participar?
            </Typography>
            <List>
              {highlights.map((item) => (
                <ListItem key={item} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 42 }}>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Container>

        <Box
          sx={{ backgroundColor: "rgba(15,23,42,0.7)", py: { xs: 10, md: 14 } }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Programação Imersiva
            </Typography>
            <Grid container spacing={6}>
              {agenda.map((section) => (
                <Grid item xs={12} md={4} key={section.title}>
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
                    <CardContent>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {section.title}
                      </Typography>
                      <List dense>
                        {section.items.map((agendaItem) => (
                          <ListItem key={agendaItem} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CheckCircleIcon
                                sx={{ color: "rgba(34,211,238,0.8)" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={agendaItem}
                              primaryTypographyProps={{
                                color: "text.secondary",
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container
          maxWidth="lg"
          sx={{ py: { xs: 10, md: 16 } }}
          id="inscricoes"
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Ingressos limitados
              </Typography>
              <Typography color="text.secondary" paragraph>
                Garanta acesso presencial e digital com benefícios exclusivos:
              </Typography>
              <List>
                {[
                  "Pass all access com meetups privados",
                  "Starter kit com wearables conectados",
                  "Três meses de acesso à comunidade Meta Builders",
                ].map((benefit) => (
                  <ListItem key={benefit} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 42 }}>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={benefit}
                      primaryTypographyProps={{ color: "text.secondary" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: "1px solid rgba(148,163,184,0.2)",
                  background:
                    "linear-gradient(145deg, rgba(37,99,235,0.15) 0%, rgba(8,145,178,0.2) 100%)",
                  boxShadow: "0 25px 65px rgba(15,23,42,0.65)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Lote atual — R$ 1.290
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    Pagamento facilitado em até 12x com inteligência antifraude
                    e checkout seguro via Imagine Pay.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 999,
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "0 15px 40px rgba(236,72,153,0.45)",
                      }}
                    >
                      Comprar agora
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 999,
                        textTransform: "none",
                        fontWeight: 600,
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          backgroundColor: "rgba(244,143,177,0.12)",
                        },
                      }}
                    >
                      Falar com o time
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
