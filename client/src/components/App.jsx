/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StockInterface } from './portfolio/StockInterface.jsx';
import StockPortfolio from './portfolio/StockPortfolio.jsx';
import StockGraph from './graph/StockGraph.jsx';
import NavBar from './navbar/NavBar.jsx';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* <Route path="/" exact element={<StockPortfolio />} /> */}
        <Route path="/" exact element={<StockInterface />} />
        <Route path="/graph" element={<StockGraph />} />
      </Routes>
    </Router>
  );
};

export default App;
