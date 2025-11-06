// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import ProjectGallery from '@/pages/ProjectGallery';
import EquipmentGallery from '@/pages/EquipmentGallery';
import ProjectList from '@/pages/ProjectList';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';

// Auth pieces (from previous step)
import { AuthProvider } from '@/auth/AuthProvider';      // adjust path if needed
import PrivateRoute from '@/auth/PrivateRoute';          // adjust path if needed

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery/projects" element={<ProjectGallery />} />
              <Route path="/gallery/equipment" element={<EquipmentGallery />} />
              <Route path="/gallery/project-list" element={<ProjectList />} />

              {/* Auth routes */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected admin routes (uses PrivateRoute) */}
              <Route element={<PrivateRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* Add additional protected admin routes here */}
              </Route>

              {/* Optionally add a 404 route */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
