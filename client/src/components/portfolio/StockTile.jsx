/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState } from 'react';
import { StockInterfaceContext } from './StockInterface';

const StockTile = ({
  stockObj,
  selectedStocks,
  setSelectedStocks
}) => {
  const [className, setClassName] = useState('stockTile');
  const [stockPrice, setStockPrice] = useState(0.00);

  // HELPER FUNCTIONS
  const getStockPrice = () => {
    axios.get(`${host}/api/stocks/${stockObj.stockSymbol}/price`)
      .then((results) => {
        const price = results.data.price;
        setStockPrice(price);
      })
      .catch((err) => { console.log(err); });
  };

  return (
    <StockInterfaceContext.Consumer>
      {() => {
        return (
          <div
            className={className}
            onClick={() => {
              if (className === 'stockTile') {
                setClassName('stockTileClicked');
                setSelectedStocks([stockObj, ...selectedStocks]);
              } else {
                setClassName('stockTile');
                // TODO: Remove from selectedStocks array
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="stockTileLabels">
              <div className="stockSymbol">{stockObj.symbol}</div>
              <div className="stockQuantity">{stockObj.quantity}</div>
              <div className="stockCostBasis">{`$${Math.round((stockObj.costBasis * 100) / 100).toFixed(2)}`}</div>
              <div className="marketValue">{`$${Math.round(((stockObj.quantity * stockObj.latestPrice) * 100) / 100).toFixed(2)}`}</div>
              <div className="stockPrice">{`$${Math.round((stockObj.latestPrice * 100) / 100).toFixed(2)}`}</div>
            </div>
          </div>

        );
      }}
    </StockInterfaceContext.Consumer>
  );
};

export default StockTile;
