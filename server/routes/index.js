(() => {
  'use strict';

  module.exports = (app) => {
    require('./userRoute')(app);
    require('./docRoute')(app);

    app.route('*')
      .get((req, res) => {
        res.sendFile('index.html', {
          root: './public/'
        });
      });
  };
})();
