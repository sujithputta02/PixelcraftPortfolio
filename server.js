import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = join(__dirname, 'likes.db');

// Connect to SQLite local database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to likes.db:', err);
  } else {
    console.log('Successfully connected to local SQLite database (likes.db)');
    
    // Create likes table if it does not exist
    db.run(`
      CREATE TABLE IF NOT EXISTS likes (
        card_id TEXT PRIMARY KEY,
        count INTEGER DEFAULT 0
      )
    `, (err) => {
      if (err) {
        console.error('Error creating likes table:', err);
      } else {
        // Pre-seed realistic numbers if the table is currently empty
        db.get('SELECT COUNT(*) as count FROM likes', (err, row) => {
          if (row && row.count === 0) {
            const initialLikesData = {
              'king-steve': 142,
              'spider-noir': 98,
              'spidey-sense': 124,
              'dear-el': 210,
              'doctor-doom': 165,
              'dune-part-three': 304,
              'interstellar': 188,
              'dudeholic': 76,
              'max-katebush': 143,
              'michael-jackson': 275,
              'superman': 220,
              'oppenheimer': 195,
              'the-odyssey': 112,
              'raga-revenge': 89,
              'spiderman-bnd': 156,
              'black-panther': 245,
              'obsession': 288,
              'iphone-17-pro': 132,
              'hamza-returns': 115
            };

            const stmt = db.prepare('INSERT INTO likes (card_id, count) VALUES (?, ?)');
            Object.entries(initialLikesData).forEach(([id, count]) => {
              stmt.run(id, count);
            });
            stmt.finalize(() => {
              console.log('Database seeded with initial like counts successfully.');
            });
          }
        });
      }
    });
  }
});

// GET /api/likes - retrieve counts for all cards
app.get('/api/likes', (req, res) => {
  db.all('SELECT * FROM likes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const likesMap = {};
    rows.forEach(row => {
      likesMap[row.card_id] = row.count;
    });
    res.json(likesMap);
  });
});

// POST /api/likes/:id/toggle - increment or decrement count for a card
app.post('/api/likes/:id/toggle', (req, res) => {
  const cardId = req.params.id;
  const { liked } = req.body; // true if liked, false if unliked
  
  const increment = liked ? 1 : -1;

  // Insert base row if not exists, then perform update to guarantee compatibility
  db.run('INSERT OR IGNORE INTO likes (card_id, count) VALUES (?, 0)', [cardId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    db.run(
      'UPDATE likes SET count = max(0, count + ?) WHERE card_id = ?',
      [increment, cardId],
      (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        // Return updated count
        db.get('SELECT count FROM likes WHERE card_id = ?', [cardId], (err, row) => {
          if (err || !row) {
            res.status(500).json({ error: 'Failed to retrieve updated count' });
            return;
          }
          res.json({ count: row.count });
        });
      }
    );
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`SQLite database server running on http://localhost:${PORT}`);
});
