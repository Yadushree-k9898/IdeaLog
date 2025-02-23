
import { createSlice } from "@reduxjs/toolkit";
import { fetchNotes, createNote } from "./notesThunks";

const notesSlice = createSlice({
  name: "notes",
  initialState: { notes: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      });
  },
});

export default notesSlice.reducer;
