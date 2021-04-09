import postStyles from "./PostNote.module.css";

const EditNote = ({
  editTitle,
  setEditTitle,
  editAuthor,
  setEditAuthor,
  editContent,
  setEditContent,
}) => {
  return (
    <div>
      <form className={postStyles.form}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="title"
        />
        <input
          type="text"
          value={editAuthor}
          onChange={(e) => setEditAuthor(e.target.value)}
          placeholder="author"
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          name="content"
          id=""
          cols="30"
          rows="10"
          placeholder="content"
        ></textarea>
      </form>
    </div>
  );
};

export default EditNote;
