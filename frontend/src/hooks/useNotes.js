import { useEffect, useState } from "react";
import { getNotes } from "@/api/notesApi";

const useNotes = (token) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (token) {
      getNotes(token).then(setNotes);
    }
  }, [token]);

  return notes;
};

export default useNotes;
