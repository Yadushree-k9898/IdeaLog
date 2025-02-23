import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  notes: [],
  
  setUser: (user) => set({ user }),
  setNotes: (notes) => set({ notes }),
  
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      ),
    })),
  deleteNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== noteId),
    })),
}));

export default useStore;
