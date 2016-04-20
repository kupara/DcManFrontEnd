(() => {
  'use strict';
  module.exports = {
    'database': process.env.MONGODB_URI || 'mongodb://localhost/dcman',
    'port': process.env.PORT || 3001,
    'secretKey': 'MwanammeNiEffort'
  };
})();
