(() => {
  'use strict';

  const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema,
    Role = require('./roles');

  const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      first: {
        type: String,
        required: true
      },
      last: {
        type: String,
        required: true
      }
    },
    email: {
      type: String,
      validate: {
        validator: (email) => {
          return /\S+@\S+\.\S+/.test(email);
        },
        message: 'You entered an invalid email address'
      },
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    role: {
      type: Schema.Types.String,
      ref: Role.title,
      required: true
    },
    loggedIn: {
      type: Boolean,
      default: false
    }
  });

  userSchema.pre('save', (next) => {
    const user = this;

    bcrypt.hash(user.password, null, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });

  userSchema.methods.checkPass = (password) => {
    const user = this;
    return bcrypt.compareSync(password, user.password);
  };

  module.exports = mongoose.model('User', userSchema);
})();