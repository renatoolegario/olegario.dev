"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Chip,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ReplayIcon from "@mui/icons-material/Replay";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

const RESUME_PAYMENT_INITIAL_STATE = {
  open: false,
  orderId: null,
  qrCodeUrl: "",
  qrCodeData: "",
  status: "",
  statusDetail: "",
  expirationTime: null,
};

export default function ImaginePage() {
  const router = useRouter();
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
  const [isUploadingSource, setIsUploadingSource] = useState(false);
  const [isPreparingGeneration, setIsPreparingGeneration] = useState(false);
  const [preparedGeneration, setPreparedGeneration] = useState(null);
  const [hasInitiatedGeneration, setHasInitiatedGeneration] = useState(false);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [historyFeedback, setHistoryFeedback] = useState(null);
  const [historyPreviewRecord, setHistoryPreviewRecord] = useState(null);
  const [retryingOrders, setRetryingOrders] = useState({});
  const [resumingPayments, setResumingPayments] = useState({});
  const [resumePaymentModal, setResumePaymentModal] = useState(
    RESUME_PAYMENT_INITIAL_STATE
  );
  const [resumePaymentError, setResumePaymentError] = useState("");
  const [resumeCopyStatus, setResumeCopyStatus] = useState(null);
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [isReturningHome, setIsReturningHome] = useState(false);
  const isPollingHistoryRef = useRef(false);

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

  const isProcessingStatus = useCallback((status) => {
    if (!status) return false;
    const normalized = status.toString().toLowerCase();
    return ["processing", "pending", "queued", "in_progress"].includes(
      normalized
    );
  }, []);

  const processingHistoryOrderIds = useMemo(() => {
    if (!Array.isArray(historyRecords) || historyRecords.length === 0) {
      return [];
    }

    return historyRecords
      .filter((record) => isProcessingStatus(record?.status))
      .map((record) => record?.orderId)
      .filter(Boolean);
  }, [historyRecords, isProcessingStatus]);

  const getHistoryStatusDetails = useCallback(
    (status) => {
      const normalized = status ? status.toString().toLowerCase() : "";

      if (normalized === "completed") {
        return { label: "Concluída", color: "success" };
      }

      if (["failed", "error", "canceled", "cancelled"].includes(normalized)) {
        return { label: "Erro", color: "error" };
      }

      if (normalized === "pending") {
        return { label: "Pendente", color: "warning" };
      }

      if (isProcessingStatus(normalized)) {
        return { label: "Processando", color: "info" };
      }

      if (!normalized) {
        return { label: "Desconhecido", color: "default" };
      }

      return { label: status, color: "default" };
    },
    [isProcessingStatus]
  );

  const getHistoryRecordState = useCallback(
    (record) => {
      const statusDetails = getHistoryStatusDetails(record?.status);
      const normalizedStatus = record?.status
        ? record.status.toString().toLowerCase()
        : "";
      const isPending = normalizedStatus === "pending";
      const isFailed = [
        "failed",
        "error",
        "canceled",
        "cancelled",
      ].includes(normalizedStatus);
      const isRetrying = Boolean(retryingOrders?.[record?.orderId]);
      const isResuming = Boolean(resumingPayments?.[record?.orderId]);

      return {
        statusDetails,
        normalizedStatus,
        isPending,
        isFailed,
        isRetrying,
        isResuming,
      };
    },
    [getHistoryStatusDetails, resumingPayments, retryingOrders]
  );

  const renderHistoryActions = useCallback(
    (record, recordState, layout = "row") => {
      const { isPending, isResuming, isFailed, isRetrying } = recordState || {};
      const isColumnLayout = layout === "column";

      return (
        <Stack
          direction={isColumnLayout ? "column" : "row"}
          spacing={isColumnLayout ? 1.5 : 1}
          justifyContent={isColumnLayout ? "flex-start" : "flex-end"}
          alignItems={isColumnLayout ? "stretch" : "center"}
          flexWrap={isColumnLayout ? "nowrap" : "wrap"}
        >
          {isPending ? (
            <Button
              size="small"
              variant="contained"
              color="info"
              startIcon={isResuming ? null : <QrCode2Icon />}
              onClick={() => handleHistoryResumePayment(record)}
              disabled={isResuming}
              sx={{ whiteSpace: "nowrap" }}
              fullWidth={isColumnLayout}
            >
              {isResuming ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={16} />
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{ color: "inherit" }}
                  >
                    Consultando...
                  </Typography>
                </Stack>
              ) : (
                "Ver QR Code"
              )}
            </Button>
          ) : null}

          <Tooltip
            title={
              record?.resultImageUrl
                ? "Pré-visualizar imagem"
                : "Imagem ainda não disponível"
            }
          >
            <span style={{ display: isColumnLayout ? "block" : "inline-flex" }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => handleHistoryPreviewOpen(record)}
                disabled={!record?.resultImageUrl}
                sx={{
                  minWidth: 0,
                  whiteSpace: "nowrap",
                }}
                fullWidth={isColumnLayout}
              >
                Pré-visualizar
              </Button>
            </span>
          </Tooltip>

          <Tooltip
            title={
              record?.resultImageUrl
                ? "Baixar imagem"
                : "Imagem ainda não disponível"
            }
          >
            <span style={{ display: isColumnLayout ? "block" : "inline-flex" }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownloadHistoryImage(record)}
                disabled={!record?.resultImageUrl}
                sx={{
                  minWidth: 0,
                  whiteSpace: "nowrap",
                }}
                fullWidth={isColumnLayout}
              >
                Baixar
              </Button>
            </span>
          </Tooltip>

          {isFailed ? (
            <Button
              size="small"
              variant="contained"
              color="warning"
              startIcon={isRetrying ? null : <ReplayIcon />}
              onClick={() => handleRetryGeneration(record)}
              disabled={isRetrying}
              sx={{ whiteSpace: "nowrap" }}
              fullWidth={isColumnLayout}
            >
              {isRetrying ? (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress size={16} />
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{ color: "inherit" }}
                  >
                    Reenviando...
                  </Typography>
                </Stack>
              ) : (
                "Tentar novamente"
              )}
            </Button>
          ) : null}
        </Stack>
      );
    },
    [
      handleDownloadHistoryImage,
      handleHistoryPreviewOpen,
      handleHistoryResumePayment,
      handleRetryGeneration,
    ]
  );

  const fetchHistory = useCallback(
    async ({ silent = false } = {}) => {
      if (!emailSaved || !encryptedEmail) {
        setHistoryRecords([]);
        return;
      }

      if (!silent) {
        setIsFetchingHistory(true);
      }

      setHistoryError("");

      try {
        const params = new URLSearchParams();
        params.set("encryptedEmail", encryptedEmail);
        params.set("limit", "100");

        if (email) {
          params.set("playerEmail", email.trim().toLowerCase());
        }

        const response = await fetch(
          `/api/imagine/history?${params.toString()}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData?.message ||
              "Não foi possível carregar o histórico de imagens"
          );
        }

        const data = await response.json();
        const generations = Array.isArray(data?.generations)
          ? data.generations
          : [];

        setHistoryRecords(generations);
      } catch (error) {
        console.error("Erro ao carregar histórico de imagens", error);
        setHistoryError(
          error.message || "Não foi possível carregar o histórico de imagens"
        );
      } finally {
        if (!silent) {
          setIsFetchingHistory(false);
        }
      }
    },
    [email, emailSaved, encryptedEmail]
  );

  const pollProcessingHistory = useCallback(async () => {
    if (isPollingHistoryRef.current) {
      return;
    }

    if (processingHistoryOrderIds.length === 0) {
      return;
    }

    isPollingHistoryRef.current = true;

    try {
      await Promise.all(
        processingHistoryOrderIds.map(async (orderId) => {
          if (!orderId) return;

          try {
            const response = await fetch(
              `/api/imagine/check-generation?orderId=${orderId}`
            );

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}));
              console.warn(
                "Falha ao atualizar status do histórico",
                orderId,
                errorData?.message || response.status
              );
            }
          } catch (error) {
            console.error(
              "Erro ao atualizar status do histórico",
              orderId,
              error
            );
          }
        })
      );

      await fetchHistory({ silent: true });
    } finally {
      isPollingHistoryRef.current = false;
    }
  }, [fetchHistory, processingHistoryOrderIds]);

  const formatHistoryDate = useCallback((value) => {
    if (!value) return "-";

    try {
      return new Date(value).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Erro ao formatar data do histórico", error);
      return value;
    }
  }, []);

  const resumeStatusDetails = useMemo(() => {
    if (!resumePaymentModal?.status) return null;
    return getHistoryStatusDetails(resumePaymentModal.status);
  }, [getHistoryStatusDetails, resumePaymentModal?.status]);

  const resumeExpirationLabel = useMemo(() => {
    if (!resumePaymentModal?.expirationTime) return "";
    return formatHistoryDate(resumePaymentModal.expirationTime);
  }, [formatHistoryDate, resumePaymentModal?.expirationTime]);

  const deriveQrSources = useCallback((orderData) => {
    if (!orderData) {
      return { qrUrl: "", qrData: "" };
    }

    const qrImage = orderData?.qrImage;
    const qrDataValue = orderData?.qrData;

    if (qrImage) {
      return {
        qrUrl: `data:image/png;base64,${qrImage}`,
        qrData: qrDataValue || "",
      };
    }

    if (qrDataValue) {
      const encodedData = encodeURIComponent(qrDataValue);
      return {
        qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedData}`,
        qrData: qrDataValue,
      };
    }

    return { qrUrl: "", qrData: "" };
  }, []);

  const applyQrSources = useCallback(
    (orderData) => {
      const { qrUrl, qrData } = deriveQrSources(orderData);
      setQrCodeUrl(qrUrl);
      setQrCodeData(qrData);
    },
    [deriveQrSources]
  );

  const isPaymentConfirmed = useMemo(() => {
    if (!orderStatus) return false;
    const normalized = orderStatus.toLowerCase();
    return [
      "paid",
      "closed",
      "finished",
      "approved",
      "processed",
      "processing",
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

  useEffect(() => {
    if (!resumeCopyStatus?.message) return;
    const timeoutId = setTimeout(() => setResumeCopyStatus(null), 4000);
    return () => clearTimeout(timeoutId);
  }, [resumeCopyStatus]);

  useEffect(() => {
    if (activeTab !== "history") return;
    if (!emailSaved || !encryptedEmail) return;

    fetchHistory();
  }, [activeTab, emailSaved, encryptedEmail, fetchHistory]);

  useEffect(() => {
    if (activeTab !== "history") return;
    if (!emailSaved || !encryptedEmail) return;
    if (processingHistoryOrderIds.length === 0) return;

    let isCancelled = false;

    const runPoll = async () => {
      if (isCancelled) return;
      await pollProcessingHistory();
    };

    runPoll();

    const intervalId = setInterval(runPoll, POLLING_INTERVAL);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, [
    activeTab,
    emailSaved,
    encryptedEmail,
    pollProcessingHistory,
    processingHistoryOrderIds.length,
  ]);

  useEffect(() => {
    if (!historyFeedback?.message) return;
    const timeoutId = setTimeout(() => setHistoryFeedback(null), 4000);
    return () => clearTimeout(timeoutId);
  }, [historyFeedback]);

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
    setHistoryRecords([]);
    setHistoryError("");
    setHistoryFeedback(null);
    setHistoryPreviewRecord(null);
    setRetryingOrders({});
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

  const resetOrderState = useCallback(() => {
    setIsGenerating(false);
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
    setPreparedGeneration(null);
    setHasInitiatedGeneration(false);
    setIsUploadingSource(false);
    setIsPreparingGeneration(false);
    setCurrentStep(1);
    setErrorMessage("");
    setActiveTab("new");
    setResumePaymentModal(RESUME_PAYMENT_INITIAL_STATE);
    setResumePaymentError("");
    setResumeCopyStatus(null);
    setResumingPayments({});
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ORDER_REFERENCE_STORAGE_KEY);
    }
  }, [applyQrSources]);

  const cancelOrderRecord = useCallback(async (orderIdentifier) => {
    if (!orderIdentifier) {
      return { success: true };
    }

    try {
      const response = await fetch("/api/imagine/cancel-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderIdentifier }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { success: true };
        }
        const errorData = await response.json().catch(() => ({}));
        const message =
          errorData?.message || "Não foi possível cancelar o pedido atual.";
        return { success: false, message };
      }

      return { success: true };
    } catch (error) {
      console.error("Erro ao cancelar pedido", error);
      return {
        success: false,
        message: error.message || "Não foi possível cancelar o pedido atual.",
      };
    }
  }, []);

  const handleBackToConfig = useCallback(async () => {
    if (isCancellingOrder) return;

    setErrorMessage("");
    const currentOrderId = orderId;
    let cancelResult = { success: true };

    setIsCancellingOrder(true);
    try {
      cancelResult = await cancelOrderRecord(currentOrderId);
    } catch (error) {
      console.error("Erro inesperado ao cancelar pedido", error);
      cancelResult = {
        success: false,
        message:
          error.message || "Não foi possível cancelar o pedido atual.",
      };
    } finally {
      resetOrderState();
      setIsCancellingOrder(false);
    }

    if (!cancelResult.success && cancelResult.message) {
      setErrorMessage(cancelResult.message);
    }
  }, [
    cancelOrderRecord,
    isCancellingOrder,
    orderId,
    resetOrderState,
  ]);

  const handleRestart = useCallback(() => {
    resetOrderState();
    setSelectedFile(null);
    setSelectedFileDataUrl("");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
    setIsPreviewOpen(false);
    setSelectedColor(CLOTHING_COLORS[0]);
  }, [resetOrderState]);

  const resetAllState = useCallback(() => {
    resetOrderState();
    setEmail("");
    setEmailError("");
    setEncryptedEmail("");
    setEmailSaved(false);
    setModelType("Foto de Perfil");
    setSelectedFile(null);
    setSelectedFileDataUrl("");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });
    setIsPreviewOpen(false);
    setSelectedColor(CLOTHING_COLORS[0]);
    setIsColorPickerOpen(false);
    setHistoryRecords([]);
    setIsFetchingHistory(false);
    setHistoryError("");
    setHistoryFeedback(null);
    setHistoryPreviewRecord(null);
    setRetryingOrders({});
    isPollingHistoryRef.current = false;
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(EMAIL_STORAGE_KEY);
      window.localStorage.removeItem(EMAIL_TOKEN_STORAGE_KEY);
      window.localStorage.removeItem(ORDER_REFERENCE_STORAGE_KEY);
    }
    Cookies.remove(EMAIL_STORAGE_KEY);
    Cookies.remove(EMAIL_TOKEN_STORAGE_KEY);
    setIsCancellingOrder(false);
    setIsReturningHome(false);
  }, [resetOrderState]);

  const handleReturnHome = useCallback(async () => {
    if (isReturningHome) return;

    setIsReturningHome(true);
    try {
      const result = await cancelOrderRecord(orderId);
      if (!result.success && result.message) {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Erro inesperado ao cancelar pedido antes de voltar", error);
    } finally {
      resetAllState();
      setIsReturningHome(false);
      router.push("/imagine");
    }
  }, [
    cancelOrderRecord,
    isReturningHome,
    orderId,
    resetAllState,
    router,
  ]);

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
    setPreparedGeneration(null);
    setHasInitiatedGeneration(false);

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

    setIsPreparingGeneration(true);

    const orderResponse = await handleGenerate();

    if (!orderResponse) {
      setIsPreparingGeneration(false);
      return;
    }

    try {
      const response = await fetch("/api/imagine/prepare-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderResponse?.orderId || orderId,
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
          errorData?.message ||
            "Não foi possível preparar a geração da sua imagem."
        );
      }

      const data = await response.json();
      const generationPayload = data?.generation || null;
      setPreparedGeneration(generationPayload);

      if (generationPayload?.statusMessage) {
        setGenerationStatusMessage(generationPayload.statusMessage);
      }

      if (!isChargingEnabled) {
        setStatusMessage(
          "Cobrança desativada. Iniciamos o processamento da sua imagem."
        );
        setCurrentStep(3);
        return;
      }

      setCurrentStep(2);
    } catch (error) {
      console.error("Erro ao preparar geração", error);
      setErrorMessage(
        error.message || "Erro inesperado ao preparar a geração da imagem"
      );
      setCurrentStep(1);
      setPreparedGeneration(null);
      setHasInitiatedGeneration(false);
    } finally {
      setIsPreparingGeneration(false);
    }
  }, [
    emailSaved,
    handleGenerate,
    encryptedEmail,
    modelType,
    isChargingEnabled,
    orderId,
    selectedColor,
    selectedFile,
    selectedFileDataUrl,
  ]);

  const initiateGeneration = useCallback(async () => {
    const existingSourceBlobUrl =
      preparedGeneration?.sourceImageBlobUrl ||
      generationRecord?.sourceImageBlobUrl ||
      null;

    if (!orderId || !encryptedEmail) return;
    if (!selectedFileDataUrl && !existingSourceBlobUrl) return;
    if (isUploadingSource) return;
    setGenerationError("");
    setGenerationStatusMessage(
      `Preparando sua imagem para envio com a cor ${selectedColorLabel.toLowerCase()}.`
    );

    let uploadedSourceBlobUrl = existingSourceBlobUrl;

    try {
      setIsUploadingSource(true);
      setHasInitiatedGeneration(true);

      if (!uploadedSourceBlobUrl) {
        const uploadResponse = await fetch("/api/imagine/upload-source", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageDataUrl: selectedFileDataUrl,
            orderId,
            originalFileName: selectedFile?.name || null,
          }),
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json().catch(() => ({}));
          throw new Error(
            errorData?.message ||
              "Não foi possível preparar a imagem para processamento"
          );
        }

        const uploadData = await uploadResponse.json();
        uploadedSourceBlobUrl = uploadData?.blobUrl || null;

        if (!uploadedSourceBlobUrl) {
          throw new Error("Resposta inválida ao preparar a imagem para envio");
        }
      }

      setGenerationStatusMessage(
        `Enviando sua imagem para processamento com a cor ${selectedColorLabel.toLowerCase()}.`
      );

      const response = await fetch("/api/imagine/initiate-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          encryptedEmail,
          modelType,
          colorName: selectedColor?.name || "",
          colorHex: selectedColor?.hex || "",
          imageBlobUrl: uploadedSourceBlobUrl,
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
        setPreparedGeneration(generation);

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

      if (uploadedSourceBlobUrl) {
        fetch("/api/imagine/upload-source", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blobUrl: uploadedSourceBlobUrl }),
        }).catch((cleanupError) => {
          console.error(
            "Erro ao remover imagem temporária após falha na geração",
            cleanupError
          );
        });
      }

      setGenerationStatusMessage("");
      setHasInitiatedGeneration(false);
    } finally {
      setIsUploadingSource(false);
    }
  }, [
    encryptedEmail,
    generationRecord,
    isUploadingSource,
    modelType,
    orderId,
    preparedGeneration,
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

      console.log("AAAAAAAAAAAA", response);
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
        setPreparedGeneration(generation);

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

  useEffect(() => {
    if (!isPaymentConfirmed) return;
    if (!orderId || !encryptedEmail) return;
    if (generationError) return;

    const hasSourceReady = Boolean(
      selectedFileDataUrl || preparedGeneration?.sourceImageBlobUrl
    );

    if (!hasSourceReady) return;

    if (hasInitiatedGeneration) return;

    initiateGeneration();
  }, [
    encryptedEmail,
    generationError,
    generationRecord,
    initiateGeneration,
    isPaymentConfirmed,
    orderId,
    hasInitiatedGeneration,
    preparedGeneration,
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
    if (!isPaymentConfirmed) return;

    if (orderStatus && orderStatus.toLowerCase() !== "processing") {
      setOrderStatus("processing");
    }

    applyQrSources(null);
    setStatusMessage(
      `Seu pagamento foi feito com sucesso! Já estamos trabalhando na geração da sua imagem perfeita com a cor ${selectedColorLabel.toLowerCase()}.`
    );
    setCurrentStep(3); // "Geração"
  }, [
    applyQrSources,
    isPaymentConfirmed,
    orderStatus,
    selectedColorLabel,
  ]);

  const copyTextToClipboard = useCallback(async (text) => {
    if (!text) {
      throw new Error("Conteúdo vazio para copiar");
    }

    const canUseClipboard =
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function";

    if (canUseClipboard) {
      await navigator.clipboard.writeText(text);
      return;
    }

    if (typeof document !== "undefined") {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return;
    }

    throw new Error("Clipboard API indisponível");
  }, []);

  const handleCopyQrData = useCallback(async () => {
    if (!qrCodeData) return;
    try {
      await copyTextToClipboard(qrCodeData);
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
  }, [copyTextToClipboard, qrCodeData]);

  const handleResumePaymentCopy = useCallback(async () => {
    if (!resumePaymentModal?.qrCodeData) return;
    try {
      await copyTextToClipboard(resumePaymentModal.qrCodeData);
      setResumeCopyStatus({
        message: "Código PIX copiado para a área de transferência.",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao copiar código PIX do histórico", error);
      setResumeCopyStatus({
        message: "Não foi possível copiar o código PIX. Copie manualmente.",
        severity: "error",
      });
    }
  }, [copyTextToClipboard, resumePaymentModal?.qrCodeData]);

  // Iniciar edição de email (remove token e volta a pedir confirmação)
  const handleStartEmailEdit = useCallback(() => {
    setEmailSaved(false);
    setEncryptedEmail("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(EMAIL_TOKEN_STORAGE_KEY);
    }
    Cookies.remove(EMAIL_TOKEN_STORAGE_KEY);
  }, []);

  const handleHistoryPreviewOpen = useCallback((record) => {
    if (!record?.resultImageUrl) return;
    setHistoryPreviewRecord(record);
  }, []);

  const handleHistoryPreviewClose = useCallback(
    () => setHistoryPreviewRecord(null),
    []
  );

  const handleDownloadHistoryImage = useCallback((record) => {
    if (!record?.resultImageUrl) return;

    try {
      if (typeof document === "undefined") {
        window.open(record.resultImageUrl, "_blank", "noopener,noreferrer");
        return;
      }

      const link = document.createElement("a");
      link.href = record.resultImageUrl;
      const extension = record.resultImageUrl.split(".").pop() || "png";
      const safeExtension = extension.split(/[?#]/)[0] || "png";
      const filename = `imagem-gerada-${record.orderId || Date.now()}.${safeExtension}`;
      link.download = filename;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao iniciar download da imagem gerada", error);
      setHistoryFeedback({
        message:
          "Não foi possível baixar a imagem agora. Ela será aberta em uma nova aba.",
        severity: "warning",
      });
      window.open(record.resultImageUrl, "_blank", "noopener,noreferrer");
    }
  }, []);

  const handleRetryGeneration = useCallback(
    async (record) => {
      if (!record) return;
      if (!encryptedEmail) {
        setHistoryFeedback({
          message: "Confirme o email antes de reenviar a geração.",
          severity: "error",
        });
        return;
      }

      if (!record.orderId) {
        setHistoryFeedback({
          message: "Registro sem identificador válido para reprocessar.",
          severity: "error",
        });
        return;
      }

      if (!record.sourceImageBlobUrl) {
        setHistoryFeedback({
          message:
            "Não encontramos a imagem original para reenviar. Gere uma nova imagem.",
          severity: "error",
        });
        return;
      }

      setHistoryError("");
      setHistoryFeedback(null);

      setRetryingOrders((prev) => ({
        ...prev,
        [record.orderId]: true,
      }));

      try {
        const response = await fetch("/api/imagine/initiate-generation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: record.orderId,
            encryptedEmail,
            modelType: record.modelType || modelType,
            colorName: record.selectedColorName || selectedColor?.name || "",
            colorHex: record.selectedColorHex || selectedColor?.hex || "",
            imageBlobUrl: record.sourceImageBlobUrl,
            originalFileName: record.sourceImageName || null,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData?.message ||
              "Não foi possível reenviar a geração da imagem"
          );
        }

        setHistoryFeedback({
          message:
            "Reprocessamento iniciado. Vamos atualizar o status em instantes.",
          severity: "success",
        });

        await fetchHistory({ silent: true });
        await pollProcessingHistory();
      } catch (error) {
        console.error("Erro ao reenviar geração", error);
        setHistoryFeedback({
          message: error.message || "Não foi possível reenviar a geração",
          severity: "error",
        });
      } finally {
        setRetryingOrders((prev) => {
          const next = { ...prev };
          delete next[record.orderId];
          return next;
        });
      }
    },
    [
      encryptedEmail,
      fetchHistory,
      modelType,
      pollProcessingHistory,
      selectedColor?.hex,
      selectedColor?.name,
    ]
  );

  const handleResumePaymentClose = useCallback(() => {
    setResumePaymentModal(RESUME_PAYMENT_INITIAL_STATE);
    setResumePaymentError("");
    setResumeCopyStatus(null);
  }, []);

  const handleHistoryResumePayment = useCallback(
    async (record) => {
      if (!record?.orderId) {
        setHistoryFeedback({
          message: "Registro sem identificador válido para consultar o pagamento.",
          severity: "error",
        });
        return;
      }

      if (!encryptedEmail) {
        setHistoryFeedback({
          message: "Confirme o email antes de consultar o pagamento pendente.",
          severity: "error",
        });
        return;
      }

      const orderKey = record.orderId;
      setHistoryFeedback(null);
      setResumePaymentError("");
      setResumeCopyStatus(null);

      setResumingPayments((prev) => ({ ...prev, [orderKey]: true }));

      try {
        const response = await fetch("/api/imagine/resume-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderKey, encryptedEmail }),
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 410) {
          setHistoryFeedback({
            message:
              data?.message ||
              "O QR Code estava expirado e removemos os dados para que você possa iniciar um novo pedido.",
            severity: "warning",
          });
          await fetchHistory({ silent: true });
          return;
        }

        if (response.status === 404) {
          setHistoryFeedback({
            message:
              data?.message ||
              "Não encontramos mais informações de pagamento para este pedido.",
            severity: "warning",
          });
          await fetchHistory({ silent: true });
          return;
        }

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Não foi possível recuperar o QR Code deste pagamento. Tente novamente."
          );
        }

        const { qrUrl, qrData } = deriveQrSources(data);

        setResumePaymentModal({
          ...RESUME_PAYMENT_INITIAL_STATE,
          open: true,
          orderId: data?.orderId || orderKey,
          qrCodeUrl: qrUrl,
          qrCodeData: qrData,
          status: data?.status || record?.status || "pending",
          statusDetail: data?.statusDetail || "",
          expirationTime: data?.expirationTime || null,
        });

        if (!qrUrl && !qrData) {
          setResumePaymentError(
            "Não encontramos dados do QR Code para este pagamento. Gere uma nova imagem para continuar."
          );
        }
      } catch (error) {
        console.error("Erro ao recuperar pagamento pendente do histórico", error);
        setHistoryFeedback({
          message:
            error.message ||
            "Não foi possível recuperar o pagamento pendente. Tente novamente mais tarde.",
          severity: "error",
        });
      } finally {
        setResumingPayments((prev) => {
          const next = { ...prev };
          delete next[orderKey];
          return next;
        });
      }
    },
    [deriveQrSources, encryptedEmail, fetchHistory]
  );

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

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                {emailSaved && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleStartEmailEdit}
                    disabled={isCancellingOrder}
                    sx={{
                      width: { xs: "100%", sm: "auto" },
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
                                  disabled={
                                    !emailSaved ||
                                    isGenerating ||
                                    isPreparingGeneration
                                  }
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
                              disabled={isGenerating || isCancellingOrder}
                            >
                              {isCancellingOrder ? (
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <CircularProgress size={18} />
                                  <span>Voltando...</span>
                                </Stack>
                              ) : (
                                "Voltar"
                              )}
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={isGenerating || isCancellingOrder}
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
                            <Stack spacing={2} alignItems="center" width="100%">
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
                              <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                                width="100%"
                                justifyContent="center"
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  component="a"
                                  href={generatedImageUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={`imagine-${orderId || "resultado"}.png`}
                                  sx={{
                                    minWidth: { sm: 180 },
                                    width: { xs: "100%", sm: "auto" },
                                  }}
                                >
                                  Baixar imagem
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={handleReturnHome}
                                  disabled={isReturningHome || isCancellingOrder}
                                  sx={{
                                    minWidth: { sm: 180 },
                                    width: { xs: "100%", sm: "auto" },
                                    borderColor: "rgba(148,163,184,0.4)",
                                    color: "#f8fafc",
                                    "&:hover": {
                                      borderColor: "#7dd3fc",
                                      bgcolor: "rgba(125,211,252,0.08)",
                                    },
                                  }}
                                >
                                  {isReturningHome ? (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <CircularProgress size={18} />
                                      <span>Voltando...</span>
                                    </Stack>
                                  ) : (
                                    "Voltar para início"
                                  )}
                                </Button>
                              </Stack>
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
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Histórico de gerações
                    </Typography>
                    <Typography variant="body2" color="rgba(226,232,240,0.75)">
                      Acompanhe aqui todas as imagens geradas com o seu email.
                      Registros com status em processamento são atualizados a
                      cada poucos segundos.
                    </Typography>
                  </Box>

                  {!emailSaved ? (
                    <Alert severity="info">
                      Confirme o email de acesso para visualizar o histórico das
                      suas gerações.
                    </Alert>
                  ) : (
                    <Stack spacing={2}>
                      {historyFeedback?.message ? (
                        <Alert severity={historyFeedback.severity || "info"}>
                          {historyFeedback.message}
                        </Alert>
                      ) : null}

                      {historyError ? (
                        <Alert severity="error">{historyError}</Alert>
                      ) : null}

                      {isFetchingHistory ? (
                        <Stack
                          spacing={2}
                          alignItems="center"
                          justifyContent="center"
                          py={4}
                        >
                          <CircularProgress size={32} />
                          <Typography
                            variant="body2"
                            color="rgba(226,232,240,0.75)"
                            align="center"
                          >
                            Carregando histórico de imagens...
                          </Typography>
                        </Stack>
                      ) : historyRecords.length === 0 ? (
                        <Typography
                          variant="body2"
                          color="rgba(226,232,240,0.75)"
                        >
                          Nenhuma imagem gerada foi encontrada para este email
                          até o momento.
                        </Typography>
                      ) : (
                        <>
                          <Box sx={{ display: { xs: "none", md: "block" } }}>
                            <TableContainer
                              sx={{
                                border: "1px solid rgba(148,163,184,0.1)",
                                borderRadius: 2,
                                overflow: "hidden",
                                backgroundColor: "rgba(15,23,42,0.35)",
                              }}
                            >
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      sx={{ color: "rgba(226,232,240,0.85)" }}
                                    >
                                      Modelo
                                    </TableCell>
                                    <TableCell
                                      sx={{ color: "rgba(226,232,240,0.85)" }}
                                    >
                                      Criado em
                                    </TableCell>
                                    <TableCell
                                      sx={{ color: "rgba(226,232,240,0.85)" }}
                                    >
                                      Status
                                    </TableCell>
                                    <TableCell
                                      align="right"
                                      sx={{
                                        color: "rgba(226,232,240,0.85)",
                                        minWidth: { xs: 180, md: 220 },
                                      }}
                                    >
                                      Ações
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {historyRecords.map((record) => {
                                    const recordState = getHistoryRecordState(record);
                                    const { statusDetails } = recordState;

                                    return (
                                      <TableRow
                                        key={record?.id || record?.orderId}
                                        hover
                                        sx={{
                                          "&:hover": {
                                            backgroundColor: "rgba(30,41,59,0.35)",
                                          },
                                        }}
                                      >
                                        <TableCell>
                                          <Typography
                                            variant="subtitle2"
                                            color="#f8fafc"
                                            fontWeight={600}
                                            noWrap
                                            sx={{ whiteSpace: "nowrap" }}
                                          >
                                            {record?.modelType ||
                                              "Modelo não informado"}
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Typography
                                            variant="body2"
                                            color="rgba(226,232,240,0.85)"
                                            noWrap
                                            sx={{ whiteSpace: "nowrap" }}
                                          >
                                            {formatHistoryDate(record?.createdAt)}
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          <Chip
                                            size="small"
                                            label={statusDetails.label}
                                            color={statusDetails.color}
                                            variant={
                                              statusDetails.color === "default"
                                                ? "outlined"
                                                : "filled"
                                            }
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          {renderHistoryActions(record, recordState)}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>

                          <Box sx={{ display: { xs: "block", md: "none" } }}>
                            <Stack spacing={2}>
                              {historyRecords.map((record) => {
                                const recordState = getHistoryRecordState(record);
                                const { statusDetails } = recordState;

                                return (
                                  <Box
                                    key={record?.id || record?.orderId}
                                    sx={{
                                      border: "1px solid rgba(148,163,184,0.18)",
                                      borderRadius: 2,
                                      p: 2,
                                      backgroundColor: "rgba(15,23,42,0.35)",
                                    }}
                                  >
                                    <Stack spacing={1.5}>
                                      <Stack spacing={0.5}>
                                        <Typography
                                          variant="caption"
                                          color="rgba(148,163,184,0.9)"
                                          textTransform="uppercase"
                                        >
                                          Modelo
                                        </Typography>
                                        <Typography
                                          variant="subtitle2"
                                          color="#f8fafc"
                                          fontWeight={600}
                                        >
                                          {record?.modelType ||
                                            "Modelo não informado"}
                                        </Typography>
                                      </Stack>

                                      <Stack spacing={0.5}>
                                        <Typography
                                          variant="caption"
                                          color="rgba(148,163,184,0.9)"
                                          textTransform="uppercase"
                                        >
                                          Criado em
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="rgba(226,232,240,0.85)"
                                        >
                                          {formatHistoryDate(record?.createdAt)}
                                        </Typography>
                                      </Stack>

                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                      >
                                        <Typography
                                          variant="caption"
                                          color="rgba(148,163,184,0.9)"
                                          textTransform="uppercase"
                                        >
                                          Status
                                        </Typography>
                                        <Chip
                                          size="small"
                                          label={statusDetails.label}
                                          color={statusDetails.color}
                                          variant={
                                            statusDetails.color === "default"
                                              ? "outlined"
                                              : "filled"
                                          }
                                        />
                                      </Stack>

                                      {renderHistoryActions(record, recordState, "column")}
                                    </Stack>
                                  </Box>
                                );
                              })}
                            </Stack>
                          </Box>
                        </>
                      )}
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Box>

      <Dialog
        open={resumePaymentModal.open}
        onClose={handleResumePaymentClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            bgcolor: "rgba(2,6,23,0.95)",
            color: "#f8fafc",
            border: "1px solid rgba(148,163,184,0.2)",
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Pagamento pendente
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: "rgba(148,163,184,0.2)" }}>
          <Stack spacing={3}>
            <Stack spacing={0.5}>
              <Typography variant="subtitle1" fontWeight={600}>
                Conclua o pagamento para retomar a geração
              </Typography>
              <Typography variant="body2" color="rgba(226,232,240,0.75)">
                Utilize o QR Code ou copie o código PIX para finalizar o
                pagamento deste pedido.
              </Typography>
            </Stack>

            {resumePaymentError ? (
              <Alert severity="warning">{resumePaymentError}</Alert>
            ) : null}

            {resumeStatusDetails ? (
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Chip
                  size="small"
                  label={resumeStatusDetails.label}
                  color={resumeStatusDetails.color}
                  variant={
                    resumeStatusDetails.color === "default"
                      ? "outlined"
                      : "filled"
                  }
                />
                {resumeExpirationLabel ? (
                  <Typography
                    variant="caption"
                    color="rgba(226,232,240,0.7)"
                  >
                    Expira em: {resumeExpirationLabel}
                  </Typography>
                ) : null}
              </Stack>
            ) : null}

            {resumePaymentModal.qrCodeUrl ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "rgba(2,6,23,0.85)",
                  border: "1px dashed rgba(125,211,252,0.45)",
                }}
              >
                <Box
                  component="img"
                  src={resumePaymentModal.qrCodeUrl}
                  alt="QR Code para pagamento pendente"
                  sx={{ width: 220, height: 220 }}
                />
              </Box>
            ) : null}

            {resumePaymentModal.qrCodeData ? (
              <Stack spacing={1.5}>
                <Typography
                  variant="subtitle2"
                  color="rgba(148,163,184,0.9)"
                >
                  Código PIX (copia e cola)
                </Typography>
                <TextField
                  value={resumePaymentModal.qrCodeData}
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
              </Stack>
            ) : null}

            {resumeCopyStatus?.message ? (
              <Alert severity={resumeCopyStatus.severity}>
                {resumeCopyStatus.message}
              </Alert>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid rgba(148,163,184,0.2)",
            px: 3,
            py: 1.5,
          }}
        >
          <Button
            onClick={handleResumePaymentCopy}
            startIcon={<ContentCopyIcon />}
            disabled={!resumePaymentModal.qrCodeData}
            sx={{
              color: resumePaymentModal.qrCodeData ? "#38bdf8" : "#64748b",
            }}
          >
            Copiar código PIX
          </Button>
          <Button onClick={handleResumePaymentClose} sx={{ color: "#94a3b8" }}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

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
        open={Boolean(historyPreviewRecord?.resultImageUrl)}
        onClose={handleHistoryPreviewClose}
        fullWidth
        maxWidth="md"
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
          Pré-visualização da imagem gerada
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            borderColor: "rgba(148,163,184,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(15,23,42,0.7)",
          }}
        >
          {historyPreviewRecord?.resultImageUrl ? (
            <Box
              component="img"
              src={historyPreviewRecord.resultImageUrl}
              alt="Imagem gerada"
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: 600,
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          ) : null}
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid rgba(148,163,184,0.2)",
            px: 3,
            py: 1.5,
          }}
        >
          <Button
            onClick={() => {
              if (historyPreviewRecord) {
                handleDownloadHistoryImage(historyPreviewRecord);
              }
            }}
            disabled={!historyPreviewRecord?.resultImageUrl}
            sx={{
              color: historyPreviewRecord?.resultImageUrl
                ? "#38bdf8"
                : "#64748b",
            }}
          >
            Baixar imagem
          </Button>
          <Button onClick={handleHistoryPreviewClose} sx={{ color: "#94a3b8" }}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

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
