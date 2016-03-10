(function() {
  'use strict';
  let User = require('../controllers/userController');

  module.exports = function(app) {
    app.route('/users')
      .get(User.getAllUsers)
      .post(User.createUser);

    app.route('/users/:id')
      .get(User.getUser)
      .put(User.updateUser)
      .delete(User.deleteUser);

    app.route('/users/:id/documents')
      .get(User.getMyDocs);
  };
})();