/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState } from 'react';

const StockTile = ({ stockObj, getPortfolio }) => {
  const [stockPrice, setStockPrice] = useState(0.00);
  const getThisStockPrice = () => {
    axios.get('https://alpha-vantage.p.rapidapi.com/query', {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
      },
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: stockObj.stockSymbol,
        datatype: 'json'
      }
    })
      .then((results) => {
        console.log(results.data['Global Quote']['05. price']);
        setStockPrice(Math.round(results.data['Global Quote']['05. price'] * 100) / 100);
      })
      .catch((err) => { console.log(err); });
  };

  const handleBuyStock = () => {
    axios.put('http://localhost:3000/api/stocks', { stockSymbol: stockObj.stockSymbol, quantity: stockObj.quantity + 1 })
      .then((res) => {
        getPortfolio();
      })
      .catch((err) => { console.log(err); });
  };

  const handleSellStock = () => {
    axios.put('http://localhost:3000/api/stocks', { stockSymbol: stockObj.stockSymbol, quantity: stockObj.quantity - 1 })
      .then((res) => {
        getPortfolio();
      })
      .catch((err) => { console.log(err); });
  };

  return (
    <div className="stockTile">
      <span className="stockSymbol">{stockObj.stockSymbol}</span>
      <span className="stockQuantity">{stockObj.quantity}</span>
      <span className="stockPrice">{`$${stockPrice}`}</span>
      <button className="stockTileButton" onClick={handleBuyStock}>Buy</button>
      <button className="stockTileButton" onClick={handleSellStock}>Sell</button>
      <button className="stockTileButton" onClick={getThisStockPrice}>Quote</button>
    </div>
  );
};

export default StockTile;
