import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus, FileEdit, MoonStar, SunMedium, Menu, X, Search } from "lucide-react"
import Recorder from "../components/Recorder"
import NoteCard from "../components/NoteCard"
import NoteModal from "../components/NoteModal"
import { fetchNotes, createNote, deleteNote, updateNote } from "../features/notes/notesThunks"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { notes, loading, error } = useSelector((state) => state.notes)
  const { user } = useSelector((state) => state.auth)
  const token = user?.token || localStorage.getItem("token")

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredNotes, setFilteredNotes] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    audio: null,
    id: null,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    if (token) {
      dispatch(fetchNotes(token))
    }
  }, [dispatch, token])

  useEffect(() => {
    // Filter notes based on search query
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery, notes])

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the search input itself or any of its children
      if (
        isSearchOpen &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest("[data-search-toggle]")
      ) {
        setIsSearchOpen(false)
      }
    }

    // Use mousedown instead of click to handle the event before blur
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSave = () => {
    if (!newNote.content.trim()) {
      alert("Please enter a note before saving!")
      return
    }

    const noteData = {
      title: "New Note",
      content: newNote.content,
      audio: newNote.audio || null,
      createdAt: new Date().toISOString(),
    }

    dispatch(createNote({ noteData, token }))
      .unwrap()
      .then(() => {
        setNewNote({ title: "", content: "", audio: null })
      })
      .catch((error) => {
        console.error("Error saving note:", error)
        alert("Failed to save note.")
      })
  }

  const handleEdit = (note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  const handleDelete = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await dispatch(deleteNote({ noteId, token })).unwrap()
        console.log("✅ Note deleted successfully.")
      } catch (error) {
        console.error("❌ Error deleting note:", error)
        alert("Failed to delete note.")
      }
    }
  }

  const handleManualSave = (manualNote) => {
    if (editingNote) {
      dispatch(updateNote({ noteId: editingNote._id, noteData: manualNote, token }))
    } else {
      dispatch(createNote({ noteData: manualNote, token }))
    }
    setIsModalOpen(false)
    setEditingNote(null)
  }

  const handleUpdate = ({ transcript, audioBlob }) => {
    setNewNote((prev) => {
      if (prev.audio) {
        URL.revokeObjectURL(prev.audio)
      }
      return {
        ...prev,
        content: transcript || prev.content,
        audio: audioBlob ? URL.createObjectURL(audioBlob) : prev.audio,
        createdAt: new Date().toISOString(),
      }
    })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleSearch = (e) => {
    e.stopPropagation() // Prevent event from bubbling up
    setIsSearchOpen(!isSearchOpen)
    // Focus the input after a short delay to ensure the input is rendered
    if (!isSearchOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.querySelector("input").focus()
        }
      }, 50)
    }
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"} transition-colors duration-200`}
    >
      <header
        className={`p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md sticky top-0 z-10 transition-colors duration-200`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600 flex items-center">
              <span className="mr-2">VoiceNotes</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon and Input */}
            <div className="relative flex items-center">
              <button
                data-search-toggle
                onClick={(e) => toggleSearch(e)}
                className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"} transition-colors duration-200 ${isSearchOpen ? "hidden" : "block"}`}
                aria-label="Search notes"
              >
                <Search size={20} />
              </button>

              <div
                ref={searchInputRef}
                className={`relative transition-all duration-200 ${isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
                  placeholder="Search notes..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg outline-none border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-800"}`}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation() // Prevent click from bubbling
                    setSearchQuery("")
                    setIsSearchOpen(false)
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <X size={16} className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} hover:text-gray-700`} />
                </button>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-100 text-gray-700"} transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunMedium size={20} /> : <MoonStar size={20} />}
            </button>
            <button
              onClick={() => {
                setEditingNote(null)
                setIsModalOpen(true)
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center"
            >
              <FileEdit size={18} className="mr-2" />
              <span>New Note</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search Icon */}
            <button
              data-search-toggle
              onClick={(e) => toggleSearch(e)}
              className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"} ${isSearchOpen ? "hidden" : "block"}`}
            >
              <Search size={20} />
            </button>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-100 text-gray-700"}`}
            >
              {isDarkMode ? <SunMedium size={20} /> : <MoonStar size={20} />}
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {isSearchOpen && (
          <div className="md:hidden mt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
                placeholder="Search notes..."
                className={`w-full pl-10 pr-10 py-2 rounded-lg outline-none border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-800"}`}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation() // Prevent click from bubbling
                  setSearchQuery("")
                  setIsSearchOpen(false)
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X size={16} className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} hover:text-gray-700`} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setEditingNote(null)
                  setIsModalOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center"
              >
                <FileEdit size={18} className="mr-2" />
                <span>New Note</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div
          className={`flex items-center gap-2 mb-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border rounded-lg p-1 shadow-sm`}
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            </div>
            <input
              type="text"
              value={newNote.content}
              onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Type your note here..."
              className={`w-full pl-10 px-4 py-3 rounded-lg outline-none ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
            />
          </div>
          <div className={`px-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            <Recorder onUpdate={handleUpdate} />
          </div>
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
            aria-label="Save note"
          >
            <Plus size={20} />
          </button>
        </div>

        {loading && (
          <div className="flex justify-center my-12">
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
              <p className="flex items-center text-purple-600">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading notes...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>Error: {error}</p>
          </div>
        )}

        {filteredNotes.length === 0 && !loading ? (
          <div className={`text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            <div className="mb-4 flex justify-center">
              <FileEdit size={48} className="opacity-30" />
            </div>
            <h3 className="text-xl font-medium mb-2">No notes found</h3>
            <p>Create a new note or adjust your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id || note._id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleManualSave}
        initialData={editingNote}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}

export default Dashboard

