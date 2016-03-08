"use strict";

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
  lastModified: Date
});

let Document = mongoose.model('Document', docSchema);

Document.createDocument = function (data, cb) {
  let newDocument = new Document(data);
  newDocument.save(cb);
},
    
Document.getAllDocuments = function (cb) {
  Document.find({}, function (err, documents) {
    cb(err, documents)
  });
}

Document.getDocument = function (id, cb) {
  Document.findById(id, function(err, document) {
    cb(err, document);
  });
}
    
Document.updateDocument = function (id, data, cb) {
  Document.findByIdAndUpdate(id, data, { 'new': true}, function (err, document) {
    cb(err, document);
  });
}
    
Document.deleteDocument = function (id, data, cb) {
  Document.findByIdAndRemove(id, data, function (err, document) {
    cb(err, document);
  });
}
    
module.exports = Document;