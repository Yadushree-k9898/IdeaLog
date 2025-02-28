

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Fetch all notes
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch notes");
  }
});

// Create a new note
export const createNote = createAsyncThunk("notes/createNote", async ({ noteData, token }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notes`, noteData, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to create note");
  }
});

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ noteId, noteData, token }, { rejectWithValue }) => {
    try {
      console.log(`🟡 Updating note with ID: ${noteId}`, noteData);

      const response = await axios.put(`${API_BASE_URL}/notes/${noteId}`, noteData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      console.log("✅ Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Update error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to update note");
    }
  }
);



export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ noteId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Delete Response:", response.data);
      return noteId; // Ensure this is the correct response
    } catch (error) {
      console.error("❌ Delete Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to delete note");
    }
  }
);

