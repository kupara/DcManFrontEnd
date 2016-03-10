(function() {
  'use strict';
  const Document = require('../models/documents');
  const User = require('../models/users');

  module.exports = { 
    all: function(req, res) {
      let q = req.query.limit;
      console.log(q);
      if (q) {
        Document
          .find({})
          .limit(new Number(q))
          .exec(function(err, documents) {
            if (err) {
              res.send(err);
            } else {
              res.json(documents);
          }
        });
      } else {
        Document.find({}, function(err, documents) {
          if (err) {
            res.send(err);
          } else {
            res.json(documents);
          }
        });
      }
    },
    
    create: function(req, res) {
      let newDocument = new Document(req.body);
      // console.log(req.body);
      User.findById(req.body["ownerId"], function(err, user) {
        if (err) {
          console.log(err);
        }
        newDocument.save(function(err, doc){
          if (err) {
            res.send(err);
          } else {
            user.docs.push(newDocument);
            user.save();
            res.json(doc);
          }
        });
        
     });
    },


    getOne: function (req, res) {
      Document.findById(req.param.id, function(err, documents) {
        if (err) {
            res.send(err);
          } else {
            res.json(documents);
          }
      }); 
    },

    update: function(req, res) {
      Document.findByIdAndUpdate(req.param.id, req.body, { 'new': true}, function (err, documents) {
        if (err) {
            res.send(err);
          } else {
            res.json(documents);
          }
      }); 
    },

    delete: function(req, res) {
      Document.findByIdAndRemove(req.params.id, req.body, function (err, documents) {
       if (err) {
            res.send(err);
          } else {
            res.send("Document deleted successfully");
          }
      });  
    },
    
    getByDate: function(req, res) {
      Document
        .find({})
        .where('dateCreated').gt(new Date(req.query.from)).lt(new Date(req.query.to))
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

