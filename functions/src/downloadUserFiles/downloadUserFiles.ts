import * as functions from "firebase-functions";
import { getStorage } from "firebase-admin/storage";
import { createDecipheriv } from "crypto";
import { SERVER_ERROR } from "../utils/constants";

const storage = getStorage();

export const downloadUserFiles = functions.https.onRequest(
  async (request, response) => {
    try {
      // Extract required information from request
      const { userId, fileName, encryptionKey, algorithm, ivHex } =
        request.body;
      const iv = Buffer.from(ivHex, "hex");
      const decipher = createDecipheriv(
        algorithm,
        Buffer.from(encryptionKey, "hex"),
        iv
      );

      const filePath = `Encrypted_files/${userId}/${fileName}`;

      // Download the file from Firebase Storage
      const fileDownload = storage.bucket().file(filePath);
      const fileContentsBuffer = await fileDownload.download();

      // Decrypt the file
      const decrypted = Buffer.concat([
        decipher.update(fileContentsBuffer[0]),
        decipher.final(),
      ]);

      // Here you would typically send the decrypted file back to the user
      // This might involve converting it to a Blob or similar, depending on your front-end setup
      response.send({ success: true, file: decrypted.toString("utf-8") });
    } catch (error) {
      functions.logger.error("Error downloading or decrypting file", error);
      response.status(500).send({ success: false, message: SERVER_ERROR });
    }
  }
);
