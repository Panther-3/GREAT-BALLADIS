import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';  // Toast notifications
import Header from '@/components/Header';  // Header component
import Footer from '@/components/Footer';  // Footer component

// Public Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import ProjectGallery from '@/pages/ProjectGallery';
import EquipmentGallery from '@/pages/EquipmentGallery';
import ProjectList from '@/pages/ProjectList';

// Admin Pages
import AdminLogin from '@/pages/AdminLogin';  // Admin login page
import AdminDashboard from '@/pages/AdminDashboard';  // Admin dashboard page

// Authentication
import { AuthProvider } from '@/auth/AuthProvider';  // AuthProvider to handle login/logout
import PrivateRoute from '@/auth/PrivateRoute';  // Protect routes with PrivateRoute

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery/projects" element={<ProjectGallery />} />
              <Route path="/gallery/equipment" element={<EquipmentGallery />} />
              <Route path="/gallery/project-list" element={<ProjectList />} />

              {/* Auth Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes (use PrivateRoute to protect these) */}
              <Route element={<PrivateRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* Add additional protected admin routes here */}
              </Route>
            </Routes>
          </main>
          <Footer />
          <Toaster />  {/* Global Toast Notifications */}
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
