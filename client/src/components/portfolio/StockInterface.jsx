/* eslint-disable react/self-closing-comp */
/* eslint-disable import/extensions */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import helperFunctions from '../../helperFunctions.js';
import { AppContext } from '../App.jsx';
import StockPortfolio from './StockPortfolio.jsx';

export const StockContext = React.createContext();

export const StockInterface = () => {
  const { host } = useContext(AppContext);
  const [timeInterval, setTimeInterval] = useState('TIME_SERIES_DAILY');
  const [stockPriceHistory, setStockPriceHistory] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);
  const [portfolio, setPortfolio] = useState([]); // array of stockObj objects
  const timeSeriesMapping = {
    TIME_SERIES_DAILY: 'Time Series (Daily)',
    TIME_SERIES_WEEKLY: 'Weekly Time Series'
  };

  // HELPER FUNCTIONS
  const getStockPriceHistory = () => {
    axios.get('https://alpha-vantage.p.rapidapi.com/query', {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
      },
      params: {
        function: timeInterval,
        symbol: stockSymbol,
        datatype: 'json',
        outputsize: 'compact'
      }
    })
      .then((results) => {
        const timeSeriesKey = timeSeriesMapping[timeInterval];
        const priceHistory = results.data[timeSeriesKey];
        setStockPriceHistory({ ...priceHistory });
        getPrice();
      })
      .catch((err) => { console.log(err); });
  };

  const getPortfolio = () => {
    axios.get(`${host}/api/stocks`)
      .then((results) => {
        const data = results.data;
        setPortfolio([...data]);
      })
      .catch((err) => { console.log(err); });
  };

  // const addStockToPortfolio = () => {
  //   axios.post(`${host}/api/stocks`, { stockSymbol: stockSymbol, quantity: 1 })
  //     .then()
  //     .catch((err) => { console.log(err); });
  // };

  // HELPER FUNCTIONS AND CLICK HANDLERS
  const addTradeToDB = (tradeType) => {
    axios.post();
  };

  const incrementStockQuantity = () => {
    let quantity = 0;
    axios.get(`${host}/api/stocks/${stockSymbol}/quantity`)
      .then((results) => { quantity = results.data.quantity; })
      .then(() => {
        axios.put(`${host}/api/stocks`, { stockSymbol: stockSymbol, quantity: quantity + 1 })
          .then((results) => { getPortfolio(); })
          .catch((err) => { console.log(err); });
      })
      .catch((err) => { console.log(err); });
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

  const handleSellStock = () => {
    axios.put(`${host}/api/stocks`, { stockSymbol: stockObj.stockSymbol, quantity: stockObj.quantity - 1 })
      .then(() => {
        axios.get(`${host}/api/stocks/${stockObj.stockSymbol}/quantity`)
          .then((results) => {
            if (results.data.quantity === 0) { handleSellAllStock(); }
          })
          .catch((err) => { console.log(err); });
      })
      .then((results) => { getPortfolio(); })
      .catch((err) => { console.log(err); });
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
      .then((results) => { setStockPrice(Math.round(results.data['Global Quote']['05. price'] * 100) / 100); })
      .catch((err) => { console.log(err); });
  };

  const handleSellAllStock = () => {
    axios.delete(`${host}/api/stocks/${stockObj.stockSymbol}`)
      .then(() => { setStockSymbol('TSLA'); })
      .then((results) => { getPortfolio(); })
      .catch((err) => { console.log(err); });
  };

  return (
    <StockContext.Provider value={{ setSelectedStock }}>
      <span className="stockPortfolioTitle">Portfolio</span>
      <div className="stockInterface">
        <StockPortfolio
          portfolio={portfolio}
          getPortfolio={getPortfolio}
          incrementStockQuantity={incrementStockQuantity}
          host={host}
        />
      </div>
    </StockContext.Provider>
  );
};
