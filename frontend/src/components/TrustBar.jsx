const ITEMS = [
  {
    label: 'Compra',
    path: 'M3 13l1.4-4.6A2 2 0 016.3 7h11.4a2 2 0 011.9 1.4L21 13v4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-4z',
  },
  { label: 'Venda', path: 'M12 2v20M18 8l-6-6-6 6M6 16l6 6 6-6' },
  { label: 'Troca', path: 'M17 2l4 4-4 4M21 6H8a4 4 0 00-4 4v1M7 22l-4-4 4-4M3 18h13a4 4 0 004-4v-1' },
  { label: 'Financiamento', path: 'M2 10h20M6 15h4', rect: true },
];

export default function TrustBar() {
  return (
    <section
      className="trust"
      style={{
        padding: '32px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        gap: 1,
        background: 'var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {ITEMS.map((item) => (
        <div
          key={item.label}
          style={{ background: 'var(--bg-elevated)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {item.rect && <rect x="2" y="6" width="20" height="13" rx="2" />}
            <path d={item.path} />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.label}</span>
        </div>
      ))}
    </section>
  );
}
