(function () {
  'use strict';
  let Document = require('../controllers/docController');

  module.exports = function(app) {
    app.route('/documents/:id')
      .get(Document.getOne)
      .put(Document.update)
      .delete(Document.delete);
    app.route('/documents/filter')
      .get(Document.getByDate);
    
    app.route('/documents')
      .get(Document.all)
      .post(Document.create);
    

  };
})();