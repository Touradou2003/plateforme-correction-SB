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

const authService = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),
  register: (data: LoginCredentials) =>
    api.post<AuthResponse>('/auth/register', data),
  logout: () => api.post('/auth/logout'),
};

export default authService; 