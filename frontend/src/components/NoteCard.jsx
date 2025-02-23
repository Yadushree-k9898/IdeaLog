
import React from "react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="group border border-gray-200 rounded-lg p-4 bg-white hover:border-purple-500 transition-all cursor-pointer">
      <h2 className="text-lg font-medium mb-2">{note.title}</h2>
      <p className="text-gray-600 text-sm mb-4">{note.content}</p>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(note)} 
            className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(note.id)} 
            className="text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;