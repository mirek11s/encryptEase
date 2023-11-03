import { Client, Databases } from "appwrite";

const APPWRITE_ENDPOINT = import.meta.env.VITE_APP_APPWRITE_ENDPOINT;
export const APPWRITE_PROJECT_ID = import.meta.env.VITE_APP_APPWRITE_PROJECT_ID;
export const APPWRITE_DATABASE_PROD_ID = import.meta.env
  .VITE_APP_APPWRITE_DATABASE_PROD_ID;

const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export default client;
