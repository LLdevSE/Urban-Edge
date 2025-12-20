import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const propertyService = {
  getAll: () => api.get('/properties'),
  getById: (id: string) => api.get(`/properties/${id}`),
};

export const projectService = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
};

export const inquiryService = {
  create: (data: any) => api.post('/inquiries', data),
  getAll: () => api.get('/inquiries'),
};

export const userService = {
  getAll: () => api.get('/users'),
  delete: (id: string) => api.delete(`/users/${id}`),
};

export default api;
