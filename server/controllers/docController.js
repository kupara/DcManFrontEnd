(function() {
  'use strict';
  const Document = require('../models/documents');

  module.exports = {
    all: function(req, res) {
      let q = req.query.from,
          query;
      if (q) {
        query = {
          
        }
      }
    },
    
    createDocument: function(req, res) {
      let newDocument = new Document(req.body);
      newDocument.save(function(err, doc){
        if (err) {
          res.send(err);
        } else {
          res.json(doc);
        }
      });
    },

    getAllDocuments: function(req, res) {
      Document.find({}, function(err, documents) {
        if (err) {
          res.send(err);
        } else {
          res.json(documents);
        }
      });
    },

    getDocument: function (req, res) {
      Document.findById(req.param.id, function(err, documents) {
        if (err) {
            res.send(err);
          } else {
            res.json(documents);
          }
      }); 
    },

    updateDocument: function(req, res) {
      Document.findByIdAndUpdate(req.param.id, req.body, { 'new': true}, function (err, documents) {
        if (err) {
            res.send(err);
          } else {
            res.json(documents);
          }
      }); 
    },

    deleteDocument: function(req, res) {
      Document.findByIdAndRemove(req.params.id, req.body, function (err, documents) {
       if (err) {
            res.send(err);
          } else {
            res.send("Document deleted successfully");
          }
      });  
    },
    
    getDocumentsByDate: function(req, res) {
      Document
        .find({})
        .where('dateCreated').gt(new Date(req.query.date))
        .exec(function (err, documents) {
          if (err) {
            res.send(err);
          } else {
            res.json(documents);
          }
      });
    }
  };
})();

