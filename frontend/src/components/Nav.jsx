import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { whatsappLink } from '../lib/constants.js';

const LINKS = [
  { href: '/#estoque', label: 'Estoque' },
  { href: '/#sobre', label: 'Sobre nós' },
  { href: '/#localizacao', label: 'Localização' },
];

export default function Nav() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="nav-shell">
      <nav
        className="nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px 88px',
        }}
      >
        <Link to="/" className="nav-brand" onClick={() => setMenuAberto(false)} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Logo className="nav-logo" height={78} />
        </Link>
        <div className="nav-links" style={{ display: 'flex', gap: 40, fontSize: 15, color: 'var(--text-secondary)', fontWeight: 500 }}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          className="cta-link shine nav-cta pill-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--accent)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 14,
            padding: '13px 22px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <WhatsAppIcon size={17} />
          Falar no WhatsApp
        </a>
        <button
          type="button"
          className="nav-menu-toggle"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          onClick={() => setMenuAberto((v) => !v)}
        >
          {menuAberto ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuAberto && (
        <div id="menu-mobile" className="nav-mobile-panel">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuAberto(false)}>
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener"
            className="pill-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: 'var(--accent)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 15,
              padding: '15px 22px',
              marginTop: 8,
            }}
          >
            <WhatsAppIcon size={18} />
            Falar no WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
