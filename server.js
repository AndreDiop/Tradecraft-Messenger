const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 8080;
const { v4: uuidv4 } = require("uuid");
var iterator = 0;

// ADD MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// //   * GET `/notes` - Should return the `notes.html` file.
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// //   * GET `*` - Should return the `index.html` file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

//* POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  //   const newNote.id = uuidv4();
  newNote.id = iterator;
  iterator++,
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(notes);
      });
    });
});

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique `id` when it's saved.
// In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
// app.delete("/api/notes/:id", function (req, res) {
//     res.sendFile(path.join(__dirname, "public", "notes.html"));
//   });

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
