import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import notesStyle from "./NotesPage.module.css";
import PostNote from "./PostNote";

const NotesPage = () => {
  // get all notes state
  const [allNotes, setAllNotes] = useState([{}]);
  const [isloading, setIsloading] = useState(true);

  const getPosts = () => {
    axios
      .get("http://localhost:4000/notes")
      .then((res) => {
        setAllNotes(res.data.value);
        setIsloading(false);
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={notesStyle.container}>
      <p className={notesStyle.scale_up_center}>
        <Link to="/post" className={`${notesStyle.backlink}`}>
          Add note
        </Link>
      </p>
      {isloading ? (
        <p>Loading</p>
      ) : Array.isArray(allNotes) && allNotes.length < 1 ? (
        <PostNote />
      ) : (
        <div className={notesStyle.note_container}>
          {allNotes.map((notes, index) => (
            <div key={index} className={notesStyle.notes}>
              <div>
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
