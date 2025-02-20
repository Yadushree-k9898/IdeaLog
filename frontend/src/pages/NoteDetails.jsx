import { useParams } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";

const NoteDetails = () => {
  const { id } = useParams();
  const { notes } = useNotes();
  const note = notes.find((n) => n.id === id);

  if (!note) return <h2>Note not found</h2>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteDetails;
