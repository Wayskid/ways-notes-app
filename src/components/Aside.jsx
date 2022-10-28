import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import NotesContext from "../context/NotesContext";
import NoteCard from "./NoteCard";

export default function Aside() {
   const { notes, handleCreateNewNote } = useContext(NotesContext);

   const mappedNotesArray = notes
      .sort((a, b) => b.lastModified - a.lastModified)
      .map((note) => {
         return (
            <motion.div
               key={note.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
            >
               <NoteCard key={note.id} note={note} />
            </motion.div>
         );
      });

   return (
      <div className="aside">
         <header>
            <h2>WaysNotes</h2>
            <div className="noteDet">
               <p>
                  {`${notes.length} note`}
                  {`${notes.length > 1 ? "s" : ""}`}
               </p>
               <button onClick={handleCreateNewNote}>+ New Note</button>
            </div>
         </header>
         <div className="notesList">
            <AnimatePresence>{mappedNotesArray}</AnimatePresence>
         </div>
      </div>
   );
}
