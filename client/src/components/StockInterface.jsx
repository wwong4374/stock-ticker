/* eslint-disable import/extensions */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import stockPriceObj from './stockPriceObj.js';
import StockPortfolio from './StockPortfolio.jsx';

const StockInterface = () => {
  const [timeInterval, setTimeInterval] = useState('TIME_SERIES_DAILY');
  const [cash, setCash] = useState(10000);
  const [stockSymbol, setStockSymbol] = useState('TSLA');
  const [stockToSearch, setStockToSearch] = useState('');
  const [stockPrice, setStockPrice] = useState(0);
  // const [stockPriceHistory, setStockPriceHistory] = useState(stockPriceObj);
  const [stockPriceHistory, setStockPriceHistory] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const timeSeriesMapping = {
    TIME_SERIES_DAILY: 'Time Series (Daily)',
    TIME_SERIES_WEEKLY: 'Weekly Time Series'
  };

  // HELPER FUNCTIONS
  // const capitalizeStockSymbol = (symbol) => { setStockSymbol(symbol.toUpperCase()); };

  const getPrice = () => {
    axios.get('https://alpha-vantage.p.rapidapi.com/query', {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
      },
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: stockSymbol,
        datatype: 'json'
      }
    })
      .then((results) => {
        setStockPrice(Math.round(results.data['Global Quote']['05. price'] * 100) / 100);
      })
      .catch((err) => { console.log(err); });
  };

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
    axios.get('http://localhost:3000/api/stocks')
      .then((results) => {
        const data = results.data;
        setPortfolio([...data]);
      })
      .catch((err) => { console.log(err); });
  };

  const addStockToPortfolio = () => {
    axios.post('http://localhost:3000/api/stocks', { stockSymbol: stockSymbol, quantity: 1 })
      .then()
      .catch((err) => { console.log(err); });
  };

  // useEffect(() => {
  //   getStockPriceHistory();
  // }, [stockSymbol]);

  // useEffect(() => {
  //   getPrice();
  // }, [stockSymbol]);

  // CLICK HANDLERS
  const getStockQuantity = () => {
    let quantity = 0;
    axios.get(`http://localhost:3000/api/stocks/${stockSymbol}/quantity`)
      .then((results) => { quantity = results.data.quantity; })
      .then(() => { return quantity; })
      .catch((err) => { console.log(err); });
  };

  const incrementStockQuantity = () => {
    const quantity = getStockQuantity();
    axios.put('http://localhost:3000/api/stocks', { stockSymbol: stockSymbol, quantity: quantity + 1 })
      .then((results) => { getPortfolio(); })
      .catch((err) => { console.log(err); });
  };

  const getStockSymbolsInPortfolio = () => {
    axios.get('http://localhost:3000/api/stocks/symbols')
      .then((results) => {
        const stockSymbolsInPortfolio = results.data;
        if (stockSymbolsInPortfolio.includes(stockSymbol)) {
          // Add 1 to quantity
          incrementStockQuantity();
        } else {
          addStockToPortfolio();
        }
      })
      .catch((err) => { console.log(err); });
  };

  const handleBuyStock = () => {
    // Check database for current stockSymbol
    getStockSymbolsInPortfolio();
    // If already own the stock
      // Update quantity
    // Else
      // POST new stock to database
    // addStockToPortfolio();
    // getPortfolio();
  };

  const handleStockInput = (e) => {
    setStockToSearch(e.nativeEvent.target.value);
  };
  const handleStockSearch = () => {
    setStockSymbol(stockToSearch);
    getPrice();
    setStockToSearch('');
  };

  return (
    <div className="stockInterface">
      <h1>RobynHood</h1>
      <div className="stockPriceTitle">
        {stockSymbol}
        {':'}
        {' '}
        {'$'}
        {(Math.round(stockPrice * 100) / 100).toLocaleString()}
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleBuyStock}>Buy</button>
        <button type="submit">YOLO</button>
      </div>
      <div>
        <input placeholder="Ticker symbol..." onChange={handleStockInput}></input>
        <button type="submit" onClick={handleStockSearch}>Search</button>
      </div>
      <StockPortfolio portfolio={portfolio} getPortfolio={getPortfolio} incrementStockQuantity={incrementStockQuantity}/>
    </div>
  );
};

export default StockInterface;
