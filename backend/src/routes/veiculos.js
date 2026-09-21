import { Router } from 'express';
import * as veiculosRepo from '../db/veiculosRepo.js';

export const veiculosRouter = Router();

// Vitrine pública: só veículos disponíveis, mais recentes primeiro. Filtro opcional por tipo.
veiculosRouter.get('/veiculos', async (req, res) => {
  const { tipo } = req.query;
  const veiculos = await veiculosRepo.listDisponiveis({ tipo: tipo || undefined });
  res.json(veiculos);
});

// Página de detalhe: um veículo específico, com todas as fotos
veiculosRouter.get('/veiculos/:id', async (req, res) => {
  const veiculo = await veiculosRepo.getPorId(req.params.id);

  if (!veiculo || !veiculo.disponivel) {
    return res.status(404).json({ erro: 'Veículo não encontrado' });
  }

  res.json(veiculo);
});
