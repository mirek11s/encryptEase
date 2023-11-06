import { initializeApp } from "firebase-admin/app";

// Initialize Firebase app at the start of your application (global scope).
initializeApp();

export { uploadUserFiles } from "./uploadUserFiles/uploadUserFiles";
