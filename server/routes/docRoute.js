'use strict';
const mongoose = require('mongoose');
let Document = require('../models/documents');

module.exports = function(app) {
  app.route('/documents')
    .get(function(req, res) {
      Document.getAllDocuments(function(err, documents){
        if(err) {
          res.send(err);
        } else {
          res.json(documents);
        }
      });
  })
    .post(function(req, res) {
      Document.createDocument(req.body, function(err, document){
        if(err) {
          res.send(err);
        } else {
          res.json(document);
        }
      });
  });

  app.route('/documents/:id')
    .get(function(req, res) {
        Document.getDocument(req.params.id, function(err, document){
        if(err) {
          res.send(err);
        } else {
          res.json(document);
        }
      });
  })
    .put(function(req, res) {
      Document.updateDocument(req.params.id, req.body,  function(err, document){
        if(err) {
          res.send(err);
        } else {
          res.json(document);
        }
      });
  })
    .delete(function(req, res) {
      Document.deleteDocument(req.params.id, req.body, function(err, document){
        if(err) {
          res.send(err);
        } else {
          res.send("Successfully deleted document");
        }
      });
  });
};