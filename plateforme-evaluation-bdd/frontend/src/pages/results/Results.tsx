import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Result {
  id: string;
  studentName: string;
  subjectTitle: string;
  score: number;
  feedback: string;
  submittedAt: string;
}

export const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    // Simuler le chargement des résultats
    const mockResults: Result[] = [
      {
        id: '1',
        studentName: 'Étudiant 1',
        subjectTitle: 'Sujet 1',
        score: 75,
        feedback: 'Bon travail',
        submittedAt: '2024-01-01',
      },
      {
        id: '2',
        studentName: 'Étudiant 2',
        subjectTitle: 'Sujet 1',
        score: 85,
        feedback: 'Excellent travail',
        submittedAt: '2024-01-02',
      },
      {
        id: '3',
        studentName: 'Étudiant 1',
        subjectTitle: 'Sujet 2',
        score: 65,
        feedback: 'Peut être amélioré',
        submittedAt: '2024-01-03',
      },
    ];
    setResults(mockResults);
    setIsLoading(false);
  }, []);

  const subjects = ['all', ...new Set(results.map((r) => r.subjectTitle))];
  const filteredResults = selectedSubject === 'all'
    ? results
    : results.filter((r) => r.subjectTitle === selectedSubject);

  const chartData = {
    labels: filteredResults.map((r) => r.studentName),
    datasets: [
      {
        label: 'Notes',
        data: filteredResults.map((r) => r.score),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Résultats des étudiants',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
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
        <h1 className="text-2xl font-bold">Résultats</h1>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject === 'all' ? 'Tous les sujets' : subject}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Détails des résultats</h2>
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{result.studentName}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{result.subjectTitle}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      result.score >= 70
                        ? 'bg-green-100 text-green-800'
                        : result.score >= 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.score}%
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-600">{result.feedback}</p>
                <p className="mt-2 text-xs text-gray-400">
                  Soumis le: {new Date(result.submittedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 