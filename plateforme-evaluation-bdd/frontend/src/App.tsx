import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContainer } from './components/common/NotificationContainer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NotificationContainer />
        <Routes>
          {/* Redirection de la racine vers la page de connexion */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirection des routes inconnues vers la page de connexion */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;