var express = require('express');
var countries = require('country-list')();

var app = express();

app.get('/country-list', function(req,res) {
	res.json(countries.getData());
});

app.use(express.static('static'));

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});