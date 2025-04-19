import api from './api';

const convertRole = (role: string): string => {
  switch (role) {
    case 'student':
      return 'etudiant';
    case 'professor':
      return 'professeur';
    default:
      return role;
  }
};

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, role: string) => {
    const convertedRole = convertRole(role);
    const response = await api.post('/auth/register', { email, password, role: convertedRole });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
  },
};