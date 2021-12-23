/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState } from 'react';
import { StockContext } from './StockInterface';

const StockTile = ({
  stockObj,
  selectedStocks,
  setSelectedStocks,
  selectedStocksString,
  setSelectedStocksString,
  host }) => {
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

  // const updateStocksToDisplay = () => {
  //   let stocksToDisplay = '';
  //   selectedStocks.forEach((stockObj) => {
  //     stocksToDisplay += stockObj.stockSymbol;
  //   });
  //   setSelectedStocksString(stocksToDisplay);
  // }

  getStockPrice();

  return (
    <StockContext.Consumer>
      {() => {
        return (
          <div
            className={className}
            onClick={() => {
              if (className === 'stockTile') {
                setClassName('stockTileClicked');
                setSelectedStocks([stockObj, ...selectedStocks]);
                // updateStocksToDisplay();
                // if (selectedStocksString.length === 0) {
                //   setSelectedStocksString(stockObj.stockSymbol);
                // } else {
                //   setSelectedStocksString(selectedStocksString + ', ' + stockObj.stockSymbol);
                // }
              } else { setClassName('stockTile'); }
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

        );
      }}
    </StockContext.Consumer>
  );
};

export default StockTile;
