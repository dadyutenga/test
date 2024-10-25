import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Adjust this to match your Django backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('login/', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('register/', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
