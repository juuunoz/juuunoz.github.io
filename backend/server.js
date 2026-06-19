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
    user: process.env.DBUSER,
    password: process.env.DBPASS
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Allows parsing of JSON request bodies

//TODO: Fix error codes
//FIXME: All topic strings may need to be pre-processed to be lower-cased, and spaces replaced with underscores

// Sample API Route
app.get('/test', (req, res) => {
  res.json({ message: "Hello from the backend server!" });
});

app.get('/testdb', (req, res) => {
  db.any('SELECT * FROM notes')
    .then((data) => {
      res.status(200).json({data});
    })
    .catch((error) => {
      res.json({message: error});
    });
})

// Make new note
app.post('/notes', (req, res) => {
  const { date, topics, content } = req.body;

  if (!content || !Array.isArray(topics)) {
    return res.status(400).json({ message: 'content and topics[] are required' });
  }

  db.tx((t) => {
    return t.one(
      'INSERT INTO notes (date, content) VALUES ($1, $2) RETURNING note_id',
      [date, content]
    ).then(({ note_id }) => {
      return t.batch(
        topics.map((topic) =>
          t.none('INSERT INTO topics (note_id, topic) VALUES ($1, $2)', [note_id, topic])
        )
      ).then(() => note_id);
    });
  }).then((noteId) => {
      res.status(200).json({
        message: 'Note creation succeeded',
        noteId
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

//TODO: paginate  
// Get all notes
app.get('/notes', (req, res) => {
    db.many('SELECT * FROM notes')
    .then ((data) => {
      return res.status(200).json(data);
    }).catch((error) => {
      if (error.result.rowCount === 0)
        return res.status(204).json({message: "Body tea, no notes!"})
      return res.status(500).json({message: error})
    })
});

//TODO: paginate
// Get all notes of a certain topic
app.get('/topics/:id/notes', (req, res) => {

});

// Get one note
app.get('/notes/:id', (req, res) => {
    db.one('SELECT * FROM notes WHERE notes.note_id = $1',
      [req.params.id]
    ).then((data) => {
      return res.status(200).json({ data })
    }).catch((error) => {
      return res.status(404).json({ message: "Note not found." });
    })
});

// Update note topics or content
// TODO: rewrite in promise format for consistency
app.patch('/notes/:id', async (req, res) => {
  try {
    const { topics, content } = req.body;

    if (!topics && !content) {
      return res.status(400).json({
        message: 'No parameters given.'
      });
    }

    const note = await db.oneOrNone(
      'SELECT 1 FROM notes WHERE note_id = $1',
      [req.params.id]
    );

    if (!note) {
      return res.status(404).json({
        message: `Note ${req.params.id} not found`
      });
    }

    if (content) {
      await db.none(
        'UPDATE notes SET content = $1 WHERE note_id = $2',
        [content, req.params.id]
      );
    }

    if (topics) {
      await db.tx(async t => {
        await t.none(
          'DELETE FROM topics WHERE note_id = $1',
          [req.params.id]
        );

        for (const topic of topics) {
          await t.none(
            'INSERT INTO topics (note_id, topic) VALUES ($1, $2)',
            [req.params.id, topic]
          );
        }
      });
    }

    return res.json({ message: 'Updated successfully' });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to update note'
    });
  }
});

// Delete one note
app.delete('/notes/:id', (req, res) => {
    db.result('DELETE FROM notes WHERE note_id = $1 ', 
      [req.params.id]
    ).then((data) => {
      if (data.rowCount == 0)
        return res.status(404).json({ message: `Note ${req.params.id} not found. Nothing deleted.` })
      else
        return res.status(200).json({ message: `Note ${req.params.id} succesfully deleted.`})
    }).catch((error) => {
      return res.status(500).json({ message: error })
    })
});

// Get all unique topics, (how to sort from most recently updated?)
app.get('/topics', (req, res) => {
  db.many('SELECT DISTINCT topics.topic FROM topics', 
    []
  ).then((data) => {
    if (data.rowCount == 0)
      return res.status(404).json({message: `No topics.`})
    else
      return res.status(200).json({ data })
  }).catch((error) => {
    return res.status(500).json({message: error})
  })
})

// Delete topic (also deletes notes relevant to the topic)
app.delete('/topics/:id', (req, res) => {
  db.result(`
    DELETE FROM notes 
    WHERE notes.note_id in 
    (SELECT topics.note_id FROM topics WHERE topics.topic = $1)`, [req.params.id]
  ).then((data) => {
    if (data.rowCount == 0)
      return res.status(404).json({ message: `Topic ${req.params.id} not found. Nothing deleted.` })
    return res.status(200).json({ message: `Topic ${req.params.id} succesfully deleted.`})
  }).catch((error) => {
    return res.status(500).json({message: error})
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
