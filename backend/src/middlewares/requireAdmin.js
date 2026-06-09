const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default function requireAdmin(req, res, next) {
  if (!ADMIN_EMAIL) {
    return res.status(500).json({ error: "ADMIN_EMAIL não configurado no servidor" });
  }
  if (req.user?.email?.toLowerCase() !== ADMIN_EMAIL?.toLowerCase().trim()) {
    return res.status(403).json({ error: "Acesso negado. Permissão de administrador necessária." });
  }
  next();
}
