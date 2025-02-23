

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/notes"; // Ensure this is set in .env

// Function to create headers for authenticated requests
const getHeaders = (token, isFormData = false) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
  },
});

// Get all notes
export const getNotes = async (token) => {
  try {
    const response = await axios.get(API_URL, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error.response?.data || error.message);
    throw error;
  }
};

// Get a single note by ID
export const getNoteById = async (token, noteId) => {
  try {
    const response = await axios.get(`${API_URL}/${noteId}`, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error(`Error fetching note ${noteId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Create a new note (supports text, image, and audio)
export const createNote = async (token, noteData) => {
  try {
    const response = await axios.post(API_URL, noteData, getHeaders(token, true));
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (token, noteId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${noteId}`, updatedData, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error(`Error updating note ${noteId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (token, noteId) => {
  try {
    const response = await axios.delete(`${API_URL}/${noteId}`, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error(`Error deleting note ${noteId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Search notes by keyword
export const searchNotes = async (token, keyword) => {
  try {
    const response = await axios.get(`${API_URL}/search?keyword=${encodeURIComponent(keyword)}`, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error searching notes:", error.response?.data || error.message);
    throw error;
  }
};
