const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
  id: Number,
  ownerId: Number,
  title: String,
  content: String,
  dateCreated: {
    type: Date, 
    default: Date.now()
  },
  lastModified: Date
});

module.exports = mongoose.model('Document', docSchema);