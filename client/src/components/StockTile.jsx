/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React from 'react';

const StockTile = ({ stockObj, getPortfolio }) => {
  const handleSellStock = () => {
    axios.put('http://localhost:3000/api/stocks', { stockSymbol: stockObj.stockSymbol, quantity: stockObj.quantity })
      .then((res) => {
        console.log('UPDATED');
        getPortfolio();
      })
      .catch((err) => { console.log(err); });
  }
  return (
    <div className="stockTile">
      <span className="stockSymbol">{stockObj.stockSymbol}</span>
      <span className="stockQuantity">{stockObj.quantity}</span>
      <button className="stockTileSellButton" onClick={handleSellStock}>Sell</button>
    </div>
  );
};

export default StockTile;
