DROP DATABASE IF EXISTS stockPortfolio;

CREATE DATABASE stockPortfolio;

USE stockPortfolio;

CREATE TABLE stocks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stockSymbol VARCHAR(10),
  quantity INT
);