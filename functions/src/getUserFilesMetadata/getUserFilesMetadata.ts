import * as functions from "firebase-functions";
import { getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const getUserFilesMetadata = functions.https.onCall(
  async (_data, context) => {
    // Ensure the user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    // Get the Firestore database instance
    const db = getFirestore(getApp());
    const userId = context.auth.uid;

    try {
      // Fetch only the documents where the document ID matches the userId
      const userFilesRef = db.collection("userFiles").doc(userId);
      const userFilesSnapshot = await userFilesRef.get();

      // Check if a document for the user exists
      if (!userFilesSnapshot.exists) {
        return { success: false, message: "No files found for user." };
      }

      const filesMetadata = userFilesSnapshot.exists
        ? userFilesSnapshot.data()?.filesMetadata
        : [];

      return { success: true, filesMetadata: filesMetadata || [] };
    } catch (error) {
      functions.logger.error("Error fetching user files metadata", error);
      throw new functions.https.HttpsError(
        "unknown",
        "An unknown error occurred"
      );
    }
  }
);
