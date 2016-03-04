var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema  = new Schema({
  id: Number,
  username: String,
  name: {
  	firstname: String,
  	lastname: String
  },
  email: String,
  password: String,
  created_at: Date
});

module.exports = mongoose.model('User', userSchema);