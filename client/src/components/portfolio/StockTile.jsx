/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
import React, { useContext, useState } from 'react';
import { StockInterfaceContext } from './StockInterface.jsx';

const StockTile = ({ stockObj }) => {
  // VARIABLES
  const { symbol, quantity, costBasis, earliestPrice, latestPrice, earliestDate, latestDate } = stockObj;
  const { selectedStocks, setSelectedStocks } = useContext(StockInterfaceContext);
  const [className, setClassName] = useState('stockTile');
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const startDate = new Date(earliestDate);
  const currentDate = new Date();
  const daysElapsed = Math.round(Math.abs((currentDate - startDate) / oneDay));

  // COMPONENT
  return (
    <StockInterfaceContext.Consumer>
      {() => {
        return (
          <div
            className={className}
            onClick={() => {
              if (className === 'stockTile') {
                // Add the clicked stock to selectedStocks
                setClassName('stockTileClicked');
                setSelectedStocks([stockObj, ...selectedStocks]);
              } else {
                // Remove the unclicked stock from selectedStocks
                setClassName('stockTile');
                const stocks = selectedStocks;
                const stockToRemove = stocks.find((stock) => { return stock.symbol === symbol; });
                const indexToRemove = stocks.indexOf(stockToRemove);
                stocks.splice(indexToRemove, 1);
                setSelectedStocks(stocks);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="stockTileLabels">
              <div className="stockSymbol">{symbol}</div>
              <div className="stockQuantity">{quantity}</div>
              <div className="stockCostBasis">{`$${((costBasis * 100) / 100).toFixed(2)}`}</div>
              <div className="marketValue">{`$${(((quantity * latestPrice) * 100) / 100).toFixed(2)}`}</div>
              <div className="gainLoss">{`$${((quantity * latestPrice) - costBasis).toFixed(2)}`}</div>
              <div className="averagePerformance">
                {`${((((latestPrice - earliestPrice) / earliestPrice) * (365 / daysElapsed) * 100) / 100).toFixed(2)}%`}
              </div>
              <div className="stockPrice">{`$${((latestPrice * 100) / 100).toFixed(2)}`}</div>
            </div>
          </div>
        );
      }}
    </StockInterfaceContext.Consumer>
  );
};

export default StockTile;
