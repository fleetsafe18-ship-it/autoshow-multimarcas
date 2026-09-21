// Usa o mesmo host que carregou a página (localhost no PC, o IP da rede no celular),
// então o site funciona igual dos dois jeitos sem precisar reconfigurar nada.
export const API_URL = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:3001`;

export function assetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}

function authHeaders() {
  const token = localStorage.getItem('bs_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const erro = new Error(data.erro || `Erro ${res.status}`);
    erro.status = res.status;
    throw erro;
  }
  return data;
}

// ===== Público =====

export async function listarVeiculos({ tipo } = {}) {
  const params = tipo && tipo !== 'todos' ? `?tipo=${encodeURIComponent(tipo)}` : '';
  const res = await fetch(`${API_URL}/veiculos${params}`);
  return handle(res);
}

export async function buscarVeiculo(id) {
  const res = await fetch(`${API_URL}/veiculos/${id}`);
  return handle(res);
}

// ===== Admin: auth =====

export async function login(usuario, senha) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha }),
  });
  return handle(res);
}

// ===== Admin: veículos =====

export async function adminListarVeiculos() {
  const res = await fetch(`${API_URL}/admin/veiculos`, { headers: authHeaders() });
  return handle(res);
}

export async function adminBuscarVeiculo(id) {
  const res = await fetch(`${API_URL}/admin/veiculos/${id}`, { headers: authHeaders() });
  return handle(res);
}

export async function adminCriarVeiculo(dados) {
  const res = await fetch(`${API_URL}/admin/veiculos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(dados),
  });
  return handle(res);
}

export async function adminAtualizarVeiculo(id, dados) {
  const res = await fetch(`${API_URL}/admin/veiculos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(dados),
  });
  return handle(res);
}

export async function adminRemoverVeiculo(id) {
  const res = await fetch(`${API_URL}/admin/veiculos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handle(res);
}

export async function adminMarcarVendido(id, disponivel) {
  return adminAtualizarVeiculo(id, { disponivel });
}

// ===== Admin: fotos =====

export async function adminEnviarFotos(veiculoId, arquivos) {
  const formData = new FormData();
  Array.from(arquivos).forEach((arquivo) => formData.append('fotos', arquivo));

  const res = await fetch(`${API_URL}/admin/veiculos/${veiculoId}/fotos`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  return handle(res);
}

export async function adminReordenarFotos(veiculoId, ordem) {
  const res = await fetch(`${API_URL}/admin/veiculos/${veiculoId}/fotos/ordem`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ ordem }),
  });
  return handle(res);
}

export async function adminRemoverFoto(veiculoId, fotoId) {
  const res = await fetch(`${API_URL}/admin/veiculos/${veiculoId}/fotos/${fotoId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handle(res);
}
