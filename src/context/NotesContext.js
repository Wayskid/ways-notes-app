import { createContext, useEffect, useState } from "react";
import uuid from "react-uuid";

const NotesContext = createContext();

export function NotesProvider({ children }) {
   //Create New Note
   const [notes, setNotes] = useState(
      () => JSON.parse(localStorage.getItem("notes")) || []
   );

   function handleCreateNewNote() {
      const newNote = {
         id: uuid(),
         title: `Untitled ${notes.length + 1}`,
         body: "",
         lastModified: Date.now(),
      };

      setNotes([...notes, newNote]);
   }

   //Active Note
   const [activeNoteId, setActiveNoteId] = useState(false);

   function handleNoteActivation(noteClickedId) {
      setActiveNoteId(noteClickedId);
   }

   //Get Active Note
   function getActiveNote() {
      return notes.find((note) => note.id === activeNoteId);
   }

   //Local Storage
   useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
   }, [notes]);

   return (
      <NotesContext.Provider
         value={{
            notes,
            activeNoteId,
            activeNote: getActiveNote(),
            handleCreateNewNote,
            handleNoteActivation,
            setActiveNoteId,
            setNotes,
         }}
      >
         {children}
      </NotesContext.Provider>
   );
}

export default NotesContext;
