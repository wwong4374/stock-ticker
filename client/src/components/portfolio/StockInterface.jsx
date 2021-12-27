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
  // VARIABLES
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]); // array of stockObj objects

  // HELPER FUNCTIONS
  const getPortfolio = () => {
    axios.get('/api/portfolio')
      .then((results) => { setPortfolio([...results.data]); })
      .catch((err) => { console.log(err); });
  };

  // COMPONENT
  return (
    <StockInterfaceContext.Provider value={{
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
