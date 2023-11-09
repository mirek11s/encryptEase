import { createDecipheriv } from "crypto";

export const decryptFile = (
  encryptedBuffer: Buffer,
  encryptionKey: string,
  iv: Buffer, // This should be the same IV that was used during encryption
  algorithm: string
): Buffer => {
  // The key should be a Buffer or a string representing binary data
  const keyBuffer = Buffer.from(encryptionKey, "hex");
  const decipher = createDecipheriv(algorithm, keyBuffer, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);
  return decrypted;
};
