import React, { useState, useEffect } from 'react';
import { useNotification } from '../../hooks/useNotification';
import { apiService } from '../../services/api';
import FormInput from '../../components/common/FormInput';
import AnimatedList from '../../components/common/AnimatedList';
import Pagination from '../../components/common/Pagination';

interface Evaluation {
  id: string;
  submissionId: string;
  evaluatorId: string;
  score: number;
  feedback: string;
  evaluatedAt: string;
}

const Evaluations: React.FC = () => {
  const { addNotification } = useNotification();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newEvaluation, setNewEvaluation] = useState({
    submissionId: '',
    evaluatorId: '',
    score: 0,
    feedback: '',
  });

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const response = await apiService.getEvaluations();
      setEvaluations(response.data);
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Erreur lors du chargement des évaluations',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createEvaluation(newEvaluation);
      addNotification({
        type: 'success',
        message: 'Évaluation créée avec succès',
      });
      setNewEvaluation({ submissionId: '', evaluatorId: '', score: 0, feedback: '' });
      fetchEvaluations();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Erreur lors de la création de l\'évaluation',
      });
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des évaluations</h1>
      
      <form onSubmit={handleCreateEvaluation} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="ID de la soumission"
            value={newEvaluation.submissionId}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, submissionId: e.target.value })}
            required
          />
          <FormInput
            label="ID de l'évaluateur"
            value={newEvaluation.evaluatorId}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, evaluatorId: e.target.value })}
            required
          />
          <FormInput
            label="Note"
            type="number"
            min="0"
            max="100"
            value={newEvaluation.score}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, score: Number(e.target.value) })}
            required
          />
          <FormInput
            label="Commentaire"
            value={newEvaluation.feedback}
            onChange={(e) => setNewEvaluation({ ...newEvaluation, feedback: e.target.value })}
            required
            multiline
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Créer une évaluation
        </button>
      </form>

      <AnimatedList
        items={evaluations}
        renderItem={(evaluation) => (
          <div key={evaluation.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold">Évaluation #{evaluation.id}</h3>
            <p className="text-gray-600">Note: {evaluation.score}/100</p>
            <p className="text-gray-600">{evaluation.feedback}</p>
            <p className="text-sm text-gray-500">
              Évalué le: {new Date(evaluation.evaluatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(evaluations.length / 10)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Evaluations; 