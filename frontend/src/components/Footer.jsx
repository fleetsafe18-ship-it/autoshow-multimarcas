import InstagramIcon from './InstagramIcon.jsx';
import { SITE_NAME, SITE_LOCATION, INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_DISPLAY, whatsappLink } from '../lib/constants.js';

export default function Footer({ id = 'contato' }) {
  return (
    <footer
      id={id}
      className="site-footer"
      style={{
        padding: '32px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
        color: 'var(--text-faint)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <span>
        {SITE_NAME} · {SITE_LOCATION}
      </span>
      <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener"
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}
        >
          <InstagramIcon /> {INSTAGRAM_HANDLE}
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener" style={{ color: 'var(--text-muted)' }}>
          {WHATSAPP_DISPLAY}
        </a>
      </span>
    </footer>
  );
}
