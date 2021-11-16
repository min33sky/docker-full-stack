const express = require('express');

const db = require('./db');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

db.pool.query(
  `CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`,
  (err, results, fields) => {
    console.log('results: ', results);
  }
);

app.get('/api/values', (req, res) => {
  // DB에서 모든 정보 가져오기
  db.pool.query('SELECT * FROM lists', (err, results, fields) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(results);
    }
  });
});

app.post('/api/value', (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES ("${req.body.value}")`,
    (err, results, fields) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} `);
});
