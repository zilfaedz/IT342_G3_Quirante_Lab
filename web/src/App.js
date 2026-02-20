import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import AuthLayout from './components/AuthLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <div className="content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Resident', 'Barangay Official', 'Barangay Captain', 'Responder', 'City Admin', 'System Admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={['Resident', 'Barangay Official', 'Barangay Captain', 'Responder', 'City Admin', 'System Admin']}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/unauthorized"
                element={
                  <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1>403 - Forbidden</h1>
                    <p>You do not have permission to view this page.</p>
                    <a href="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Return to Home</a>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
