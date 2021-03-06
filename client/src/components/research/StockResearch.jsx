/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';

const StockResearch = () => {
  // VARIABLES
  const { handleBuyStock, saveLatestPrice } = useContext(AppContext);
  const [stockSymbol, setStockSymbol] = useState('TSLA');
  const [stockToSearch, setStockToSearch] = useState('');
  const [stockPrice, setStockPrice] = useState(0);

  // HELPER FUNCTIONS
  const getPrice = (symbol) => {
    axios.get('https://alpha-vantage.p.rapidapi.com/query', {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
      },
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        datatype: 'json'
      }
    })
      .then((results) => {
        saveLatestPrice(symbol, Number(results.data['Global Quote']['05. price']));
        setStockPrice(results.data['Global Quote']['05. price']);
      })
      .catch((err) => { console.log(err); });
  };

  const handleStockInput = (e) => { setStockToSearch(e.nativeEvent.target.value); };

  const handleStockSearch = () => {
    if (stockToSearch === '') {
      alert('Please enter a stock symbol.');
      return;
    }
    setStockSymbol(stockToSearch.toUpperCase());

    if (stockPrice === undefined || Number.isNaN(stockPrice)) {
      alert('Please enter a valid stock symbol.');
      setStockToSearch('');
      return;
    }

    getPrice(stockSymbol);
    setStockPrice(Math.round(stockPrice * 100) / 100);
    setStockToSearch('');
  };

  // USEEFFECT
  useEffect(() => {
    getPrice(stockSymbol);
  }, [stockSymbol]);

  // COMPONENT
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
