(function() {
  'use strict';
  let User = require('../controllers/userController'),
      Role = require('../controllers/roleController');

  module.exports = function(app) {
    app.route('/users/roles')
      .get(Role.all)
      .post(Role.create);
    
    app.route('/users/roles/:id')
      .get(Role.one);
    
    app.route('/users/login')
      .post(User.login); 
    
    app.route('/users/logout')
      .get(User.authenticate, User.logout);
    
    app.route('/users')
      .get(User.all)
      .post(User.register);

    app.route('/users/:id')
      .get(User.getOne)
      .put(User.authenticate, User.update)
      .delete(User.authenticate, User.delete);

    app.route('/users/:id/documents')
      .get(User.authenticate, User.getMyDocs);
  };
})();