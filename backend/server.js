// backend/server.js
const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
require('dotenv').config();

const app = express();
const db = pgp({
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: env.DBUSER,
    password: env.DBPASS
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Allows parsing of JSON request bodies

// Sample API Route
app.get('/test', (req, res) => {
  res.json({ message: "Hello from the backend server!" });
});

app.get('/testdb', (req, res) => {
  console.log("got request to test db")
  db.any('SELECT * FROM notes')
    .then((data) => {
      console.log(data);
      res.json({data});
    })
    .catch((error) => {
      res.json({message: "fail!"});
    });
})

// Make new note
app.post('/notes', (req, res) => {
    
});

// Get all notes
app.get('/notes', (req, res) => {
    
});

// Get one note
app.get('/notes/:id', (req, res) => {
    
});

// Update note
app.patch('/notes/:id', (req, res) => {
    
});

// Delete one note
app.delete('/notes/:id', (req, res) => {
    
});

// Get all unique topics, (how to sort from most recently updated?)
app.get('/topics', (req, res) => {

})

// Get all notes of a certain topic
app.get('/notes/:topic', (req, res) => {

});

// Make new topic
app.post('/topics', (req, res) => {

});

// Delete topic (also deletes notes relevant to the topic)
app.delete('/topics/:id', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
