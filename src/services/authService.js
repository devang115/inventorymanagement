import api from './api';

const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('authToken', response.data.token); // Assuming your backend sends a JWT
    return response.data.user; // The logged-in user object
  } catch (error) {
    throw error; 
  }
};

const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    // You might not log the user in automatically after signup
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await api.post('/auth/logout'); // Adjust endpoint
    localStorage.removeItem('authToken');
    // If you're using cookies, clear them here as well
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export default {
  login,
  signup,
  logout,
};