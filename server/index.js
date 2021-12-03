/* eslint-disable comma-dangle */
const axios = require('axios');

const express = require('express');
const app = express();

app.use(express.json());

// app.get('/:symbol', (req, res) => {
//   axios.get('https://alpha-vantage.p.rapidapi.com/query', {
//     headers: {
//       'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
//       'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
//     },
//     params: {
//       function: 'TIME_SERIES_DAILY',
//       symbol: req.params.symbol,
//       datatype: 'json',
//       output_size: 'compact'
//     }
//   })
//     .then((results) => {
//       console.log(results.data);
//       // res.send(results.data);
//     })
//     .catch((err) => { console.log(err); });
// });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
