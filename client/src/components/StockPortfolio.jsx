/* eslint-disable react/function-component-definition */
/* eslint-disable comma-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StockTile from './StockTile.jsx';

const StockPortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  const getPortfolio = () => {
    axios.get('http://localhost:3000/api/stocks')
      .then((res) => {
        const data = res.data;
        // setPortfolio(data);
        setPortfolio([...data]);
        console.log(res.data);
      })
      // .then(() => {
      //   console.log('PORTFOLIO:', portfolio);
      // })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getPortfolio();
  }, []);


  return (
    <div className="stockPortfolio">
      <h3 className="stockPortfolioTitle">Portfolio</h3>
      <div className="stockPortfolioLabelContainer">
        <span className="stockPortfolioLabel">Company</span>
        <span className="stockPortfolioLabel">Quantity</span>
        <span className="stockPortfolioLabel">Action</span>
      </div>
      {portfolio.map((stockObj) => {
        return <StockTile stockObj={stockObj} getPortfolio={getPortfolio}/>
      })}
    </div>
  );
};

export default StockPortfolio;
