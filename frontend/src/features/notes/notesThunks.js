
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; // Use .env or fallback

// Fetch Notes
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



export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, { rejectWithValue }) => {
    try {
      console.log("Sending note data:", noteData); // Log the data being sent
      const response = await axios.post("http://localhost:5000/api/notes", noteData, {
        headers: {
          "Content-Type": "application/json",
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
