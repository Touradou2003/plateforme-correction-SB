import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormInput } from '../../components/common/FormInput';
import { AnimatedList } from '../../components/common/AnimatedList';
import { Pagination } from '../../components/common/Pagination';
import { useNotification } from '../../hooks/useNotification';

interface Submission {
  id: string;
  studentName: string;
  subjectTitle: string;
  content: string;
  submittedAt: string;
  status: 'pending' | 'corrected';
  score?: number;
  feedback?: string;
}

export const Submissions: React.FC = () => {
  const { addNotification } = useNotification();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    // Simuler le chargement des soumissions
    const mockSubmissions: Submission[] = [
      {
        id: '1',
        studentName: 'Étudiant 1',
        subjectTitle: 'Sujet 1',
        content: 'Contenu de la soumission 1',
        submittedAt: '2024-01-01',
        status: 'pending',
      },
      {
        id: '2',
        studentName: 'Étudiant 2',
        subjectTitle: 'Sujet 2',
        content: 'Contenu de la soumission 2',
        submittedAt: '2024-01-02',
        status: 'corrected',
        score: 75,
        feedback: 'Bon travail, mais peut être amélioré.',
      },
    ];
    setSubmissions(mockSubmissions);
    setTotalPages(1);
    setIsLoading(false);
  }, []);

  const handleCorrect = (submission: Submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score || 0);
    setFeedback(submission.feedback || '');
  };

  const handleSubmitCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    // TODO: Implémenter la soumission de la correction
    console.log('Correction soumise:', {
      submissionId: selectedSubmission.id,
      score,
      feedback,
    });

    setSelectedSubmission(null);
  };

  const handleCreateSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createSubmission(newSubmission);
      addNotification({
        type: 'success',
        message: 'Soumission créée avec succès',
      });
      setNewSubmission({ subjectId: '', studentId: '', content: '' });
      fetchSubmissions();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Erreur lors de la création de la soumission',
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
      className="max-w-7xl mx-auto p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Correction des soumissions</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Étudiant
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Sujet
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatedList
                items={submissions}
                renderItem={(submission) => (
                  <tr key={submission.id}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {submission.studentName}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <div className="text-sm text-gray-500">
                        {submission.subjectTitle}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          submission.status === 'corrected'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {submission.status === 'corrected' ? 'Corrigé' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleCorrect(submission)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Corriger
                      </button>
                    </td>
                  </tr>
                )}
              />
            </tbody>
          </table>
        </div>

        {selectedSubmission && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Correction de {selectedSubmission.studentName}
            </h2>
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-medium mb-2">Contenu de la soumission</h3>
              <p className="text-sm sm:text-base text-gray-600">{selectedSubmission.content}</p>
            </div>
            <form onSubmit={handleSubmitCorrection} className="space-y-4">
              <FormInput
                label="Note"
                type="number"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm sm:text-base"
              >
                Soumettre la correction
              </button>
            </form>
          </div>
        )}
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