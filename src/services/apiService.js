import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerChampion = (data) => api.post('/api/champions', data);
export const updateChampionTraining = (id, data) => api.patch(`/api/champions/${id}/training`, data);
export const logCheckIn = (data) => api.post('/api/check-ins', data);
export const createReferral = (data) => api.post('/api/referrals', data);

export default api;
