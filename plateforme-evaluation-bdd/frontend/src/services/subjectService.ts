import { api } from './api';

export interface Subject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  submissionsCount: number;
  averageScore: number;
}

export interface CreateSubjectDto {
  title: string;
  description: string;
}

export interface UpdateSubjectDto {
  title?: string;
  description?: string;
}

export const subjectService = {
  async getAll(page = 1, limit = 10) {
    const response = await api.get<{ data: Subject[]; total: number }>(
      `/subjects?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Subject>(`/subjects/${id}`);
    return response.data;
  },

  async create(data: CreateSubjectDto) {
    const response = await api.post<Subject>('/subjects', data);
    return response.data;
  },

  async update(id: string, data: UpdateSubjectDto) {
    const response = await api.patch<Subject>(`/subjects/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/subjects/${id}`);
  },

  async getSubmissions(id: string, page = 1, limit = 10) {
    const response = await api.get<{ data: any[]; total: number }>(
      `/subjects/${id}/submissions?page=${page}&limit=${limit}`
    );
    return response.data;
  },
}; 