import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import PostNote from "./pages/PostNote";
import SingleNote from "./pages/SingleNote";

function App() {
  return (
    <div className="App">
      <Router>
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
