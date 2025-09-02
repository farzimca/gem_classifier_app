import React, { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

// A custom loading spinner component with a larger pentagon gem theme
const GemxSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center justify-center space-y-4">
      <svg 
        className="animate-spin h-16 w-16 text-purple-600" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      >
        <polygon points="12 2 22 9 18 22 6 22 2 9" />
      </svg>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  </div>
);

function PublicRoute({ children }) {
  const navigate = useNavigate();
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && token) {
      navigate('/');
    }
  }, [token, isLoading, navigate]);

  if (isLoading) {
    // Render the custom GEMX spinner component here
    return <GemxSpinner />;
  }

  return token ? null : children;
}

export default PublicRoute;