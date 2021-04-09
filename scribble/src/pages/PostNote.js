import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import postStyles from "./PostNote.module.css";

const PostNote = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const key = title;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert("Fill out all fields");
    } else {
      const values = {
        title,
        author,
        content,
        key,
      };

      axios
        .post("http://localhost:4000/post", values, {})
        .then((res) => {
          console.log(`Status: ${res.status}`);
          console.log(`Body: ${JSON.stringify(res.data)}`);
          return res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      setTitle("");
      setAuthor("");
      setContent("");
    }
  };

  return (
    <div className={postStyles.container}>
      <div className={postStyles.create}>
        <p>
          <Link to="/notes" className={postStyles.backlink}>
            Back to all notes
          </Link>
        </p>
        <form onSubmit={handleSubmit} className={postStyles.form}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="author"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
            id=""
            cols="30"
            rows="10"
            placeholder="content"
          ></textarea>
          <button type="submit">Add note</button>
        </form>
      </div>
    </div>
  );
};

export default PostNote;
