(function() {
  'use strict';

  module.exports = function(app) {
    require('./userRoute')(app);
    require('./docRoute')(app);
    // router.use('/', require('./roles'));
    app.route('/')
      .get(function(req, res) {
        res.send({message: 'You are home'});
      });
  };
})();