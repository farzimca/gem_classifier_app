import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import FavoriteImagesPage from './pages/FavoriteImagesPage';
import NotFoundPage from './pages/NotFoundPage';
import { LogoutPage } from './pages/LogoutPage';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ResetPassword from './pages/ResetPassword';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { Toaster } from 'sonner';
import AmethystPage from './pages/Gems/AmethystPage';
import EmeraldPage from './pages/Gems/EmeraldPage'
import OnyxBlackPage from './pages/Gems/OnyxBlackPage'
import RubyPage from './pages/Gems/RubyPage'
import SapphireBluePage from './pages/Gems/SapphireBluePage'
import SapphireYellowPage from './pages/Gems/SapphireYellowPage'
import TurquoisePage from './pages/Gems/TurquoisePage'


// ... other imports

function App() {
  return (
    <Router>
      <ScrollToTop />
       <Toaster 
       visibleToasts={1}
        theme="light" 
        position="bottom-right"
        richColors
        toastOptions={{
          success: {
            style: {
              background: '#D9F99D', // Tailwind's lime-200
              color: '#15803D',      // Tailwind's green-700
              border: '1px solid #15803D' // Distinct border for success
            },
            className: 'success-toast'
          },
          error: {
            style: {
              background: '#E5E7EB', // Tailwind's red-300
              color: '#B91C1C',      // Tailwind's red-700
              border: '1px solid #B91C1C' // Distinct border for error
            },
            className: 'error-toast'
          },
          // You can add styles for other types like 'info' or 'warning' as well.
        }}
      />
      <Routes>
        {/* Public Routes - Accessible to all */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Public Routes - Accessible to UNauthenticated users only */}
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

        {/* Protected Routes - Accessible to AUTHENTICATED users only */}
        <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><Layout><EditProfile /></Layout></ProtectedRoute>} />
        <Route path="/favorite-gems" element={<ProtectedRoute><Layout><FavoriteImagesPage /></Layout></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><LogoutPage /></ProtectedRoute>} />

        {/* Pages for gems*/}
        <Route path="gemstone/amethyst" element={<ProtectedRoute><Layout><AmethystPage /></Layout></ProtectedRoute>} />
        <Route path="gemstone/emerald" element={<ProtectedRoute><Layout><EmeraldPage /></Layout></ProtectedRoute>} />
        <Route path="gemstone/onyxblack" element={<ProtectedRoute><Layout><OnyxBlackPage /></Layout></ProtectedRoute>} />
        <Route path="gemstone/ruby" element={<ProtectedRoute><Layout><RubyPage /></Layout></ProtectedRoute>} />
        <Route path="gemstone/sapphireblue" element={<ProtectedRoute><Layout><SapphireBluePage /></Layout></ProtectedRoute>} />
        <Route path="gemstone/sapphireyellow" element={<ProtectedRoute><Layout><SapphireYellowPage /></Layout></ProtectedRoute>} />
        <Route path="gemstone/turquoise" element={<ProtectedRoute><Layout><TurquoisePage /></Layout></ProtectedRoute>} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;