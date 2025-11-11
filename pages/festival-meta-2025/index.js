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
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PsychologyIcon from "@mui/icons-material/Psychology";
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
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import YouTubeIcon from "@mui/icons-material/YouTube";

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
      "Trate-se como colaborador da empresa: salário fixo, contas pessoais ajustadas e nada de retirar extra do caixa.",
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
      "Mantenha previsões mensais e revise-as semanalmente para ajustar decisões de compra e investimento.",
    ],
  },
  {
    title: "Provisão de Contas",
    intro:
      "Saber exatamente quais contas existem e quando vencem é o caminho certo para não passar aperto.",
    keyPoints: [
      "Ter uma previsão clara do que vai sair permite planejar e evitar surpresas.",
      "Controlar datas e valores ajuda a entender o impacto de cada gasto e antecipar estratégias.",
      "Com a provisão feita, você consegue decidir com antecedência como equilibrar o caixa.",
    ],
    actions: [
      "Liste todas as contas fixas e variáveis do mês e registre seus vencimentos.",
      "Use cores ou categorias para identificar despesas essenciais e adiáveis.",
      "Crie uma reserva mensal proporcional às contas futuras para não ficar sem caixa.",
      "Reveja semanalmente os valores previstos e faça ajustes antes que o caixa aperte.",
    ],
  },
  {
    title: "Disciplina com pró-labore",
    intro:
      "Proprietária também recebe salário — e ele precisa caber no planejamento.",
    keyPoints: [
      "Pró-labore é o pagamento pelo seu trabalho, não um saque aleatório do caixa.",
      "Quando o pró-labore falta, a solução é vender mais, não retirar mais.",
      "Misturar gastos pessoais com a empresa tira combustível do crescimento.",
    ],
    actions: [
      "Defina um valor fixo para o seu pró-labore e ajuste despesas pessoais a esse montante.",
      "Documente qualquer retirada extra como distribuição de lucros programada.",
      "Mantenha o pagamento do pró-labore como prioridade, mostrando respeito ao próprio negócio.",
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
      "Mantenha pastas digitais com comprovantes e relatórios mensais de forma organizada.",
    ],
  },
];

const resources = [
  {
    title: "MarketUp",
    description:
      "ERP gratuito: vendas, estoque, PDV, emissão de NF-e e fluxo de caixa em um só lugar.",
    href: "https://www.marketup.com/",
    icon: LightbulbIcon,
    color: "primary",
    tags: ["ERP", "Gestão", "Financeiro"],
  },
  {
    title: "Planilha de gestão pessoal",
    description:
      "Planilha simples para separar gastos da casa e da empresa e evitar confusão no caixa.",
    href: "/downloads/planilha-gestao-pessoal.csv",
    icon: DownloadIcon,
    color: "secondary",
    tags: ["Financeiro", "Pessoal"],
  },
  {
    title: "Asaas",
    description:
      "Automatize cobranças com boletos, PIX e cartões. Controle financeiro integrado e notificações automáticas.",
    href: "https://www.asaas.com/",
    icon: CreditCardIcon,
    color: "success",
    tags: ["Cobranças", "Financeiro", "Automação"],
  },
  {
    title: "Mercado Pago",
    description:
      "Plataforma de pagamentos completa com PIX, boletos e cartões. Ideal para lojas e vendas online.",
    href: "https://www.mercadopago.com.br/",
    icon: AccountBalanceWalletIcon,
    color: "info",
    tags: ["Cobranças", "Vendas", "E-commerce"],
  },
  {
    title: "ChatGPT",
    description:
      "Ferramenta de inteligência artificial da OpenAI. Gera textos, ideias, códigos e respostas com linguagem natural.",
    href: "https://chat.openai.com/",
    icon: SmartToyIcon,
    color: "primary",
    tags: ["IA", "Produtividade", "Automação"],
  },
  {
    title: "Gemini",
    description:
      "IA generativa do Google que responde, escreve e cria conteúdo de forma integrada com os serviços Google.",
    href: "https://gemini.google.com/",
    icon: PsychologyIcon,
    color: "warning",
    tags: ["IA", "Conteúdo", "Google"],
  },
];

