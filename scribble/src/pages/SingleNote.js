import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EditNote from "./EditNote";
import singleNoteStyles from "./SingleNote.module.css";

const SingleNote = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noteData, setNoteData] = useState();

  // edit state
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const { notesKey } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/notes/${notesKey}`)
      .then((res) => {
        setNoteData(res.data);
        setIsLoading(false);
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  }, [notesKey]);

  const editNote = () => {
    setStatus(true);
  };

  const handleEdit = (key) => {
    if (!title || !author || !content) {
      alert("Fill out all fields");
    } else {
      const values = {
        title,
        author,
        content,
      };

      axios
        .put(`http://localhost:4000/notes/${key}`, values, {})
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    }
  };

  const deleteNote = (key) => {
    axios
      .delete(`http://localhost:4000/notes/${key}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
    history.push("/notes");
  };

  return (
    <div className={singleNoteStyles.container}>
      <div className={singleNoteStyles.main}>
        {!isLoading && (
          <>
            <h2 className={singleNoteStyles.heading}>
              title:
              <br />
              <span className={singleNoteStyles.title}>{noteData.title}</span>
            </h2>
            <h2 className={singleNoteStyles.heading}>
              author: <br />
              <span className={singleNoteStyles.author}>{noteData.author}</span>
            </h2>
            <p className={singleNoteStyles.content}>{noteData.content}</p>
            <div className={singleNoteStyles.action_btns}>
              <button onClick={editNote}>Edit</button>
              <button
                onClick={() => {
                  deleteNote(noteData.key);
                }}
              >
                Delete
              </button>
            </div>
            <p>
              <Link to="/notes" className={singleNoteStyles.backlink}>
                Back to all notes
              </Link>
            </p>
          </>
        )}
        {status && (
          <>
            <EditNote
              editTitle={title}
              setEditTitle={setTitle}
              editAuthor={author}
              setEditAuthor={setAuthor}
              editContent={content}
              setEditContent={setContent}
            />
            <div className={singleNoteStyles.action_btns}>
              <button onClick={() => setStatus(false)}>cancel edit</button>
              <button
                onClick={() => {
                  handleEdit(noteData.key);
                  alert("Edit saved");
                  history.push(`/notes`);
                }}
              >
                Save note
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleNote;
