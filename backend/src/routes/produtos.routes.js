// backend/src/routes/produtos.routes.js
//
// GET  /api/produtos      → público (catálogo visível a todos)
// GET  /api/produtos/:id  → público
// POST /api/produtos      → somente admin
// PUT  /api/produtos/:id  → somente admin
// DELETE /api/produtos/:id → somente admin

import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "../controllers/produtos.controller.js";

// Garante que apenas usuários com a claim customizada { admin: true } acessem
function apenasAdmin(req, res, next) {
  if (!req.user?.admin) {
    return res.status(403).json({ error: "Acesso restrito a administradores" });
  }
  next();
}

const router = Router();

router.get("/",    listarProdutos);
router.get("/:id", buscarProdutoPorId);

router.post("/",    auth, apenasAdmin, criarProduto);
router.put("/:id",  auth, apenasAdmin, atualizarProduto);
router.delete("/:id", auth, apenasAdmin, deletarProduto);

export default router;