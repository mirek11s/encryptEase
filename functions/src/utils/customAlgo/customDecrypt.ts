import { createHash } from "crypto";

export const customDecrypt = (
  encryptedBuffer: Buffer,
  encryptionKey: string,
  iv: Buffer
): Buffer => {
  // Recreate the hash of the key with the custom string
  const hash = createHash("sha256");
  hash.update(`MirosAlgo-${encryptionKey}`);
  const keyBuffer = hash.digest();

  // Reverse the post-encryption modification
  const reversed = Buffer.from(
    encryptedBuffer.toString("hex").split("").reverse().join(""),
    "hex"
  );

  // Perform the XOR operation again with the key and IV to decrypt
  const decrypted: Buffer = Buffer.alloc(reversed.length);
  for (let i = 0; i < reversed.length; i++) {
    const keyByte = keyBuffer[i % keyBuffer.length];
    const ivByte = iv[i % iv.length];
    decrypted[i] = reversed[i] ^ keyByte ^ ivByte;
  }

  return decrypted;
};
