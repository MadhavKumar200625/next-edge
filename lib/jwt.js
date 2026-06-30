import crypto from "crypto";

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function decodeBase64Url(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

function getSecret() {
  return process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "next-edge-dev-secret";
}

export function signJwt(payload, expiresInSeconds = 60 * 60 * 24 * 30) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(
    JSON.stringify(body)
  )}`;
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(unsigned)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsigned}.${signature}`;
}

export function verifyJwt(token) {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const unsigned = `${header}.${body}`;
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(unsigned)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return null;
  }

  const payload = JSON.parse(decodeBase64Url(body));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export function getCandidateIdentity({ token, email }) {
  if (token) {
    const payload = verifyJwt(token);
    if (payload?.email) return payload;

    try {
      const legacyEmail = Buffer.from(String(token), "base64").toString("ascii");
      if (legacyEmail.includes("@")) return { email: legacyEmail };
    } catch (err) {
      // ignore legacy decode failures
    }
  }

  if (email) return { email };
  return null;
}
