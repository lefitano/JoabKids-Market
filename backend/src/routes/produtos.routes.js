import { Router } from "express";
import auth from "../middlewares/auth.js";
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
router.post("/", auth, criarProduto);
router.put("/:id", auth, atualizarProduto);
router.delete("/:id", auth, deletarProduto);

export default router;
