import { Router } from "express";
import {
  listarPedidos,
  buscarPedidoPorId,
  criarPedido,
  atualizarPedido,
  deletarPedido,
} from "../controllers/pedidos.controller.js";

const router = Router();

router.get("/", listarPedidos);
router.get("/:id", buscarPedidoPorId);
router.post("/", criarPedido);
router.put("/:id", atualizarPedido);
router.delete("/:id", deletarPedido);

export default router;
