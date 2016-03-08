"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

let User = mongoose.model('User', userSchema);

User.createUser = function (data, cb) {
  let newUser = new User(data);
  newUser.save(cb);
},
    
User.getAllUsers = function (cb) {
  User.find({}, function (err, users) {
    cb(err, users)
  });
}
    
User.getUser = function (id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
}
    
User.updateUser = function (id, data, cb) {
  User.findByIdAndUpdate(id, data, { 'new': true}, function (err, user) {
    cb(err, user);
  });
}
    
User.deleteUser = function (id, data, cb) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
   cb(err, user);
  });
}
    
module.exports = User;