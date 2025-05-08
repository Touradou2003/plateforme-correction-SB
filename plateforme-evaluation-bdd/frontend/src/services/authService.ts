import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    submissionsCount: number;
    averageScore: number;
  };
  token: string;
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (nom: string, email: string, password: string, role: string) => {
    const response = await api.post<AuthResponse>('/auth/register', { nom, email, password, role });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
};