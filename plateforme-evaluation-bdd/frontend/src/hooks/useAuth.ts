import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCredentials, logout } from '../store/slices/authSlice';
import { authService } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      dispatch(setCredentials(data));
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(logout());
    }
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    login,
    signOut,
  };
};