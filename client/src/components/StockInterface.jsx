/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import StockPrice from './StockPrice';

const StockInterface = () => {
  const [timeInterval, setTimeInterval] = useState('TIME_SERIES_DAILY');
  const [cash, setCash] = useState(10000);
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [stockPrice, setStockPrice] = useState(0);
  const [stockPriceHistory, setStockPriceHistory] = useState({});
  const timeSeriesMapping = {
    'TIME_SERIES_DAILY': 'Time Series (Daily)'
  }

  // HELPER FUNCTIONS
  const capitalizeStockSymbol = (symbol) => symbol.toUpperCase();

  const getStockPrice = (symbol, callback) => {
    // const priceHistoryKeys = Object.keys(priceHistory);
    // const latestStockPrice = priceHistory[priceHistory[0]];
  };

  const getStockPriceHistory = (symbol, callback) => {
    axios.get('https://alpha-vantage.p.rapidapi.com/query', {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
      },
      params: {
        function: timeInterval,
        symbol: symbol,
        datatype: 'json',
        output_size: 'compact'
      }
    })
      .then((results) => {
        console.log(results.data);
        const timeSeriesKey = timeSeriesMapping[timeInterval];
        const priceHistory = results.data[timeSeriesKey];
        callback(priceHistory);
      })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getStockPriceHistory(stockSymbol, setStockPriceHistory);
  });

  return (
    <div>
      {stockPrice}
      {/* <StockPrice /> */}
      <div>
        <button type="submit">Buy</button>
        <button type="submit">Sell</button>
        <button type="submit">YOLO</button>
      </div>
    </div>
  );
};

export default StockInterface;
