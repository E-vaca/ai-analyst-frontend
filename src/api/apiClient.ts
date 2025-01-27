import axios from 'axios';

// Base URL for your backend (replace with your backend URL)
const API_BASE_URL_DEV = import.meta.env.VITE_API_BASE_URL_DEV;

const apiClient = axios.create({
  baseURL: API_BASE_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000, // Optional: timeout for requests
});

export default apiClient;