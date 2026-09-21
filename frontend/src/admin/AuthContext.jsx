import { createContext, useContext, useState, useCallback } from 'react';
import * as api from '../lib/api.js';

const AuthContext = createContext(null);

const TOKEN_KEY = 'bs_admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const signIn = useCallback(async (usuario, senha) => {
    const { token: novoToken } = await api.login(usuario, senha);
    localStorage.setItem(TOKEN_KEY, novoToken);
    setToken(novoToken);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
