import { toast } from 'react-toastify';

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

export const handleApiError = (error: ApiError) => {
  const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Une erreur est survenue';

  switch (error.response?.status) {
    case 401:
      // Redirection vers la page de connexion
      window.location.href = '/login';
      break;
    case 403:
      toast.error('Accès non autorisé');
      break;
    case 404:
      toast.error('Ressource non trouvée');
      break;
    case 500:
      toast.error('Erreur serveur');
      break;
    default:
      toast.error(errorMessage);
  }

  // Log l'erreur en développement
  if (import.meta.env.DEV) {
    console.error('Erreur API:', error);
  }
};

export const handleNetworkError = () => {
  toast.error('Erreur de connexion. Vérifiez votre connexion internet.');
};

export const handleValidationError = (errors: Record<string, string[]>) => {
  Object.values(errors).forEach((errorMessages) => {
    errorMessages.forEach((message) => {
      toast.error(message);
    });
  });
}; 