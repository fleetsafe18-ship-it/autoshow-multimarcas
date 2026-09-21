import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/api.js';
import { TIPO_LABEL, formatPreco, formatKm } from '../lib/constants.js';

export default function VehicleCard({ veiculo }) {
  const capa = veiculo.fotos?.[0]?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link
        to={`/veiculo/${veiculo.id}`}
        className="card"
        style={{
          display: 'block',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 6,
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: 220,
            overflow: 'hidden',
            background: capa ? undefined : 'linear-gradient(135deg,#2B2B30,#1B1B1E)',
          }}
        >
          <div
            className="card-img"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: capa ? `url(${assetUrl(capa)})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!capa && <span style={{ fontSize: 12, color: '#5C5A56', letterSpacing: 1 }}>FOTO DO VEÍCULO</span>}
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,15,17,0.75) 0%, transparent 45%)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--glass-bg-strong)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: 'var(--accent)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              padding: '5px 12px',
              borderRadius: 999,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--available)', display: 'inline-block' }} />
            {(TIPO_LABEL[veiculo.tipo] || 'Veículo').toUpperCase()}
          </span>
          <span className="card-reveal" style={{ position: 'absolute', bottom: 14, right: 16, fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>
            Ver detalhes →
          </span>
        </div>
        <div style={{ padding: '22px 24px 26px' }}>
          <div style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
            {veiculo.marca}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 21, margin: '4px 0 10px', letterSpacing: -0.4 }}>
            {veiculo.modelo} {veiculo.ano}
          </h3>
          <div style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
            <span>{veiculo.ano}</span>
            <span>·</span>
            <span>{formatKm(veiculo.km)}</span>
            <span>·</span>
            <span>{veiculo.cambio || '—'}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24, letterSpacing: -0.4 }}>
            {formatPreco(veiculo.preco)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
