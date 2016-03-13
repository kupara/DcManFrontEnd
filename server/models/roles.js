(function() {
  'use strict';
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const roles = ['admin', 'owner', 'viewer'];
  const roleSchema = new  Schema({
    title: {
      type: String,
      enum: roles,
      required: true,
      index: {
        unique: true
      }
    }
  });

  module.exports = mongoose.model('Role', roleSchema);
})();