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

const talkSections = [
  {
    title: "INÍCIO — Conexão, emoção e autoridade",
    duration: "5 minutos",
    focus:
      "Gerar identificação imediata com as empreendedoras e mostrar vulnerabilidade para criar confiança.",
    highlights: [
      "Comece celebrando a presença das participantes e pergunte, com sinceridade, quem sente que o dinheiro entra e sai sem controle.",
      "Compartilhe as quebras de 2014 e 2022 com pausa dramática, destacando que os mesmos erros foram cometidos.",
      "Evidencie os dois principais erros: misturar finanças pessoais com as da empresa e negligenciar o contador.",
      "Reforce a lição aprendida: o que quebra não é a falta de dinheiro, e sim a falta de organização e clareza.",
    ],
  },
  {
    title: "MEIO — O aprendizado e a virada",
    duration: "10 minutos",
    focus:
      "Transformar consciência em ação prática, trazendo conceitos, metáforas e ferramentas simples de implementar.",
    highlights: [
      "Informação é barata; solução exige mudança de hábito e mentalidade.",
      "Três pessoas que nunca devemos mentir: cônjuge, advogado e contador — mentir para o contador gera impostos sobre dinheiro que não existe.",
      "Mostre o contador como médico financeiro, responsável por diagnosticar a saúde do negócio.",
      "Convide quem ainda não tem CNPJ a abrir o próprio amanhã mesmo, destacando benefícios fiscais, proteção patrimonial e visão empresarial.",
      "Explique o pró-labore como salário do dono e conecte com a metáfora da gasolina: tirar dinheiro do caixa é ficar sem combustível para crescer.",
      "Apresente a divisão em três potes: caixa da empresa, pró-labore e reserva.",
      "Cite ferramentas gratuitas (MarketUp, Mercado Pago) e recursos extras como a planilha de gestão pessoal do Pai Pobre.",
      "Direcione para a página olegario.dev/festival-meta-2025 onde estão resumos, vídeos e planilhas para baixar.",
    ],
  },
  {
    title: "FINAL — Emoção, engajamento e ação",
    duration: "5 minutos",
    focus:
      "Selar o compromisso emocional com o controle financeiro e gerar interação com a plateia.",
    highlights: [
      "Reforce que não controlar o dinheiro é ser controlada por ele: o problema nunca foi a falta de clientes, e sim a ausência de controle.",
      "Entregue o passo essencial: abra o CNPJ, separe o dinheiro e registre cada movimentação.",
      "Traga o conceito de liberdade financeira como paz e sono tranquilo.",
      "Anuncie o sorteio de três exemplares de 'Pai Rico, Pai Pobre' e convide todas a assumirem o compromisso de não misturar contas.",
      "Finalize com a chamada à ação: informação é barata, ação muda a história — hoje começa a virada.",
    ],
  },
];

const toolkit = [
  {
    title: "Ferramentas de Fluxo de Caixa",
    items: [
      "MarketUp — controle de estoque, vendas, fluxo de caixa e emissão de notas fiscais.",
      "Mercado Pago — solução rápida para pagamentos e recebimentos do dia a dia.",
      "Planilha do Pai Pobre — visão clara das despesas pessoais para não confundir com o caixa da empresa.",
    ],
  },
  {
    title: "Mudança de Mentalidade",
    items: [
      "Se pagar primeiro com pró-labore fixo e tratar a empresa como entidade separada.",
      "Entender o contador como parceiro estratégico e não apenas responsável pelos impostos.",
      "Registrar tudo: quem anota controla, quem controla decide com clareza.",
    ],
  },
  {
    title: "Divisão em Três Potes",
    items: [
      "Caixa da empresa — custos, produtos e reinvestimentos.",
      "Pró-labore — seu salário como gestora.",
      "Reserva — emergências e oportunidades para não travar o crescimento.",
    ],
  },
];

