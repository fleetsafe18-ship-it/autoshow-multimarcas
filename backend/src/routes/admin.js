import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import * as veiculosRepo from '../db/veiculosRepo.js';
import { requireAuth } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBaseDir = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.join(__dirname, '..', '..');
const uploadsDir = path.join(uploadsBaseDir, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const MAX_FOTOS_POR_ENVIO = 24;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-orig`),
});

const upload = multer({
  storage,
  // 25MB: fotos de iPhone (HEIC/JPEG em alta resolução) costumam passar de 8MB.
  limits: { fileSize: 25 * 1024 * 1024, files: MAX_FOTOS_POR_ENVIO },
  fileFilter: (req, file, cb) => {
    // Aceita qualquer imagem (inclusive HEIC/HEIF do iPhone) — o arquivo é
    // normalizado para JPEG depois do upload, então o formato de origem não importa.
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Formato de imagem não suportado'));
    }
  },
});

// Sharp (via libvips pré-compilado) não decodifica HEIC real (codec HEVC,
// patenteado) — só o AVIF (heif com AV1). Fotos de iPhone tiradas da galeria
// (sem "Mais compatível" ativado) vêm em HEIC de verdade e falham no sharp;
// heic-convert (libheif em WASM) resolve esse caso como fallback.
async function normalizarParaJpeg(caminhoOriginal) {
  try {
    return await sharp(caminhoOriginal).rotate().resize({ width: 1920, withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
  } catch (erroSharp) {
    const bufferOriginal = fs.readFileSync(caminhoOriginal);
    const jpegConvertido = await heicConvert({ buffer: bufferOriginal, format: 'JPEG', quality: 0.9 });
    return sharp(Buffer.from(jpegConvertido))
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
  }
}

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
      console.error('Upload de fotos rejeitado pelo multer:', err.message);
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

    const urls = [];
    const falhas = [];
    for (const file of req.files) {
      const filename = `${path.parse(file.filename).name.replace(/-orig$/, '')}.jpg`;
      const destino = path.join(uploadsDir, filename);
      try {
        const jpegBuffer = await normalizarParaJpeg(file.path);
        fs.writeFileSync(destino, jpegBuffer);
        urls.push(`/uploads/${filename}`);
      } catch (conversaoErr) {
        console.error(`Falha ao normalizar foto ${file.originalname}:`, conversaoErr.message);
        falhas.push(file.originalname || 'foto');
      } finally {
        fs.unlink(file.path, () => {});
      }
    }

    if (urls.length === 0) {
      return res.status(400).json({
        erro:
          falhas.length === 1
            ? `Não foi possível processar a foto "${falhas[0]}". Tente novamente ou exporte em JPEG antes de enviar.`
            : `Não foi possível processar nenhuma das ${falhas.length} fotos enviadas. Tente novamente ou exporte em JPEG antes de enviar.`,
      });
    }

    const fotos = await veiculosRepo.adicionarFotos(req.params.id, urls);
    res.status(201).json({
      fotos,
      aviso:
        falhas.length > 0
          ? `${falhas.length} de ${req.files.length} foto(s) não puderam ser processadas e não foram salvas: ${falhas.join(', ')}.`
          : undefined,
    });
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
