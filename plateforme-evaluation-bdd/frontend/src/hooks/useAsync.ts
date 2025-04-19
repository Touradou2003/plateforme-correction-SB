import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useAsync = <T>() => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (promise: Promise<T>) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await promise;
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error('Une erreur est survenue'),
        });
        throw error;
      }
    },
    []
  );

  return {
    ...state,
    execute,
  };
}; 