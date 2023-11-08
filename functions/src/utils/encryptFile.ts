import { randomBytes, createCipheriv } from "crypto";

export const encryptFile = (
  fileBuffer: Buffer,
  encryptionKey: string,
  algorithm: string
) => {
  const iv = randomBytes(16);
  // convert hex string to buffer, ensuring it's 32 bytes long for a 256-bit key
  const keyBuffer = Buffer.from(encryptionKey, "hex");
  const cipher = createCipheriv(algorithm, keyBuffer, iv);
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
  return { encrypted, iv };
};
