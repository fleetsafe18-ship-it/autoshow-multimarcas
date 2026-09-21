import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import Gallery from '../components/Gallery.jsx';
import SpecCard, { SPEC_ICONS } from '../components/SpecCard.jsx';
import PricePanel from '../components/PricePanel.jsx';
import * as api from '../lib/api.js';
import { TIPO_LABEL, formatKm } from '../lib/constants.js';

export default function VehicleDetail() {
  const { id } = useParams();
  const [veiculo, setVeiculo] = useState(null);
  const [estado, setEstado] = useState('carregando'); // carregando | ok | erro

  useEffect(() => {
    let cancelado = false;
    setEstado('carregando');

    api
      .buscarVeiculo(id)
      .then((dados) => {
        if (!cancelado) {
          setVeiculo(dados);
          setEstado('ok');
        }
      })
      .catch(() => {
        if (!cancelado) setEstado('erro');
      });

    return () => {
      cancelado = true;
    };
  }, [id]);

  if (estado === 'carregando') {
    return (
      <>
        <Nav />
        <div style={{ padding: '120px 80px', textAlign: 'center', color: 'var(--text-faint)' }}>Carregando…</div>
      </>
    );
  }

  if (estado === 'erro' || !veiculo) {
    return (
      <>
        <Nav />
        <div style={{ padding: '120px 80px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-body)', marginBottom: 20 }}>Veículo não encontrado.</p>
          <Link to="/" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Voltar ao estoque
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />

      <section className="detail-wrap" style={{ position: 'relative', overflow: 'hidden', padding: '48px 80px 0', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontSize: 13, color: 'var(--text-faint)' }}>
          <Link to="/" style={{ color: 'var(--text-faint)' }}>
            Estoque
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{veiculo.marca}</span>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            {veiculo.modelo} {veiculo.ano}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span
            style={{
              background: 'rgba(15,108,241,0.12)',
              color: 'var(--accent)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              padding: '6px 14px',
              borderRadius: 999,
            }}
          >
            {(TIPO_LABEL[veiculo.tipo] || 'Veículo').toUpperCase()}
          </span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: veiculo.disponivel ? 'var(--available)' : 'var(--text-faint)', display: 'inline-block' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{veiculo.disponivel ? 'Disponível' : 'Vendido'}</span>
        </div>

        <Gallery fotos={veiculo.fotos} />

        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1
              className="detail-title"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 42, margin: '0 0 32px', letterSpacing: -1.2, lineHeight: 1.05 }}
            >
              {veiculo.modelo} {veiculo.ano}
            </h1>

            <div className="specs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 14, marginBottom: 44 }}>
              <SpecCard icon={SPEC_ICONS.ano} label="Ano" value={veiculo.ano} />
              <SpecCard icon={SPEC_ICONS.km} label="Km" value={formatKm(veiculo.km)} />
              <SpecCard icon={SPEC_ICONS.combustivel} label="Combustível" value={veiculo.combustivel || '—'} />
              <SpecCard icon={SPEC_ICONS.cambio} label="Câmbio" value={veiculo.cambio || '—'} />
              <SpecCard icon={SPEC_ICONS.cor} label="Cor" value={veiculo.cor || '—'} />
            </div>

            <h2 style={{ fontWeight: 700, fontSize: 12, margin: '0 0 14px', letterSpacing: 2, color: 'var(--text-faint)', textTransform: 'uppercase' }}>
              Descrição
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-body)', margin: '0 0 32px', whiteSpace: 'pre-line' }}>
              {veiculo.descricao || 'Sem descrição cadastrada.'}
            </p>

            {veiculo.detalhes_extras && (
              <>
                <h2 style={{ fontWeight: 700, fontSize: 12, margin: '0 0 14px', letterSpacing: 2, color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                  Detalhes extras
                </h2>
                <div
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '20px 22px',
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {veiculo.detalhes_extras}
                </div>
              </>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <PricePanel veiculo={veiculo} />
          </motion.div>
        </div>
      </section>

      <div style={{ marginTop: 100 }}>
        <Footer />
      </div>
    </>
  );
}
