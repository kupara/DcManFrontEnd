var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new  Schema({
  id: String,
  title: String
});

module.exports = mongoose.model('Role', roleSchema);