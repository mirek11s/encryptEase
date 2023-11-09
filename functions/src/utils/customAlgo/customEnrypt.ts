import { randomBytes, createHash } from "crypto";

export const customEncrypt = (
  fileBuffer: Buffer,
  encryptionKey: string
): { encrypted: Buffer; iv: Buffer } => {
  const hash = createHash("sha256");
  hash.update(`MirosAlgo-${encryptionKey}`);
  const keyBuffer = hash.digest();

  const iv = randomBytes(16);

  // Perform XOR operation with a twist: also XOR with a byte from IV
  const encrypted: Buffer = Buffer.alloc(fileBuffer.length);
  for (let i = 0; i < fileBuffer.length; i++) {
    const keyByte = keyBuffer[i % keyBuffer.length];
    const ivByte = iv[i % iv.length];
    encrypted[i] = fileBuffer[i] ^ keyByte ^ ivByte;
  }

  const modified = Buffer.from(
    encrypted.toString("hex").split("").reverse().join(""),
    "hex"
  );

  return { encrypted: modified, iv };
};
