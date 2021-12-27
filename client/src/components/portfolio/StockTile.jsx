/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { StockInterfaceContext } from './StockInterface.jsx';

const StockTile = ({ stockObj }) => {
  const { symbol, quantity, costBasis, latestPrice } = stockObj;
  const { selectedStocks, setSelectedStocks } = useContext(StockInterfaceContext);
  const [className, setClassName] = useState('stockTile');
  const [stockPrice, setStockPrice] = useState(0.00);

  // HELPER FUNCTIONS
  const getStockPrice = () => {
    axios.get(`${host}/api/stocks/${symbol}/price`)
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
              console.log(selectedStocks);
              if (className === 'stockTile') {
                setClassName('stockTileClicked');
                setSelectedStocks([stockObj, ...selectedStocks]);
              } else {
                setClassName('stockTile');
                // TODO: Remove from selectedStocks array
                let stocks = selectedStocks;
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="stockTileLabels">
              <div className="stockSymbol">{symbol}</div>
              <div className="stockQuantity">{quantity}</div>
              <div className="stockCostBasis">{`$${Math.round((costBasis * 100) / 100).toFixed(2)}`}</div>
              <div className="marketValue">{`$${Math.round(((quantity * latestPrice) * 100) / 100).toFixed(2)}`}</div>
              <div className="gainLoss">{`$${Math.round((quantity * latestPrice) - costBasis).toFixed(2)}`}</div>
              <div className="stockPrice">{`$${Math.round((latestPrice * 100) / 100).toFixed(2)}`}</div>
            </div>
          </div>
        );
      }}
    </StockInterfaceContext.Consumer>
  );
};

export default StockTile;
