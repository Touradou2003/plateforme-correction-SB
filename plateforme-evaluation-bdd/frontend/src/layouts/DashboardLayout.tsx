import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, LogOut, Database, Users, BarChart3 } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 w-64`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-primary-600">DB Eval</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600"
          >
            <BarChart3 size={20} />
            <span>Tableau de bord</span>
          </a>
          <a
            href="/exercises"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600"
          >
            <Database size={20} />
            <span>Exercices</span>
          </a>
          {user?.role === 'professor' && (
            <a
              href="/students"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600"
            >
              <Users size={20} />
              <span>Étudiants</span>
            </a>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center mb-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;