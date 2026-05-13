import admin from "firebase-admin";

// middleware que verifica o ID token do Firebase Auth
// uso: o front envia o header "Authorization: Bearer <token>"
export default async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token de autenticacao nao enviado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    // anexa o usuario decodificado na requisicao para os controllers usarem
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalido ou expirado" });
  }
}
