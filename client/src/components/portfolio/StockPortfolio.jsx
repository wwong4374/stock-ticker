/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StockTile from './StockTile.jsx';

const StockPortfolio = ({ portfolio, getPortfolio, incrementStockQuantity, setStockSymbol, host }) => {
  const [cash, setCash] = useState(10000);
  const [selectedStocks, setSelectedStocks] = useState([]);

  const getPortfolioValue = () => { // TODO: Implement this function
    let portfolioValue = 0;
    portfolio.forEach((stockObj) => {});
  };

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
      // .then((results) => { setStockPrice(Math.round(results.data['Global Quote']['05. price'] * 100) / 100); })
      .catch((err) => { console.log(err); });
  };

  const handleBuySelectedStocks = () => {
    selectedStocks.forEach();
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
      .then(getPortfolio)
      .catch((err) => { console.log(err); });
  };

  const handleSellSelectedStocks = () => {
    selectedStocks.forEach();
  };

  const handleSellStock = (stockObj) => {
    axios.put(`${host}/api/stocks`, { stockSymbol: stockObj.stockSymbol, quantity: stockObj.quantity - 1 })
      .then(() => {
        axios.get(`${host}/api/stocks/${stockObj.stockSymbol}/quantity`)
          .then((results) => {
            if (results.data.quantity === 0) { handleSellAllShares(); }
          })
          .catch((err) => { console.log(err); });
      })
      .then((results) => { getPortfolio(); })
      .catch((err) => { console.log(err); });
  };

  const handleSellAllShares = (stockObj) => {
    axios.delete(`${host}/api/stocks/${stockObj.stockSymbol}`)
      .then(() => { setStockSymbol('TSLA'); })
      .then((results) => { getPortfolio(); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => { getPortfolio(); }, []);

  return (
    <>
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
                host={host}
                key={stockObj.stockSymbol}
              />
            );
          })}
        </div>
      </div>
      <div className="stockTileButtons">
        {/* <button type="button" className="stockTileButton" onClick={() => { incrementStockQuantity(stockObj.stockSymbol); }}>Buy</button> */}
        <button type="button" className="stockTileButton" onClick={handleBuySelectedStocks}>Buy</button>
        <button type="button" className="stockTileButton" onClick={handleSellSelectedStocks}>Sell</button>
        <button type="button" className="stockTileButton" onClick={updateStockPrice}>Quote</button>
        <button type="button" className="stockTileButton" onClick={handleSellAllShares}>Sell All Shares</button>
      </div>
    </>
  );
};

export default StockPortfolio;
