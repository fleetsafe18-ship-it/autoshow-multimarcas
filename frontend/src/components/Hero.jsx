import { motion } from 'framer-motion';
import { SITE_NAME, whatsappLink } from '../lib/constants.js';
import WhatsAppIcon from './WhatsAppIcon.jsx';

export default function Hero() {
  return (
    <section className="hero" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
      <div
        style={{
          position: 'absolute',
          top: -140,
          left: -100,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(0,88,255,0.18),transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <div className="hero-eyebrow" style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 12, letterSpacing: 3, color: 'var(--text-faint)', fontWeight: 700 }}>
            {SITE_NAME.toUpperCase()}
          </span>
        </div>
        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(42px, calc(5.25vw - 15.7px), 72px)',
            lineHeight: 1.08,
            margin: '0 0 36px',
            letterSpacing: -2,
            color: '#FFFFFF',
          }}
        >
          Seu próximo carro
          <br />
          <span style={{ color: 'var(--accent)' }}>merece um Autoshow.</span>
        </h1>
        <p className="hero-desc" style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: 560, margin: '0 0 38px' }}>
          Conheça nossos veículos disponíveis e encontre o carro que combina com você.{' '}
          <span className="hero-desc-extra">Fale com nossa equipe ou venha conhecer a loja.</span>
        </p>
        <div className="hero-cta-row" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <a
            href="#estoque"
            className="cta-link shine pill-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: 'var(--accent)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 17,
              padding: '25px 34px',
              boxShadow: '0 16px 32px -12px rgba(0,88,255,0.55)',
            }}
          >
            Ver estoque
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="cta-link pill-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: 'transparent',
              border: '1px solid var(--border-strong)',
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: 17,
              padding: '25px 34px',
            }}
          >
            <WhatsAppIcon size={20} />
            Falar no WhatsApp
          </a>
        </div>
      </motion.div>

      <div className="hero-photo" role="img" aria-label={`Fachada da loja ${SITE_NAME}`} />

      <div className="hero-location" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span style={{ fontSize: 15, color: 'var(--text-faint)' }}>Venha conhecer nossa loja</span>
      </div>
    </section>
  );
}
