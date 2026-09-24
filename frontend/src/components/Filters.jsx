const OPCOES = [
  { valor: 'todos', label: 'Todos' },
  { valor: 'carro', label: 'Carros' },
  { valor: 'moto', label: 'Motos' },
];

export default function Filters({ ativo, onChange }) {
  return (
    <section id="estoque" className="filters stock-header" style={{ padding: '72px 88px 0' }}>
      <h2>Encontre seu próximo veículo</h2>
      <div className="tabs-row">
        {OPCOES.map((opcao) => {
          const selecionado = ativo === opcao.valor;
          return (
            <button
              key={opcao.valor}
              type="button"
              className={`tab-btn${selecionado ? ' active' : ''}`}
              aria-current={selecionado ? 'true' : undefined}
              onClick={() => onChange(opcao.valor)}
            >
              {opcao.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