const mindsetHighlights = [
  "Informação é barata; consistência diária é o que muda o jogo.",
  "Quem mente para o contador paga imposto sobre dinheiro que nem existe.",
  "Provisão de contas evita sustos: contas previstas, caixa protegido.",
  "Abrir empresa não é só vender mais — é proteger o que é seu.",
  "Fluxo de caixa organizado é liberdade para decidir o futuro do negócio.",
];

const reflectionQuestions = [
  "Quais gastos da empresa ainda passam pela sua conta pessoal? Como separar isso hoje?",
  "Seu pró-labore cobre o custo de vida? O que precisa ser ajustado para caber no planejamento?",
  "Você tem um calendário de vencimentos (provisão) para o mês? O que está sem cobertura?",
  "Qual ferramenta você vai usar a partir de agora para registrar entradas e saídas diariamente?",
];
const marketUpVideos = [
  {
    title: "1º vídeo",
    description: "Primeiro passo para configurar o MarketUP na sua rotina.",
    href: "https://www.youtube.com/watch?v=wGHagqQOZrg",
  },
  {
    title: "2º vídeo",
    description:
      "Sequência com recursos essenciais para manter o controle financeiro.",
    href: "https://www.youtube.com/watch?v=LNinJ9JWjzg",
  },
];
const toEmbedUrl = (url) => {
  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
};
const actionPlan = [
  "Abra ou regularize o CNPJ e crie conta bancária exclusiva da empresa.",
  "Defina um valor mensal de pró-labore e programe o pagamento automático.",
  "Monte sua Provisão de Contas: liste vencimentos e valores do mês.",
  "Registre entradas e saídas diariamente usando a planilha ou o MarketUp.",
  "Separe o dinheiro em três potes: caixa da empresa, pró-labore e reserva.",
  "Agende uma conversa com o contador para revisar enquadramento e impostos.",
];

const heroHighlights = [
  "Revisar os pilares: clareza, provisão de contas, pró-labore e proteção.",
  "Converter cada tema em ações aplicáveis ainda esta semana.",
  "Salvar e usar ferramentas gratuitas (ERP, meios de pagamento e planilhas).",
  "Guiar conversas com sócias, equipe e contador.",
];

