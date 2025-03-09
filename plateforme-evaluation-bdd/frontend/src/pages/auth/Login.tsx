import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Connexion réussie !');
    } catch (error) {
      toast.error('Identifiants invalides');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <LogIn className="mx-auto h-12 w-12 text-primary-600" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Bienvenue</h2>
        <p className="mt-2 text-sm text-gray-600">
          Connectez-vous à votre compte
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email', { required: 'L\'email est requis' })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            {...register('password', { required: 'Le mot de passe est requis' })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-primary-600 px-4 py-2 text-white font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
          S'inscrire
        </Link>
      </p>
    </div>
  );
};

export default Login;