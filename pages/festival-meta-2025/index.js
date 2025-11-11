import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsightsIcon from "@mui/icons-material/Insights";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
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
  {
    title: "Ferramentas e materiais imediatos",
    description:
      "Aproveite softwares gratuitos, planilhas e links de apoio para implementar o aprendizado sem custo inicial.",
    icon: BuildCircleIcon,
    color: "success",
  },
];

const topics = [
  {
    title: "Clareza e organização do fluxo de caixa",
    intro:
      "Entender o caminho do dinheiro é a base para qualquer decisão inteligente.",
    keyPoints: [
      "Fluxo de caixa atualizado mostra o que entra, o que sai e o que precisa ser ajustado.",
      "Separar contas pessoais e empresariais revela a saúde real do negócio.",
      "Registrar tudo evita pagar imposto sobre dinheiro que não existe.",
    ],
    actions: [
      "Escolha uma ferramenta simples (planilha ou software) e defina um horário diário para registrar movimentos.",
      "Abra ou dedique uma conta bancária exclusiva da empresa e mova o faturamento para lá.",
    ],
  },
  {
    title: "Disciplina com pró-labore",
    intro: "Proprietária também recebe salário — e ele precisa caber no planejamento.",
    keyPoints: [
      "Pró-labore é o pagamento pelo seu trabalho, não um saque aleatório do caixa.",
      "Quando o pró-labore falta, a solução é vender mais, não retirar mais.",
      "Misturar gastos pessoais com a empresa tira combustível do crescimento.",
    ],
    actions: [
      "Defina um valor fixo para o seu pró-labore e ajuste despesas pessoais a esse montante.",
      "Documente qualquer retirada extra como distribuição de lucros programada.",
    ],
  },
  {
    title: "Proteção empresarial e suporte contábil",
    intro:
      "Empresa organizada protege o patrimônio familiar e mantém o negócio em dia com o fisco.",
    keyPoints: [
      "CNPJ ativo libera benefícios, crédito e separação patrimonial.",
      "Contador é o médico financeiro que diagnostica a empresa antes da febre virar crise.",
      "Compliance básico evita multas e preserva o fluxo de caixa.",
    ],
    actions: [
      "Agende uma conversa com o contador para revisar impostos, enquadramento e rotinas obrigatórias.",
      "Regularize documentos e contratos para impedir que dívidas empresariais atinjam bens pessoais.",
    ],
  },
  {
    title: "Ferramentas e materiais imediatos",
    intro:
      "Existe tecnologia gratuita capaz de sustentar o controle financeiro desde o primeiro dia.",
    keyPoints: [
      "MarketUp centraliza vendas, estoque e fluxo de caixa em um único painel.",
      "Mercado Pago integra cobranças presenciais e online, com relatórios rápidos.",
      "Planilha de gestão pessoal separa o que é da casa e o que é da empresa.",
    ],
    actions: [
      "Reserve 30 minutos para configurar o MarketUp ou a planilha e cadastrar seus produtos.",
      "Compartilhe o link desta página com a equipe ou sócia para manter o alinhamento.",
    ],
  },
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

const mindsetHighlights = [
  "Informação é barata. O que muda o jogo é agir todos os dias sobre o que você registra.",
  "Quem mente para o contador paga imposto sobre dinheiro que nem existe.",
  "É igual tirar gasolina do carro para acender a churrasqueira: resolve hoje, mas amanhã você fica a pé.",
  "Abrir empresa não é só para vender mais — é para proteger o que é seu.",
  "Fluxo de caixa organizado é liberdade para decidir o futuro do seu negócio.",
];

const reflectionQuestions = [
  "Quais gastos da empresa ainda passam pela sua conta pessoal? Como você pode separar isso hoje?",
  "Seu pró-labore cobre o seu custo de vida atual? O que precisa ser ajustado para caber no planejamento?",
  "Quando foi a última vez que você revisou impostos e obrigações com o contador?",
  "Qual ferramenta você vai usar a partir de agora para registrar entradas e saídas diariamente?",
];

const actionPlan = [
  "Abra ou regularize o CNPJ e crie conta bancária exclusiva da empresa.",
  "Defina um valor mensal de pró-labore e programe o pagamento automático.",
  "Registre entradas e saídas diariamente usando a planilha ou o MarketUp.",
  "Separe o dinheiro em três potes: caixa da empresa, pró-labore e reserva.",
  "Agende uma conversa com o contador para revisar o cenário atual e alinhar impostos.",
  "Volte para esta página sempre que precisar de reforço ou novos materiais.",
];

const heroHighlights = [
  "Revisar os quatro pilares do fluxo de caixa saudável.",
  "Transformar cada tema em ações aplicáveis ainda esta semana.",
  "Salvar links de ferramentas gratuitas e materiais extras.",
  "Guiar conversas com sócias, equipe e contador.",
];

export default function FestivalMeta2025Page() {
  return (
    <>
      <Head>
        <title>Festival Meta 2025 — Material de Apoio | Olegário.Dev</title>
        <meta
          name="description"
          content="Material de apoio da palestra 'Fluxo de Caixa: o divisor de águas entre quebrar e prosperar' — guia explicativo com pilares, ferramentas e plano de ação."
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
                    label="Material de apoio para empreendedoras"
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
                    Consulte este guia durante e depois da apresentação. Ele
                    reúne os pontos principais, interpretações simples e ações
                    práticas para fazer o dinheiro da empresa trabalhar a seu
                    favor.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      component={Link}
                      href="#topicos"
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
                      Explorar tópicos principais
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
                      Ir para ferramentas e materiais
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
                      <Typography variant="h6" fontWeight={600}>
                        Durante a apresentação, consulte para:
                      </Typography>
                      <List dense>
                        {heroHighlights.map((item) => (
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
                      <Typography variant="body2" color="text.secondary">
                        Salve nos favoritos e compartilhe com outras
                        empreendedoras que precisam transformar fluxo de caixa
                        em liberdade.
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
            Como usar este material
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Releia os pilares antes da palestra, mantenha a página aberta durante
            a fala e volte aos tópicos sempre que precisar aplicar uma ação
            específica. Use o conteúdo como apoio visual e como guia de execução
            no dia a dia.
          </Typography>
          <Grid container spacing={4}>
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Grid item xs={12} md={6} lg={3} key={pillar.title}>
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
                        <Icon color={pillar.color} sx={{ fontSize: 36 }} />
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

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }} id="topicos">
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <AutoStoriesIcon color="primary" sx={{ fontSize: 34 }} />
            <Typography variant="h4" fontWeight={700}>
              Tópicos aprofundados da palestra
            </Typography>
          </Stack>
          <Typography color="text.secondary" paragraph>
            Cada sessão da fala está organizada aqui como um tópico de estudo.
            Leia o resumo, confira por que ele importa e selecione pelo menos
            uma ação para colocar em prática ainda esta semana.
          </Typography>
          <Grid container spacing={4}>
            {topics.map((topic) => (
              <Grid item xs={12} md={6} key={topic.title}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid rgba(148,163,184,0.25)",
                    backgroundColor: "rgba(15,23,42,0.6)",
                    boxShadow: "0 25px 55px rgba(15,23,42,0.6)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                  }}
                >
                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {topic.title}
                    </Typography>
                    <Typography color="text.secondary">{topic.intro}</Typography>
                    <Box>
                      <Typography variant="subtitle2" color="primary.light" gutterBottom>
                        Por que importa
                      </Typography>
                      <List dense sx={{ py: 0 }}>
                        {topic.keyPoints.map((item) => (
                          <ListItem key={item} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ color: "text.secondary" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="success.light" gutterBottom>
                        Coloque em prática
                      </Typography>
                      <List dense sx={{ py: 0 }}>
                        {topic.actions.map((item) => (
                          <ListItem key={item} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ color: "text.secondary" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box
          sx={{ backgroundColor: "rgba(15,23,42,0.7)", py: { xs: 10, md: 12 } }}
          id="recursos"
        >
          <Container maxWidth="lg">
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <BuildCircleIcon color="primary" sx={{ fontSize: 34 }} />
              <Typography variant="h4" fontWeight={700}>
                Ferramentas e materiais imediatos
              </Typography>
            </Stack>
            <Typography color="text.secondary" paragraph>
              Aplique o que aprendeu com estas soluções gratuitas. Configure o
              software ou a planilha, compartilhe com quem trabalha com você e
              mantenha os registros atualizados diariamente.
            </Typography>
            <Grid container spacing={4}>
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <Grid item xs={12} md={4} key={resource.title}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        border: "1px solid rgba(148,163,184,0.2)",
                        backgroundColor: "rgba(15,23,42,0.6)",
                        boxShadow: "0 18px 40px rgba(15,23,42,0.55)",
                        display: "flex",
                        flexDirection: "column",
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
                          Acessar material
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
          <Grid container spacing={6} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <PsychologyAltIcon color="secondary" sx={{ fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700}>
                  Mentalidade para sustentar a mudança
                </Typography>
              </Stack>
              <Typography color="text.secondary" paragraph>
                Reforce estas frases ao longo da semana para manter o foco e
                lembrar por que o fluxo de caixa organizado protege o seu
                negócio.
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
                    {mindsetHighlights.map((item) => (
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
                <InsightsIcon color="info" sx={{ fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700}>
                  Perguntas para reflexão
                </Typography>
              </Stack>
              <Typography color="text.secondary" paragraph>
                Use estas questões para revisar decisões com seu contador,
                mentora ou equipe. Elas ajudam a transformar o aprendizado em
                rotina.
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
                    {reflectionQuestions.map((item) => (
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

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <AssignmentTurnedInIcon color="success" sx={{ fontSize: 34 }} />
            <Typography variant="h4" fontWeight={700}>
              Plano de ação rápido
            </Typography>
          </Stack>
          <Typography color="text.secondary" paragraph>
            Escolha um passo por dia e marque a conclusão. Ao final da semana, o
            seu fluxo de caixa estará mais claro e protegido.
          </Typography>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid rgba(148,163,184,0.25)",
              background:
                "linear-gradient(145deg, rgba(37,99,235,0.15) 0%, rgba(8,145,178,0.2) 100%)",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <CardContent>
              <List>
                {actionPlan.map((item) => (
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
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
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
                  sx={{ textTransform: "none", alignSelf: { xs: "flex-start", sm: "center" } }}
                >
                  Revisar o início do material
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
