import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import Logo from '../components/Logo.jsx';

export default function AdminLayout() {
  const { signOut } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="nav-shell">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px' }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Logo height={32} />
            <span style={{ color: 'var(--text-faint)', fontWeight: 500, fontSize: 13 }}>· admin</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <NavLink
              to="/admin"
              end
              style={({ isActive }) => ({
                fontSize: 14,
                fontWeight: 600,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              })}
            >
              Veículos
            </NavLink>
            <Link
              to="/"
              target="_blank"
              style={{ fontSize: 14, color: 'var(--text-faint)' }}
            >
              Ver site ↗
            </Link>
            <button
              onClick={signOut}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-secondary)',
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Sair
            </button>
          </div>
        </nav>
      </div>
      <main style={{ padding: '32px 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
