DROP DATABASE IF EXISTS stockPortfolio;

CREATE DATABASE stockPortfolio;

USE stockPortfolio;

CREATE TABLE stocks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stockSymbol VARCHAR(10),
  quantity INT
);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (1, 'TSLA', 500);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (2, 'AAPL', 100);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (3, 'GM', 200);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (4, 'V', 1000);