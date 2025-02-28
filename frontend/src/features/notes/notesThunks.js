

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Fetch all notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!Array.isArray(response.data)) {
        console.error("Unexpected API response:", response.data);
        return rejectWithValue("Invalid data format from API");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch notes");
    }
  }
);

// Create a new note
export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ noteData, token }, { rejectWithValue }) => {
    try {
      console.log("Sending note data:", noteData);
      const response = await axios.post(`${API_BASE_URL}/notes`, noteData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Note created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating note:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Update an existing note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ noteId, noteData, token }, { rejectWithValue }) => {
    try {
      console.log("Updating note:", noteId, noteData);
      const response = await axios.put(`${API_BASE_URL}/notes/${noteId}`, noteData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Note updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to update note");
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ noteId, token }, { rejectWithValue }) => {
    try {
      console.log("Deleting note:", noteId);
      const response = await axios.delete(`${API_BASE_URL}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Note deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting note:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to delete note");
    }
  }
);

// Fetch a single note by ID
export const fetchNoteById = createAsyncThunk(
  "notes/fetchNoteById",
  async ({ noteId, token }, { rejectWithValue }) => {
    try {
      console.log("Fetching note by ID:", noteId);
      const response = await axios.get(`${API_BASE_URL}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Note fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching note by ID:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch note");
    }
  }
);
