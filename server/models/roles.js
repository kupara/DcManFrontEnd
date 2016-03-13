(function() {
  'use strict';
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const roles = ['admin', 'viewer', 'contributor', 'owner'];
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