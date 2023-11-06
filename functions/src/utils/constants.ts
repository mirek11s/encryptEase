import { Algorithm } from "./util.types";

// Validate encryption key length
export const algorithmKeyLengths: Record<Algorithm, number> = {
  "aes-256-cbc": 32,
  "aes-192-cbc": 24,
  "aes-128-cbc": 16,
  "camellia-256-cbc": 32,
  "camellia-192-cbc": 24,
  "camellia-128-cbc": 16,
  // add encryptEase, Serpent and Twofish here later
};

export const SERVER_ERROR = "Internal Server Error";
