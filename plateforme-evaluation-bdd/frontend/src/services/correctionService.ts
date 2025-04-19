import { api } from './api';

export interface Correction {
  id: string;
  submissionId: string;
  correctorId: string;
  correctorName: string;
  score: number;
  feedback: string;
  createdAt: string;
}

export interface CreateCorrectionDto {
  submissionId: string;
  score: number;
  feedback: string;
}

export interface UpdateCorrectionDto {
  score?: number;
  feedback?: string;
}

export const correctionService = {
  async getAll(page = 1, limit = 10) {
    const response = await api.get<{ data: Correction[]; total: number }>(
      `/corrections?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Correction>(`/corrections/${id}`);
    return response.data;
  },

  async create(data: CreateCorrectionDto) {
    const response = await api.post<Correction>('/corrections', data);
    return response.data;
  },

  async update(id: string, data: UpdateCorrectionDto) {
    const response = await api.patch<Correction>(`/corrections/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/corrections/${id}`);
  },

  async getBySubmission(submissionId: string) {
    const response = await api.get<Correction>(`/submissions/${submissionId}/correction`);
    return response.data;
  },

  async getByCorrector(correctorId: string, page = 1, limit = 10) {
    const response = await api.get<{ data: Correction[]; total: number }>(
      `/correctors/${correctorId}/corrections?page=${page}&limit=${limit}`
    );
    return response.data;
  },
}; 