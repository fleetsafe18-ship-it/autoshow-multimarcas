import { useState } from 'react';
import { assetUrl } from '../lib/api.js';

export default function Gallery({ fotos = [] }) {
  const [ativo, setAtivo] = useState(0);
  const temFotos = fotos.length > 0;
  const fotoAtual = temFotos ? fotos[ativo] : null;

  function anterior() {
    setAtivo((i) => (i - 1 + fotos.length) % fotos.length);
  }
  function proxima() {
    setAtivo((i) => (i + 1) % fotos.length);
  }

  return (
    <>
      <div
        className="gallery-main"
        style={{
          position: 'relative',
          height: 560,
          borderRadius: 8,
          overflow: 'hidden',
          background: fotoAtual ? '#000' : 'linear-gradient(135deg,#2B2B30,#1B1B1E)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          boxShadow: '0 30px 60px -30px rgba(0,0,0,0.7), 0 0 50px -14px rgba(15,108,241,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {fotoAtual ? (
          <img
            src={assetUrl(fotoAtual.url)}
            alt="Foto do veículo"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ fontSize: 13, color: '#5C5A56', letterSpacing: 1 }}>SEM FOTOS CADASTRADAS</span>
        )}

        {fotos.length > 1 && (
          <>
            <button
              aria-label="Foto anterior"
              onClick={anterior}
              style={navArrowStyle('left')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              aria-label="Próxima foto"
              onClick={proxima}
              style={navArrowStyle('right')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--glass-bg-strong)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid var(--border-strong)',
                padding: '10px 18px',
                borderRadius: 999,
                fontSize: 12,
                color: 'var(--text-secondary)',
              }}
            >
              {ativo + 1} / {fotos.length}
            </div>
          </>
        )}
      </div>

      {fotos.length > 0 && (
        <div className="thumbs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', gap: 12, marginBottom: 60 }}>
          {fotos.map((foto, i) => (
            <button
              key={foto.id}
              className="thumb"
              onClick={() => setAtivo(i)}
              style={{
                height: 88,
                borderRadius: 5,
                border: `2px solid ${i === ativo ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                backgroundImage: `url(${assetUrl(foto.url)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 0,
              }}
              aria-label={`Ver foto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

function navArrowStyle(side) {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 16,
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'var(--glass-bg-strong)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid var(--border-strong)',
    color: 'var(--text)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };
}
