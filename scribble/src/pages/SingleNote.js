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
  //   const key = title;

  const values = {
    title,
    author,
    content,
    // key,
  };

  const { notesKey } = useParams();
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/notes/${notesKey}`)
      .then((res) => {
        console.log(res);
        setNoteData(res.data);
        setIsLoading(false);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [notesKey]);

  const editNote = () => {
    // history.push("/edit");
    setStatus(true);
  };

  const handleEdit = (key) => {
    axios
      .put(`http://localhost:4000/notes/${key}`, values, {})
      .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log(`Body: ${JSON.stringify(res.data)}`);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteNote = (key) => {
    axios
      .delete(`http://localhost:4000/notes/${key}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
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
            <button onClick={() => setStatus(false)}>cancel edit</button>
            <button onClick={() => handleEdit(noteData.key)}>Save note</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleNote;
