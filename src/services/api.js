import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
  //withCredentials: true // If using cookies for auth
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Assuming you store the JWT in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;