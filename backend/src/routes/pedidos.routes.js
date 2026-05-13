import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  listarPedidos,
  buscarPedidoPorId,
  criarPedido,
  atualizarPedido,
  deletarPedido,
} from "../controllers/pedidos.controller.js";

const router = Router();

// todas as rotas de pedidos exigem usuario autenticado
router.use(auth);

router.get("/", listarPedidos);
router.get("/:id", buscarPedidoPorId);
router.post("/", criarPedido);
router.put("/:id", atualizarPedido);
router.delete("/:id", deletarPedido);

export default router;
