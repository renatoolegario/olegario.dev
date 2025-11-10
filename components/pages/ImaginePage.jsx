"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Cookies from "js-cookie";

const EMAIL_STORAGE_KEY = "imagine_user_email";
const EMAIL_TOKEN_STORAGE_KEY = "imagine_user_token";
const POLLING_INTERVAL = 5000;
const ORDER_REFERENCE_STORAGE_KEY = "imagine_order_reference";

// Catálogo de modelos (pode crescer depois)
const MODELS = {
  "Foto de Perfil": {
    value: "Foto de Perfil",
    label: "Foto de Perfil",
    preview: "/imagine/foto_perfil/1.jpg",
    prompt:
      "Gere uma foto de perfil nítida, iluminação suave, foco no rosto, fundo levemente desfocado.",
  },
};

// Lista de opções para popular o <Select>
const MODEL_OPTIONS = Object.values(MODELS);

export default function ImaginePage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [encryptedEmail, setEncryptedEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [modelType, setModelType] = useState("Foto de Perfil");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [config, setConfig] = useState({ model: "", price: null });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);

  const formattedPrice = useMemo(() => {
    if (!config?.price && config?.price !== 0) return "Valor a definir";
    const numericPrice = Number(config.price);
    if (Number.isNaN(numericPrice)) return "Valor a definir";
    return numericPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }, [config?.price]);

  const steps = ["Configuração", "Pagamento", "Confirmação"];

  const selectedModel = useMemo(() => {
    return MODELS[modelType] || MODEL_OPTIONS[0];
  }, [modelType]);

  const previewSrc = useMemo(() => {
    return previewUrl || selectedModel.preview;
  }, [previewUrl, selectedModel]);

  const applyQrSources = useCallback((orderData) => {
    if (!orderData) {
      setQrCodeUrl("");
      setQrCodeData("");
      return;
    }
    const qrImage = orderData?.qrImage;
    const qrDataValue = orderData?.qrData;

    if (qrImage) {
      setQrCodeUrl(`data:image/png;base64,${qrImage}`);
    } else if (qrDataValue) {
      const encodedData = encodeURIComponent(qrDataValue);
      setQrCodeUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedData}`
      );
    } else {
      setQrCodeUrl("");
    }
    setQrCodeData(qrDataValue || "");
  }, []);

  const isPaymentConfirmed = useMemo(() => {
    if (!orderStatus) return false;
    const normalized = orderStatus.toLowerCase();
    return [
      "paid",
      "closed",
      "finished",
      "approved",
      "processed",
      "accredited",
    ].includes(normalized);
  }, [orderStatus]);

  // Carrega email/token salvos
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY);
    const storedToken = window.localStorage.getItem(EMAIL_TOKEN_STORAGE_KEY);
    if (storedEmail) setEmail(storedEmail);
    if (storedToken) {
      setEncryptedEmail(storedToken);
      setEmailSaved(true);
    }
  }, []);

  // ❌ (REMOVIDO DAQUI) useEffect que chamava handleGenerate

  // Busca configurações
  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch("/api/imagine/config");
        if (!response.ok) return;
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Não foi possível carregar as configurações", error);
      }
    }
    fetchConfig();
  }, []);

  // Polling do pedido
  useEffect(() => {
    let intervalId;
    if (orderId && !isPaymentConfirmed) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/imagine/check-order?orderId=${orderId}`
          );
        if (!response.ok) throw new Error("Erro ao consultar pedido");
          const data = await response.json();
          const status = data?.status || null;
          const statusDetail = data?.statusDetail || "";
          if (status) setOrderStatus(status);
          if (statusDetail) setStatusMessage(statusDetail);
          applyQrSources(data);
        } catch (error) {
          console.error("Erro durante a checagem de status", error);
        }
      }, POLLING_INTERVAL);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [applyQrSources, isPaymentConfirmed, orderId]);

  // Avança para confirmação quando pago
  useEffect(() => {
    if (isPaymentConfirmed) {
      applyQrSources(null);
      setStatusMessage(
        "Seu pagamento foi feito com sucesso! Já estamos trabalhando na geração da sua imagem perfeita!"
      );
      setCurrentStep(3);
    }
  }, [applyQrSources, isPaymentConfirmed]);

  // Limpa mensagem de cópia após 4s
  useEffect(() => {
    if (!copyStatus?.message) return;
    const timeoutId = setTimeout(() => setCopyStatus(null), 4000);
    return () => clearTimeout(timeoutId);
  }, [copyStatus]);

  // Sempre que perder o email salvo, reset de steps e refs
  useEffect(() => {
    if (emailSaved) return;
    setCurrentStep(1);
    setOrderId(null);
    setOrderStatus(null);
    setStatusMessage("");
    setQrCodeData("");
    setQrCodeUrl("");
    setCopyStatus(null);
    applyQrSources(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ORDER_REFERENCE_STORAGE_KEY);
    }
  }, [applyQrSources, emailSaved]);

  // Libera URL do preview ao desmontar/trocar
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleEmailChange = useCallback(
    (event) => {
      const value = event.target.value;
      setEmail(value);
      setEmailError("");
      if (emailSaved) {
        setEmailSaved(false);
        setEncryptedEmail("");
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(EMAIL_TOKEN_STORAGE_KEY);
        }
        Cookies.remove(EMAIL_TOKEN_STORAGE_KEY);
      }
    },
    [emailSaved]
  );

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(url);
    },
    [previewUrl]
  );

  const handlePreviewOpen = useCallback(() => {
    if (!previewUrl) return;
    setIsPreviewOpen(true);
  }, [previewUrl]);

  const handlePreviewClose = useCallback(() => setIsPreviewOpen(false), []);

  const handleTabChange = useCallback((_, value) => {
    setActiveTab(value);
  }, []);

  const handleNextToPayment = useCallback(() => {
    setErrorMessage("");
    if (!emailSaved) {
      setErrorMessage("Confirme o email antes de continuar");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Selecione uma imagem para continuar");
      return;
    }
    setCurrentStep(2);
  }, [emailSaved, selectedFile]);

  const handleBackToConfig = useCallback(() => {
    setOrderId(null);
    setOrderStatus(null);
    setStatusMessage("");
    setQrCodeData("");
    setQrCodeUrl("");
    setCopyStatus(null);
    applyQrSources(null);
    setCurrentStep(1);
  }, [applyQrSources]);

  const handleRestart = useCallback(() => {
    setIsGenerating(false);
    setOrderId(null);
    setOrderStatus(null);
    setStatusMessage("");
    setQrCodeData("");
    setQrCodeUrl("");
    setCopyStatus(null);
    applyQrSources(null);
    setSelectedFile(null);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
    setIsPreviewOpen(false);
    setCurrentStep(1);
  }, [applyQrSources]);

  const handleSaveEmail = useCallback(async () => {
    setErrorMessage("");
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setEmailError("Informe um email válido");
      return;
    }
    try {
      const response = await fetch("/api/imagine/encrypt-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      if (!response.ok) throw new Error("Não foi possível validar o email");
      const data = await response.json();
      const encrypted = data?.encryptedEmail;
      if (!encrypted) throw new Error("Resposta inválida da criptografia");

      if (typeof window !== "undefined") {
        window.localStorage.setItem(EMAIL_STORAGE_KEY, trimmedEmail);
        window.localStorage.setItem(EMAIL_TOKEN_STORAGE_KEY, encrypted);
      }
      Cookies.set(EMAIL_STORAGE_KEY, trimmedEmail, { expires: 30 });
      Cookies.set(EMAIL_TOKEN_STORAGE_KEY, encrypted, { expires: 30 });

      setEncryptedEmail(encrypted);
      setEmailSaved(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Erro ao salvar email");
    }
  }, [email]);

  const handleGenerate = useCallback(async () => {
    setErrorMessage("");
    if (!emailSaved || !encryptedEmail) {
      setErrorMessage("Informe e confirme o email antes de continuar");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Selecione uma imagem para continuar");
      return;
    }

    setIsGenerating(true);
    setOrderId(null);
    setOrderStatus(null);
    setStatusMessage("");
    applyQrSources(null);
    setCopyStatus(null);

    try {
      const generateReference = () => {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return `imagine-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 10)}`;
      };

      const newExternalReference = generateReference();

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          ORDER_REFERENCE_STORAGE_KEY,
          newExternalReference
        );
      }

      const response = await fetch("/api/imagine/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          encryptedEmail,
          modelType,
          externalReference: newExternalReference,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erro ao iniciar o pagamento");
      }

      const data = await response.json();
      setOrderId(data?.orderId || null);
      setOrderStatus(data?.status || null);
      setStatusMessage(data?.statusDetail || "");

      if (typeof window !== "undefined" && data?.externalReference) {
        window.localStorage.setItem(
          ORDER_REFERENCE_STORAGE_KEY,
          data.externalReference
        );
      }

      applyQrSources(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Erro inesperado ao gerar pedido");
    } finally {
      setIsGenerating(false);
    }
  }, [applyQrSources, emailSaved, encryptedEmail, modelType, selectedFile]);

  // ✅ AGORA SIM: efeito que chama handleGenerate FICA DEPOIS da função
  useEffect(() => {
    if (currentStep === 2 && !orderId && !isGenerating) {
      handleGenerate();
    }
  }, [currentStep, orderId, isGenerating, handleGenerate]);

  const handleCopyQrData = useCallback(async () => {
    if (!qrCodeData) return;
    try {
      const canUseClipboard =
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function";

      if (canUseClipboard) {
        await navigator.clipboard.writeText(qrCodeData);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = qrCodeData;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      } else {
        throw new Error("Clipboard API indisponível");
      }

      setCopyStatus({
        message: "Código PIX copiado para a área de transferência.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao copiar código PIX", error);
      setCopyStatus({
        message: "Não foi possível copiar o código PIX. Copie manualmente.",
        severity: "error",
      });
    }
  }, [qrCodeData]);

  // Iniciar edição de email (remove token e volta a pedir confirmação)
  const handleStartEmailEdit = useCallback(() => {
    setEmailSaved(false);
    setEncryptedEmail("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(EMAIL_TOKEN_STORAGE_KEY);
    }
    Cookies.remove(EMAIL_TOKEN_STORAGE_KEY);
  }, []);
}


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "#f8fafc",
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Box maxWidth="lg" mx="auto">
        <Stack spacing={4}>
          {/* Cabeçalho com email vinculado + botão alterar */}
          <Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={2}
            >
              <Typography
                component="h1"
                variant="h3"
                fontWeight={700}
                gutterBottom
              >
                Gere a Imagem perfeita{" "}
                {emailSaved && (
                  <Typography
                    component="span"
                    variant="h6"
                    sx={{ color: "rgba(148,163,184,0.8)", ml: 1 }}
                  >
                    ({email})
                  </Typography>
                )}
              </Typography>

              {emailSaved && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleStartEmailEdit}
                  sx={{
                    borderColor: "rgba(148,163,184,0.4)",
                    color: "#f8fafc",
                    "&:hover": {
                      borderColor: "#7dd3fc",
                      bgcolor: "rgba(125,211,252,0.08)",
                    },
                  }}
                >
                  Alterar email
                </Button>
              )}
            </Stack>

            <Typography variant="body1" color="rgba(248,250,252,0.75)">
              O resultado será entregue em seguida. Para garantirmos que tudo
              corra bem, precisamos do seu email. Ele ficará armazenado com
              segurança localmente e liberará o acesso após a confirmação.
            </Typography>
          </Box>

          {/* Card de email só aparece se NÃO houver email salvo */}
          {!emailSaved && (
            <Card
              sx={{
                bgcolor: "rgba(15,23,42,0.65)",
                border: "1px solid rgba(148,163,184,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Email de acesso
                    </Typography>
                    <Typography variant="body2" color="rgba(226,232,240,0.75)">
                      Informe o email para liberar a geração. Ele será utilizado
                      no envio do resultado.
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Seu email"
                      value={email}
                      onChange={handleEmailChange}
                      error={Boolean(emailError)}
                      helperText={
                        emailError || "Informe o email para liberar a geração"
                      }
                      InputLabelProps={{ style: { color: "#cbd5f5" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#f8fafc",
                          "& fieldset": {
                            borderColor: "rgba(148,163,184,0.4)",
                          },
                          "&:hover fieldset": { borderColor: "#7dd3fc" },
                          "&.Mui-focused fieldset": { borderColor: "#38bdf8" },
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(148,163,184,0.8)",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSaveEmail}
                      sx={{
                        minWidth: 160,
                        bgcolor: emailSaved ? "#22c55e" : "#0ea5e9",
                        "&:hover": {
                          bgcolor: emailSaved ? "#16a34a" : "#0284c7",
                        },
                      }}
                    >
                      {emailSaved ? "Email confirmado" : "Confirmar email"}
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )}

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
            TabIndicatorProps={{ sx: { backgroundColor: "#38bdf8" } }}
            sx={{
              "& .MuiTab-root": {
                color: "rgba(248,250,252,0.6)",
                textTransform: "none",
                fontWeight: 600,
                "&.Mui-selected": { color: "#38bdf8" },
              },
            }}
          >
            <Tab label="Nova geração" value="new" />
            <Tab label="Histórico" value="history" />
          </Tabs>

          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

          {activeTab === "new" && (
            <Stack spacing={3}>
              <Box sx={{ position: "relative" }}>
                <Stack
                  spacing={3}
                  sx={{
                    pointerEvents: emailSaved ? "auto" : "none",
                    opacity: emailSaved ? 1 : 0.6,
                    transition: "opacity 0.3s ease",
                  }}
                  aria-hidden={!emailSaved}
                >
                  <Stepper
                    activeStep={currentStep - 1}
                    alternativeLabel
                    sx={{
                      "& .MuiStepIcon-root": {
                        color: "rgba(148,163,184,0.4)",
                        "&.Mui-active": { color: "#38bdf8" },
                        "&.Mui-completed": { color: "#22c55e" },
                      },
                      "& .MuiStepLabel-label": {
                        color: "rgba(248,250,252,0.8) !important",
                      },
                    }}
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel
                          onClick={
                            index === 0 && currentStep === 3
                              ? handleRestart
                              : undefined
                          }
                          sx={{
                            cursor:
                              index === 0 && currentStep === 3
                                ? "pointer"
                                : "default",
                          }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {currentStep === 1 ? (
                    <Grid container spacing={3}>
                      {/* ESQUERDA: Configuração (select + upload) */}
                      <Grid item xs={12} md={6}>
                        <Card
                          sx={{
                            bgcolor: "rgba(15,23,42,0.65)",
                            border: "1px solid rgba(148,163,184,0.2)",
                            backdropFilter: "blur(8px)",
                            height: "100%",
                          }}
                        >
                          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Stack spacing={3} sx={{ height: "100%" }}>
                              <Box>
                                <Typography
                                  variant="h6"
                                  fontWeight={600}
                                  gutterBottom
                                >
                                  Configuração da nova geração
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="rgba(226,232,240,0.75)"
                                >
                                  Escolha o modelo e selecione a imagem de
                                  referência para continuar.
                                </Typography>
                              </Box>

                              <Divider
                                sx={{ borderColor: "rgba(148,163,184,0.2)" }}
                              />

                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  Tipo de modelo
                                </Typography>
                                <Select
                                  fullWidth
                                  value={modelType}
                                  onChange={(event) =>
                                    setModelType(event.target.value)
                                  }
                                  disabled={!emailSaved}
                                  sx={{
                                    color: "#f8fafc",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "rgba(148,163,184,0.4)",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                      { borderColor: "#7dd3fc" },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      { borderColor: "#38bdf8" },
                                  }}
                                >
                                  {MODEL_OPTIONS.map((opt) => (
                                    <MenuItem key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Box>

                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  Upload da imagem de referência
                                </Typography>
                                <Stack spacing={2}>
                                  <Button
                                    variant="outlined"
                                    component="label"
                                    disabled={!emailSaved}
                                    sx={{
                                      alignSelf: "flex-start",
                                      borderColor: "rgba(148,163,184,0.4)",
                                      color: "#f8fafc",
                                      "&:hover": {
                                        borderColor: "#7dd3fc",
                                        bgcolor: "rgba(125,211,252,0.08)",
                                      },
                                    }}
                                  >
                                    SELECIONAR IMAGEM
                                    <input
                                      type="file"
                                      hidden
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      disabled={!emailSaved}
                                    />
                                  </Button>

                                  {selectedFile ? (
                                    <Typography
                                      variant="caption"
                                      color="rgba(148,163,184,0.8)"
                                    >
                                      {selectedFile.name}
                                    </Typography>
                                  ) : null}
                                </Stack>
                              </Box>

                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                justifyContent="flex-end"
                                spacing={2}
                                mt="auto"
                              >
                                <Button
                                  variant="contained"
                                  onClick={handleNextToPayment}
                                  disabled={!emailSaved}
                                >
                                  Gerar Imagem
                                </Button>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>

                      {/* DIREITA: Preview da imagem */}
                      <Grid item xs={12} md={6}>
                        <Card
                          sx={{
                            bgcolor: "rgba(15,23,42,0.65)",
                            border: "1px solid rgba(148,163,184,0.2)",
                            backdropFilter: "blur(8px)",
                            height: "100%",
                          }}
                        >
                          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                            <Stack spacing={2}>
                              <Typography variant="h6" fontWeight={600}>
                                Pré-visualização
                              </Typography>

                              <Box
                                sx={{
                                  width: "100%",
                                  borderRadius: 2,
                                  overflow: "hidden",
                                  border: "1px solid rgba(148,163,184,0.3)",
                                  cursor: "pointer",
                                }}
                                onClick={handlePreviewOpen}
                                title="Clique para ampliar"
                              >
                                <Box
                                  component="img"
                                  src={previewSrc}
                                  alt="Pré-visualização"
                                  sx={{
                                    width: "100%",
                                    height: { xs: 220, md: 360 },
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  ) : null}

                  {currentStep === 2 ? (
                    <Card
                      sx={{
                        bgcolor: "rgba(15,23,42,0.8)",
                        border: "1px solid rgba(148,163,184,0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Stack spacing={3}>
                          <Box>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              Pagamento e geração
                            </Typography>
                            <Typography
                              variant="body2"
                              color="rgba(226,232,240,0.75)"
                            >
                              Gere o QR Code e use a opção de copiar e colar
                              para concluir o pagamento.
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              variant="subtitle2"
                              color="rgba(125,211,252,0.9)"
                            >
                              {config?.model || "Modelo"}
                            </Typography>
                            <Typography variant="h4" fontWeight={700}>
                              {formattedPrice}
                            </Typography>
                          </Box>

                          {/* COPY curto acima do QR */}
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Por menos de <strong>R$ 5,00</strong> você gera sua
                            imagem.
                          </Typography>

                          {orderStatus ? (
                            <Alert
                              severity={isPaymentConfirmed ? "success" : "info"}
                            >
                              Status atual: {orderStatus}
                            </Alert>
                          ) : null}

                          {/* QR + código copia-e-cola (com loading enquanto cria) */}
                          {qrCodeUrl || qrCodeData ? (
                            <Stack
                              direction={{ xs: "column", md: "row" }}
                              spacing={3}
                              alignItems={{ xs: "stretch", md: "center" }}
                            >
                              {qrCodeUrl ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    p: 3,
                                    borderRadius: 2,
                                    bgcolor: "rgba(2,6,23,0.85)",
                                    border: "1px dashed rgba(125,211,252,0.45)",
                                    minWidth: { md: 260 },
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={qrCodeUrl}
                                    alt="QR Code para pagamento"
                                    sx={{ width: 240, height: 240 }}
                                  />
                                </Box>
                              ) : null}

                              {qrCodeData ? (
                                <Stack spacing={1.5} flex={1}>
                                  <Typography
                                    variant="subtitle2"
                                    color="rgba(148,163,184,0.9)"
                                  >
                                    Código PIX (copia e cola)
                                  </Typography>
                                  <TextField
                                    value={qrCodeData}
                                    multiline
                                    minRows={4}
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                      width: "100%",
                                      bgcolor: "rgba(15,23,42,0.6)",
                                      borderRadius: 2,
                                      "& .MuiOutlinedInput-root": {
                                        color: "#f8fafc",
                                        "& fieldset": {
                                          borderColor: "rgba(148,163,184,0.3)",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "#7dd3fc",
                                        },
                                        "&.Mui-focused fieldset": {
                                          borderColor: "#38bdf8",
                                        },
                                      },
                                    }}
                                  />
                                  <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={1}
                                  >
                                    <Button
                                      variant="outlined"
                                      startIcon={<ContentCopyIcon />}
                                      onClick={handleCopyQrData}
                                      sx={{
                                        color: "#f8fafc",
                                        borderColor: "rgba(125,211,252,0.45)",
                                        "&:hover": {
                                          borderColor: "#7dd3fc",
                                          bgcolor: "rgba(125,211,252,0.08)",
                                        },
                                      }}
                                    >
                                      Copiar código PIX
                                    </Button>
                                  </Stack>
                                  {copyStatus?.message ? (
                                    <Alert severity={copyStatus.severity}>
                                      {copyStatus.message}
                                    </Alert>
                                  ) : null}
                                </Stack>
                              ) : null}
                            </Stack>
                          ) : (
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                border: "1px solid rgba(148,163,184,0.2)",
                                bgcolor: "rgba(2,6,23,0.6)",
                              }}
                            >
                              <CircularProgress size={20} />
                              <Typography variant="body2">
                                Gerando o QR Code automaticamente…
                              </Typography>
                            </Stack>
                          )}

                          {statusMessage ? (
                            <Alert
                              severity={isPaymentConfirmed ? "success" : "info"}
                            >
                              {statusMessage}
                            </Alert>
                          ) : null}

                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            justifyContent="flex-end"
                          >
                            <Button
                              variant="outlined"
                              onClick={handleBackToConfig}
                              disabled={isGenerating}
                            >
                              Voltar
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={isGenerating}
                              onClick={handleGenerate}
                              sx={{ minWidth: 180 }}
                            >
                              {isGenerating ? (
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <CircularProgress size={20} color="inherit" />
                                  <span>Gerando...</span>
                                </Stack>
                              ) : orderId ? (
                                "Gerar novamente"
                              ) : (
                                "Gerar"
                              )}
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  ) : null}

                  {currentStep === 3 ? (
                    <Card
                      sx={{
                        bgcolor: "rgba(15,23,42,0.8)",
                        border: "1px solid rgba(148,163,184,0.2)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Stack
                          spacing={3}
                          alignItems="center"
                          textAlign="center"
                        >
                          <Typography variant="h4" fontWeight={700}>
                            Seu pagamento foi feito com sucesso!
                          </Typography>
                          <Typography
                            variant="body1"
                            color="rgba(226,232,240,0.85)"
                            maxWidth={420}
                          >
                            Já estamos trabalhando na geração da sua imagem
                            perfeita. Em breve você receberá o resultado
                            diretamente no seu email.
                          </Typography>
                          <CircularProgress
                            color="primary"
                            size={48}
                            thickness={4}
                            sx={{ color: "#22c55e" }}
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  ) : null}
                </Stack>

                {!emailSaved ? (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 3,
                      pointerEvents: "none",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "rgba(2,6,23,0.85)",
                        border: "1px solid rgba(125,211,252,0.35)",
                        borderRadius: 2,
                        px: 3,
                        py: 2.5,
                        textAlign: "center",
                        maxWidth: 420,
                        width: "100%",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Typography variant="body2" color="rgba(226,232,240,0.9)">
                        Confirme o email de acesso para liberar as etapas de
                        geração.
                      </Typography>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Stack>
          )}

          {activeTab === "history" && (
            <Card
              sx={{
                bgcolor: "rgba(15,23,42,0.65)",
                border: "1px solid rgba(148,163,184,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={600}>
                    Histórico de gerações
                  </Typography>
                  <Typography variant="body2" color="rgba(226,232,240,0.75)">
                    Em breve você poderá consultar por aqui todas as imagens
                    geradas.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>

      <Drawer
        anchor="left"
        open={isPreviewOpen}
        onClose={handlePreviewClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 480, md: 540 },
            bgcolor: "rgba(2,6,23,0.95)",
            color: "#f8fafc",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 3,
            gap: 2,
          }}
        >
          <Stack direction="row" justifyContent="flex-end">
            <IconButton onClick={handlePreviewClose} sx={{ color: "#f8fafc" }}>
              ✕
            </IconButton>
          </Stack>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {previewUrl ? (
              <Box
                component="img"
                src={previewUrl}
                alt="Pré-visualização ampliada"
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : null}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
