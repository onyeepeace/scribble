import { Link } from "react-router-dom";
import homeStyles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={homeStyles.container}>
      <main className={homeStyles.content}>
        <h1>Welcome to Scribble!</h1>
        <p>Put all your weird thoughts in one place</p>
        <p>PS: It's okay to be weird!...everyone is 😉</p>
        <div className={homeStyles.cta}>
          <Link to="/post" className={homeStyles.post}>
            <button>Start here</button>
          </Link>
          <Link to="/notes" className={homeStyles.notes}>
            <button>See all notes</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