const metade = Math.ceil(topics.length / 2);
const coluna1 = topics.slice(0, metade);
const coluna2 = topics.slice(metade);

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
                    Os pontos principais, interpretações simples e ações
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
                {/* "Como usar este material" — sem Card externo e sem padding vertical */}
                <Container maxWidth="lg" sx={{ py: 0 }}>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Como usar este material
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Use este guia como um apoio prático no seu dia a dia. Este
                    material foi feito para te ajudar a colocar cada ideia em
                    prática, com clareza e organização.
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                      },
                      gap: 4,
                    }}
                  >
                    {pillars.map((pillar) => {
                      const Icon = pillar.icon;
                      return (
                        <Card
                          key={pillar.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(15,23,42,0.55)",
                            borderRadius: 4,
                            border: (theme) =>
                              `1px solid ${
                                theme.palette[pillar.color]?.main ??
                                theme.palette.primary.main
                              }`,
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
                      );
                    })}
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }} id="topicos">
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <AutoStoriesIcon color="primary" sx={{ fontSize: 34 }} />
            <Typography variant="h4" fontWeight={700}>
              Tópicos aprofundados da palestra
            </Typography>
          </Stack>
          <Typography color="text.secondary" paragraph>
            Leia o resumo, confira por que ele importa e selecione pelo menos
            uma ação para colocar em prática ainda esta semana.
          </Typography>
          {/* SUBSTITUIR o <Grid container ...> atual por este Box */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr", // 2 colunas a partir do sm
              },
              gap: 4,
              alignItems: "stretch",
            }}
          >
            {topics.map((topic) => (
              <Card
                key={topic.title}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid rgba(148,163,184,0.25)",
                  backgroundColor: "rgba(15,23,42,0.6)",
                  boxShadow: "0 25px 55px rgba(15,23,42,0.6)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {topic.title}
                  </Typography>

                  <Typography color="text.secondary">{topic.intro}</Typography>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="primary.light"
                      gutterBottom
                    >
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
                    <Typography
                      variant="subtitle2"
                      color="success.light"
                      gutterBottom
                    >
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
            ))}
          </Box>
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

            {/* Grid de recursos */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 4,
              }}
            >
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <Card
                    key={resource.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid rgba(148,163,184,0.2)",
                      backgroundColor: "rgba(15,23,42,0.6)",
                      boxShadow: "0 18px 40px rgba(15,23,42,0.55)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        flexGrow: 1,
                      }}
                    >
                      <Icon color={resource.color} sx={{ fontSize: 36 }} />
                      <Typography variant="h6" fontWeight={600}>
                        {resource.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {resource.description}
                      </Typography>

                      {/* Tags de nicho */}
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {resource.tags?.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            color="default"
                            variant="outlined"
                            sx={{
                              borderColor: "rgba(148,163,184,0.3)",
                              color: "rgba(226,232,240,0.9)",
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                      </Box>

                      <Button
                        component="a"
                        href={resource.href}
                        target={
                          resource.href.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          resource.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        variant="outlined"
                        color={resource.color}
                        endIcon={<LaunchIcon />}
                        sx={{ textTransform: "none", mt: "auto" }}
                      >
                        Acessar material
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: { xs: 4, md: 6 },
              alignItems: "stretch",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <PsychologyAltIcon color="secondary" sx={{ fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700}>
                  Mentalidade para mudança
                </Typography>
              </Stack>
              <Typography color="text.secondary">
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
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
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <InsightsIcon color="info" sx={{ fontSize: 34 }} />
                <Typography variant="h4" fontWeight={700}>
                  Perguntas para reflexão
                </Typography>
              </Stack>
              <Typography color="text.secondary">
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
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
            </Box>
          </Box>
        </Container>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <AssignmentTurnedInIcon color="success" sx={{ fontSize: 34 }} />
            <Typography variant="h4" fontWeight={700}>
              Plano de ação rápido
            </Typography>
          </Stack>

          <Typography color="text.secondary" paragraph>
            Escolha um passo por dia e marque a conclusão. Ao final da semana,
            seu fluxo de caixa estará mais claro, previsível e protegido.
          </Typography>

          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid rgba(148,163,184,0.25)",
              background:
                "linear-gradient(145deg, rgba(37,99,235,0.15) 0%, rgba(8,145,178,0.2) 100%)",
              width: "100%", // ocupa toda a largura do Container
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
                  sx={{
                    textTransform: "none",
                    alignSelf: { xs: "flex-start", sm: "center" },
                  }}
                >
                  Revisar o início do material
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Container>

        <Container maxWidth="lg" sx={{ py: { xs: 10, md: 12 } }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <YouTubeIcon color="error" sx={{ fontSize: 34 }} />
            <Typography variant="h4" fontWeight={700}>
              Tutoriais MarketUP
            </Typography>
          </Stack>

          <Typography color="text.secondary" paragraph>
            Continue aprofundando com os materiais oficiais do MarketUP. Siga o
            canal e siga a sequência de vídeos para colocar a plataforma em
            prática no dia a dia.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
            <Button
              component="a"
              href="https://www.youtube.com/@MarketUPOficial"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="error"
              sx={{ textTransform: "none", alignSelf: "flex-start" }}
              endIcon={<LaunchIcon />}
            >
              Canal oficial MarketUP
            </Button>
          </Stack>

          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid rgba(148,163,184,0.25)",
              background:
                "linear-gradient(145deg, rgba(220,38,38,0.15) 0%, rgba(59,130,246,0.15) 100%)",
              width: "100%", // ocupa toda a largura disponível
            }}
          >
            <CardContent>
              <List>
                {marketUpVideos.map((video) => (
                  <ListItem
                    key={video.href}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      px: 0,
                      mb: 4,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={1}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <PlayCircleOutlineIcon color="error" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${video.title} — ${video.description}`}
                        primaryTypographyProps={{
                          color: "text.secondary",
                          fontWeight: 500,
                        }}
                      />
                    </Stack>

                    <Box
                      component="iframe"
                      src={toEmbedUrl(video.href)}
                      title={video.title}
                      allowFullScreen
                      sx={{
                        width: "100%",
                        height: { xs: 220, sm: 360 },
                        borderRadius: 2,
                        border: 0,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
