/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StockPrice from './StockPrice';

const StockInterface = () => {
  const [currentCash, setCurrentCash] = useState(10000);
  const [currentStockSymbol, setCurrentStockSymbol] = useState('AAPL');
  const [currentStockPrice, setCurrentStockPrice] = useState(0);
  const [currentStockHistory, setCurrentStockHistory] = useState({});

  // HELPER FUNCTIONS
  const capitalizeStockSymbol = (symbol) => symbol.toUpperCase();

  const getStockPrice = (symbol) => {
    axios.get('https://alpha-vantage.p.rapidapi.com/query', {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
      },
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        datatype: 'json',
        output_size: 'compact'
      }
    })
      .then((results) => {
        console.log(results.data);
        // res.send(results.data);
      })
      .catch((err) => { console.log(err); });
  };

  const getStockPriceHistory = (symbol) => {

  };

  useEffect(() => {
    setCurrentStockPrice(getStockPrice(currentStockSymbol));
  });

  return (
    <div>
      {currentStockPrice}
      <StockPrice />
      <div>
        <button type="submit">Buy</button>
        <button type="submit">Sell</button>
        <button type="submit">YOLO</button>
      </div>
    </div>
  );
};

export default StockInterface;
