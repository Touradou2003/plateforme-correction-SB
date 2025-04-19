import axios from 'axios';
import { cache } from '../utils/cache';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur serveur
      throw new Error(error.response.data.message || 'Une erreur est survenue');
    } else if (error.request) {
      // Erreur réseau
      throw new Error('Erreur de connexion au serveur');
    } else {
      // Erreur de configuration
      throw new Error('Erreur de configuration de la requête');
    }
  }
);

interface CacheOptions {
  cacheKey?: string;
}

// Fonction pour gérer le cache et les requêtes
const fetchWithCache = async <T>(
  endpoint: string,
  options: CacheOptions = {}
): Promise<T> => {
  const { cacheKey = endpoint } = options;

  // Vérifier le cache
  const cachedData = cache.get<T>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Faire la requête
  const response = await api.get<T>(endpoint);
  const data = response.data;

  // Mettre en cache
  cache.set(cacheKey, data);

  return data;
};

export default api;

export const apiService = {
  // Sujets
  getSubjects: () => fetchWithCache<Subject[]>('/subjects'),
  getSubject: (id: string) => fetchWithCache<Subject>(`/subjects/${id}`),
  createSubject: (data: SubjectFormData) => api.post<Subject>('/subjects', data),
  updateSubject: (id: string, data: SubjectFormData) =>
    api.put<Subject>(`/subjects/${id}`, data),
  deleteSubject: (id: string) => api.delete(`/subjects/${id}`),

  // Soumissions
  getSubmissions: (params?: SubmissionParams) =>
    fetchWithCache<Submission[]>('/submissions', {
      cacheKey: `/submissions?${new URLSearchParams(params as Record<string, string>).toString()}`,
    }),
  getSubmission: (id: string) => fetchWithCache<Submission>(`/submissions/${id}`),
  createSubmission: (data: SubmissionFormData) =>
    api.post<Submission>('/submissions', data),
  updateSubmission: (id: string, data: SubmissionFormData) =>
    api.put<Submission>(`/submissions/${id}`, data),
  correctSubmission: (id: string, data: CorrectionFormData) =>
    api.post<Submission>(`/submissions/${id}/correct`, data),

  // Résultats
  getResults: (params?: ResultParams) =>
    fetchWithCache<Result[]>('/results', {
      cacheKey: `/results?${new URLSearchParams(params as Record<string, string>).toString()}`,
    }),

  // Utilisateurs
  getProfile: () => fetchWithCache<User>('/users/profile'),
  updateProfile: (data: ProfileFormData) =>
    api.put<User>('/users/profile', data),
};

// Types
interface Subject {
  id: string;
  title: string;
  description: string;
  submissionsCount: number;
  averageScore: number;
}

interface SubjectFormData {
  title: string;
  description: string;
}

interface Submission {
  id: string;
  subjectId: string;
  studentId: string;
  content: string;
  status: 'pending' | 'corrected';
  score?: number;
  feedback?: string;
  createdAt: string;
}

interface SubmissionParams {
  status?: string;
  subjectId?: string;
  studentId?: string;
}

interface SubmissionFormData {
  subjectId: string;
  content: string;
}

interface CorrectionFormData {
  score: number;
  feedback: string;
}

interface Result {
  id: string;
  submissionId: string;
  studentName: string;
  subjectTitle: string;
  score: number;
  feedback: string;
  submittedAt: string;
}

interface ResultParams {
  subjectId?: string;
  studentId?: string;
  startDate?: string;
  endDate?: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  submissionsCount: number;
  averageScore: number;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
}