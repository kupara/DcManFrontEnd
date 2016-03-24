(function () {
  'use strict';
  let Document = require('../controllers/docController'),
    User = require('../controllers/userController');

  module.exports = function(app) {
    app.route('/documents')
      .get(User.authenticate, Document.all)
      .post(User.authenticate, Document.create);
    
    app.route('/documents/results')
      .get(Document.search);
    
    app.route('/documents/:id')
      .get(User.authenticate, User.canAccess, Document.getOne)
      .put(User.authenticate, User.canAccess, Document.update)
      .delete(User.authenticate, User.canAccess, Document.delete);
  };
})();