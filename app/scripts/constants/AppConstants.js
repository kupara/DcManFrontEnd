(() => {
  'use strict';

  let keyMirror = require('keymirror');
  module.exports = keyMirror({
    CREATE_ROLE: null,
    GET_ROLES: null,
    CREATE_DOC: null,
    DELETE_DOC: null,
    UPDATE_DOC: null,
    USER_DOCS: null,
    GET_ONE_DOC: null,
    GET_ALL_DOCS: null,
    GET_USER: null,
    GET_USERS: null,
    USER_SIGNIN: null,
    USER_SIGNOUT: null,
    USER_SIGNUP: null,
    UPDATE_USER: null,
    DELETE_USER: null,
    USER_SESSION: null
  });

})();
