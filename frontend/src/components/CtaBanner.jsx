import { whatsappLink } from '../lib/constants.js';

export default function CtaBanner() {
  return (
    <section
      className="cta-banner"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 80px 88px',
        background: 'rgba(12,13,15,0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 40,
        flexWrap: 'wrap',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 420,
          height: '100%',
          background: 'linear-gradient(120deg, transparent 0%, rgba(15,108,241,0.08) 100%)',
          clipPath: 'polygon(30% 0,100% 0,100% 100%,0% 100%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 520 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 30, margin: '0 0 10px', letterSpacing: -0.8 }}>
          Não achou o que procura?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-body)', margin: 0 }}>
          Fala direto com a gente no WhatsApp — a gente te ajuda a encontrar o veículo ideal.
        </p>
      </div>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener"
        className="cta-pulse cta-link shine"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'linear-gradient(135deg,var(--accent),var(--accent-soft))',
          color: '#0F0F11',
          fontWeight: 700,
          fontSize: 15,
          padding: '18px 36px',
          borderRadius: 2,
          boxShadow: '0 14px 32px -10px rgba(15,108,241,0.65)',
        }}
      >
        Falar no WhatsApp
      </a>
    </section>
  );
}
