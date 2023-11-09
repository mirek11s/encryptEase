import { createDecipheriv } from "crypto";
import { customDecrypt } from "./customAlgo/customDecrypt";

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

  if (algorithm === "encryptEase-256-custom") {
    return customDecrypt(encryptedBuffer, encryptionKey, iv);
  } else {
    const decipher = createDecipheriv(algorithm, keyBuffer, iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final(),
    ]);

    return decrypted;
  }
};
