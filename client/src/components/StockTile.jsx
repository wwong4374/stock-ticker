/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState } from 'react';
import { SelectedStockContext, SetSelectedStockContext } from './StockInterface';

const StockTile = ({ stockObj, getPortfolio, incrementStockQuantity, setStockSymbol, host }) => {
  const [className, setClassName] = useState('stockTile');
  const [stockPrice, setStockPrice] = useState(0.00);
  const [stockTileClicked, setStockTileClicked] = useState(false);

  const getStockPrice = () => {
    axios.get(`${host}/api/stocks/${stockObj.stockSymbol}/price`)
      .then((results) => {
        const price = results.data.price;
        setStockPrice(price);
      })
      .catch((err) => { console.log(err); });
  };

  getStockPrice();

  return (
    // <SelectedStockContext.Consumer>
      <SetSelectedStockContext.Consumer>
        <div
          className={className}
          onClick={() => {
            if (className === 'stockTile') { setClassName('stockTileClicked'); }
            else { setClassName('stockTile'); }
            setSelectedStock();
          }}
          role="button"
          tabIndex={0}
        >
          <div className="stockTileLabels">
            <div className="stockSymbol">{stockObj.stockSymbol}</div>
            <div className="stockQuantity">{stockObj.quantity}</div>
            <div className="stockPrice">{`$${stockPrice}`}</div>
            <div className="marketValue">{`$${(stockObj.quantity * stockPrice).toLocaleString()}`}</div>
          </div>
        </div>
      </SetSelectedStockContext.Consumer>
    // </SelectedStockContext.Consumer>
  );
};

export default StockTile;
