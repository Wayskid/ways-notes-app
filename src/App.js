import { NotesProvider } from "./context/NotesContext";
import Aside from "./components/Aside";
import Main from "./components/Main";

export default function App() {


  return (
    <NotesProvider>
      <div className="containerBody">
        <Aside />
        <Main />
      </div>
    </NotesProvider>
  );
}


