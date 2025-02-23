

import React, { useState, useEffect } from "react";

const NoteModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    setNote(initialData || { title: "", content: "" });
  }, [initialData]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!note.title.trim() || !note.content.trim()) return;
    onSave(note);
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-6">
          {initialData ? "Edit Note" : "New Note"}
        </h2>
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          placeholder="Note title"
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg h-48 mb-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none"
          placeholder="Write your note here..."
        />
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            disabled={!note.title.trim() || !note.content.trim()}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default NoteModal;
