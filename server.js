const express = require("express");
const app = express();
const path = require("path");

// Define a port to listen for incoming requests
const PORT = 8080;

// Create a generic function to handle requests and responses
function handleRequest(req, res) {
  // Send the below string to the client when the user visits the PORT URL
  res.end("It Works!! Shit lit: " + req.url);
}

// Use the Node HTTP package to create our server.
// Pass the handleRequest function to empower it with functionality.

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});


// // * The following HTML routes should be created:
// //   * GET `/notes` - Should return the `notes.html` file.
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// //   * GET `*` - Should return the `index.html` file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// * The application should have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
