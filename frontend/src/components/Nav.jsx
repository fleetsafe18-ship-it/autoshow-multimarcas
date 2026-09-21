import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { SITE_NAME, whatsappLink } from '../lib/constants.js';

export default function Nav() {
  return (
    <div className="nav-shell">
      <nav
        className="nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 80px',
        }}
      >
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <Logo />
          <div
            className="nav-brand-title"
            style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: 1.5, whiteSpace: 'nowrap' }}
          >
            {SITE_NAME.toUpperCase()}
          </div>
        </Link>
        <div className="nav-links" style={{ display: 'flex', gap: 40, fontSize: 14, color: 'var(--text-secondary)' }}>
          <a href="/#estoque">Estoque</a>
          <a href="/#sobre">Sobre</a>
          <a href="/#contato">Contato</a>
        </div>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          className="cta-link shine nav-cta"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg,var(--accent),var(--accent-soft))',
            color: '#0F0F11',
            fontWeight: 700,
            fontSize: 14,
            padding: '11px 20px',
            borderRadius: 2,
            boxShadow: '0 8px 20px -8px rgba(15,108,241,0.6)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Falar no WhatsApp
        </a>
      </nav>
    </div>
  );
}
