DROP DATABASE IF EXISTS stockPortfolio;

CREATE DATABASE stockPortfolio;

USE stockPortfolio;

CREATE TABLE stocks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stockSymbol VARCHAR(10),
  quantity INT,
  price FLOAT
);

INSERT INTO stocks (id, stockSymbol, quantity, price)
VALUES (DEFAULT, 'TSLA', 500, 1010.10);

INSERT INTO stocks (id, stockSymbol, quantity, price)
VALUES (DEFAULT, 'AAPL', 100, 161.84);

INSERT INTO stocks (id, stockSymbol, quantity, price)
VALUES (DEFAULT, 'GM', 200, 59.71);

INSERT INTO stocks (id, stockSymbol, quantity, price)
VALUES (DEFAULT, 'V', 1000, 196.32);

INSERT INTO stocks (id, stockSymbol, quantity, price)
VALUES (DEFAULT, 'FB', 300, 777.77);