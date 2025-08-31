import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutPage from './pages/AboutPage';
import FavoriteImagesPage from './pages/FavoriteImagesPage';
import TestBackend from './pages/TestBackend';
import Prediction from './components/Prediction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/favorite-images" element={<Layout><FavoriteImagesPage /></Layout>} />
        <Route path="/test" element={<Layout><TestBackend /></Layout>} />
        <Route path="/predict" element={<Prediction/>} />

      </Routes>
    </Router>
  );
}

export default App;