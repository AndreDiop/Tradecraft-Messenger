const express = require("express");
const compression = require('compression')
const app = express();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 8080;

// ADD MIDDLEWARE
app.use(compression())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Should return the `notes.html` file.
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Should return the `index.html` file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//Read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

//   Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  // Receive a new note to save on the request body
  let newNote = req.body;
  // Gives each note a unique `id` when it's saved
  newNote.id = uuidv4();
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    // Add it to the `db.json` file
    notes.push(newNote);
    // Write and return the new note to the client
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });
});
//  Will receive a query parameter containing the id of a note to delete.
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  //   Read all notes from the `db.json` file
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    // Remove the note with the given `id` property
    let notesArray = notes.filter((note) => {
      return id !== note.id;
    });
    // Rewrite the notes to the `db.json` file.
    fs.writeFile("./db/db.json", JSON.stringify(notesArray), (err) => {
      if (err) throw err;
      res.json(notesArray);
    });
  });
});

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
