(function () {
  'use strict';
  let Document = require('../controllers/docController'),
      User = require('../controllers/userController');

  module.exports = function(app) {
//    app.route('/documents/filter')
//      .get(Document.getByFilter);
//    
    app.route('/documents')
      .get(User.authenticate, Document.all)
      .post(User.authenticate, Document.create);
    
    app.route('/documents/:id')
      .get(User.authenticate, Document.getOne)
      .put(User.authenticate, Document.update)
      .delete(User.authenticate, Document.delete);

  };
})();