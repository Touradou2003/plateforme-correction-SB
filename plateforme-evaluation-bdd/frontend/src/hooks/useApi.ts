import { useCallback } from 'react';
import api from '../services/api';

/**
 * Custom hook providing basic HTTP methods (GET, POST, PUT, DELETE) backed by Axios.
 * Generic T defines the expected response shape for data-returning methods.
 */
export function useApi<T>() {
  /**
   * GET request
   * @param url   The endpoint path (e.g. '/auth/me')
   * @param params Optional query parameters
   */
  const get = useCallback(
    async (url: string, params?: Record<string, any>): Promise<T> => {
      const response = await api.get<T>(url, { params });
      return response.data;
    },
    []
  );

  /**
   * POST request
   * @param url  The endpoint path
   * @param data The request payload
   */
  const post = useCallback(
    async (url: string, data?: any): Promise<T> => {
      const response = await api.post<T>(url, data);
      return response.data;
    },
    []
  );

  /**
   * PUT request
   * @param url  The endpoint path
   * @param data The request payload
   */
  const put = useCallback(
    async (url: string, data?: any): Promise<T> => {
      const response = await api.put<T>(url, data);
      return response.data;
    },
    []
  );

  /**
   * DELETE request
   * @param url The endpoint path
   */
  const remove = useCallback(
    async (url: string): Promise<void> => {
      await api.delete(url);
    },
    []
  );

  return { get, post, put, delete: remove };
}
 