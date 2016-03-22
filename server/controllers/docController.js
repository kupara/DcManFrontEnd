(function() {
  'use strict';
  const Document = require('../models/documents');
  const User = require('../models/users');

  module.exports = {
    all: function (req, res) {
      var access;
      switch(req.decoded.role){
        case 'admin':
          access = 0;
          break;
        case 'owner':
          access = 1;
          break;
        default:
          access = 2;
          break;
      }
      Document
      .find({})
      .where('access').gte(access)
      .sort({dateCreated: -1})
      .limit(parseInt(req.query.limit))
      .exec(function (err, documents) {
        if (err) {
          res.send(err);
        } else {
          res.json(documents);
        }
      });
    },

    create: function (req, res) {
      let newDocument = new Document(req.body);
      User.findOne()
        .where('username').equals(req.body.owner)
        .exec(function (err, user) {
        if (!user) {
          res.status(404).send({
            error: 'User not found'
          });
        } else {
            newDocument.save(function (err, doc) {
            if (err) {
              res.send(err);
            } else {
              res.json({
                doc: doc,
                message: 'Document created successfully'
              });
            }
          });
        }
      });
    },

    getOne: function (req, res) {
      Document.findById(req.params.id, function (err, document) {
        if (err) {
          res.send(err);
        } else {
          res.json(document);
        }
      });
    },

    update: function (req, res) {
      User.findById(req.decoded._id, function(err, user) {
        if(req.decoded.role === 'admin' || user.username === req.body.owner) {
          Document.findByIdAndUpdate(req.params.id, req.body, {
            'new': true
          }, function (err, document) {
            if (err) {
              res.send(err);
            } else {
              document.lastModified = Date.now();
              res.json(document);
            }
          });
        } else {
          res.status(401).send({
            error: {
              message: 'You are not authorized to change this document'
            }
          });
        }
      });   
    },
    
    delete: function (req, res) {
      User.findById(req.decoded._id, function(err) {
        if(err) {
          res.send(err);
        } else {
          Document.findById(req.params.id, function (err, document) {
            if(err) {
              res.send(err);
            } else {
              console.log(req.decoded);
              if(req.decoded.role === 'admin' || req.decoded.username === document.owner) {
                Document.remove({
                  _id: req.params.id
                });
                res.send({
                  message: 'Document deleted successfully.',
                  document: document
                });
                } else {
                res.status(401).send({
                  error: {
                    message: 'You are not authorized to delete this document'
                  }
                });
              }
            }
          });
        }
      });
    },

    getByDate: function (req, res) {
      Document
        .find({})
        .where('dateCreated')
        .gt(new Date(req.query.from))
        .lt(new Date(req.query.to))
        .exec(function (err, documents) {
        if (err) {
          res.send(err);
        } else {
          res.json(documents);
        }
      });
    },
    
    getByRole: function (req, res) {
      var access;
      switch(req.query.role){
        case 'admin':
          access = 0;
          break;
        case 'owner':
          access = 1;
          break;
        default:
          access = 2;
          break;
      }
      Document
        .find({})
        .where('access')
        .gte(access)
        .exec(function (err, documents) {
        if (err) {
          res.send(err);
        } else {
          res.json(documents);
        }
      });
    },
    
    search: function (req, res) {
      Document
        .find({})
        .where('dateCreated')
        .gt(new Date(req.query.from))
        .lt(new Date(req.query.to))
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