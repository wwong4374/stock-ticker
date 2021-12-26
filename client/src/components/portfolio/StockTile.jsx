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

  // const updateStocksToDisplay = () => {
  //   let stocksToDisplay = '';
  //   selectedStocks.forEach((stockObj) => {
  //     stocksToDisplay += stockObj.stockSymbol;
  //   });
  //   setSelectedStocksString(stocksToDisplay);
  // }

  // getStockPrice();

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
              } else { setClassName('stockTile'); }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="stockTileLabels">
              <div className="stockSymbol">{stockObj.symbol}</div>
              <div className="stockQuantity">{stockObj.quantity}</div>
              <div className="stockCostBasis">{`$${stockObj.costBasis}`}</div>
              <div className="marketValue">{`$${(stockObj.quantity * stockObj.latestPrice).toLocaleString()}`}</div>
              <div className="stockPrice">{`$${stockObj.latestPrice}`}</div>
            </div>
          </div>

        );
      }}
    </StockInterfaceContext.Consumer>
  );
};

export default StockTile;
