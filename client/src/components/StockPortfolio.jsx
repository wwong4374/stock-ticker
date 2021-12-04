/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StockTile from './StockTile.jsx';

const StockPortfolio = ({ portfolio, getPortfolio, incrementStockQuantity }) => {

  useEffect(() => {
    getPortfolio();
  }, []);

  console.log(portfolio);

  const getPortfolioValue = () => {
    let portfolioValue = 0;
    // Iterate portfolio, an array of objects
    portfolio.forEach((stockObj) => {
      // For current object
        // Get stockSymbol
        // Get quantity
        // Get current price
        
        // Get current market value
        // Increment portfolio value
    });
    // return portfolio value
  };

  return (
    <div className="stockPortfolio">
      <span className="stockPortfolioTitle">Portfolio</span>
      <span className="stockPortfolioValue">{`$${getPortfolioValue}`}</span>
      <div className="stockPortfolioLabelContainer">
        <span className="stockPortfolioLabel">Company</span>
        <span className="stockPortfolioLabel">Quantity</span>
        <span className="stockPortfolioLabel">Price</span>
        <span className="stockPortfolioLabel">Market Value</span>
      </div>
      <div className="stockTiles">
        {portfolio.map((stockObj) => {
          return <StockTile stockObj={stockObj} getPortfolio={getPortfolio} incrementStockQuantity={incrementStockQuantity} key={stockObj.stockSymbol}/>
        })}
      </div>
    </div>
  );
};

export default StockPortfolio;
