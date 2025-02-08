import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  onLoginSuccess: (token: string) => void; 
}

const Register: React.FC<RegisterProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/register', { email, password });
      if (response.status !== 200) {
        throw new Error('Failed to register');
      }
      alert('User created successfully!');

      // Automatically log in after registration:
      const loginRes = await apiClient.post('/login', { email, password });
      const token = loginRes.data.access_token;
      localStorage.setItem('accessToken', token);
      onLoginSuccess(token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.detail || 'Registration failed. Please try again.');
      } else if (error instanceof Error) {
        setError(error.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Navigate back to the landing page
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${loading ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;