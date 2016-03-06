const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new  Schema({
  id: String,
  title: String
});

module.exports = mongoose.model('Role', roleSchema);