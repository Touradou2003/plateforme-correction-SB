import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedList from '../../components/common/AnimatedList';
import Pagination from '../../components/common/Pagination';
import { useNotification } from '../../hooks/useNotification';
import { apiService } from '../../services/api';
import FormInput from '../../components/common/FormInput';

interface Subject {
  id: string;
  title: string;
  description: string;
  deadline: string;
}

export const Subjects: React.FC = () => {
  const { addNotification } = useNotification();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [newSubject, setNewSubject] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await apiService.getSubjects();
      setSubjects(response.data);
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Erreur lors du chargement des sujets',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    // TODO: Implémenter la suppression
    console.log('Supprimer le sujet:', id);
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createSubject(newSubject);
      addNotification({
        type: 'success',
        message: 'Sujet créé avec succès',
      });
      setNewSubject({ title: '', description: '', deadline: '' });
      fetchSubjects();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Erreur lors de la création du sujet',
      });
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Gestion des sujets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
        >
          Ajouter un sujet
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Description
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date limite
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatedList
              items={subjects}
              renderItem={(subject: Subject) => (
                <tr key={subject.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {subject.title}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                    <div className="text-sm text-gray-500">
                      {subject.description}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(subject.deadline).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(subject)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            />
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </motion.div>
  );
}; 