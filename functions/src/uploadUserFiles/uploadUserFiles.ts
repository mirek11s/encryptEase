import * as functions from "firebase-functions";
import * as cors from "cors";
import { initializeApp } from "firebase-admin/app";
import { firestore } from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import { encryptFile } from "../utils/encryptFile";
import { Algorithm } from "../utils/util.types";
import { algorithmKeyLengths, SERVER_ERROR } from "./../utils/constants";

const corsHandler = cors({ origin: true });

initializeApp();
const storage = getStorage();
const db = getFirestore();

export const uploadUserFiles = functions.https.onRequest(
  async (request, response) => {
    corsHandler(request, response, async () => {
      // Check if the request method is POST
      if (request.method !== "POST") {
        response.status(405).send("Method Not Allowed");
        return;
      }

      try {
        const { files, encryptionKey, algorithm, userId } =
          request.body.data || {};

        if (
          algorithmKeyLengths[algorithm as Algorithm] &&
          encryptionKey.length !== algorithmKeyLengths[algorithm as Algorithm]
        ) {
          response.status(400).send({
            success: false,
            message: "Invalid encryption key length",
          });
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uploadPromises = files.map(async (file: any) => {
          const fileBuffer = Buffer.from(file.data);

          const { encrypted, iv } = encryptFile(
            fileBuffer,
            encryptionKey,
            algorithm
          );

          const fileName = `${file.name}-${iv.toString("hex")}`;
          const userSpecificPath = `Encrypted_files/${userId}/${fileName}`;
          const fileUpload = storage.bucket().file(userSpecificPath);

          // Upload encrypted file to the storage
          await fileUpload.save(encrypted);

          const metadata = {
            fileName: fileName,
            algorithm: algorithm,
            dateOfUpload: new Date(),
            fileId: db.collection("userFiles").doc().id,
          };

          const userFilesRef = db.collection("userFiles").doc(userId);
          await userFilesRef.set(
            {
              filesMetadata: firestore.FieldValue.arrayUnion(metadata),
            },
            { merge: true }
          );

          return { success: true, path: userSpecificPath, metadata: metadata };
        });

        const uploadResponses = await Promise.all(uploadPromises);

        response.send({
          success: true,
          message: "Files encrypted and uploaded successfully!",
          data: uploadResponses,
        });
      } catch (error) {
        functions.logger.error("Error processing file upload request", error);
        response.status(500).send({
          success: false,
          message: SERVER_ERROR,
        });
      }
    });
  }
);
