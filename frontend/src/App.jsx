import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Interests from './pages/Interests';
import ProfileView from './pages/ProfileView';
import Matches from './pages/Matches';
import ComingSoon from './pages/ComingSoon';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Register />} />
          <Route path="/register" element={<Navigate to="/" replace />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/:uniqueId" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/interests" element={<ProtectedRoute><Interests /></ProtectedRoute>} />
          <Route path="/profile-view" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />

          <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />

          <Route path="*" element={<ComingSoon title="Page Not Found" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
