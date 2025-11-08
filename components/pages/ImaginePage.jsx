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
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";

const EMAIL_STORAGE_KEY = "imagine_user_email";
const EMAIL_TOKEN_STORAGE_KEY = "imagine_user_token";
const POLLING_INTERVAL = 5000;
const ORDER_REFERENCE_STORAGE_KEY = "imagine_order_reference";

export default function ImaginePage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [encryptedEmail, setEncryptedEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [modelType, setModelType] = useState("Foto de Perfil");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [config, setConfig] = useState({ model: "", price: null });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const isPaymentConfirmed = useMemo(() => {
    if (!orderStatus) return false;
    const normalized = orderStatus.toLowerCase();
    return ["paid", "closed", "finished", "approved"].includes(normalized);
  }, [orderStatus]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY);
    const storedToken = window.localStorage.getItem(EMAIL_TOKEN_STORAGE_KEY);

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (storedToken) {
      setEncryptedEmail(storedToken);
      setEmailSaved(true);
    }
  }, []);

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

  useEffect(() => {
    let intervalId;

    if (orderId && !isPaymentConfirmed) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(`/api/imagine/check-order?orderId=${orderId}`);
          if (!response.ok) {
            throw new Error("Erro ao consultar pedido");
          }
          const data = await response.json();
          const status = data?.status || null;
          const statusDetail = data?.statusDetail || "";
          if (status) {
            setOrderStatus(status);
          }
          if (statusDetail) {
            setStatusMessage(statusDetail);
          }
        } catch (error) {
          console.error("Erro durante a checagem de status", error);
        }
      }, POLLING_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId, isPaymentConfirmed]);

  useEffect(() => {
    if (isPaymentConfirmed) {
      setQrCodeUrl("");
      setStatusMessage("Pagamento confirmado! EM CONSTRUÇÃO");
    }
  }, [isPaymentConfirmed]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
    setEmailError("");
  }, []);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
  }, [previewUrl]);

  const handlePreviewOpen = useCallback(() => {
    if (!previewUrl) return;
    setIsPreviewOpen(true);
  }, [previewUrl]);

  const handlePreviewClose = useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível validar o email");
      }

      const data = await response.json();
      const encrypted = data?.encryptedEmail;

      if (!encrypted) {
        throw new Error("Resposta inválida da criptografia");
      }

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
    setQrCodeUrl("");

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
        headers: {
          "Content-Type": "application/json",
        },
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

      if (data?.qrImage) {
        setQrCodeUrl(`data:image/png;base64,${data.qrImage}`);
      } else if (data?.qrData) {
        const encodedData = encodeURIComponent(data.qrData);
        setQrCodeUrl(
          `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedData}`
        );
      } else {
        setQrCodeUrl("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Erro inesperado ao gerar pedido");
    } finally {
      setIsGenerating(false);
    }
  }, [emailSaved, encryptedEmail, modelType, selectedFile]);

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
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" variant="h3" fontWeight={700} gutterBottom>
              Gere A Imagem perfeita
            </Typography>
            <Typography variant="body1" color="rgba(248,250,252,0.75)">
              O resultado será entregue em seguida. Para garantirmos que tudo corra bem,
              precisamos do seu email. Ele ficará armazenado com segurança localmente e
              liberará o acesso após a confirmação.
            </Typography>
          </Box>

          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

          <Grid
            container
            spacing={4}
            alignItems="stretch"
            sx={{
              flex: 1,
              minHeight: { md: "60vh" },
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  bgcolor: "rgba(15,23,42,0.65)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  backdropFilter: "blur(8px)",
                  maxHeight: { md: "calc(100vh - 220px)" },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    p: { xs: 3, md: 4 },
                  }}
                >
                  <Stack spacing={3} sx={{ overflowY: "auto", pr: 1 }}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Email de acesso
                      </Typography>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Seu email"
                          value={email}
                          onChange={handleEmailChange}
                          error={Boolean(emailError)}
                          helperText={emailError || "Informe o email para liberar a geração"}
                          InputLabelProps={{ style: { color: "#cbd5f5" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "#f8fafc",
                              "& fieldset": {
                                borderColor: "rgba(148,163,184,0.4)",
                              },
                              "&:hover fieldset": {
                                borderColor: "#7dd3fc",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#38bdf8",
                              },
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
                    </Box>

                    <Divider sx={{ borderColor: "rgba(148,163,184,0.2)" }} />

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Tipo de modelo
                      </Typography>
                      <Select
                        fullWidth
                        value={modelType}
                        onChange={(event) => setModelType(event.target.value)}
                        sx={{
                          color: "#f8fafc",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(148,163,184,0.4)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#7dd3fc",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#38bdf8",
                          },
                        }}
                      >
                        <MenuItem value="Foto de Perfil">Foto de Perfil</MenuItem>
                      </Select>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Upload da imagem de referência
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{
                          borderColor: "rgba(148,163,184,0.4)",
                          color: "#f8fafc",
                          "&:hover": {
                            borderColor: "#7dd3fc",
                            bgcolor: "rgba(125,211,252,0.08)",
                          },
                        }}
                      >
                        Selecionar imagem
                        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                      </Button>
                      {previewUrl ? (
                        <Box
                          mt={2}
                          sx={{
                            width: "100%",
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid rgba(148,163,184,0.3)",
                            cursor: "pointer",
                          }}
                          onClick={handlePreviewOpen}
                        >
                          <Box
                            component="img"
                            src={previewUrl}
                            alt="Pré-visualização"
                            sx={{
                              width: "100%",
                              height: 200,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </Box>
                      ) : null}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "rgba(15,23,42,0.8)",
                  border: "1px solid rgba(148,163,184,0.2)",
                  backdropFilter: "blur(10px)",
                  width: "100%",
                  maxHeight: { md: "calc(100vh - 220px)" },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    p: { xs: 3, md: 4 },
                  }}
                >
                  <Stack spacing={3} height="100%" sx={{ overflowY: "auto", pr: 1 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Pagamento e geração
                      </Typography>
                      <Typography variant="body2" color="rgba(226,232,240,0.75)">
                        Assim que confirmar o pagamento via QR Code, começaremos a preparar a
                        sua imagem perfeita.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="rgba(125,211,252,0.9)">
                        {config?.model || "Modelo"}
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {config?.price ? `R$ ${Number(config.price).toFixed(2)}` : "Valor a definir"}
                      </Typography>
                    </Box>

                    {orderStatus ? (
                      <Alert severity={isPaymentConfirmed ? "success" : "info"}>
                        Status atual: {orderStatus}
                      </Alert>
                    ) : null}

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

                    {statusMessage ? (
                      <Alert severity="success">{statusMessage}</Alert>
                    ) : null}

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt="auto">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isGenerating || !emailSaved || !selectedFile}
                        onClick={handleGenerate}
                        sx={{ minWidth: 180 }}
                      >
                        {isGenerating ? (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={20} color="inherit" />
                            <span>Gerando...</span>
                          </Stack>
                        ) : (
                          "Gerar"
                        )}
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : null}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
