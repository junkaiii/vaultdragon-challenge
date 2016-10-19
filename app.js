//Server.js -----

//Calling dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Obj = require('./models/object');

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
  var input = new Obj();

  var ts = Math.round((new Date()).getTime() / 1000);

  var obj = req.body;
  var propType = Object.keys(req.body)[0];
  var property = req.body[Object.keys(req.body)[0]];
  // console.log(Object.keys(obj));

  //req.body[Object.key(req.body)[0]]
  input.object = propType;
  input.data = property;
  input.utc = ts;

  input.save(function(err) {
    if (err) {
      return res.send(err);
    }
    output = {};
    output[propType] = input.data;
    output.timestamp = input.utc;
    return res.json(output);
  });
});

//get all objects
app.get('/objects', function(req, res) {
  Obj.find(function(err, objects) {
    if (err) {
      return res.send(err);
    }
    return res.json(objects);
  });
});



//get object according to id
app.get('/object/:object', function(req, res) {
  if (req.query.timestamp != null) {
    Obj.find({
        object: req.params.object,
        utc: {
          $lte: req.query.timestamp
        }
      }).sort({
        utc: -1
      })
      .limit(1)
      .exec(function(err, objects) {
        if (err) {
          return res.send(err);
        }
        if (objects.length !== 0) {
          output = {};
          property = objects[0].object;
          output[property] = objects[0].data;
          output.timestamp = objects[0].utc;
          return res.json(output);
        } else {
          return res.json({message: 'not found!'});
        }
      });
  } else {
    Obj.find({
        object: req.params.object
      }).sort({
        utc: -1
      })
      .limit(1)
      .exec(function(err, objects) {
        if (err) {
          return res.send(err);
        }
        if (objects.length !== 0) {
          output = {};
          property = objects[0].object;
          output[property] = objects[0].data;
          output.timestamp = objects[0].utc;
          return res.json(output);
        } else {
          return res.json({message: 'not found!'});
        }
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
// console.log('server up');

module.exports = app;
