import { useState } from "react";

const NoteEditor = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your note here..." />
      <button onClick={() => onSave({ title, content })}>Save</button>
    </div>
  );
};

export default NoteEditor;
