require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express(); // instantiate express
const { Deta } = require("deta");
const deta = Deta(process.env.NOTES_PROJECT_KEY); // configure your Deta project
const notes = deta.Base("notes"); // access your DB

app.use(cors());
app.use(express.json()); // for parsing application/json bodies

console.log("hello");

app.listen(4000, (err) => {
  if (err) console.log(err);
  console.log("server listening on port 4000");
});

// creating a note
app.post("/post", async (req, res) => {
  const { title, author, content, key } = req.body;
  const toCreate = { title, author, content, key };
  const insertedNote = await notes.put(toCreate);
  res.status(201).json(insertedNote);
});

// getting a single note
app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const note = await notes.get(id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "note not found" });
  }
});

// getting all notes
app.get("/notes", async (req, res) => {
  const note = await notes.fetch([]).next();
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "no notes found" });
  }
});

// updating a single note
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  const toPut = { key: id, title, author, content };
  const newNote = await notes.put(toPut);
  return res.json(newNote);
});

// deleting a single note
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await notes.delete(id);
  res.json({ message: "deleted" });
});

// export 'app
module.exports = app;
