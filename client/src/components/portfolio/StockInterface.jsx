/* eslint-disable react/self-closing-comp */
/* eslint-disable import/extensions */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App.jsx';
import StockPortfolio from './StockPortfolio.jsx';

export const StockInterfaceContext = React.createContext();

export const StockInterface = () => {
  const { host } = useContext(AppContext);
  const [timeInterval, setTimeInterval] = useState('TIME_SERIES_DAILY');
  const [selectedStock, setSelectedStock] = useState(null);
  const [tickerSymbols, setTickerSymbols] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]); // array of stockObj objects
  const timeSeriesMapping = {
    TIME_SERIES_DAILY: 'Time Series (Daily)',
    TIME_SERIES_WEEKLY: 'Weekly Time Series'
  };

  // HELPER FUNCTIONS
  // const getSymbols = () => {
  //   const symbols = [];
  //   axios.get('/api/portfolio/symbols')
  //     .then((results) => { results.data.forEach((symbolObj) => { symbols.push(symbolObj); }); })
  //     .then(() => { setTickerSymbols(symbols); })
  //     .catch((err) => { console.log(err); });
  // };

  const getPortfolio = () => {
    axios.get('/api/portfolio')
      .then((results) => { setPortfolio([...results.data]); })
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
      // .then((results) => { getSymbols(); })
      .catch((err) => { console.log(err); });
  };

  return (
    <StockInterfaceContext.Provider value={{
      setSelectedStock,
      selectedStocks,
      setSelectedStocks,
      portfolio,
      getPortfolio
    }}>
      <span className="stockPortfolioTitle">Portfolio</span>
      <div className="stockInterface">
        <StockPortfolio />
      </div>
    </StockInterfaceContext.Provider>
  );
};
