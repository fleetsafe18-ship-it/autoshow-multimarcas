const OPCOES = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'carro', label: 'Carros' },
  { valor: 'moto', label: 'Motos' },
  { valor: 'caminhao', label: 'Caminhões' },
];

export default function Filters({ ativo, onChange }) {
  return (
    <section id="estoque" className="filters" style={{ padding: '44px 80px 32px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      {OPCOES.map((opcao) => {
        const selecionado = ativo === opcao.valor;
        return (
          <button
            key={opcao.valor}
            className="chip"
            onClick={() => onChange(opcao.valor)}
            style={{
              background: selecionado ? 'var(--accent)' : 'transparent',
              color: selecionado ? '#0F0F11' : 'var(--text-secondary)',
              border: `1px solid ${selecionado ? 'var(--accent)' : 'var(--border-strong)'}`,
              fontWeight: selecionado ? 700 : 600,
              fontSize: 13,
              padding: '10px 22px',
              borderRadius: 999,
              cursor: 'pointer',
            }}
          >
            {opcao.label}
          </button>
        );
      })}
    </section>
  );
}
