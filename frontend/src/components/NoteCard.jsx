
import PropTypes from "prop-types";
import { Pencil, Trash2 } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="group border border-gray-200 rounded-lg p-4 bg-white hover:border-purple-500 transition-all cursor-pointer">
      <h2 className="text-lg font-medium mb-2">
        {note.title || "Untitled Note"}
      </h2>
      <p className="text-gray-600 text-sm mb-4">{note.content}</p>
      {note.audio && (
        <audio controls className="w-full mt-2">
          <source src={note.audio} type="audio/wav" />
        </audio>
      )}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1"
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    audio: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    _id: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteCard;
