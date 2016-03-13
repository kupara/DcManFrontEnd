(function() {
  'use strict';
  let User = require('../controllers/userController');

  module.exports = function(app) {
    app.route('/users/login')
      .post(User.login); 
    
    app.route('/users/logout')
      .get(User.authenticate, User.logout);
    
//    app.route('users/session')
//      .get(User.session);
    
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