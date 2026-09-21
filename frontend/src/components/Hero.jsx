import { motion } from 'framer-motion';
import { SITE_NAME, SITE_LOCATION, whatsappLink } from '../lib/constants.js';

export default function Hero() {
  return (
    <section
      className="hero grain"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '88px 80px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.8fr',
        gap: 24,
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -160,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(15,108,241,0.16),transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 26 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          <span style={{ fontSize: 12, letterSpacing: 3, color: 'var(--accent)', fontWeight: 700 }}>
            {SITE_NAME.toUpperCase()} · {SITE_LOCATION.toUpperCase()}
          </span>
        </div>
        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 64,
            lineHeight: 1.04,
            margin: 0,
            letterSpacing: -2,
            color: '#EDEBE6',
          }}
        >
          Encontre o veículo certo
          <br />
          <span
            style={{
              fontWeight: 700,
              letterSpacing: -2.5,
              background: 'linear-gradient(100deg,var(--accent),#7DB4FF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 40px rgba(15,108,241,0.35)',
            }}
          >
            pra você.
          </span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: 440, margin: 0 }}>
          Carros, motos e caminhões com procedência garantida. Atendimento rápido, direto pelo WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="#estoque"
            className="cta-link shine"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'linear-gradient(135deg,var(--accent),var(--accent-soft))',
              color: '#0F0F11',
              fontWeight: 700,
              fontSize: 15,
              padding: '16px 30px',
              borderRadius: 2,
              boxShadow: '0 12px 28px -10px rgba(15,108,241,0.6)',
            }}
          >
            Ver estoque completo
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="cta-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: 15,
              padding: '16px 30px',
              borderRadius: 2,
            }}
          >
            Falar no WhatsApp
          </a>
        </div>
      </motion.div>
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'relative', height: 460 }}
      >
        <div style={{ position: 'absolute', bottom: 18, left: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 11, color: 'var(--text-faint)', letterSpacing: 1, textTransform: 'uppercase' }}>
            Consultor automotivo
          </span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{SITE_NAME}</span>
        </div>
      </motion.div>
    </section>
  );
}
