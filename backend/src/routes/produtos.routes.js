import { Router } from "express";
import auth from "../middlewares/auth.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "../controllers/produtos.controller.js";

const router = Router();

router.get("/", listarProdutos);
router.get("/:id", buscarProdutoPorId);
router.post("/", auth, requireAdmin, criarProduto);
router.put("/:id", auth, requireAdmin, atualizarProduto);
router.delete("/:id", auth, requireAdmin, deletarProduto);

export default router;
