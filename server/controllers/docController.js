(function() {
  'use strict';
  const Document = require('../models/documents');
  const User = require('../models/users');

  module.exports = {
    all: function (req, res) {
      let q = req.query.limit;
      if (q) {
        Document
          .find({})
          .limit(parseInt(q))
          .sort({dateCreated: -1})
          .exec(function (err, documents) {
            if (err) {
              res.send(err);
            } else {
              res.json(documents);
            }
          });
      } else {
        Document.find({})
          .sort({dateCreated: -1})
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
      User.findById(req.body.ownerId, function (err, user) {
        if (!user) {
          res.send({
            error: 'The user you chose does not exist'
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
    }
  };
})();