import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { notes, fetchNotes } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    fetchNotes();
  }, [user]);

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.length === 0 ? <p>No notes found</p> : notes.map((note) => <NoteCard key={note.id} note={note} />)}
    </div>
  );
};

export default Dashboard;
