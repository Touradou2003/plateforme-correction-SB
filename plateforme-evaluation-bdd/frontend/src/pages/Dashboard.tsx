import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard: React.FC = () => {
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
  );
};

export default Dashboard;