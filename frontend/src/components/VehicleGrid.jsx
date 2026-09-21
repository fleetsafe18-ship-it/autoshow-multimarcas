import VehicleCard from './VehicleCard.jsx';

export default function VehicleGrid({ veiculos, carregando }) {
  if (carregando) {
    return (
      <section className="cards-grid" style={{ padding: '0 80px 110px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 32 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 340,
              borderRadius: 6,
              background: 'var(--glass-bg)',
              border: '1px solid var(--border)',
              opacity: 0.5,
            }}
          />
        ))}
      </section>
    );
  }

  if (veiculos.length === 0) {
    return (
      <section style={{ padding: '40px 80px 110px', textAlign: 'center', color: 'var(--text-faint)' }}>
        Nenhum veículo disponível nessa categoria no momento.
      </section>
    );
  }

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <section
        className="cards-grid"
        style={{
          position: 'relative',
          padding: '0 80px 110px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
          gap: 32,
        }}
      >
        {veiculos.map((veiculo) => (
          <VehicleCard key={veiculo.id} veiculo={veiculo} />
        ))}
      </section>
    </section>
  );
}
