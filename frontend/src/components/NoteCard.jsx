import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 100)}...</p>
      <Link to={`/note/${note.id}`}>Read More</Link>
    </div>
  );
};

export default NoteCard;
