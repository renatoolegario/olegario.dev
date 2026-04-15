import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const APP_SESSION_COOKIE = 'olegario_app_session';
export const APP_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const APP_SESSION_SALT = 'olegario-dev-app-session-v1';
const ENV_FILES = ['.env.local', '.env'];

function normalizeEnvValue(rawValue) {
  if (!rawValue) {
    return '';
  }

  const trimmedValue = rawValue.trim();
  if (!trimmedValue) {
    return '';
  }

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1);
  }

  const commentIndex = trimmedValue.indexOf(' #');
  return commentIndex >= 0 ? trimmedValue.slice(0, commentIndex).trim() : trimmedValue;
}

function readEnvKeyFromFile(filePath, targetKey) {
  if (!fs.existsSync(filePath)) {
    return '';
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileLines = fileContent.split(/\r?\n/);

  for (const line of fileLines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const normalizedLine = trimmedLine.startsWith('export ')
      ? trimmedLine.slice('export '.length)
      : trimmedLine;

    const separatorIndex = normalizedLine.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = normalizedLine.slice(0, separatorIndex).trim();
    if (key !== targetKey) {
      continue;
    }

    return normalizeEnvValue(normalizedLine.slice(separatorIndex + 1));
  }

  return '';
}

function readPasswordFromEnvFiles() {
  const projectRoot = process.cwd();

  for (const envFile of ENV_FILES) {
    const envPath = path.join(projectRoot, envFile);
    const password = readEnvKeyFromFile(envPath, 'PASSWORD');
    if (password) {
      return password;
    }

    const appPassword = readEnvKeyFromFile(envPath, 'APP_PASSWORD');
    if (appPassword) {
      return appPassword;
    }
  }

  return '';
}

function getRequestCookie(req, cookieName) {
  const nextCookies = req?.cookies;
  if (nextCookies && typeof nextCookies[cookieName] === 'string') {
    return nextCookies[cookieName];
  }

  const rawCookies = req?.headers?.cookie;
  if (!rawCookies) {
    return '';
  }

  const cookiePairs = rawCookies.split(';');
  for (const cookiePair of cookiePairs) {
    const [rawName, ...rawValueParts] = cookiePair.trim().split('=');
    if (rawName === cookieName) {
      return decodeURIComponent(rawValueParts.join('='));
    }
  }

  return '';
}

export function sanitizeNextPath(rawPath) {
  if (typeof rawPath !== 'string') {
    return '/app';
  }

  if (!rawPath.startsWith('/app') || rawPath.startsWith('//')) {
    return '/app';
  }

  return rawPath;
}

export function getConfiguredAppPassword() {
  const filePassword = readPasswordFromEnvFiles();
  if (filePassword) {
    return filePassword;
  }

  if (process.env.PASSWORD) {
    return process.env.PASSWORD.trim();
  }

  if (process.env.APP_PASSWORD) {
    return process.env.APP_PASSWORD.trim();
  }

  return '';
}

export function createAppSessionToken(password = getConfiguredAppPassword()) {
  if (!password) {
    return '';
  }

  return crypto
    .createHash('sha256')
    .update(`${password}:${APP_SESSION_SALT}`)
    .digest('hex');
}

export function isAppSessionValid(sessionToken) {
  const expectedToken = createAppSessionToken();
  if (!sessionToken || !expectedToken) {
    return false;
  }

  const sessionBuffer = Buffer.from(sessionToken);
  const expectedBuffer = Buffer.from(expectedToken);

  if (sessionBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sessionBuffer, expectedBuffer);
}

export function isAppAuthenticatedRequest(req) {
  const sessionToken = getRequestCookie(req, APP_SESSION_COOKIE);
  return isAppSessionValid(sessionToken);
}

export function buildAppLoginUrl(nextPath = '/app') {
  const safeNextPath = sanitizeNextPath(nextPath);
  return safeNextPath === '/app' ? '/app' : `/app?next=${encodeURIComponent(safeNextPath)}`;
}

export function requireAppAuth(context) {
  if (isAppAuthenticatedRequest(context.req)) {
    return null;
  }

  const destination = sanitizeNextPath(context.resolvedUrl || '/app/tasks');
  return {
    redirect: {
      destination: buildAppLoginUrl(destination),
      permanent: false,
    },
  };
}

function serializeSessionCookie(value, maxAge) {
  const cookieParts = [
    `${APP_SESSION_COOKIE}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
    'Priority=High',
  ];

  if (process.env.NODE_ENV === 'production') {
    cookieParts.push('Secure');
  }

  return cookieParts.join('; ');
}

export function createSessionCookie() {
  return serializeSessionCookie(createAppSessionToken(), APP_SESSION_MAX_AGE);
}

export function createExpiredSessionCookie() {
  return serializeSessionCookie('', 0);
}
