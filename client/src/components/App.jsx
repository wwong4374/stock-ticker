/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import React from 'react';
// import { Switch } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/NavBar.jsx';
import { StockInterface } from './portfolio/StockInterface.jsx';
import StockResearch from './research/StockResearch.jsx';
import StockGraph from './graph/StockGraph.jsx';

export const AppContext = React.createContext();

export const App = () => {
  // VARIABLES
  const host = 'http://localhost:1234';
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;

  // FUNCTIONS
  const saveLatestPrice = (symbol, price) => {
    axios.post('/api/prices', {
      symbol: symbol,
      price: price,
      date: today
    })
      .then()
      .catch((err) => { console.log(err); });
  };

  const handleBuyStock = (symbol) => {
    axios.post('/api/trades', {
      symbol: symbol,
      quantity: 1,
      date: today
    })
      .then(() => { alert(`Bought 1 share of ${symbol}!`); })
      .catch((err) => { console.log(err); });
  };

  const handleSellStock = (symbol) => {
    axios.post('/api/trades', {
      symbol: symbol,
      quantity: -1,
      date: today
    })
      .then()
      .catch((err) => { console.log(err); });
  };

  return (
    <AppContext.Provider value={{ host, handleBuyStock, handleSellStock, saveLatestPrice }}>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<StockInterface />} />
        <Route path="/research" element={<StockResearch />} />
        <Route path="/graph" element={<StockGraph />} />
      </Routes>
    </AppContext.Provider>
  );
};
