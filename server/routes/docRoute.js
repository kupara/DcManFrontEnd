(function () {
  'use strict';
  let Document = require('../controllers/docController');

  module.exports = function(app) {
    app.route('/documents')
      .get(Document.getAllDocuments)
      .post(Document.createDocument);
    
    app.route('/documents/filter')
      .get(Document.getDocumentsByDate);

    app.route('/documents/:id')
      .get(Document.getDocument)
      .put(Document.updateDocument)
      .delete(Document.deleteDocument);
  };
})();