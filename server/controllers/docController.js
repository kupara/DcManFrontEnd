(function() {
  'use strict';
  const Document = require('../models/documents');
  const User = require('../models/users');

  
  
  module.exports = {
    all: function (req, res) {
      var access;
      if (req.decoded.role) {
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
      } else {
        Document.find({})
          .where('access').gte(2)
          .sort({dateCreated: -1})
          .limit(parseInt(req.query.limit))
          .exec(function (err, documents) {
          if (err) {
            res.send(err);
          } else {
            res.json(documents);
          }
        });
      }
    },

    create: function (req, res) {
      let newDocument = new Document(req.body);
      User.findOne()
        .where('username').equals(req.body.owner)
        .exec(function (err, user) {
        if (!user) {
          res.send({
            error: 'User not found'
          });
        } else {
            newDocument.save(function (err, doc) {
            if (err) {
              res.send(err);
            } else {
              user.docs.push(doc._id);
              user.save();
              res.json(doc);
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
    },

    delete: function (req, res) {
      Document.findByIdAndRemove(req.params.id, req.body, function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          User.findById(doc.ownerId, function(err, user){
            if(!user) {
              res.send({
                message: 'Document deleted successfully.',
                doc: doc
              });
            } else {
              user.docs.splice(user.docs.indexOf(doc._id), 1);
              user.save();
              res.send({
                message: 'Document deleted successfully.',
                doc: doc
              });
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