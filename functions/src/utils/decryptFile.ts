import { createDecipheriv } from "crypto";

export const decryptFile = (
  encryptedBuffer: Buffer,
  encryptionKey: string,
  iv: Buffer, // You will need to pass the IV used during encryption
  algorithm: string
) => {
  const keyBuffer = Buffer.from(encryptionKey, "hex");
  if (keyBuffer.length !== 32) {
    throw new Error("Key must be 32 bytes in length.");
  }

  const decipher = createDecipheriv(algorithm, keyBuffer, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);

  return decrypted;
};
