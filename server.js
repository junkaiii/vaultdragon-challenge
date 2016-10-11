//Server.js -----

//Calling dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var Key = require('./models/key');


//setting up port
var port = process.env.PORT || 1337;

//start Server
app.listen(port);
console.log('server up');

//configure app to use bodyParser() to endable us to get data from POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//set up middleware
router.use(function(req, res, next) {
  console.log('something is happening');
  next();
});

//test route
router.get('/', function(req, res) {
  res.json({
    message: 'api connected!'
  });
});

//set all routes to be with /api prefix
app.use('/api', router);

//post route
router.post('/keys', function(req, res) {
  var input = new Key(); //create new key instance
  input.key = req.body.key; //set key value from input

  input.save(function(err) {
    if (err) {
      return res.send(err);
    }
    return res.json({
      message: 'key saved!'
    });
  });
});

//get route
router.get('/keys', function(req,res) {
  Key.find(function(req,res){
    if (err) {
      return res.send(err);
    }
    return res.json(keys);
  });
});




//connecting to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://junkaiii:4480866l@ds139715.mlab.com:39715/vaultdragon-codetest');
