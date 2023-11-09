import { randomBytes, createCipheriv } from "crypto";
import { customEncrypt } from "./customAlgo/customEnrypt";

export const encryptFile = (
  fileBuffer: Buffer,
  encryptionKey: string,
  algorithm: string
) => {
  const keyBuffer = Buffer.from(encryptionKey, "hex");
  if (keyBuffer.length !== 32) {
    throw new Error("Key must be 32 bytes in length.");
  }

  if (algorithm === "encryptEase-256-custom") {
    // My algorithm
    return customEncrypt(fileBuffer, encryptionKey);
  } else {
    const iv = randomBytes(16); // Initialization vector
    const cipher = createCipheriv(algorithm, keyBuffer, iv);
    const encrypted = Buffer.concat([
      cipher.update(fileBuffer),
      cipher.final(),
    ]);

    return { encrypted, iv };
  }
};
