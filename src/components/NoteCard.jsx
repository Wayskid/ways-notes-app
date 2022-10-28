import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import NotesContext from "../context/NotesContext";

export default function NoteCard({ note }) {
   const { handleNoteActivation, activeNoteId, notes, setNotes } =
      useContext(NotesContext);

   //Delete Note
   function handleDeleteNote(noteToDltId) {
      setNotes(notes.filter((noteItem) => noteItem.id !== noteToDltId));
   }

   //Dropdown Menu
   const [show, setShow] = useState(false);

   function handleDropdown(id) {
      if (note.id === id) {
         setShow(!show);
      }
   }

   //Edit Button onClick
   function editBtnOnClick() {
      handleNoteActivation(note.id);
      setShow(false);
   }

   return (
      <div className={`noteCard ${activeNoteId === note.id && "active"}`}>
         <div className="left" onClick={() => handleNoteActivation(note.id)}>
            <h3 className="title">{note.title}</h3>
            <p className="preview">{note.body && note.body.substr(0, 10)}...</p>
            <small className="lastModified">
               Modified{" "}
               {new Date(note.lastModified).toLocaleDateString("de-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
               })}
            </small>
         </div>
         <div className="rightContainer">
            <ul className="right" onClick={() => handleDropdown(note.id)}>
               <div></div>
               <div></div>
               <div></div>
            </ul>
            <AnimatePresence>
               {show && (
                  <motion.ul
                     initial={{
                        opacity: 0,
                     }}
                     animate={{
                        opacity: 1,
                     }}
                     exit={{
                        opacity: 0,
                        transition: { duration: "0.15" },
                     }}
                     transition={{
                        type: "spring",
                        stiffness: "100",
                        duration: "0.75",
                     }}
                  >
                     <ul className="dropDown">
                        <li onClick={() => handleDeleteNote(note.id)}>
                           Delete
                        </li>
                        <li onClick={editBtnOnClick}>Edit</li>
                     </ul>
                  </motion.ul>
               )}
            </AnimatePresence>
         </div>
      </div>
   );
}
