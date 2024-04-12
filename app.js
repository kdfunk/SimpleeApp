const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let notes = [];

// Serve HTML file for the note app
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint to get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Endpoint to save a new note
app.post('/notes', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Note text is required' });
  }
  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

const PORT = process.env.PORT || 8443;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
