DROP DATABASE IF EXISTS portfolio;

CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE trades (
  id INT PRIMARY KEY AUTO_INCREMENT,
  symbol VARCHAR(10),
  quantity INT,
  date DATE
);

CREATE TABLE prices (
  quoteId VARCHAR(20) PRIMARY KEY,
  symbol VARCHAR(10),
  price FLOAT,
  date DATE
);













-- ************************************************************************************

-- CREATE TABLE stocks (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   symbol VARCHAR(10),
--   company VARCHAR(30),
--   latestPrice FLOAT
-- );

-- CREATE TABLE trades (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   quantity INT,
--   price FLOAT,
--   date DATE,
--   stockID INT,
--   FOREIGN KEY (stockID) REFERENCES stocks(id)
-- );

-- INSERT INTO stocks (id, symbol, company, latestPrice)
-- VALUES (DEFAULT, 'TSLA', 500, 1010.10);

-- INSERT INTO stocks (id, symbol, company, latestPrice)
-- VALUES (DEFAULT, 'AAPL', 100, 161.84);

-- INSERT INTO stocks (id, symbol, company, latestPrice)
-- VALUES (DEFAULT, 'GM', 200, 59.71);

-- INSERT INTO stocks (id, symbol, company, latestPrice)
-- VALUES (DEFAULT, 'V', 1000, 196.32);

-- INSERT INTO stocks (id, symbol, company, latestPrice)
-- VALUES (DEFAULT, 'FB', 300, 777.77);

-- ************************************************************************************

-- CREATE TABLE stocks (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   stockSymbol VARCHAR(10),
--   quantity INT,
--   price FLOAT
-- );

-- CREATE TABLE trades (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   stockSymbol VARCHAR(10),
--   quantity INT,
--   executionPrice FLOAT,
--   tradeType VARCHAR (5),
--   date DATE
-- );

-- INSERT INTO stocks (id, stockSymbol, quantity, price)
-- VALUES (DEFAULT, 'TSLA', 500, 1010.10);

-- INSERT INTO stocks (id, stockSymbol, quantity, price)
-- VALUES (DEFAULT, 'AAPL', 100, 161.84);

-- INSERT INTO stocks (id, stockSymbol, quantity, price)
-- VALUES (DEFAULT, 'GM', 200, 59.71);

-- INSERT INTO stocks (id, stockSymbol, quantity, price)
-- VALUES (DEFAULT, 'V', 1000, 196.32);

-- INSERT INTO stocks (id, stockSymbol, quantity, price)
-- VALUES (DEFAULT, 'FB', 300, 777.77);