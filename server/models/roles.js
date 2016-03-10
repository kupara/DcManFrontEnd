const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = ['admin', 'viewer', 'contributor', 'owner'];
const roleSchema = new  Schema({
  id: String,
  title: {
    type: String,
    enum: roles,
    required: true
  }
});

module.exports = mongoose.model('Role', roleSchema);