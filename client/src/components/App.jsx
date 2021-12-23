/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/NavBar.jsx';
import { StockInterface } from './portfolio/StockInterface.jsx';
import StockResearch from './research/StockResearch.jsx';
import StockGraph from './graph/StockGraph.jsx';

export const AppContext = React.createContext();

export const App = () => {
  const host = 'http://localhost:1234';

  return (
    <AppContext.Provider value={host}>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<StockInterface />} />
        <Route path="/research" element={<StockResearch />} />
        <Route path="/graph" element={<StockGraph />} />
      </Routes>
    </AppContext.Provider>
  );
};
