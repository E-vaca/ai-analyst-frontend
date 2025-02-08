import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Welcome to the AI Analyst App
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Analyze stocks with advanced AI-based recommendations!
      </p>
      <div>
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
        >
          Login
        </button>
        <button
          onClick={handleRegisterClick}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Landing;