// const axios = require('axios');
// // const { StockInterface } = require('./StockInterface.jsx');
// // import { StockInterface } from './components/StockInterface';
// // import { setStockPrice, stockSymbol } from './components/StockInterface.jsx';

// const getPrice = () => {
//   axios.get('https://alpha-vantage.p.rapidapi.com/query', {
//     headers: {
//       'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
//       'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
//     },
//     params: {
//       function: 'GLOBAL_QUOTE',
//       symbol: stockSymbol,
//       datatype: 'json'
//     }
//   })
//     .then((results) => {
//       setStockPrice(Math.round(results.data['Global Quote']['05. price'] * 100) / 100);
//     })
//     .catch((err) => { console.log(err); });
// };

// module.exports = {
//   getPrice
// };
