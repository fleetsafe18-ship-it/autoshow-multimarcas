import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { v4 as uuidv4 } from 'uuid';
import * as veiculosRepo from '../db/veiculosRepo.js';
import { requireAuth } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const MAX_FOTOS_POR_ENVIO = 24;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: MAX_FOTOS_POR_ENVIO },
  fileFilter: (req, file, cb) => {
    const tiposAceitos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (tiposAceitos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de imagem não suportado'));
    }
  },
});

function removerArquivoDaFoto(foto) {
  if (!foto || !foto.url || !foto.url.startsWith('/uploads/')) return;
  const caminho = path.join(uploadsDir, path.basename(foto.url));
  fs.unlink(caminho, () => {});
}

export const adminRouter = Router();

adminRouter.use(requireAuth);

// Lista todos os veículos, disponíveis ou não
adminRouter.get('/veiculos', async (req, res) => {
  const veiculos = await veiculosRepo.listTodos();
  res.json(veiculos);
});

adminRouter.get('/veiculos/:id', async (req, res) => {
  const veiculo = await veiculosRepo.getPorId(req.params.id);
  if (!veiculo) {
    return res.status(404).json({ erro: 'Veículo não encontrado' });
  }
  res.json(veiculo);
});

adminRouter.post('/veiculos', async (req, res) => {
  const { marca, modelo, ano, preco } = req.body || {};

  if (!marca || !modelo || !ano || !preco) {
    return res.status(400).json({ erro: 'marca, modelo, ano e preco são obrigatórios' });
  }

  const veiculo = await veiculosRepo.criar(req.body);
  res.status(201).json(veiculo);
});

adminRouter.put('/veiculos/:id', async (req, res) => {
  const veiculo = await veiculosRepo.atualizar(req.params.id, req.body || {});

  if (!veiculo) {
    return res.status(404).json({ erro: 'Veículo não encontrado' });
  }

  res.json(veiculo);
});

adminRouter.delete('/veiculos/:id', async (req, res) => {
  const veiculo = await veiculosRepo.getPorId(req.params.id);
  if (!veiculo) {
    return res.status(404).json({ erro: 'Veículo não encontrado' });
  }

  await veiculosRepo.remover(req.params.id);
  veiculo.fotos.forEach(removerArquivoDaFoto);

  res.status(204).send();
});

// ===== Fotos do veículo =====

adminRouter.post('/veiculos/:id/fotos', (req, res) => {
  upload.array('fotos', MAX_FOTOS_POR_ENVIO)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ erro: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    const veiculo = await veiculosRepo.getPorId(req.params.id);
    if (!veiculo) {
      req.files.forEach((file) => fs.unlink(file.path, () => {}));
      return res.status(404).json({ erro: 'Veículo não encontrado' });
    }

    const urls = req.files.map((file) => `/uploads/${file.filename}`);
    const fotos = await veiculosRepo.adicionarFotos(req.params.id, urls);
    res.status(201).json(fotos);
  });
});

adminRouter.put('/veiculos/:id/fotos/ordem', async (req, res) => {
  const { ordem } = req.body || {};

  if (!Array.isArray(ordem) || ordem.length === 0) {
    return res.status(400).json({ erro: 'ordem deve ser uma lista de ids de foto' });
  }

  const fotos = await veiculosRepo.reordenarFotos(req.params.id, ordem);
  res.json(fotos);
});

adminRouter.delete('/veiculos/:id/fotos/:fotoId', async (req, res) => {
  const foto = await veiculosRepo.removerFoto(req.params.fotoId);
  if (!foto) {
    return res.status(404).json({ erro: 'Foto não encontrada' });
  }

  removerArquivoDaFoto(foto);
  res.status(204).send();
});
