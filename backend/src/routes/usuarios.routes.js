import { Router } from "express";
import auth from "../middlewares/auth.js";
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
router.get("/:id", auth, buscarUsuarioPorId);
router.put("/:id", auth, atualizarUsuario);
router.delete("/:id", auth, deletarUsuario);

export default router;
