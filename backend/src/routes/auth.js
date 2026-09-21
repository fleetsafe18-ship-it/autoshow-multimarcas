import { Router } from 'express';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

authRouter.post('/admin/login', (req, res) => {
  const { usuario, senha } = req.body || {};

  const usuarioOk = (usuario ?? process.env.ADMIN_USER) === process.env.ADMIN_USER;
  const senhaOk = senha && senha === process.env.ADMIN_PASSWORD;

  if (!usuarioOk || !senhaOk) {
    return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.json({ token });
});
