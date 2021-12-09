/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState } from 'react';

const StockTile = ({ stockObj, getPortfolio, incrementStockQuantity, setStockSymbol }) => {
  const [stockPrice, setStockPrice] = useState(0.00);

  const updateStockPrice = () => {
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

  const getStockPrice = () => {
    axios.get(`http://localhost:3000/api/stocks/${stockObj.stockSymbol}/price`)
      .then((results) => {
        const price = results.data.price;
        setStockPrice(price);
        console.log('PRICE:', stockPrice);
        // return price;
      })
      .catch((err) => { console.log(err); });
  };

  const handleSellAllStock = () => {
    axios.delete(`http://localhost:3000/api/stocks/${stockObj.stockSymbol}`)
      .then(() => { setStockSymbol('TSLA'); })
      .then((results) => { getPortfolio(); })
      .catch((err) => { console.log(err); });
  };

  const handleSellStock = () => {
    axios.put('http://localhost:3000/api/stocks', { stockSymbol: stockObj.stockSymbol, quantity: stockObj.quantity - 1 })
      .then(() => {
        axios.get(`http://localhost:3000/api/stocks/${stockObj.stockSymbol}/quantity`)
          .then((results) => {
            if (results.data.quantity === 0) { handleSellAllStock(); }
          })
          .catch((err) => { console.log(err); });
      })
      .then((results) => { getPortfolio(); })
      .catch((err) => { console.log(err); });
  };

  getStockPrice();

  return (
    <div className="stockTile">
      <div className="stockTileLabels">
        <div className="stockSymbol">{stockObj.stockSymbol}</div>
        <div className="stockQuantity">{stockObj.quantity}</div>
        {/* <div className="stockPrice">{stockPrice}</div> */}
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
