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

// Interceptor to attach a token (if any) from localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // In case of request setup error
    return Promise.reject(error);
  }
);

export default apiClient;