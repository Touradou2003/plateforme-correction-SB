import api from './api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, role: string) => {
    const response = await api.post('/auth/register', { email, password, role });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
};