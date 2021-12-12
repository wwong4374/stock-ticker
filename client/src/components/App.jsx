/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './navbar/NavBar.jsx';
import { StockInterface } from './portfolio/StockInterface.jsx';
import StockResearch from './research/StockResearch.jsx';
import StockGraph from './graph/StockGraph.jsx';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<StockInterface />} />
        <Route path="/research" element={<StockResearch />} />
        <Route path="/graph" element={<StockGraph />} />
      </Routes>
    </Router>
  );
};

export default App;
