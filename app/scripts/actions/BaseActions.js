(() => {
  'use strict';

  const Dispatcher = require('../dispatcher/AppDispatcher'),
    request = require('superagent');

  module.exports = {
    get: (url, actionType, token=null) => {
      request
        .get(url)
        .set('x-access-token', token)
        .end((err, result) => {
          Dispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    delete: (url, data, actionType, token = null) => {
      request
        .delete(url)
        .send(data || {})
        .set('x-access-token', token)
        .end((err, result) => {
          Dispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    put: (url, data, actionType, token = null) => {
      request
        .put(url)
        .send(data)
        .set('x-access-token', token)
        .end((err, result) => {
          Dispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    post: (url, data, actionType, token = null) => {
      request
        .post(url)
        .send(data)
        .set('x-access-token', token)
        .end((err, result) => {
          Dispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    }
  };
})();
