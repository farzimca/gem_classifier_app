import React, { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { token, isLoading } = useAuth(); // Assuming useAuth provides a loading state

  useEffect(() => {
    // If the token is not present and we're done loading, navigate to login
    if (!isLoading && !token) {
      navigate('/login');
    }
  }, [token, isLoading, navigate]); // Add navigate to the dependency array

  if (isLoading) {
    // Optionally render a loading spinner or component while authentication state is being determined
    return <div>Loading...</div>; 
  }

  // If the token exists, render the child components
  return token ? children : null;
}

export default ProtectedRoute;