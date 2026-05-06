import { Router } from "express";
import { listarProdutos } from "../controllers/produtos.controller.js";

const router = Router();

router.get("/", listarProdutos);

export default router;
