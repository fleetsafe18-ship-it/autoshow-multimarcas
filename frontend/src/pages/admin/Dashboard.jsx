import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../lib/api.js';
import { assetUrl } from '../../lib/api.js';
import { TIPO_LABEL, formatPreco } from '../../lib/constants.js';

export default function Dashboard() {
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  function carregar() {
    setCarregando(true);
    api
      .adminListarVeiculos()
      .then(setVeiculos)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }

  useEffect(carregar, []);

  async function alternarVendido(veiculo) {
    await api.adminMarcarVendido(veiculo.id, !veiculo.disponivel);
    carregar();
  }

  async function excluir(veiculo) {
    if (!confirm(`Excluir "${veiculo.marca} ${veiculo.modelo}"? Essa ação não pode ser desfeita.`)) return;
    await api.adminRemoverVeiculo(veiculo.id);
    carregar();
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, margin: 0, letterSpacing: -0.5 }}>
          Veículos
        </h1>
        <Link
          to="/admin/veiculos/novo"
          className="cta-link shine"
          style={{
            background: 'linear-gradient(135deg,var(--accent),var(--accent-soft))',
            color: '#0F0F11',
            fontWeight: 700,
            fontSize: 14,
            padding: '11px 22px',
            borderRadius: 4,
          }}
        >
          + Novo veículo
        </Link>
      </div>

      {erro && <div style={{ color: '#E23D3D', marginBottom: 16 }}>{erro}</div>}

      {carregando ? (
        <div style={{ color: 'var(--text-faint)' }}>Carregando…</div>
      ) : veiculos.length === 0 ? (
        <div
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 48,
            textAlign: 'center',
            color: 'var(--text-faint)',
          }}
        >
          Nenhum veículo cadastrado ainda.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {veiculos.map((v) => (
            <div
              key={v.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                background: 'var(--glass-bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: 14,
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 64,
                  borderRadius: 5,
                  flexShrink: 0,
                  background: v.fotos?.[0]
                    ? `url(${assetUrl(v.fotos[0].url)}) center/cover`
                    : 'linear-gradient(135deg,#2B2B30,#1B1B1E)',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 0.5 }}>
                    {(TIPO_LABEL[v.tipo] || v.tipo)?.toUpperCase()}
                  </span>
                  {!v.disponivel && (
                    <span style={{ fontSize: 11, color: 'var(--text-faint)', border: '1px solid var(--border-strong)', borderRadius: 999, padding: '1px 8px' }}>
                      VENDIDO
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>
                  {v.marca} {v.modelo} {v.ano}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{formatPreco(v.preco)}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => alternarVendido(v)} style={secondaryBtn}>
                  {v.disponivel ? 'Marcar vendido' : 'Marcar disponível'}
                </button>
                <Link to={`/admin/veiculos/${v.id}`} style={secondaryBtn}>
                  Editar
                </Link>
                <button onClick={() => excluir(v)} style={{ ...secondaryBtn, color: '#E23D3D', borderColor: 'rgba(226,61,61,0.35)' }}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const secondaryBtn = {
  background: 'transparent',
  border: '1px solid var(--border-strong)',
  color: 'var(--text-secondary)',
  fontSize: 12,
  fontWeight: 600,
  padding: '9px 14px',
  borderRadius: 4,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
};
