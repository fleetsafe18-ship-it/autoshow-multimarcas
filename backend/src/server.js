import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authRouter } from './routes/auth.js';
import { veiculosRouter } from './routes/veiculos.js';
import { adminRouter } from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
  console.error(
    'ADMIN_PASSWORD e JWT_SECRET precisam estar definidos no .env (veja .env.example).'
  );
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(authRouter);
app.use(veiculosRouter);
app.use('/admin', adminRouter);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API BS Veículos rodando em http://localhost:${PORT}`);
});
