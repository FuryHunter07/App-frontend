import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5000/api'; // Update if backend is deployed

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include JWT token in requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signup = (email, password) =>
  api.post('/users/signup', { email, password });

export const login = (email, password) =>
  api.post('/users/login', { email, password });

export const createTask = (taskData) => api.post('/tasks', taskData);

export const getTasks = () => api.get('/tasks');

export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;