import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCredentials() {
  if (process.env.FIREBASE_CREDENTIALS_JSON) {
    return JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
  }
  const credentialsPath = resolve(__dirname, "../../serviceAccountKey.json");
  if (existsSync(credentialsPath)) {
    return JSON.parse(readFileSync(credentialsPath));
  }
  return null;
}

const serviceAccount = loadCredentials();

if (!serviceAccount) {
  throw new Error(
    "Credenciais do Firebase não encontradas. Configure FIREBASE_CREDENTIALS_JSON ou forneça serviceAccountKey.json."
  );
}

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
console.log("Firebase conectado.");

export const db = admin.firestore();
export default admin;
