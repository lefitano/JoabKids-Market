import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import "./config/firebase.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sejam bem vindo ao Joab Kids Market!");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, firebase: admin.apps.length > 0 });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota nao encontrada" });
});

app.use(errorHandler);

export default app;
