var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/stocks',
  params: {exchange: 'NASDAQ', format: 'json'},
  headers: {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '1b1e7cf330mshfe2a919e34e9dd1p12059bjsna4c74a6efb05'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});