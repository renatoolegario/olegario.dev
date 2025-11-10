"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
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
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Cookies from "js-cookie";
import { IMAGINE_MODELS, MODEL_OPTIONS } from "../../utils/imagineModels";

const EMAIL_STORAGE_KEY = "imagine_user_email";
const EMAIL_TOKEN_STORAGE_KEY = "imagine_user_token";
const POLLING_INTERVAL = 5000;
const ORDER_REFERENCE_STORAGE_KEY = "imagine_order_reference";

// Paleta sugerida para o seletor de cor de roupas
const CLOTHING_COLORS = [
  { name: "Azul Royal", hex: "#2563EB" },
  { name: "Azul Claro", hex: "#38BDF8" },
  { name: "Cinza Grafite", hex: "#1F2937" },
  { name: "Branco", hex: "#F8FAFC" },
  { name: "Preto", hex: "#0F172A" },
  { name: "Verde Esmeralda", hex: "#10B981" },
  { name: "Vinho", hex: "#7F1D1D" },
  { name: "Bege", hex: "#FDE68A" },
];

export default function ImaginePage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [encryptedEmail, setEncryptedEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [modelType, setModelType] = useState("Foto de Perfil");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileDataUrl, setSelectedFileDataUrl] = useState("");
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
  const [config, setConfig] = useState({
    model: "",
    price: null,
    chargingEnabled: true,
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);
  const [selectedColor, setSelectedColor] = useState(CLOTHING_COLORS[0]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [generationRecord, setGenerationRecord] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [generationStatusMessage, setGenerationStatusMessage] = useState("");
  const [generationError, setGenerationError] = useState("");

  const isChargingEnabled = useMemo(() => {
    if (typeof config?.chargingEnabled === "boolean") {
      return config.chargingEnabled;
    }

    const envValue =
      process.env.NEXT_PUBLIC_COBRANCA ?? process.env.COBRANCA ?? null;

    if (envValue === null || envValue === undefined) {
      return true;
    }

    const normalized = envValue.toString().trim().toLowerCase();

    return !["false", "0", "off", "no"].includes(normalized);
  }, [config?.chargingEnabled]);

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

  const steps = ["Configuração", "Confirmação", "Geração"];

  const selectedModel = useMemo(() => {
    return IMAGINE_MODELS[modelType] || MODEL_OPTIONS[0];
  }, [modelType]);

  const previewSrc = useMemo(() => {
    return previewUrl || selectedModel.preview;
  }, [previewUrl, selectedModel]);

  const selectedColorLabel = useMemo(() => {
    return selectedColor?.name || "Selecionar cor";
  }, [selectedColor]);

  const selectedColorHex = useMemo(() => {
    return selectedColor?.hex || "#2563EB";
  }, [selectedColor]);

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
      setSelectedFileDataUrl("");

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedFileDataUrl(reader.result);
        }
      };
      reader.onerror = () => {
        console.error("Erro ao ler o arquivo selecionado");
        setSelectedFileDataUrl("");
      };
      reader.readAsDataURL(file);
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

  const handleColorModalOpen = useCallback(() => {
    if (!emailSaved) return;
    setIsColorPickerOpen(true);
  }, [emailSaved]);

  const handleColorModalClose = useCallback(() => {
    setIsColorPickerOpen(false);
  }, []);

  const handleColorSelect = useCallback((color) => {
    if (color) {
      setSelectedColor(color);
    }
    setIsColorPickerOpen(false);
  }, []);

  const handleNextToPayment = useCallback(async () => {
    setErrorMessage("");
    if (!emailSaved) {
      setErrorMessage("Confirme o email antes de continuar");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Selecione uma imagem para continuar");
      return;
    }
    if (!selectedFileDataUrl) {
      setErrorMessage(
        "A imagem selecionada ainda está sendo carregada. Aguarde alguns segundos e tente novamente."
      );
      return;
    }
    setGenerationRecord(null);
    setGeneratedImageUrl("");
    setGenerationStatusMessage("");
    setGenerationError("");

    if (!isChargingEnabled) {
      setCurrentStep(3);
      setStatusMessage(
        "Cobrança desativada. Iniciamos o processamento da sua imagem."
      );
      const result = await handleGenerate();
      if (!result) {
        setCurrentStep(1);
      }
      return;
    }

    setCurrentStep(2);
  }, [
    emailSaved,
    handleGenerate,
    isChargingEnabled,
    selectedFile,
    selectedFileDataUrl,
  ]);

  const handleBackToConfig = useCallback(() => {
    setOrderId(null);
    setOrderStatus(null);
    setStatusMessage("");
    setQrCodeData("");
    setQrCodeUrl("");
    setCopyStatus(null);
    applyQrSources(null);
    setGenerationRecord(null);
    setGeneratedImageUrl("");
    setGenerationStatusMessage("");
    setGenerationError("");
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
    setSelectedFileDataUrl("");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
    setIsPreviewOpen(false);
    setSelectedColor(CLOTHING_COLORS[0]);
    setGenerationRecord(null);
    setGeneratedImageUrl("");
    setGenerationStatusMessage("");
    setGenerationError("");
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
      return null;
    }
    if (!selectedFile) {
      setErrorMessage("Selecione uma imagem para continuar");
      return null;
    }
    if (!selectedFileDataUrl) {
      setErrorMessage(
        "A imagem selecionada ainda está sendo carregada. Aguarde alguns instantes e tente novamente."
      );
      return null;
    }

    setIsGenerating(true);
    setOrderId(null);
    setOrderStatus(null);
    setStatusMessage("");
    applyQrSources(null);
    setCopyStatus(null);
    setGenerationRecord(null);
    setGeneratedImageUrl("");
    setGenerationStatusMessage("");
    setGenerationError("");

    let responseData = null;
    let isSuccessful = false;

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
      if (typeof data?.chargingEnabled === "boolean") {
        setConfig((prev) => ({
          ...prev,
          chargingEnabled: data.chargingEnabled,
        }));
      }
      responseData = data;
      isSuccessful = true;
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

    return isSuccessful ? responseData : null;
  }, [
    applyQrSources,
    emailSaved,
    encryptedEmail,
    modelType,
    selectedFile,
    selectedFileDataUrl,
  ]);

  const initiateGeneration = useCallback(async () => {
    if (!orderId || !selectedFileDataUrl || !encryptedEmail) return;
    setGenerationError("");
    setGenerationStatusMessage(
      `Enviando sua imagem para processamento com a cor ${selectedColorLabel.toLowerCase()}.`
    );

    try {
      const response = await fetch("/api/imagine/initiate-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          encryptedEmail,
          modelType,
          colorName: selectedColor?.name || "",
          colorHex: selectedColor?.hex || "",
          imageDataUrl: selectedFileDataUrl,
          originalFileName: selectedFile?.name || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData?.message || "Erro ao iniciar a geração da imagem"
        );
      }

      const data = await response.json();
      const generation = data?.generation || null;

      if (generation) {
        setGenerationRecord(generation);

        if (generation.statusMessage) {
          setGenerationStatusMessage(generation.statusMessage);
        } else if (generation.status) {
          setGenerationStatusMessage(
            generation.status === "processing"
              ? "Processando sua imagem com o modelo selecionado..."
              : generation.status
          );
        }

        if (generation.resultImageUrl) {
          setGeneratedImageUrl(generation.resultImageUrl);
        }
      }
    } catch (error) {
      console.error("Erro ao iniciar geração de imagem", error);
      setGenerationError(
        error.message || "Erro ao iniciar a geração da imagem"
      );
      setGenerationRecord({
        status: "failed",
        statusMessage: "",
        errorMessage:
          error.message || "Não foi possível iniciar a geração da imagem.",
      });
    }
  }, [
    encryptedEmail,
    modelType,
    orderId,
    selectedColor,
    selectedColorLabel,
    selectedFile,
    selectedFileDataUrl,
  ]);

  const checkGenerationStatus = useCallback(async () => {
    if (!orderId) return;
    try {
      const response = await fetch(
        `/api/imagine/check-generation?orderId=${orderId}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData?.message || "Erro ao consultar a geração da imagem"
        );
      }

      const data = await response.json();
      const generation = data?.generation || null;

      if (generation) {
        setGenerationRecord(generation);

        if (generation.statusMessage) {
          setGenerationStatusMessage(generation.statusMessage);
        } else if (generation.status) {
          setGenerationStatusMessage(
            generation.status === "processing"
              ? "Ainda estamos trabalhando na transformação da sua imagem..."
              : generation.status
          );
        }

        if (generation.status === "completed" && generation.resultImageUrl) {
          setGeneratedImageUrl(generation.resultImageUrl);
        }

        if (generation.status === "failed") {
          setGenerationError(
            generation.errorMessage ||
              "Não foi possível concluir a geração da imagem. Tente novamente."
          );
        }
      }
    } catch (error) {
      console.error("Erro ao consultar geração de imagem", error);
      setGenerationError(
        error.message || "Erro ao consultar o andamento da geração."
      );
    }
  }, [orderId]);

  // ✅ AGORA SIM: efeito que chama handleGenerate FICA DEPOIS da função
  useEffect(() => {
    if (!isChargingEnabled) return;
    if (
      currentStep === 2 &&
      !orderId &&
      !isGenerating &&
      selectedFile &&
      selectedFileDataUrl
    ) {
      handleGenerate();
    }
  }, [
    currentStep,
    handleGenerate,
    isChargingEnabled,
    isGenerating,
    orderId,
    selectedFile,
    selectedFileDataUrl,
  ]);

  useEffect(() => {
    if (!isPaymentConfirmed) return;
    if (!orderId || !selectedFileDataUrl || !encryptedEmail) return;
    if (generationRecord) return;
    initiateGeneration();
  }, [
    encryptedEmail,
    generationRecord,
    initiateGeneration,
    isPaymentConfirmed,
    orderId,
    selectedFileDataUrl,
  ]);

  useEffect(() => {
    if (!orderId || !isPaymentConfirmed) return;

    if (!generationRecord) {
      checkGenerationStatus();
      return;
    }

    if (
      generationRecord.status === "completed" ||
      generationRecord.status === "failed" ||
      generatedImageUrl
    ) {
      return;
    }

    let isCancelled = false;

    const poll = async () => {
      if (!isCancelled) {
        await checkGenerationStatus();
      }
    };

    poll();
    const intervalId = setInterval(poll, POLLING_INTERVAL);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [
    checkGenerationStatus,
    generationRecord,
    generatedImageUrl,
    isPaymentConfirmed,
    orderId,
  ]);

  // 2) Vai para a etapa 3 assim que o pagamento for confirmado
  useEffect(() => {
    if (isPaymentConfirmed) {
      applyQrSources(null);
      setStatusMessage(
        `Seu pagamento foi feito com sucesso! Já estamos trabalhando na geração da sua imagem perfeita com a cor ${selectedColorLabel.toLowerCase()}.`
      );
      setCurrentStep(3); // "Geração"
    }
  }, [applyQrSources, isPaymentConfirmed, selectedColorLabel]);

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

                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  Selecionar cor da roupa
                                </Typography>
                                <Stack spacing={1.5} alignItems="flex-start">
                                  <Button
                                    variant="outlined"
                                    disabled={!emailSaved}
                                    onClick={handleColorModalOpen}
                                    sx={{
                                      borderColor: "rgba(148,163,184,0.4)",
                                      color: "#f8fafc",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 1,
                                      "&:hover": {
                                        borderColor: "#7dd3fc",
                                        bgcolor: "rgba(125,211,252,0.08)",
                                      },
                                      "&.Mui-disabled": {
                                        color: "rgba(148,163,184,0.4)",
                                        borderColor: "rgba(148,163,184,0.15)",
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: "50%",
                                        bgcolor: selectedColorHex,
                                        border: "1px solid rgba(2,6,23,0.35)",
                                      }}
                                    />
                                    {selectedColorLabel}
                                  </Button>

                                  <Typography
                                    variant="caption"
                                    color="rgba(148,163,184,0.75)"
                                  >
                                    Essa cor será utilizada no prompt do modelo
                                    ao gerar a imagem final.
                                  </Typography>
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
                              Confirmação para Geraeção
                            </Typography>
                            <Typography
                              variant="body2"
                              color="rgba(226,232,240,0.75)"
                            >
                              Por menos de <strong>R$ 5,00</strong> você gera
                              sua imagem.
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

                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Cor selecionada
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Box
                                sx={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: "50%",
                                  bgcolor: selectedColorHex,
                                  border: "1px solid rgba(148,163,184,0.35)",
                                }}
                              />
                              <Typography
                                variant="body2"
                                color="rgba(226,232,240,0.85)"
                              >
                                {selectedColorLabel}
                              </Typography>
                            </Stack>
                          </Box>

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
                        bgcolor: "rgba(15,23,42,0.85)",
                        border: "1px solid rgba(148,163,184,0.2)",
                        backdropFilter: "blur(14px)",
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Stack spacing={3} alignItems="center">
                          {!generatedImageUrl ? (
                            <Typography
                              variant="h5"
                              fontWeight={600}
                              textAlign="center"
                            >
                              Estamos gerando sua imagem personalizada
                            </Typography>
                          ) : (
                            <Typography
                              variant="h5"
                              fontWeight={600}
                              textAlign="center"
                            >
                              Sua imagem está pronta!
                            </Typography>
                          )}

                          {!generatedImageUrl && !generationError ? (
                            <Typography
                              variant="body2"
                              color="rgba(226,232,240,0.75)"
                              textAlign="center"
                              maxWidth={460}
                            >
                              {generationStatusMessage ||
                                statusMessage ||
                                `Aplicando o modelo escolhido com a cor ${selectedColorLabel.toLowerCase()}. Isso pode levar alguns segundos.`}
                            </Typography>
                          ) : null}

                          {generationError ? (
                            <Alert severity="error" sx={{ width: "100%" }}>
                              {generationError}
                            </Alert>
                          ) : null}

                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              maxWidth: 420,
                              borderRadius: 3,
                              overflow: "hidden",
                              border: "1px solid rgba(148,163,184,0.3)",
                            }}
                          >
                            <Box
                              component="img"
                              src={generatedImageUrl || previewSrc}
                              alt="Pré-visualização da geração"
                              sx={{
                                width: "100%",
                                height: { xs: 260, md: 360 },
                                objectFit: "cover",
                                filter:
                                  generatedImageUrl || generationError
                                    ? "none"
                                    : "blur(6px) brightness(0.7)",
                                transition: "filter 0.4s ease",
                              }}
                            />

                            {!generatedImageUrl && !generationError ? (
                              <Stack
                                spacing={1}
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                  position: "absolute",
                                  inset: 0,
                                  bgcolor: "rgba(2,6,23,0.55)",
                                  backdropFilter: "blur(4px)",
                                }}
                              >
                                <CircularProgress
                                  size={48}
                                  sx={{ color: "#38bdf8" }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "rgba(248,250,252,0.9)",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.2,
                                  }}
                                >
                                  Gerando
                                </Typography>
                              </Stack>
                            ) : null}
                          </Box>

                          {generatedImageUrl ? (
                            <Stack spacing={2} alignItems="center">
                              <Alert
                                severity="success"
                                sx={{
                                  width: "100%",
                                  bgcolor: "rgba(15,118,110,0.35)",
                                  color: "#f0fdfa",
                                }}
                              >
                                Sua nova imagem foi gerada com sucesso! Faça o
                                download abaixo e aproveite.
                              </Alert>
                              <Button
                                variant="contained"
                                color="primary"
                                component="a"
                                href={generatedImageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={`imagine-${orderId || "resultado"}.png`}
                              >
                                Baixar imagem
                              </Button>
                            </Stack>
                          ) : null}

                          {!generatedImageUrl && generationError ? (
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={handleRestart}
                            >
                              Tentar novamente
                            </Button>
                          ) : null}
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

      <Dialog
        open={isColorPickerOpen}
        onClose={handleColorModalClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            bgcolor: "rgba(2,6,23,0.92)",
            color: "#f8fafc",
            border: "1px solid rgba(148,163,184,0.2)",
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Selecionar cor da roupa
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "rgba(148,163,184,0.2)" }}>
          <Grid container spacing={2}>
            {CLOTHING_COLORS.map((color) => {
              const isSelected = selectedColor?.hex === color.hex;
              return (
                <Grid item xs={12} sm={6} key={color.hex}>
                  <Button
                    fullWidth
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => handleColorSelect(color)}
                    sx={{
                      justifyContent: "flex-start",
                      gap: 1.5,
                      alignItems: "center",
                      textTransform: "none",
                      borderColor: isSelected
                        ? "#38bdf8"
                        : "rgba(148,163,184,0.35)",
                      bgcolor: isSelected
                        ? "rgba(56,189,248,0.18)"
                        : "rgba(15,23,42,0.6)",
                      color: "#f8fafc",
                      "&:hover": {
                        borderColor: "#38bdf8",
                        bgcolor: "rgba(56,189,248,0.18)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: color.hex,
                        border: "1px solid rgba(15,23,42,0.4)",
                      }}
                    />
                    <Stack spacing={0.5} alignItems="flex-start">
                      <Typography variant="body2" fontWeight={600}>
                        {color.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="rgba(226,232,240,0.7)"
                      >
                        {color.hex}
                      </Typography>
                    </Stack>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid rgba(148,163,184,0.2)",
            px: 3,
            py: 1.5,
          }}
        >
          <Button onClick={handleColorModalClose} sx={{ color: "#94a3b8" }}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
