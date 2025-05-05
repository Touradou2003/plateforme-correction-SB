import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiService } from '../services/api';
import { Subject, Submission } from '../types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import AnimatedList from '../components/common/AnimatedList';
import Pagination from '../components/common/Pagination';
import { useNotification } from '../hooks/useNotification';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ITEMS_PER_PAGE = 5;

const Dashboard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state: any) => state.auth.user);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, submissionsRes] = await Promise.all([
          apiService.getSubjects(),
          apiService.getSubmissions(),
        ]);
        setSubjects(subjectsRes);
        setSubmissions(submissionsRes);
      } catch (error) {
        addNotification(
          'error',
          'Erreur lors du chargement des données',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addNotification]);

  const paginatedSubjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return subjects.slice(start, start + ITEMS_PER_PAGE);
  }, [subjects, currentPage]);

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return submissions.slice(start, start + ITEMS_PER_PAGE);
  }, [submissions, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(Math.max(subjects.length, submissions.length) / ITEMS_PER_PAGE);
  }, [subjects.length, submissions.length]);

  const averageScore = useMemo(() => {
    if (submissions.length === 0) return 0;
    return (submissions.reduce((acc, sub) => acc + (sub.note || 0), 0) / submissions.length).toFixed(1);
  }, [submissions]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  const pieData = {
    labels: ['Terminés', 'En cours', 'Non commencés'],
    datasets: [
      {
        data: [12, 5, 3],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  const barData = {
    labels: ['Bases SQL', 'Jointures', 'Agrégations', 'Sous-requêtes', 'Index'],
    datasets: [
      {
        label: 'Score moyen',
        data: [85, 76, 82, 68, 90],
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Sujets disponibles</h3>
          <p className="text-3xl font-bold">{subjects.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Soumissions</h3>
          <p className="text-3xl font-bold">{submissions.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Moyenne</h3>
          <p className="text-3xl font-bold">{averageScore}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Derniers sujets</h2>
          <AnimatedList
            items={paginatedSubjects}
            renderItem={(subject: Subject) => (
              <div className="p-4 border-b last:border-b-0">
                <h3 className="font-medium">{subject.title}</h3>
                <p className="text-sm text-gray-600">{subject.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Date limite: {new Date(subject.deadline).toLocaleDateString()}
                </p>
              </div>
            )}
            className="bg-white rounded-lg shadow overflow-hidden"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Dernières soumissions</h2>
          <AnimatedList
            items={paginatedSubmissions}
            renderItem={(submission: Submission) => (
              <div className="p-4 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {subjects.find((s) => s.id === submission.subjectId)?.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === 'corrected'
                        ? 'bg-green-100 text-green-800'
                        : submission.status === 'submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
                {submission.note && (
                  <p className="text-sm text-gray-600">Note: {submission.note}/20</p>
                )}
              </div>
            )}
            className="bg-white rounded-lg shadow overflow-hidden"
          />
        </div>
      </div>

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progression des exercices</h3>
            <div className="h-64">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm md:col-span-2"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance par thème</h3>
            <div className="h-64">
              <Bar
                data={barData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total des exercices</h3>
            <p className="text-3xl font-bold text-primary-600">20</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Terminés</h3>
            <p className="text-3xl font-bold text-green-600">12</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Score moyen</h3>
            <p className="text-3xl font-bold text-yellow-600">85%</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);