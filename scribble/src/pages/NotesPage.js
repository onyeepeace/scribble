import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import notesStyle from "./NotesPage.module.css";
import PostNote from "./PostNote";

const NotesPage = () => {
  // get all notes state
  const [allNotes, setAllNotes] = useState([{}]);

  const getPosts = () => {
    axios
      .get("http://localhost:4000/notes")
      .then((res) => {
        console.log(res);
        setAllNotes(res.data.value);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={notesStyle.container}>
      <p>
        <Link to="/post" className={notesStyle.backlink}>
          Add note
        </Link>
      </p>
      {Array.isArray(allNotes) && allNotes.length < 1 ? (
        <PostNote />
      ) : (
        <div className={notesStyle.note_container}>
          {allNotes.map((notes) => (
            <div className={notesStyle.notes}>
              <div key={notes.key}>
                <h2 className={notesStyle.heading}>
                  Title: <span className={notesStyle.title}>{notes.title}</span>
                </h2>
                <p>{notes.content}</p>
                <Link to={`/note/${notes.key}`}>
                  <button>Read</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
