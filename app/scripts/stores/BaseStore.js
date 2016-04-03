(() => {
  'use strict';

  const EventEmitter = require('events').EventEmitter;
  const assign = require('object-assign');

  let BaseStore = assign({}, EventEmitter.prototype, {
    emitChange: function(event) {
      if (event) {
        this.emit(event);
      } else {
        this.emit('change');
      }
    },

    addChangeListener: function(callback, event) {
      if (event) {
        this.on(event, callback);
      } else {
        this.on('change', callback);
      }
    },

    removeChangeListener: function(callback, event) {
      if (event) {
        this.removeListener(event, callback);
      } else {
        this.removeListener('change', callback);
      }
    }
  });

  module.exports = BaseStore;

})();
