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
          <button>
            <Link to="/post" className={homeStyles.post}>
              Start here
            </Link>
          </button>
          <button>
            <Link to="/notes" className={homeStyles.notes}>
              See all notes
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
