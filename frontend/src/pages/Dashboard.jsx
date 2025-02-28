
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import Recorder from "../components/Recorder";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import { fetchNotes, createNote } from "../features/notes/notesThunks"; // Adjust path as needed

const Dashboard = () => {
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  // Retrieve token from auth state or fallback to localStorage
  const token = user?.token || localStorage.getItem("token");

  // Log token to ensure it's valid
  console.log("Token from auth:", token);

  const [newNote, setNewNote] = useState({ content: "", audio: null, createdAt: "", id: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchNotes(token));
    }
  }, [dispatch, token]);

  const handleUpdate = ({ transcript, audioBlob }) => {
    setNewNote((prev) => ({
      ...prev,
      content: transcript || prev.content,
      audio: audioBlob ? URL.createObjectURL(audioBlob) : prev.audio,
      createdAt: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    if (!newNote.content && !newNote.audio) {
      alert("Please enter text or record audio!");
      return;
    }
    // Dispatch createNote with noteData and token
    dispatch(createNote({ noteData: newNote, token }));
    setNewNote({ content: "", audio: null, createdAt: "", id: null });
  };

  const handleEdit = (note) => {
    console.log("Edit note:", note);
    // Example: Open an edit modal pre-filled with note data.
  };

  const handleDelete = (noteId) => {
    console.log("Delete note:", noteId);
    // Dispatch deleteNote thunk if available.
  };

  const handleManualSave = (manualNote) => {
    const newManualNote = {
      ...manualNote,
      createdAt: new Date().toISOString(),
    };
    dispatch(createNote({ noteData: newManualNote, token }));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 bg-white shadow-sm sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-purple-600">AI Notes</h1>
          <button
            onClick={() => setIsModalOpen(true)}
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
            onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="Type your note here..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <Recorder onUpdate={handleUpdate} />
          <button onClick={handleSave} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {loading && <p>Loading notes...</p>}
        {error && <p>Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleManualSave}
        initialData={null}
      />
    </div>
  );
};

export default Dashboard;




