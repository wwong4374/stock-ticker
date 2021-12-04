/* eslint-disable import/extensions */
/* eslint-disable comma-dangle */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('../database/index.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Serve static files to browser
// Separate path with commas to account for both Mac and Windows OS path conventions
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/api/stocks', (req, res) => {
  db.query(`SELECT JSON_ARRAYAGG(JSON_OBJECT('stockSymbol', s.stockSymbol, 'quantity', s.quantity)) FROM stocks AS s`, (err, data) => {
    if (err) {
      console.log(err);
    }
    const key = Object.keys(data[0])[0];
    res.send(data[0][key]);
  });
});

app.get('/api/stocks/symbols', (req, res) => {
  db.query(`SELECT JSON_ARRAYAGG(stockSymbol) FROM stocks`, (err, data) => {
    if (err) {
      console.log(err);
    }
    const key = Object.keys(data[0])[0];
    res.send(data[0][key]);
  });
});

app.get('/api/stocks/:stockSymbol/quantity', (req, res) => {
  const stockSymbol = req.params.stockSymbol;
  db.query(`SELECT quantity FROM stocks WHERE stockSymbol = ?`, [stockSymbol], (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data[0]);
  });
});

app.post('/api/stocks', (req, res) => {
  const { quantity, stockSymbol } = req.body;
  db.query(`INSERT INTO stocks (quantity, stockSymbol) VALUES (?, ?)`, [quantity, stockSymbol], (err, data) => {
    if (err) {
      console.log(err);
    }
    res.sendStatus(201);
  });
});

app.put('/api/stocks', (req, res) => {
  const { quantity, stockSymbol } = req.body;
  db.query(`UPDATE stocks SET quantity = ? WHERE stockSymbol = ?`, [quantity, stockSymbol], (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

app.delete('/api/stocks', (req, res) => {
  const { stockSymbol } = req.body;
  console.log('DELETEING', stockSymbol);
  db.query(`DELETE FROM stocks WHERE stockSymbol = ?`, [stockSymbol], (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
