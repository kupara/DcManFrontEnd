var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var docSchema = new Schema({
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  dateCreated: Date,
  lastModified: Date
});

module.exports = mongoose.model('Document', docSchema);