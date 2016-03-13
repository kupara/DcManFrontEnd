(function() {
  'use strict';

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const User = require('./users');

  const docSchema = new Schema({
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    title: String,
    content: String,
    dateCreated: {
      type: Date, 
      default: Date.now()
    },
    access: {
      type: Number,
      enum: [0, 1, 2],
      default: 2
    },
    lastModified: Date
  });

  module.exports = mongoose.model('Document', docSchema);
})();