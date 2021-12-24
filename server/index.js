/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../database/index.js');
const host = 'http://localhost:1234';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Serve static files to browser
// Separate path with commas to account for both Mac and Windows OS filepath conventions
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Add a new trade to trades table
app.post('/api/trades', (req, res) => {
  const { symbol, quantity, price, date } = req.body;
  db.query(
    'INSERT INTO trades (id, symbol, quantity, price, date) VALUES (DEFAULT, ?, ?, ?, STR_TO_DATE(?, \'%m/%d/%Y\'))',
    [symbol, quantity, price, date],
    (err, data) => {
      if (err) { console.log(err); }
      res.sendStatus(201);
    }
  );
});

// Get unique stock symbols in portfolio
app.get('/api/portfolio/symbols', (req, res) => {
  db.query('SELECT DISTINCT symbol FROM trades', (err, data) => {
    if (err) { console.log(err); }
    res.send(data);
  });
});

// Render portfolio
app.get('/api/portfolio', (req, res) => {
  db.query(
    `SELECT DISTINCT
      symbol,
      (SELECT SUM(quantity) FROM trades AS b WHERE b.symbol=a.symbol) AS quantity,
      (SELECT SUM(quantity * price) FROM trades AS c WHERE c.symbol=a.symbol) AS costBasis
    FROM trades AS a`,
    (err, data) => {
      if (err) { console.log(err); }
      res.send(data);
    }
  );
});

app.listen(1234, () => {
  console.log('Server is listening on port 3000');
});
