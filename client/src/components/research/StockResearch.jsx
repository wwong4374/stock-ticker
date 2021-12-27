/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';

const StockResearch = () => {
  const { handleBuyStock } = useContext(AppContext);
  const [stockSymbol, setStockSymbol] = useState('TSLA');
  const [stockToSearch, setStockToSearch] = useState('');
  const [stockPrice, setStockPrice] = useState(0);

  // HELPER FUNCTIONS
  const getPrice = () => {
    axios.get('https://alpha-vantage.p.rapidapi.com/query', {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
      },
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: stockSymbol,
        datatype: 'json'
      }
    })
      .then((results) => {
        if (results.data['Global Quote']['05. price'] === undefined
            || Number.isNaN(results.data['Global Quote']['05. price'])) {
          alert('Please enter a valid stock symbol.');
          setStockToSearch('');
          return;
        }
        setStockPrice(Math.round(results.data['Global Quote']['05. price'] * 100) / 100);
      })
      .catch((err) => { console.log(err); });
  };

  // const handleBuyStock = (symbol, price) => {
  //   let today = new Date();
  //   const dd = String(today.getDate()).padStart(2, '0');
  //   const mm = String(today.getMonth() + 1).padStart(2, '0');
  //   const yyyy = today.getFullYear();

  //   today = `${mm}/${dd}/${yyyy}`;

  //   axios.post('/api/trades', {
  //     symbol: symbol,
  //     quantity: 1,
  //     date: today
  //   })
  //     .then()
  //     .catch((err) => { console.log(err); });

  //   axios.post('/api/prices', {
  //     symbol: symbol,
  //     price: price,
  //     date: today
  //   })
  //     .then()
  //     .catch((err) => { console.log(err); });
  // };

  const handleStockInput = (e) => {
    setStockToSearch(e.nativeEvent.target.value);
  };

  const handleStockSearch = () => {
    if (stockToSearch === '') {
      alert('Please enter a stock symbol.');
      return;
    }
    getPrice();
    setStockSymbol(stockToSearch.toUpperCase());
    setStockToSearch('');
  };

  // USE EFFECT
  useEffect(() => {
    getPrice();
  }, [stockSymbol]);

  return (
    <div className="stockResearchContainer">
      <h1>Stock Research</h1>
      <div className="upperContainer">
        <div className="stockPriceTitle">
          {stockSymbol}
          {':'}
          {' '}
          {'$'}
          {(Math.round(stockPrice * 100) / 100).toLocaleString()}
        </div>
        <div className="stockSearch">
          <input placeholder="Symbol..." onChange={handleStockInput}></input>
          <button type="submit" onClick={handleStockSearch}>Search</button>
        </div>
        <div className="buttons">
          <button type="submit" onClick={() => { handleBuyStock(stockSymbol, stockPrice); }}>Buy</button>
          <button type="submit">YOLO</button>
        </div>
      </div>
    </div>
  );
};

export default StockResearch;
