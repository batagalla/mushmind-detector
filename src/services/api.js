
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
  getUsers: () => api.get('/admin/users'), // Admin endpoint to get all users
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
  getRecentSearches: () => api.get('/images/recent'), // Get recent searches
  deleteImage: (id) => api.delete(`/images/${id}`), // Delete an image
};

// Feedback API services
export const feedbackAPI = {
  submitFeedback: (feedbackData) => api.post('/feedback', feedbackData),
  getUserFeedback: () => api.get('/feedback/user'),
  getImageFeedback: (imageId) => api.get(`/feedback/image/${imageId}`),
  getAllFeedback: () => api.get('/admin/feedback'), // Admin endpoint to get all feedback
  updateFeedbackStatus: (id, status) => api.patch(`/admin/feedback/${id}`, { status }),
  deleteFeedback: (id) => api.delete(`/admin/feedback/${id}`),
};

// Admin API services
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/stats'),
  updateModelSettings: (settings) => api.post('/admin/settings/model', settings),
  getModelSettings: () => api.get('/admin/settings/model'),
  getSystemSettings: () => api.get('/admin/settings/system'),
  updateSystemSettings: (settings) => api.post('/admin/settings/system', settings),
};

export default api;
