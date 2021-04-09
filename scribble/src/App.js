import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import PostNote from "./pages/PostNote";
import SingleNote from "./pages/SingleNote";
import notesStyle from "./pages/NotesPage.module.css";

function App() {
  return (
    <div className="App">
      <Router>
        <p>
          <Link to="/" className={notesStyle.backlink}>
            Scribble
          </Link>
        </p>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/notes" component={NotesPage} />
          <Route path="/note/:notesKey" component={SingleNote} />
          <Route path="/post" component={PostNote} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
