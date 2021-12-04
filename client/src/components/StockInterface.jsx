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
  const [stockPriceHistory, setStockPriceHistory] = useState(stockPriceObj);
  // const [stockPriceHistory, setStockPriceHistory] = useState({});
  const timeSeriesMapping = {
    TIME_SERIES_DAILY: 'Time Series (Daily)',
    TIME_SERIES_WEEKLY: 'Weekly Time Series'
  };

  // HELPER FUNCTIONS
  const capitalizeStockSymbol = (symbol) => { setStockSymbol(symbol.toUpperCase()); };

  const updateStockPrice = () => {
    // Find latest price of current stock
    const priceHistoryKeys = Object.keys(stockPriceHistory);
    const priceHistoryDates = [];
    priceHistoryKeys.forEach((dateString) => {
      priceHistoryDates.push(new Date(dateString));
    });
    priceHistoryDates.sort((a, b) => (a - b));
    const latestDate = priceHistoryDates[priceHistoryDates.length - 1];
    const latestYear = latestDate.getUTCFullYear();
    const latestMonth = latestDate.getUTCMonth() + 1;
    const latestMonthString = latestMonth > 9 ? latestMonth.toString() : `0${latestMonth.toString()}`;
    const latestDay = latestDate.getUTCDate();
    const latestDayString = latestDay > 9 ? latestDay.toString() : `0${latestDay.toString()}`;
    const latestPriceKey = `${latestYear}-${latestMonthString}-${latestDayString}`;
    const latestStockPrice = stockPriceHistory[latestPriceKey]['4. close'];
    setStockPrice(latestStockPrice);
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
      })
      .then(() => {
        console.log(stockPriceHistory);
        updateStockPrice();
      })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getStockPriceHistory();
  }, [stockSymbol]);

  // useEffect(() => {
  //   updateStockPrice();
  // });

  // CLICK HANDLERS
  const handleBuyStock = () => {

  };

  const handleSellStock = () => {

  };

  const handleStockInput = (e) => {
    setStockToSearch(stockToSearch + e.nativeEvent.data);
    console.log(stockToSearch);
  };
  const handleStockSearch = () => {
    setStockSymbol(stockToSearch);
    updateStockPrice();
    setStockToSearch('');
  };

  return (
    <div className="stockInterface">
      <div className="stockPrice">
        {stockSymbol}
        {':'}
        {' '}
        {'$'}
        {Math.round(stockPrice * 100) / 100}
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleBuyStock}>Buy</button>
        {/* <button type="submit" onClick={handleSellStock}>Sell</button> */}
        <button type="submit">YOLO</button>
      </div>
      <div>
        <input placeholder="Enter stock ticker..." onChange={handleStockInput}></input>
        <button type="submit" onClick={handleStockSearch}>Search</button>
      </div>
      <StockPortfolio />
    </div>
  );
};

export default StockInterface;
