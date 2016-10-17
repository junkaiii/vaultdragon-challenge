//Server.js -----

//Calling dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Object = require('./models/object');

//configure app to use bodyParser() to endable us to get data from POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


//test route
app.get('/', function(req, res) {
  res.json({
    message: 'API connected'
  });
});

//post route
app.post('/object', function(req, res) {
  var input = new Object();

  var ts = Math.round((new Date()).getTime() / 1000);

  input.object = req.body.object;
  input.data = req.body.data;
  input.utc = ts;

  input.save(function(err) {
    if (err) {
      return res.send(err);
    }
    return res.json({
      message: 'object saved!'
    });
  });
});

//get all objects
app.get('/objects', function(req, res) {
  Object.find(function(err, objects) {
    if (err) {
      return res.send(err);
    }
    return res.json(objects);
  });
});



//get object according to id
app.get('/object/:object', function(req, res) {
  console.log(req.query.timestamp);
  if (req.query.timestamp != null) {
    Object.find({
      object: req.params.object,
      utc: {
        $lte: req.query.timestamp
      }
    }).sort({utc: -1})
      .limit(1)
      .exec(function(err, object){
        if (err) {
          return res.send(err);
        }
        return res.json(object);
      });
  } else {
    Object.find({
      object: req.params.object
    }).sort({utc: -1})
      .limit(1)
      .exec(function(err, object){
        if (err) {
          return res.send(err);
        }
        return res.json(object);
      });

  }
});

//connecting to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://junkaiii:4480866l@ds139715.mlab.com:39715/vaultdragon-codetest');

//setting up port
var port = process.env.PORT || 1337;

//start Server
app.listen(port);
console.log('server up');
