var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ObjectSchema = new Schema({
  object: String,
  data: String,
  utc: Number
},
  {
    timestamps: true
  }
);

ObjectSchema.virtual('this.' + this.object).get(function () {
  return this.data;
});
// console.log(this.data); // Walter White is insane

module.exports = mongoose.model('Object', ObjectSchema);
