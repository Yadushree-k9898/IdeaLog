
// import React, { useState } from "react";
// import { Plus } from "lucide-react";
// import Recorder from "../components/Recorder";

// const Dashboard = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState({ content: "", audio: null, createdAt: "" });

//   const handleUpdate = ({ transcript, audioBlob }) => {
//     setNewNote((prev) => ({
//       ...prev,
//       content: transcript || prev.content,
//       audio: audioBlob ? URL.createObjectURL(audioBlob) : prev.audio,
//       createdAt: new Date().toISOString(),
//     }));
//   };

//   const handleSave = () => {
//     if (!newNote.content && !newNote.audio) {
//       alert("Please enter text or record audio!");
//       return;
//     }

//     setNotes([...notes, newNote]);
//     setNewNote({ content: "", audio: null, createdAt: "" });
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <header className="p-4 bg-white shadow-sm sticky top-0">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <h1 className="text-xl font-semibold text-purple-600">AI Notes</h1>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <input
//             type="text"
//             value={newNote.content}
//             onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
//             placeholder="Type your note here..."
//             className="flex-1 px-4 py-2 border rounded-lg"
//           />
//           <Recorder onUpdate={handleUpdate} />
//           <button onClick={handleSave} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {notes.map((note, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-4">
//               <p className="text-gray-500 text-sm">{new Date(note.createdAt).toLocaleString()}</p>
//               <h3 className="font-semibold">{note.content || "Untitled Note"}</h3>
//               {note.audio && (
//                 <audio controls className="w-full mt-2">
//                   <source src={note.audio} type="audio/wav" />
//                 </audio>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Recorder from "../components/Recorder";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ content: "", audio: null, createdAt: "" });

  // Load saved notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

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

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Save to localStorage

    setNewNote({ content: "", audio: null, createdAt: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 bg-white shadow-sm sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-purple-600">AI Notes</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-500 text-sm">{new Date(note.createdAt).toLocaleString()}</p>
              <h3 className="font-semibold">{note.content || "Untitled Note"}</h3>
              {note.audio && (
                <audio controls className="w-full mt-2">
                  <source src={note.audio} type="audio/wav" />
                </audio>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
