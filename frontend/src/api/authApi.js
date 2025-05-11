import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/auth"; // Ensure it dynamically picks the backend URL

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Update User
export const updateUser = async (token, updatedData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/update`, updatedData, config);
  return response.data;
};

// Delete User
export const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/delete`, config);
  return response.data;
};
