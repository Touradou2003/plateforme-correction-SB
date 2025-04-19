import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useApi';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const { post, get } = useApi<User>();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await get('/auth/me');
        setState({ user, isAuthenticated: true });
      } catch {
        setState({ user: null, isAuthenticated: false });
      }
    };

    checkAuth();
  }, [get]);

  const login = useCallback(
    async (email: string, password: string) => {
      const user = await post('/auth/login', { email, password });
      setState({ user, isAuthenticated: true });
      navigate('/dashboard');
    },
    [post, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await post('/auth/logout', {});
    } finally {
      setState({ user: null, isAuthenticated: false });
      navigate('/login');
    }
  }, [post, navigate]);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const user = await post('/auth/register', { email, password, name });
      setState({ user, isAuthenticated: true });
      navigate('/dashboard');
    },
    [post, navigate]
  );

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    register,
  };
};