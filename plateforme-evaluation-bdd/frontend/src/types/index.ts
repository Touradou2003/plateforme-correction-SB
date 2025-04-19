export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  deadline: string;
  createdAt: string;
  createdBy: string;
}

export interface Submission {
  id: string;
  subjectId: string;
  userId: string;
  content: string;
  files?: string[];
  status: 'pending' | 'submitted' | 'corrected';
  note?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 