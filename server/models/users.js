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
  password: String
}),

  

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Role', roleSchema);