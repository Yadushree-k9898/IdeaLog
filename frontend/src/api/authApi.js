import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, userData);
  return response.data;
};

// Update User
export const updateUser = async (token, updatedData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/api/auth/update`, updatedData, config);
  return response.data;
};

// Delete User
export const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/api/auth/delete`, config);
  return response.data;
};
