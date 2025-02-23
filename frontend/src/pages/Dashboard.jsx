// import React, { useState, useEffect } from "react";
// import { Plus, Mic } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNotes, createNote } from "@/features/notes/notesThunks";
// import useAuth from "../hooks/useAuth";
// import NoteModal from "../components/NoteModal";
// import Recorder from "../components/Recorder";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const dispatch = useDispatch();
//   const { notes, loading } = useSelector((state) => state.notes);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newNote, setNewNote] = useState({ title: "", content: "", audio: null });

//   useEffect(() => {
//     if (user?.token) {
//       dispatch(fetchNotes(user.token));
//     }
//   }, [dispatch, user]);

//   const handleSave = () => {
//     if (!newNote.content.trim()) return;
//     dispatch(createNote({ ...newNote, token: user.token }));
//     setNewNote({ title: "", content: "", audio: null });
//   };

//   const handleAudioSave = (audioBlob) => {
//     setNewNote((prev) => ({ ...prev, audio: audioBlob }));
//   };

//   const handleTranscription = (transcribedText) => {
//     setNewNote((prev) => ({ ...prev, content: transcribedText }));
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <header className="p-4 bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <span className="text-xl font-semibold text-purple-600">AI Notes</span>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           >
//             <Plus className="w-4 h-4" />
//             <span>New Note</span>
//           </button>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto p-6">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {notes.map((note) => (
//               <div key={note.id} className="bg-white shadow-md rounded-lg p-4">
//                 <p className="text-gray-500 text-sm">{new Date(note.createdAt).toLocaleString()}</p>
//                 <h3 className="font-semibold">{note.title}</h3>
//                 {note.content && <p className="text-gray-700">{note.content}</p>}
//                 {note.audio && (
//                   <audio controls className="w-full mt-2">
//                     <source src={note.audio} type="audio/wav" />
//                   </audio>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Input Field & Recorder */}
//       <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-white shadow-lg rounded-full flex items-center px-4 py-2">
//         <input
//           type="text"
//           value={newNote.content}
//           onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
//           placeholder="Write a note or speak..."
//           className="flex-1 p-2 outline-none border-none bg-transparent"
//         />
//         <button onClick={handleSave} className="text-gray-500 hover:text-gray-800">
//           <Plus className="w-6 h-6" />
//         </button>
//         <Recorder onSave={handleAudioSave} onTranscription={handleTranscription} />
//       </div>

//       <NoteModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//       />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Plus, Mic } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote } from "@/features/notes/notesThunks";
import useAuth from "../hooks/useAuth";
import NoteModal from "../components/NoteModal";
import Recorder from "../components/Recorder";

const Dashboard = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    audio: null,
  });

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchNotes(user.token));
    }
  }, [dispatch, user]);

  const handleSave = async () => {
    const contentValid = newNote.content && newNote.content.trim() !== "";
    const audioValid = newNote.audio !== null;

    if (!contentValid && !audioValid) {
      alert("Please enter text or record audio!");
      return;
    }

    try {
      await dispatch(createNote({ ...newNote, token: user.token }));
      setNewNote({ title: "", content: "", audio: null });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  const handleAudioSave = (audioBlob) => {
    setNewNote((prev) => ({ ...prev, audio: audioBlob }));
  };

  const handleTranscription = (transcribedText) => {
    setNewNote((prev) => ({ ...prev, content: transcribedText }));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-semibold text-purple-600">
            AI Notes
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading notes. Please try again.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <p className="text-gray-500 text-sm">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <h3 className="font-semibold">{note.title}</h3>
                  {note.content && (
                    <p className="text-gray-700">{note.content}</p>
                  )}
                  {note.audio && (
                    <audio controls className="w-full mt-2">
                      <source src={note.audio} type="audio/wav" />
                    </audio>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No notes found. Start by adding one!
              </p>
            )}
          </div>
        )}
      </main>

      {/* Input Field & Recorder */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-white shadow-lg rounded-full flex items-center px-4 py-2">
        <input
          type="text"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          placeholder="Write a note or speak..."
          className="flex-1 p-2 outline-none border-none bg-transparent"
        />
        <button
          onClick={handleSave}
          className="text-gray-500 hover:text-gray-800"
        >
          <Plus className="w-6 h-6" />
        </button>
        <Recorder
          onSave={handleAudioSave}
          onTranscription={handleTranscription}
        />
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default Dashboard;
