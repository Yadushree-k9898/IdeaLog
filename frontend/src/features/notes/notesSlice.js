
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchNotes, createNote } from "./notesThunks";

// const notesSlice = createSlice({
//   name: "notes",
//   initialState: { notes: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNotes.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchNotes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notes = action.payload;
//       })
//       .addCase(fetchNotes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(createNote.fulfilled, (state, action) => {
//         state.notes.push(action.payload);
//       });
//   },
// });

// export default notesSlice.reducer;








// import { createSlice } from "@reduxjs/toolkit";
// import { fetchNotes, createNote, deleteNote, updateNote } from "./notesThunks";

// const notesSlice = createSlice({
//   name: "notes",
//   initialState: {
//     notes: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNotes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNotes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notes = action.payload;
//       })
//       .addCase(fetchNotes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(createNote.fulfilled, (state, action) => {
//         state.notes.push(action.payload); // Add the new note
//       })
//       .addCase(deleteNote.fulfilled, (state, action) => {
//         state.notes = state.notes.filter((note) => note.id !== action.payload); // Remove deleted note
//       })
//       .addCase(updateNote.fulfilled, (state, action) => {
//         const index = state.notes.findIndex((note) => note.id === action.payload.id);
//         if (index !== -1) {
//           state.notes[index] = action.payload;
//         }
//       });
//   },
// });

// export default notesSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import { fetchNotes, createNote, deleteNote, updateNote } from "./notesThunks";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload); // Ensure `_id` is used
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      });
  },
});

export default notesSlice.reducer;
