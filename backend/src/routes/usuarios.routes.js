import { Router } from "express";
import {
  cadastrarUsuario,
  loginUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);
router.get("/:id", buscarUsuarioPorId);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;
