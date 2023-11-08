import { initializeApp } from "firebase-admin/app";
// Initialize Firebase app at the top of your application (global scope).
initializeApp();

import { uploadUserFiles } from "./uploadUserFiles/uploadUserFiles";
import { downloadUserFiles } from "./downloadUserFiles/downloadUserFiles";
import { getUserFilesMetadata } from "./getUserFilesMetadata/getUserFilesMetadata";

export { uploadUserFiles, downloadUserFiles, getUserFilesMetadata };
