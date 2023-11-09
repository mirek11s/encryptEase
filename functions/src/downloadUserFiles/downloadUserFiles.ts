import * as functions from "firebase-functions";
import * as cors from "cors";
import { getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { decryptFile } from "../utils/decryptFile";
import { FirebaseDateFormat } from "./../utils/util.types";

const corsHandler = cors({ origin: true });
const storage = getStorage(getApp());
const db = getFirestore(getApp());

export const downloadUserFiles = functions.https.onRequest(
  async (request, response) => {
    corsHandler(request, response, async () => {
      if (request.method !== "POST") {
        response.status(405).send("Method Not Allowed");
        return;
      }

      try {
        const { userId, fileId, encryptionKey } = request.body.data || {};

        // Fetch the file metadata from Firestore
        const userFilesRef = db.collection("userFiles").doc(userId);
        const doc = await userFilesRef.get();
        const metadata = doc
          .data()
          ?.filesMetadata.find(
            (file: FirebaseDateFormat) => file.fileId === fileId
          );

        if (!metadata) {
          response.status(404).send("File not found");
          return;
        }

        const iv = Buffer.from(metadata.iv, "hex");

        // Fetch the encrypted file from Storage
        const file = storage
          .bucket()
          .file(`Encrypted_files/${userId}/${metadata.fileName}`);
        const [encryptedFileBuffer] = await file.download();

        // Decrypt the file
        const decryptedFileBuffer = decryptFile(
          encryptedFileBuffer,
          encryptionKey,
          iv,
          metadata.algorithm
        );

        // Set headers for download
        response.setHeader(
          "Content-Disposition",
          `attachment; filename="${encodeURIComponent(metadata.fileName)}"`
        );
        response.setHeader("Content-Type", "application/octet-stream");

        // Send the decrypted file buffer
        response.send(decryptedFileBuffer);
      } catch (error) {
        functions.logger.error("Error downloading file", error);
        response.status(500).send("Server Error");
      }
    });
  }
);
