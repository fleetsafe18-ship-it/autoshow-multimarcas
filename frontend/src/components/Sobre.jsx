import { SITE_NAME, SITE_LOCATION, SITE_ADDRESS, mapsEmbedUrl } from '../lib/constants.js';

export default function Sobre() {
  return (
    <section id="sobre" className="sobre" style={{ padding: '80px 88px', borderTop: '1px solid var(--border)' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 32,
          letterSpacing: -0.6,
          margin: '0 0 40px',
        }}
      >
        Sobre a {SITE_NAME}
      </h2>

      <div className="sobre-grid">
        <div className="sobre-photo">
          <img src="/img/dono.png" alt={`Fundador da ${SITE_NAME}`} />
        </div>

        <div className="sobre-text">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, margin: '0 0 4px' }}>
            Matheus
          </h3>
          <div style={{ fontSize: 13, color: 'var(--accent-soft)', fontWeight: 600, marginBottom: 16 }}>
            Fundador da {SITE_NAME}
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-body)', margin: 0 }}>
            Poucas coisas trazem tanta satisfação quanto ajudar alguém a encontrar o carro certo. É por isso que a{' '}
            {SITE_NAME} existe: uma revenda pensada para oferecer atendimento próximo, veículos revisados e
            negociação sem enrolação, aqui em {SITE_LOCATION}.
          </p>
        </div>

        <div id="localizacao" className="sobre-location">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, margin: '0 0 4px' }}>
            Onde estamos
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)', margin: '0 0 16px' }}>
            {SITE_ADDRESS}
          </p>
          <iframe
            title={`Localização da ${SITE_NAME}`}
            src={mapsEmbedUrl()}
            width="100%"
            height="220"
            style={{ border: 0, borderRadius: 14, filter: 'grayscale(1) invert(0.92) contrast(0.9)', display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
