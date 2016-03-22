(function() {
  'use strict';
  const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    roles = ['admin', 'owner', 'viewer', 'tester'];
  
  const roleSchema = new  Schema({
    title: {
      type: String,
      enum: roles,
      required: true,
      unique: true
    }
  });

  module.exports = mongoose.model('Role', roleSchema);
})();