import { randomBytes, createCipheriv } from "crypto";

export const encryptFile = (
  fileBuffer: Buffer,
  encryptionKey: Buffer,
  algorithm: string
) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, encryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  return { encrypted, iv };
};
