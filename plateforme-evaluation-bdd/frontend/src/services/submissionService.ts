import { api } from './api';

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  subjectId: string;
  subjectTitle: string;
  content: string;
  submittedAt: string;
  status: 'pending' | 'corrected';
  score?: number;
  feedback?: string;
}

export interface CreateSubmissionDto {
  subjectId: string;
  content: string;
}

export interface UpdateSubmissionDto {
  content?: string;
}

export interface CorrectionDto {
  score: number;
  feedback: string;
}

export const submissionService = {
  async getAll(page = 1, limit = 10) {
    const response = await api.get<{ data: Submission[]; total: number }>(
      `/submissions?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Submission>(`/submissions/${id}`);
    return response.data;
  },

  async create(data: CreateSubmissionDto) {
    const response = await api.post<Submission>('/submissions', data);
    return response.data;
  },

  async update(id: string, data: UpdateSubmissionDto) {
    const response = await api.patch<Submission>(`/submissions/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/submissions/${id}`);
  },

  async correct(id: string, data: CorrectionDto) {
    const response = await api.post<Submission>(`/submissions/${id}/correct`, data);
    return response.data;
  },

  async getBySubject(subjectId: string, page = 1, limit = 10) {
    const response = await api.get<{ data: Submission[]; total: number }>(
      `/subjects/${subjectId}/submissions?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  async getByStudent(studentId: string, page = 1, limit = 10) {
    const response = await api.get<{ data: Submission[]; total: number }>(
      `/students/${studentId}/submissions?page=${page}&limit=${limit}`
    );
    return response.data;
  },
}; 