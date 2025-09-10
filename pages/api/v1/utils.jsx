import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from "uuid";

export async function conversaoCripto(conteudo) {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('Chave secreta não definida');
  }

  const iv = CryptoJS.enc.Utf8.parse(process.env.IV);
  const key = CryptoJS.enc.Utf8.parse(secretKey);

  const encrypted = CryptoJS.AES.encrypt(conteudo, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

export async function gerarToken() {
        // Para gerar 43 bytes aleatórios usando Web Crypto:
        const id = uuidv4();
       
        return `${id}`;
}