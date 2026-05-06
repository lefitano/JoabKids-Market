import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const credentialsPath = resolve(
  __dirname,
  "../../",
  process.env.FIREBASE_CREDENTIALS || "serviceAccountKey.json"
);

if (existsSync(credentialsPath)) {
  const serviceAccount = JSON.parse(readFileSync(credentialsPath));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase conectado.");
} else {
  console.warn(
    `Credenciais do Firebase nao encontradas em ${credentialsPath}. Pulando inicializacao.`
  );
}

export const db = admin.apps.length ? admin.firestore() : null;
export default admin;
