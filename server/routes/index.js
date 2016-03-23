(function() {
  'use strict';

  module.exports = function(app) {
    require('./userRoute')(app);
    require('./docRoute')(app);
    
    app.route('/')
    .get(function(req, res) {
      res.send({message: 'Welcome to the DCMan'});
    });
  };
})();