const actionChecklist = [
  "Abrir ou regularizar o CNPJ e criar conta bancária exclusiva da empresa.",
  "Definir um valor mensal de pró-labore e ajustar o padrão de vida pessoal ao salário definido.",
  "Mapear entradas e saídas utilizando as planilhas e ferramentas sugeridas.",
  "Agendar conversa com contador de confiança para revisão do cenário atual.",
  "Implementar a divisão em três potes e revisá-la semanalmente.",
  "Voltar à página de apoio para rever os tópicos e baixar os materiais sempre que necessário.",
];

const presentationBlocks = [
  {
    title: "O que a plateia pensa",
    accent: "primary",
    points: [
      'Todos que estão lá me vendo estão no subconsciente perguntando "o que eu ganho com isso?"',
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
                    Fluxo de Caixa: o divisor de águas entre quebrar e prosperar
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Use este roteiro como material de apoio durante a
                    apresentação. Aqui estão os gatilhos de conexão, as
                    metáforas que fortalecem a mensagem e os recursos para as
                    participantes aplicarem o que aprenderam ainda esta semana.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      component={Link}
                      href="#roteiro"
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
                      Revisar roteiro completo
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
                      Acessar ferramentas
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
                          Presencial em São Paulo • Transmissão para todo o
                          Brasil
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
                        O objetivo é conquistar o coração da audiência para
                        gerar pelo menos cinco novas clientes sem fazer pitch
                        agressivo — apenas mostrando clareza, autoridade e
                        caminho.
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
            Use este roteiro para transformar a narrativa em um show que coacha
            o público sobre como o Festival Meta 2025 resolve dores reais em
            linguagem emocional.
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
                                  theme.palette[block.accent]?.main ??
                                  theme.palette.primary.main,
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
                  <Typography color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
          <Grid container spacing={6}>
            {talkSections.map((section) => (
              <Grid item xs={12} md={4} key={section.title}>
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
                    <Stack spacing={2}>
                      <Typography variant="h6" fontWeight={600}>
                        {section.title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeIcon
                          sx={{ fontSize: 20, color: "primary.light" }}
                        />
                        <Typography variant="body2" color="primary.light">
                          {section.duration}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {section.focus}
                      </Typography>
                      <List dense>
                        {section.highlights.map((item) => (
                          <ListItem key={item} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                color: "text.secondary",
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box
          sx={{ backgroundColor: "rgba(15,23,42,0.7)", py: { xs: 10, md: 14 } }}
          id="recursos"
        >
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Ferramentas, técnicas e mentalidade
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 6 }}>
              Reforce estes pilares sempre que apresentar soluções. Eles mostram
              que a transformação depende menos de planilhas e mais de atitude
              consistente, com apoio das ferramentas certas.
            </Typography>
            <Grid container spacing={6}>
              {toolkit.map((block) => (
                <Grid item xs={12} md={4} key={block.title}>
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
                        {block.title}
                      </Typography>
                      <List dense>
                        {block.items.map((item) => (
                          <ListItem key={item} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircleIcon
                                sx={{ color: "rgba(34,211,238,0.8)" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
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

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Checklist pós-palestra
              </Typography>
              <Typography color="text.secondary" paragraph>
                Entregue este passo a passo para que cada empreendedora saiba
                exatamente por onde começar. Reforce que execução simples vence
                planos complexos que nunca saem do papel.
              </Typography>
              <List>
                {actionChecklist.map((item) => (
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
                    Recursos imediatos
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    Todos os materiais citados estão reunidos nesta página.
                    Utilize os botões abaixo para compartilhar durante a
                    transmissão ou enviar no grupo da comunidade após o evento.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      component="a"
                      href="https://www.marketup.com/"
                      target="_blank"
                      rel="noopener noreferrer"
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
                      Abrir MarketUp
                    </Button>
                    <Button
                      component="a"
                      href="https://pages.mercadopago.com.br/"
                      target="_blank"
                      rel="noopener noreferrer"
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
                      Soluções Mercado Pago
                    </Button>
                  </Stack>
                  <Button
                    component={Link}
                    href="/"
                    variant="text"
                    color="inherit"
                    sx={{ mt: 2, textTransform: "none" }}
                  >
                    Voltar para olegario.dev
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
