 (() => {
   'use strict';

   const mongoose = require('mongoose'),
     Schema = mongoose.Schema,
     User = require('./users');

   const docSchema = new Schema({
     ownerId: {
       type: Schema.Types.ObjectId,
       ref: User._id,
       required: true
     },
     title: {
       type: String,
       required: true
     },
     content: {
       type: String,
       required: true
     },
     dateCreated: {
       type: Date,
       default: Date.now()
     },
     accessLevel: {
       type: String,
       enum: ['admin', 'private', 'public'],
       default: 'private'
     },
     lastModified: {
       type: Date,
       default: Date.now()
     }
   });

   module.exports = mongoose.model('Document', docSchema);
 })();
