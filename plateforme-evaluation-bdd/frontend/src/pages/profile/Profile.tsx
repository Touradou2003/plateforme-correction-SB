import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FormInput } from '../../components/common/FormInput';
import { motion } from 'framer-motion';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  submissionsCount: number;
  averageScore: number;
}

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    // Simuler le chargement des données du profil
    setProfile({
      id: user?.id || '',
      email: user?.email || '',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Enseignant',
      createdAt: '2024-01-01',
      submissionsCount: 25,
      averageScore: 85,
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la mise à jour du profil
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Chargement...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto p-4 sm:p-6"
    >
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Profil</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
          >
            {isEditing ? 'Annuler' : 'Modifier'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Prénom"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <FormInput
              label="Nom"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm sm:text-base"
            >
              Enregistrer les modifications
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Prénom</p>
                <p className="text-sm sm:text-base font-semibold">{profile.firstName}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Nom</p>
                <p className="text-sm sm:text-base font-semibold">{profile.lastName}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Email</p>
                <p className="text-sm sm:text-base font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Rôle</p>
                <p className="text-sm sm:text-base font-semibold">{profile.role}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Statistiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Soumissions corrigées</p>
                  <p className="text-xl sm:text-2xl font-bold">{profile.submissionsCount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Note moyenne</p>
                  <p className="text-xl sm:text-2xl font-bold">{profile.averageScore}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}; 