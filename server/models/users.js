(function() {  
  'use strict'

  const mongoose = require('mongoose');
  const bcrypt = require('bcrypt-nodejs');
  const Schema = mongoose.Schema;
  const Document = require('./documents').schema;

  let userSchema  = new Schema({
    username: { type: String, required: true },
    name: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
    },
    email: { 
      type: String, 
      validate: {
          validator: function(email) {
            return /\S+@\S+\.\S+/.test(email);
          },
          message: 'you entered an invalid email address'
        },
      required: true }
    ,
    password: {type: String, required: true },
    created_at: { type: Date, default: Date.now() },
    docs: [{type: Schema.Types.ObjectId}]
  });


  //encrypt password before saving the user
  userSchema.pre('save', function(next) {
    var user = this;

    bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });

  //add method to schema for password comparison
  userSchema.methods.checkPass = function(password) {
      var user = this;
      return bcrypt.compareSync(password, user.password); 
    };

  module.exports = mongoose.model('User', userSchema);
})();


