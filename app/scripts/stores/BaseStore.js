(() => {
  'use strict';

  const EventEmitter = require('events').EventEmitter;
  const assign = require('object-assign');

  let BaseStore = assign({}, EventEmitter.prototype, {
    emitChange: (event) => {
      if (event) {
        this.emit(event);
      } else {
        this.emit('change');
      }
    },

    addChangeListener: (callback, event) => {
      if (event) {
        this.on(event, callback);
      } else {
        this.on('change', callback);
      }
    },

    removeChangeListener: (callback, event) => {
      if (event) {
        this.removeListener(event, callback);
      } else {
        this.removeListener('change', callback);
      }
    }
  });

  module.exports = BaseStore;

})();
