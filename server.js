var express = require('express');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'DELETE PUT GET POST');
  res.header("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type, Accept');
});

app.use(express.static('www'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
 console.log("listening to Port", app.get("port"));
});
