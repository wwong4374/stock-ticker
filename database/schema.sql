DROP DATABASE IF EXISTS stockPortfolio;

CREATE DATABASE stockPortfolio;

USE stockPortfolio;

CREATE TABLE stocks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stockSymbol VARCHAR(10),
  quantity INT
);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (DEFAULT, 'TSLA', 500);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (DEFAULT, 'AAPL', 100);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (DEFAULT, 'GM', 200);

INSERT INTO stocks (id, stockSymbol, quantity)
VALUES (DEFAULT, 'V', 1000);