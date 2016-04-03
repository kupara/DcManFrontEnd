(() => {
  'use strict';

  let keyMirror = require('keymirror');
  module.exports = keyMirror({
    CREATE_ROLE: null,
    CREATE_DOC: null,
    DELETE_DOC: null,
    EDIT_DOC: null,
    GET_ONE_DOC: null,
    GET_ALL_DOCS: null,
    GET_ROLES: null,
    GET_USERS: null,
    USER_LOGIN: null,
    USER_LOGOUT: null,
    CREATE_USER: null,
    UPDATE_USER: null,
    DELETE_USER: null,
    USER_SESSION: null
  });

})();