/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState } from 'react';

const StockTile = ({ stockObj, getPortfolio, incrementStockQuantity, setStockSymbol, host }) => {
  const [className, setClassName] = useState('stockTile');
  const [stockPrice, setStockPrice] = useState(0.00);
  const [stockTileClicked, setStockTileClicked] = useState(false);

  const getStockPrice = () => {
    axios.get(`${host}/api/stocks/${stockObj.stockSymbol}/price`)
      .then((results) => {
        const price = results.data.price;
        setStockPrice(price);
      })
      .catch((err) => { console.log(err); });
  };

  getStockPrice();

  return (
    <div
      className={className}
      onClick={() => {
        if (className === 'stockTile') { setClassName('stockTileClicked'); }
        else { setClassName('stockTile'); }

      }}
    >
      <div className="stockTileLabels">
        <div className="stockSymbol">{stockObj.stockSymbol}</div>
        <div className="stockQuantity">{stockObj.quantity}</div>
        <div className="stockPrice">{`$${stockPrice}`}</div>
        <div className="marketValue">{`$${(stockObj.quantity * stockPrice).toLocaleString()}`}</div>
      </div>
      {/* <div className="stockTileButtons">
        <button className="stockTileButton" onClick={() => { incrementStockQuantity(stockObj.stockSymbol); }}>Buy</button>
        <button className="stockTileButton" onClick={handleSellStock}>Sell</button>
        <button className="stockTileButton" onClick={updateStockPrice}>Quote</button>
        <button className="stockTileButton" onClick={handleSellAllStock}>Sell All</button>
      </div> */}
    </div>
  );
};

export default StockTile;
