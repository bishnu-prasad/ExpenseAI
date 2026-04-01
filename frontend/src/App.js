import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import Landing   from './pages/Landing';
import Login     from './pages/Login';
import Signup    from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Pricing   from './pages/Pricing';
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          {/* Public */}
          <Route path="/"       element={<Landing />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Protected */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute><Analytics /></ProtectedRoute>
          } />

          {/* Fallbacks */}
          <Route path="/add-expense" element={<Navigate to="/dashboard" replace />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
