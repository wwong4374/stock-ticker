/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import StockTile from './StockTile.jsx';
import { AppContext } from '../App.jsx';
import { StockInterfaceContext } from './StockInterface.jsx';

const StockPortfolio = () => {
  // VARIABLES
  const { handleBuyStock, handleSellStock } = useContext(AppContext);
  const { portfolio, getPortfolio, selectedStocks } = useContext(StockInterfaceContext);
  const [selectedStocksString, setSelectedStocksString] = useState('');

  // FUNCTIONS
  const getPortfolioValue = () => { // TODO: Implement this function
    let portfolioValue = 0;
    portfolio.forEach((stockObj) => {});
  };

  const updateStockPrice = (symbol) => {
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
      // .then((results) => { setStockPrice(Math.round(results.data['Global Quote']['05. price'] * 100) / 100); })
      .catch((err) => { console.log(err); });
  };

  const handleBuySelectedStocks = () => {
    selectedStocks.forEach((stockObj) => { handleBuyStock(stockObj.symbol); });
    getPortfolio();
  };

  const handleSellSelectedStocks = () => {
    selectedStocks.forEach((stockObj) => { handleSellStock(stockObj.symbol); });
    getPortfolio();
  };

  const handleQuoteSelectedStocks = () => {};

  const handleSellAllShares = (stockObj) => {
    // axios.delete(`${host}/api/stocks/${stockObj.stockSymbol}`)
    //   .then(() => { setStockSymbol('TSLA'); })
    //   .then((results) => { getPortfolio(); })
    //   .catch((err) => { console.log(err); });
  };

  // USEEFFECT
  useEffect(() => { getPortfolio(); }, []);

  // COMPONENT
  return (
    <StockInterfaceContext.Consumer>
      {() => {
        return (
          <>
            <div className="stockPortfolio">
              <div className="stockPortfolioLabelContainer">
                <span className="stockPortfolioLabel">Company</span>
                <span className="stockPortfolioLabel">Quantity</span>
                <span className="stockPortfolioLabel">Cost Basis</span>
                <span className="stockPortfolioLabel">Current Value</span>
                <span className="stockPortfolioLabel">Gain/Loss</span>
                <span className="stockPortfolioLabel">Latest Price</span>
              </div>
              <div className="stockTiles">
                {portfolio.map((stockObj) => {
                  return (
                    <StockTile stockObj={stockObj} key={`${stockObj.symbol}-${stockObj.date}`} />
                  );
                })}
              </div>
            </div>
            <div>For selected stocks:</div>
            <div className="stockTileButtons">
              <button type="button" className="stockTileButton" onClick={handleBuySelectedStocks}>Buy</button>
              <button type="button" className="stockTileButton" onClick={handleSellSelectedStocks}>Sell</button>
              <button type="button" className="stockTileButton" onClick={handleQuoteSelectedStocks}>Quote</button>
              <button type="button" className="stockTileButton" onClick={handleSellAllShares}>Sell All Shares</button>
            </div>
          </>
        );
      }}
    </StockInterfaceContext.Consumer>
  );
};

export default StockPortfolio;
