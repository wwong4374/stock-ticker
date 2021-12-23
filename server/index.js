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

// Render portfolio
app.get('/api/portfolio', (req, res) => {
  db.query('SELECT ');
});

app.listen(1234, () => {
  console.log('Server is listening on port 3000');
});


















// Get all stocks in portfolio
// TODO: Refactor to pull from trades table instead
// app.get('/api/stocks', (req, res) => {
//   db.query(`SELECT JSON_ARRAYAGG(JSON_OBJECT('symbol', s.symbol, 'quantity', s.quantity)) FROM stocks AS s`, (err, data) => {
//     if (err) { console.log(err); }
//     const key = Object.keys(data[0])[0];
//     res.send(data[0][key]);
//   });
// });

// // Get all stock symbols in portfolio
// app.get('/api/stocks/symbols', (req, res) => {
//   db.query(`SELECT JSON_ARRAYAGG(stockSymbol) FROM stocks`, (err, data) => {
//     if (err) { console.log(err); }
//     const key = Object.keys(data[0])[0];
//     res.send(data[0][key]);
//   });
// });

// app.get('/api/stocks/:stockSymbol/quantity', (req, res) => {
//   const stockSymbol = req.params.stockSymbol;
//   db.query(`SELECT quantity FROM stocks WHERE stockSymbol = ?`, [stockSymbol], (err, data) => {
//     if (err) { console.log(err); }
//     res.send(data[0]);
//   });
// });

// app.get('/api/stocks/:stockSymbol/price', (req, res) => {
//   const stockSymbol = req.params.stockSymbol;
//   db.query(`SELECT price FROM stocks WHERE stockSymbol = ?`, [stockSymbol], (err, data) => {
//     if (err) { console.log(err); }
//     res.send(data[0]);
//   });
// });

// Add new trade to trade history
// TODO: Refactor this to post to trades table
// app.post('/api/stocks', (req, res) => {
//   const { quantity, stockSymbol, price } = req.body;
//   db.query(`INSERT INTO stocks (quantity, stockSymbol, price) VALUES (?, ?, ?)`, [quantity, stockSymbol, price], (err, data) => {
//     if (err) { console.log(err); }
//     res.sendStatus(201);
//   });
// });

// app.put('/api/stocks', (req, res) => {
//   const { quantity, stockSymbol } = req.body;
//   db.query(`UPDATE stocks SET quantity = ? WHERE stockSymbol = ?`, [quantity, stockSymbol], (err, data) => {
//     if (err) { console.log(err); }
//     res.send(data);
//   });
// });

// app.delete('/api/stocks/:stockSymbol', (req, res) => {
//   const { stockSymbol } = req.params;
//   db.query(`DELETE FROM stocks WHERE stockSymbol = ?`, [stockSymbol], (err, data) => {
//     if (err) { console.log(err); }
//     res.send(data);
//   });
// });
