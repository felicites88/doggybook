console.log('in server.js');

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');

var app = express();

var port = process.env.PORT || 8000;

app.use(express.static('client'));
app.use(bodyParser.json());


app.listen(port, function() {
  console.log("Server listening on port " + port);
});
