import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserPlus } from 'lucide-react';
import { authService } from '../../services/authService';

interface RegisterForm {
  nom: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'professor';
}

const Register: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      console.log('Submitting registration data:', data);
      await authService.register(data.nom, data.email, data.password, data.role);
      toast.success('Inscription réussie ! Veuillez vous connecter.');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('L\'inscription a échoué. Veuillez réessayer.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <UserPlus className="mx-auto h-12 w-12 text-primary-600" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Créer un compte</h2>
        <p className="mt-2 text-sm text-gray-600">
          Rejoignez la plateforme d'évaluation DB
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom complet
          </label>
          <input
            type="text"
            {...register('nom', { required: 'Le nom est requis' })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {errors.nom && (
            <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
          )}
        </div>

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
            {...register('password', { 
              required: 'Le mot de passe est requis',
              minLength: {
                value: 8,
                message: 'Le mot de passe doit contenir au moins 8 caractères'
              }
            })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Veuillez confirmer votre mot de passe',
              validate: value => value === password || 'Les mots de passe ne correspondent pas'
            })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rôle
          </label>
          <select
            {...register('role', { required: 'Veuillez sélectionner un rôle' })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="student">Étudiant</option>
            <option value="professor">Professeur</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-primary-600 px-4 py-2 text-white font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Création du compte...' : 'Créer un compte'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Vous avez déjà un compte ?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Register;