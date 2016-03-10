"use strict"

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const Document = require('./documents');

let userSchema  = new Schema({
  username: { type: String, required: true },
  name: {
    firstname: { type: String, required: true },
  	lastname: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: {type: String, required: true },
  created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', userSchema);


    
