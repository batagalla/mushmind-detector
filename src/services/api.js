
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
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

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    
    // Handle unauthorized errors (401)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/auth') {
        toast.error('Session expired. Please log in again.');
        window.location.href = '/auth';
      }
    }
    
    // Handle server errors (500)
    if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile')
};

// Image API calls
export const imageAPI = {
  uploadImage: (formData) => {
    return api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  classifyImage: (imageId) => api.post(`/images/${imageId}/classify`),
  getUserImages: () => api.get('/images/user'),
  getImageById: (imageId) => api.get(`/images/${imageId}`),
  getSearchHistory: () => api.get('/images/search-history')
};

// Feedback API calls
export const feedbackAPI = {
  submitFeedback: (feedbackData) => api.post('/feedback', feedbackData),
  getUserFeedback: () => api.get('/feedback/user'),
  getImageFeedback: (imageId) => api.get(`/feedback/image/${imageId}`)
};

// Admin API calls
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getAllFeedback: () => api.get('/admin/feedback'),
  reviewFeedback: (feedbackId) => api.put(`/admin/feedback/${feedbackId}/review`),
  updateUserRole: (userId, role) => api.put(`/admin/users/${userId}/role`, { role })
};

export default api;
