var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KeySchema = new Schema({
  key: String,
  data: String
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Key', KeySchema);
