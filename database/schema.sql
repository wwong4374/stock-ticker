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
