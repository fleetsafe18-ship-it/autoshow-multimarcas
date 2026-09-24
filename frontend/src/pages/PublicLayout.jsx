import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ position: 'relative', zIndex: 2, color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
        <Outlet />
      </div>
    </div>
  );
}
