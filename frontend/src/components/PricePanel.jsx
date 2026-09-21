import { useState } from 'react';
import { formatPreco, whatsappLink } from '../lib/constants.js';

const TAXA_MENSAL = 0.0199; // taxa ilustrativa a.m., apenas para simulação
const PRAZOS = [12, 24, 36, 48];

function parcelaPrice(valorFinanciado, taxa, meses) {
  if (meses === 0) return valorFinanciado;
  const fator = Math.pow(1 + taxa, meses);
  return (valorFinanciado * (taxa * fator)) / (fator - 1);
}

export default function PricePanel({ veiculo }) {
  const [simulando, setSimulando] = useState(false);
  const [entradaPct, setEntradaPct] = useState(20);
  const [prazo, setPrazo] = useState(36);

  const mensagem = `Olá! Tenho interesse no ${veiculo.marca} ${veiculo.modelo} ${veiculo.ano} (${formatPreco(veiculo.preco)}) que vi no site.`;

  const entrada = veiculo.preco * (entradaPct / 100);
  const valorFinanciado = veiculo.preco - entrada;
  const parcela = parcelaPrice(valorFinanciado, TAXA_MENSAL, prazo);

  return (
    <div
      className="price-panel glow-ring"
      style={{
        position: 'sticky',
        top: 100,
        background: 'linear-gradient(165deg,rgba(27,28,33,0.6),rgba(23,24,28,0.55))',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRadius: 8,
        padding: 32,
        boxShadow: '0 24px 48px -24px rgba(0,0,0,0.6)',
      }}
    >
      <div style={{ fontSize: 12, color: 'var(--text-faint)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
        Valor
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 44, letterSpacing: -1, marginBottom: 4 }}>
        {formatPreco(veiculo.preco)}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 24 }}>à vista ou financiado</div>

      <a
        href={whatsappLink(mensagem)}
        target="_blank"
        rel="noopener"
        className="cta-pulse cta-link shine"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: 'linear-gradient(135deg,var(--accent),var(--accent-soft))',
          color: '#0F0F11',
          fontWeight: 700,
          fontSize: 16,
          padding: 18,
          borderRadius: 4,
          marginBottom: 12,
          boxShadow: '0 14px 30px -10px rgba(15,108,241,0.6)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.71.45 3.38 1.3 4.86L2 22l5.36-1.4a9.9 9.9 0 004.68 1.19h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.1a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.19 8.19 0 01-1.26-4.38c0-4.53 3.69-8.22 8.23-8.22 4.53 0 8.22 3.69 8.22 8.22 0 4.54-3.69 8.29-8.18 8.29z" />
        </svg>
        Tenho interesse — WhatsApp
      </a>

      <button
        onClick={() => setSimulando((v) => !v)}
        className="cta-link"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          background: 'transparent',
          border: '1px solid var(--border-strong)',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          fontSize: 14,
          padding: 14,
          borderRadius: 4,
          marginBottom: simulando ? 20 : 16,
          cursor: 'pointer',
        }}
      >
        {simulando ? 'Fechar simulação' : 'Simular financiamento'}
      </button>

      {simulando && (
        <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-faint)', marginBottom: 6 }}>
              <span>Entrada</span>
              <span>{entradaPct}% · {formatPreco(entrada)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              step={5}
              value={entradaPct}
              onChange={(e) => setEntradaPct(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0F6CF1' }}
            />
          </div>

          <div>
            <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 6 }}>Parcelas</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {PRAZOS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrazo(p)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: 4,
                    border: `1px solid ${prazo === p ? 'var(--accent)' : 'var(--border-strong)'}`,
                    background: prazo === p ? 'rgba(15,108,241,0.14)' : 'transparent',
                    color: prazo === p ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {p}x
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(15,108,241,0.08)',
              border: '1px solid rgba(15,108,241,0.25)',
              borderRadius: 6,
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
              Parcela estimada
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>
              {formatPreco(parcela)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-faint)' }}>/mês</span>
            </div>
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-faint)', lineHeight: 1.5, margin: 0 }}>
            Simulação ilustrativa, sujeita a análise de crédito e aprovação. Fale com a gente para condições reais.
          </p>
        </div>
      )}

      <div style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>Resposta rápida, sem compromisso</div>
    </div>
  );
}
