import { Router } from "express";
import produtosRoutes from "./produtos.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import pedidosRoutes from "./pedidos.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.use("/produtos", produtosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/pedidos", pedidosRoutes);
router.use("/admin", adminRoutes);

export default router;
