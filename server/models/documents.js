(function() {
  'use strict';

  const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./users');

  const docSchema = new Schema({
    owner: {
      type: Schema.Types.String,
      ref: User.username,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content:{
      type: String,
      required: true
    },
    dateCreated: {
      type: Date, 
      default: Date.now()
    },
    access: {
      type: Number,
      enum: [0, 1, 2],
      default: 2
    },
    lastModified: {
      type: Date, 
      default: Date.now()
    }
  });

  module.exports = mongoose.model('Document', docSchema);
})();