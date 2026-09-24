import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../admin/AuthContext.jsx';
import Logo from '../../components/Logo.jsx';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('admin');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await signIn(usuario, senha);
      navigate('/admin');
    } catch (e) {
      setErro(e.message || 'Não foi possível entrar');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: 20,
      }}
    >
      <form
        onSubmit={onSubmit}
        className="glow-ring"
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(14px)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 36,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginBottom: 32 }}>
          <Logo height={38} />
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-faint)', fontWeight: 500 }}>
            Painel administrativo
          </div>
        </div>

        <label style={fieldLabel}>Usuário</label>
        <input
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={inputStyle}
          autoComplete="username"
        />

        <label style={fieldLabel}>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={inputStyle}
          autoComplete="current-password"
          required
        />

        {erro && <div style={{ color: '#E23D3D', fontSize: 13, marginBottom: 16 }}>{erro}</div>}

        <button
          type="submit"
          disabled={enviando}
          className="cta-link shine"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg,var(--accent),var(--accent-soft))',
            color: '#0F0F11',
            fontWeight: 700,
            fontSize: 15,
            padding: 14,
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            marginTop: 8,
            opacity: enviando ? 0.7 : 1,
          }}
        >
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

const fieldLabel = {
  display: 'block',
  fontSize: 12,
  color: 'var(--text-faint)',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  marginBottom: 6,
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border-strong)',
  borderRadius: 4,
  color: 'var(--text)',
  fontSize: 14,
  padding: '12px 14px',
  marginBottom: 18,
  outline: 'none',
};
