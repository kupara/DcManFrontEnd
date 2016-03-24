(function () {
  'use strict';
  const Document = require('../models/documents'),
    User = require('../models/users');

  module.exports = {
    all: function (req, res) {
      let query = {},
        limit = req.query.limit || 0;
    
      if (req.query.role === 'admin' && req.decoded.role === 'admin') {
        query = {};
      } 
      if (req.query.role === 'user' && req.decoded.role === 'admin') {
        query = {
          $or: [{
              accessLevel: {
                $eq: 'private'
              }
            },
            {
              accessLevel: {
                $eq: 'public'
              }
            }
          ]
        };
      } 
      if (req.query.role === 'user' && req.decoded.role === 'user') {
        query = {
          $or: [{
              ownerId: {
                $eq: req.decoded._id
              }
            },
            {
              accessLevel: {
                $eq: 'public'
              }
            }
          ]
        };
      } 
      if (req.query.role === 'viewer' || req.decoded.role === 'viewer') {
        query.accessLevel = {
          $eq: 'public'
        };
      }

      if (req.query.from) {
        query.dateCreated = {
          $lt: req.query.to,
          $gt: req.query.from
        };
      }
      Document
        .find(query)
        .sort({
          dateCreated: -1
        })
        .limit(parseInt(limit, 10))
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
        .where('_id').equals(req.body.ownerId)
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
      User.findById(req.decoded._id, function (err) {
        if (err) {
          res.send(err);
        } else {
          Document.findById(req.params.id, function (err, document) {
            if (err) {
              res.send(err);
            } else {
              if (req.body.owner) {
                document.owner = req.body.owner;
              }
              if (req.body.title) {
                document.title = req.body.title;
              }
              if (req.body.content) {
                document.content = req.body.content;
              }
              if (req.body.access) {
                document.access = req.body.access;
              }
              document.lastModified = Date.now();
              document.save(function (err, doc) {
                if (err) {
                  res.send(err);
                } else {
                  res.json({
                    message: 'Document updated successfully',
                    doc: doc
                  });
                }
              });
            }
          });
        }
      });
    },

    delete: function (req, res) {
      Document.findByIdAndRemove(req.params.id, function (err, document) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            message: 'Document deleted successfully.',
            document: document
          });
        }
      });
    },



    search: function (req, res) {
      const searchterm = req.query.q;
      const re = new RegExp(searchterm, 'gi');
      Document.find({
        content: {
          $regex: re
        }
      }, function (err, documents) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(documents);
        }
      });
    }
  };
})();