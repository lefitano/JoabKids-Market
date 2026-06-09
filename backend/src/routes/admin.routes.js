import { Router } from "express";
import auth from "../middlewares/auth.js";
import requireAdmin from "../middlewares/requireAdmin.js";

const router = Router();

router.get("/debug-token", auth, (req, res) => {
  res.json({ email: req.user.email, uid: req.user.uid });
});

router.get("/verify", auth, requireAdmin, (req, res) => {
  res.json({ ok: true, email: req.user.email });
});

export default router;
