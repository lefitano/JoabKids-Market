import { Router } from "express";
import auth from "../middlewares/auth.js";
import requireAdmin from "../middlewares/requireAdmin.js";

const router = Router();

router.get("/verify", auth, requireAdmin, (req, res) => {
  res.json({ ok: true, email: req.user.email });
});

export default router;
