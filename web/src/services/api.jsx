import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Reports
export const getReports = () => api.get('/reports');
export const submitReport = (formData) => api.post('/reports', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Dashboard Data
export const getDashboardData = () => api.get('/dashboard/data');

export default api;
