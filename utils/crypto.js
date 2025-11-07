import CryptoJS from "crypto-js";

function getCryptoConfig() {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("Chave secreta não definida");
  }

  const ivValue = process.env.IV;
  if (!ivValue) {
    throw new Error("IV não definido");
  }

  return {
    key: CryptoJS.enc.Utf8.parse(secretKey),
    iv: CryptoJS.enc.Utf8.parse(ivValue),
  };
}

export function conversaoCripto(conteudo) {
  const { key, iv } = getCryptoConfig();

  const encrypted = CryptoJS.AES.encrypt(conteudo, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

export function reverterConversaoCripto(conteudoCriptografado) {
  if (!conteudoCriptografado) {
    return "";
  }

  const { key, iv } = getCryptoConfig();

  const bytes = CryptoJS.AES.decrypt(conteudoCriptografado, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return bytes.toString(CryptoJS.enc.Utf8);
}
