/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import StockTile from './StockTile.jsx';

const StockPortfolio = ({ portfolio, getPortfolio, incrementStockQuantity, setStockSymbol, host }) => {
  useEffect(() => { getPortfolio(); }, []);

  // TODO: Implement getPortfolioValue function
  const getPortfolioValue = () => {
    let portfolioValue = 0;
    portfolio.forEach((stockObj) => {});
  };

  return (
    <div className="stockPortfolio">
      <span className="stockPortfolioTitle">Portfolio</span>
      <div className="stockPortfolioLabelContainer">
        <span className="stockPortfolioLabel">Company</span>
        <span className="stockPortfolioLabel">Quantity</span>
        <span className="stockPortfolioLabel">Price</span>
        <span className="stockPortfolioLabel">Market Value</span>
      </div>
      <div className="stockTiles">
        {portfolio.map((stockObj) => {
          return <StockTile stockObj={stockObj} getPortfolio={getPortfolio} incrementStockQuantity={incrementStockQuantity} setStockSymbol={setStockSymbol} host={host} key={stockObj.stockSymbol}/>
        })}
      </div>
    </div>
  );
};

export default StockPortfolio;
