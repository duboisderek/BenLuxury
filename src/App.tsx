import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CRMLayout from './components/crm/CRMLayout';

// Public pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

// CRM pages
import Login from './pages/crm/Login';
import Dashboard from './pages/crm/Dashboard';
import Clients from './pages/crm/Clients';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* CRM routes */}
          <Route path="/crm/login" element={<Login />} />
          <Route path="/crm/*" element={<CRMRoutes />} />
          
          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const CRMRoutes: React.FC = () => {
  return (
    <CRMLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="appointments" element={<div>Appointments - Coming Soon</div>} />
        <Route path="settings" element={<div>Settings - Coming Soon</div>} />
        <Route path="*" element={<Navigate to="/crm/dashboard" replace />} />
      </Routes>
    </CRMLayout>
  );
};

export default App;