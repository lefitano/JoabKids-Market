const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default function requireAdmin(req, res, next) {
  if (!ADMIN_EMAIL) {
    return res.status(500).json({ error: "ADMIN_EMAIL não configurado no servidor" });
  }
  if (req.user?.email !== ADMIN_EMAIL) {
    return res.status(403).json({ error: "Acesso negado.", received: req.user?.email, expected: ADMIN_EMAIL });
  }
  next();
}
