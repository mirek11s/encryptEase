import * as functions from "firebase-functions";
import { getStorage } from "firebase-admin/storage";
import { encryptFile } from "../utils/encryptFile";
import * as cors from "cors";

const corsHandler = cors({ origin: true });

type Algorithm =
  | "aes-256-cbc"
  | "aes-192-cbc"
  | "aes-128-cbc"
  | "camellia-256-cbc"
  | "camellia-192-cbc"
  | "camellia-128-cbc";

const storage = getStorage();

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

        // Validate encryption key length
        const algorithmKeyLengths: Record<Algorithm, number> = {
          "aes-256-cbc": 32,
          "aes-192-cbc": 24,
          "aes-128-cbc": 16,
          "camellia-256-cbc": 32,
          "camellia-192-cbc": 24,
          "camellia-128-cbc": 16,
          // add encryptEase, Serpent and Twofish here later
        };

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

          const userSpecificPath = `Encrypted_files/${userId}/${
            file.name
          }-${iv.toString("hex")}`;
          const fileUpload = storage.bucket().file(userSpecificPath);

          await fileUpload.save(encrypted);

          return { success: true, path: userSpecificPath };
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
          message: "Internal Server Error",
        });
      }
    });
  }
);
