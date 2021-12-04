/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StockTile from './StockTile.jsx';

const StockPortfolio = ({ portfolio, getPortfolio, incrementStockQuantity }) => {
  // const [portfolio, setPortfolio] = useState([]);

  // const getPortfolio = () => {
  //   axios.get('http://localhost:3000/api/stocks')
  //     .then((res) => {
  //       const data = res.data;
  //       setPortfolio([...data]);
  //     })
  //     .catch((err) => { console.log(err); });
  // };

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <div className="stockPortfolio">
      <h2 className="stockPortfolioTitle">Portfolio</h2>
      <div className="stockPortfolioLabelContainer">
        <span className="stockPortfolioLabel">Company</span>
        <span className="stockPortfolioLabel">Quantity</span>
        <span className="stockPortfolioLabel">Price</span>
        {/* <span className="stockPortfolioLabel">Action</span> */}
      </div>
      <div className="stockTiles">
        {portfolio.map((stockObj) => {
          return <StockTile stockObj={stockObj} getPortfolio={getPortfolio} incrementStockQuantity={incrementStockQuantity} key={stockObj.stockSymbol}/>
        })}
      </div>
    </div>
  );
};

export default StockPortfolio;
