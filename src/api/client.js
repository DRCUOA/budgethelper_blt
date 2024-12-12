import axios from 'axios';

// Create axios instance with default config
const client = axios.create({
  baseURL: '/api', // Your API base URL
  withCredentials: true // Required for cookies
});

// Auth endpoints
export const auth = {
  login: (email, password) => client.post('/auth/login', { email, password }),
  register: (userData) => client.post('/auth/register', userData),
  logout: () => client.post('/auth/logout'),
  getProfile: () => client.get('/auth/profile'),
  updateProfile: (data) => client.put('/auth/profile', data),
  deleteAccount: () => client.delete('/auth/account')
};

// Transactions endpoints
export const transactions = {
  getAll: (filters) => client.get('/transactions', { params: filters }),
  create: (data) => client.post('/transactions', data),
  update: (id, data) => client.put(`/transactions/${id}`, data),
  delete: (id) => client.delete(`/transactions/${id}`),
  import: (data) => client.post('/transactions/import', data)
};

// Categories endpoints
export const categories = {
  getAll: () => client.get('/categories'),
  create: (data) => client.post('/categories', data),
  update: (id, data) => client.put(`/categories/${id}`, data),
  delete: (id) => client.delete(`/categories/${id}`)
};

// Analytics endpoints
export const analytics = {
  getMonthlySummary: (month) => client.get('/analytics/summary', { params: { month } }),
  getCategoryBreakdown: (month) => client.get('/analytics/categories', { params: { month } }),
  getTrends: () => client.get('/analytics/trends')
};

// Response interceptor for handling errors
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;