import db from './db.js';

const CAMPOS_TEXTO = ['tipo', 'marca', 'modelo', 'combustivel', 'cambio', 'cor', 'descricao', 'detalhes_extras'];
const CAMPOS_NUMERO = ['ano', 'km', 'preco'];

function paraVeiculo(row) {
  if (!row) return null;
  return { ...row, disponivel: !!row.disponivel };
}

function comFotos(veiculo) {
  if (!veiculo) return veiculo;
  const fotos = db
    .prepare('SELECT id, url, ordem FROM veiculo_fotos WHERE veiculo_id = ? ORDER BY ordem ASC, id ASC')
    .all(veiculo.id);
  return { ...veiculo, fotos };
}

export async function listDisponiveis({ tipo } = {}) {
  const rows = tipo
    ? db
        .prepare('SELECT * FROM veiculos WHERE disponivel = 1 AND tipo = ? ORDER BY criado_em DESC')
        .all(tipo)
    : db.prepare('SELECT * FROM veiculos WHERE disponivel = 1 ORDER BY criado_em DESC').all();
  return rows.map(paraVeiculo).map(comFotos);
}

export async function listTodos() {
  const rows = db.prepare('SELECT * FROM veiculos ORDER BY criado_em DESC').all();
  return rows.map(paraVeiculo).map(comFotos);
}

export async function getPorId(id) {
  const row = db.prepare('SELECT * FROM veiculos WHERE id = ?').get(Number(id));
  return comFotos(paraVeiculo(row));
}

export async function criar(dados) {
  const info = db
    .prepare(
      `INSERT INTO veiculos (tipo, marca, modelo, ano, km, combustivel, cambio, cor, preco, descricao, detalhes_extras, disponivel)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      dados.tipo || 'carro',
      dados.marca,
      dados.modelo,
      Number(dados.ano),
      Number(dados.km) || 0,
      dados.combustivel || '',
      dados.cambio || '',
      dados.cor || '',
      Number(dados.preco),
      dados.descricao || '',
      dados.detalhes_extras || '',
      dados.disponivel === false ? 0 : 1
    );

  return getPorId(Number(info.lastInsertRowid));
}

export async function atualizar(id, campos) {
  const existente = await getPorId(id);
  if (!existente) return null;

  const mapa = {};
  for (const chave of CAMPOS_TEXTO) {
    if (campos[chave] !== undefined) mapa[chave] = String(campos[chave]);
  }
  for (const chave of CAMPOS_NUMERO) {
    if (campos[chave] !== undefined) mapa[chave] = Number(campos[chave]);
  }
  if (campos.disponivel !== undefined) mapa.disponivel = campos.disponivel ? 1 : 0;

  const chaves = Object.keys(mapa);
  if (chaves.length === 0) return existente;

  const sets = chaves.map((chave) => `${chave} = ?`).join(', ');
  const valores = chaves.map((chave) => mapa[chave]);

  db.prepare(`UPDATE veiculos SET ${sets} WHERE id = ?`).run(...valores, Number(id));
  return getPorId(id);
}

export async function remover(id) {
  const existente = await getPorId(id);
  if (!existente) return null;

  db.prepare('DELETE FROM veiculos WHERE id = ?').run(Number(id));
  return existente;
}

// ===== Fotos do veículo =====

export async function adicionarFotos(veiculoId, urls) {
  const atual = db
    .prepare('SELECT COALESCE(MAX(ordem), -1) as maxOrdem FROM veiculo_fotos WHERE veiculo_id = ?')
    .get(Number(veiculoId)).maxOrdem;

  const inserir = db.prepare('INSERT INTO veiculo_fotos (veiculo_id, url, ordem) VALUES (?, ?, ?)');

  return urls.map((url, indice) => {
    const ordem = atual + 1 + indice;
    const info = inserir.run(Number(veiculoId), url, ordem);
    return { id: Number(info.lastInsertRowid), url, ordem };
  });
}

export async function removerFoto(fotoId) {
  const foto = db.prepare('SELECT * FROM veiculo_fotos WHERE id = ?').get(Number(fotoId));
  if (!foto) return null;

  db.prepare('DELETE FROM veiculo_fotos WHERE id = ?').run(Number(fotoId));
  return foto;
}

export async function reordenarFotos(veiculoId, idsEmOrdem) {
  const atualizarOrdem = db.prepare('UPDATE veiculo_fotos SET ordem = ? WHERE id = ? AND veiculo_id = ?');
  idsEmOrdem.forEach((fotoId, indice) => {
    atualizarOrdem.run(indice, Number(fotoId), Number(veiculoId));
  });

  return db
    .prepare('SELECT id, url, ordem FROM veiculo_fotos WHERE veiculo_id = ? ORDER BY ordem ASC, id ASC')
    .all(Number(veiculoId));
}
