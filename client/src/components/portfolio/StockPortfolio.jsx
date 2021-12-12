/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StockTile from './StockTile.jsx';

const StockPortfolio = ({ portfolio, getPortfolio, incrementStockQuantity, setStockSymbol, host }) => {
  const [cash, setCash] = useState(10000);
  const [selectedStocks, setSelectedStocks] = useState([]);

  // TODO: Implement getPortfolioValue function
  const getPortfolioValue = () => {
    let portfolioValue = 0;
    portfolio.forEach((stockObj) => {});
  };

  const handleBuyStock = () => {
    axios.get(`${host}/api/stocks/symbols`)
      .then((results) => {
        const stockSymbolsInPortfolio = results.data;
        if (stockSymbolsInPortfolio.includes(stockSymbol)) {
          incrementStockQuantity();
        } else {
          addStockToPortfolio();
        }
      })
      .then(() => { getPortfolio; })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => { getPortfolio(); }, []);

  return (
    <div className="stockPortfolio">
      <div className="stockPortfolioLabelContainer">
        <span className="stockPortfolioLabel">Company</span>
        <span className="stockPortfolioLabel">Quantity</span>
        <span className="stockPortfolioLabel">Price</span>
        <span className="stockPortfolioLabel">Market Value</span>
      </div>
      <div className="stockTiles">
        {portfolio.map((stockObj) => {
          return (
            <StockTile
              stockObj={stockObj}
              selectedStocks={selectedStocks}
              // getPortfolio={getPortfolio}
              // incrementStockQuantity={incrementStockQuantity}
              // setStockSymbol={setStockSymbol}
              host={host}
              key={stockObj.stockSymbol}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StockPortfolio;
