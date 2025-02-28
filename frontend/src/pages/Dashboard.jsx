import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import Recorder from "../components/Recorder";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import {
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../features/notes/notesThunks";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  const token = user?.token || localStorage.getItem("token");

  console.log("Token from auth:", token);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    audio: null,
    id: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchNotes(token));
    }
  }, [dispatch, token]);

  
  const handleSave = () => {
    if (!newNote.content.trim()) {
      alert("Please enter a note before saving!");
      return;
    }
  
    const noteData = {
      title: "New Note", // Optional title
      content: newNote.content,
      audio: newNote.audio || null, // Ensure audio is optional
      createdAt: new Date().toISOString(),
    };
  
    dispatch(createNote({ noteData, token }))
      .unwrap()
      .then(() => {
        setNewNote({ title: "", content: "", audio: null }); // Reset input field
      })
      .catch((error) => {
        console.error("Error saving note:", error);
        alert("Failed to save note.");
      });
  };
  


  //   if (!newNote.content && !newNote.audio) {
  //     alert("Please enter text or record audio!");
  //     return;
  //   }

  //   dispatch(createNote({ noteData: newNote, token }));
  //   setNewNote({ title: "", content: "", audio: null, id: null });
  // };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleDelete = async (noteId) => {
    console.log("Attempting to delete note with ID:", noteId);
    console.log("Token before delete request:", token);

    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await dispatch(deleteNote({ noteId, token })).unwrap();
        console.log("✅ Note deleted successfully.");
      } catch (error) {
        console.error("❌ Error deleting note:", error);
        alert(error || "Failed to delete note.");
      }
    }
  };

  const handleManualSave = (manualNote) => {
    if (editingNote) {
      dispatch(
        updateNote({ noteId: editingNote._id, noteData: manualNote, token })
      );
    } else {
      dispatch(createNote({ noteData: manualNote, token }));
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleUpdate = ({ transcript, audioBlob }) => {
    setNewNote((prev) => {
      if (prev.audio) {
        URL.revokeObjectURL(prev.audio); // Clean up previous audio URL
      }
      return {
        ...prev,
        content: transcript || prev.content,
        audio: audioBlob ? URL.createObjectURL(audioBlob) : prev.audio,
        createdAt: new Date().toISOString(),
      };
    });
  };
  

  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 bg-white shadow-sm sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-purple-600">AI Notes</h1>
          <button
            onClick={() => {
              setEditingNote(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Manual Note
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newNote.content}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Type your note here..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <Recorder onUpdate={handleUpdate} />
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {loading && <p>Loading notes...</p>}
        {error && <p>Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleManualSave}
        initialData={editingNote}
      />
    </div>
  );
};

export default Dashboard;
