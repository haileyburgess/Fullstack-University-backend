import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

/** Creates a token with the given payload */
export function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

/** Creates a token with the given payload (alias for createToken) */
export function signToken(payload) {
  return createToken(payload);
}

/** Extracts the payload from a token */
export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
