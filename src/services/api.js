
import axios from 'axios';

// Base API URL - change this to your actual API endpoint in production
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API services
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
};

// Image API services
export const imageAPI = {
  uploadImage: (formData) => {
    return api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getUserImages: () => api.get('/images/user'),
  getImageById: (id) => api.get(`/images/${id}`),
  classifyImage: (id) => api.post(`/images/${id}/classify`),
};

// Feedback API services
export const feedbackAPI = {
  submitFeedback: (feedbackData) => api.post('/feedback', feedbackData),
  getUserFeedback: () => api.get('/feedback/user'),
  getImageFeedback: (imageId) => api.get(`/feedback/image/${imageId}`),
};

export default api;
