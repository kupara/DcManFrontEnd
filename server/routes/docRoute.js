(function () {
  'use strict';
  let Document = require('../controllers/docController'),
      User = require('../controllers/userController');

  module.exports = function(app) {
//    app.route('/documents/filter')
//      .get(Document.getByFilter);
//    
    app.route('/documents')
      .get(Document.all)
      .post(Document.create);
    
    app.route('/documents/:id')
      .get(Document.getOne)
      .put(Document.update)
      .delete(Document.delete);

  };
})();