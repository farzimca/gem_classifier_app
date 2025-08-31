// src/components/PredictPageRouter.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const PredictPageRouter = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run this logic once the authentication status has been determined
    if (!isLoading) {
      if (isLoggedIn) {
        navigate('/user/predict', { replace: true });
      } else {
        navigate('/guest/predict', { replace: true });
      }
    }
  }, [isLoading, isLoggedIn, navigate]);

  // You can return a loading spinner or a simple message while waiting
  return <div className="text-center mt-20">Loading...</div>;
};

export default PredictPageRouter;