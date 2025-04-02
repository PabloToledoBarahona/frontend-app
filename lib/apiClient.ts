import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/auth', // Prueto del backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export default apiClient;