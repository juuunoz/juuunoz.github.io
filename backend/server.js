// backend/server.js
const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
require('dotenv').config();

const app = express();
const db = pgp({
    host: '127.0.0.1',
    port: 5432,
    database: process.env.PGDB,
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    connectionTimeoutMillis: 5000,
});

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Allows parsing of JSON request bodies

// Sample API Route
app.get('/test', (req, res) => {
  res.json({ message: "Hello from the backend server!" });
});

app.get('/api/testdb', (req, res) => {
  db.any('SELECT * FROM notes')
    .then((data) => {
      res.status(200).json({data});
    })
    .catch((error) => {
      res.json({message: error});
    });
})

// Make new note
app.post('/api/notes', (req, res) => {
  const { note_id, date, content, topics } = req.body;

  if (!content || !Array.isArray(topics)) {
    return res.status(400).json({ message: 'content and topics[] are required' });
  }

  if (!topics.includes('everything')) topics.push('everything');

  db.tx((t) => {
    return t.none(
      'INSERT INTO notes (note_id, date, content) VALUES ($1, ($2::TIMESTAMP), $3)',
      [note_id, date, content]
    ).then(() => {
      return t.batch(
        topics.map((topic) =>
          t.none('INSERT INTO topics (note_id, topic) VALUES ($1, $2)', [note_id, topic])
        )
      )
    });
  }).then(() => {
      res.status(200).json({
        message: 'Note creation succeeded',
        note_id
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Using the cursor as the topmost note, return limit most recent notes
// Get all notes /notes?cursor=none&limit=10&topic=none)
// Filtering option /notes?topic=misc
app.get('/api/notes', (req, res) => {
    const cursor = req.query.cursor || "none";
    const limit = parseInt(req.query.limit) || 10;
    const topic = req.query.topic || "none"

    if (cursor === "none" && topic === "none"){
      // give limit number of notes
      db.any(`
        SELECT * FROM notes
        ORDER BY date DESC
        LIMIT $1;`,
        [limit])
      .then((data) => {
        return res.status(200).json(data);
      }).catch((error) => {
        return res.status(500).json({message: error.message || String(error)});
      })
    } else if (cursor === "none") {
      // give limit number of notes in the specified topic
      db.any(`
        SELECT * FROM notes 
        NATURAL JOIN 
        (SELECT note_id FROM topics WHERE topic = $1)
        ORDER BY date DESC
        LIMIT $2;`,
        [topic, limit])
        .then((data) => {
        return res.status(200).json(data);
        }).catch((error) => {
          return res.status(500).json({message: error.message || String(error)});
        })
    } else if (topic === "none") {
      // give limit number of notes from the given cursor
      db.any(`
        SELECT * FROM notes 
        WHERE date < (SELECT date FROM notes WHERE note_id = $1)
        ORDER BY date DESC
        LIMIT $2;`, 
        [cursor, limit])
      .then((data) => {
        return res.status(200).json(data);
      }).catch((error) => {
        return res.status(500).json({message: error.message || String(error)});
      })
    }
    else {
      // give limit number of notes in the specified topic, from the given cursor
      db.any(`
        SELECT * FROM 
        (SELECT * FROM notes WHERE date < (SELECT date FROM notes WHERE note_id = $1 ORDER BY date DESC)) AS notes
        JOIN
        (SELECT note_id FROM topics WHERE topic = $3) AS topics
        ON notes.note_id = topics.note_id
        ORDER BY date DESC
        LIMIT $2;`,
        [cursor, limit, topic])
        .then((data) => {
        return res.status(200).json(data);
      }).catch((error) => {
        return res.status(500).json({message: error.message || String(error)});
      })
    }
});

// Get one note
app.get('/api/notes/:id', (req, res) => {
    db.one('SELECT * FROM notes WHERE notes.note_id = $1',
      [req.params.id]
    ).then((data) => {
      return res.status(200).json({ data })
    }).catch((error) => {
      if (error.result.rowCount === 0)
        return res.status(204).json({ message: "Note not found." });
      return res.status(500).json({message: error.message || String(error)});
    })
});

// Update note topics or content
// TODO: rewrite in promise format for consistency
app.patch('/api/notes/:id', async (req, res) => {
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
    
  } catch (error) {
    return res.status(500).json({message: error.message || String(error)});
  }
});

// Delete one note
app.delete('/api/notes/:id', (req, res) => {
    db.result('DELETE FROM notes WHERE note_id = $1 ', 
      [req.params.id]
    ).then((data) => {
      if (data.rowCount == 0)
        return res.status(204).json({ message: `Note ${req.params.id} not found. Nothing deleted.` })
      return res.status(200).json({ message: `Note ${req.params.id} succesfully deleted.`})
    }).catch((error) => {
      return res.status(500).json({ message: error })
    })
});

// Get all unique topics, (how to sort from most recently updated?)
app.get('/api/topics', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  
  db.any(`
    SELECT topic, max(date) 
    FROM (notes NATURAL JOIN topics) 
    WHERE topic!='everything' 
    GROUP BY topic 
    ORDER BY max 
    DESC LIMIT 5;`, 
    [limit]
  ).then((data) => {
    if (data.rowCount == 0)
      return res.status(204).json({ message: `Topic ${req.params.id} not found. Nothing deleted.` })
    return res.status(200).json(data)
  }).catch((error) => {
    return res.status(500).json({message: error.message || String(error)});
  })
})

// Delete topic (also deletes notes relevant to the topic)
app.delete('/api/topics/:id', (req, res) => {
  db.result(`
    DELETE FROM notes 
    WHERE notes.note_id in 
    (SELECT topics.note_id FROM topics WHERE topics.topic = $1)`, [req.params.id]
  ).then((data) => {
    if (data.rowCount == 0)
      return res.status(204).json({ message: `Topic ${req.params.id} not found. Nothing deleted.` })
    return res.status(200).json({ message: `Topic ${req.params.id} succesfully deleted.`})
  }).catch((error) => {
    return res.status(500).json({message: error.message || String(error)});
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});