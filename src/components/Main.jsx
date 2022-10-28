import NotesContext from "../context/NotesContext";
import { useContext } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function Main() {
   const { activeNoteId, activeNote, notes, setNotes } =
      useContext(NotesContext);

   function onEdit(key, value) {
      setNotes(
         notes.map((note) => {
            if (note.id === activeNoteId) {
               return {
                  ...activeNote,
                  [key]: value,
                  lastModified: Date.now(),
               };
            } else {
               return note;
            }
         })
      );
   }

   return (
      <div className="main">
         {activeNote ? (
            <div className="mainWrap">
               <input
                  type="text"
                  className="titleInput"
                  value={activeNote.title}
                  onChange={(e) => onEdit("title", e.target.value)}
               />
               <SimpleMDE
                  value={activeNote.body}
                  onChange={(value) => onEdit("body", value)}
                  placeholder="Write something..."
               />
            </div>
         ) : (
            <p className="noNotes">Select a note to edit</p>
         )}
      </div>
   );
}
