import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/notes"; // Uses the backend URL from .env

// Get all notes
export const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get a single note by ID
export const getNoteById = async (token, noteId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${noteId}`, config);
  return response.data;
};

// Create a note (supports text, image, and audio)
export const createNote = async (token, noteData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(API_URL, noteData, config);
  return response.data;
};

// Update a note
export const updateNote = async (token, noteId, updatedData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${noteId}`, updatedData, config);
  return response.data;
};

// Delete a note
export const deleteNote = async (token, noteId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${noteId}`, config);
  return response.data;
};

// Search notes
export const searchNotes = async (token, keyword) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/search?keyword=${keyword}`, config);
  return response.data;
};
