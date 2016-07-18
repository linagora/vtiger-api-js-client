'use strict';

let Utils = require('../Utils.js');

module.exports = class Users{
  constructor(data) {
    this.type = 'Users';
    this.mandatory = {
      create: ['user_name', 'user_password', 'confirm_password', 'last_name', 'roleid', 'email1', 'is_owner'],
      retrieve: ['id'],
      update: ['id'],
      delete: ['id']
    };
    this.data = Utils.assertRequiredParameterIsNotEmpty(data, 'data');
  }
  checkData(operation) {
    for (var i = 0; i < this.mandatory[operation].length; i++) {
      Utils.assertRequiredParameterIsNotEmpty(this.data[this.mandatory[operation][i]], this.mandatory[operation][i]);
    }

    return true;
  }
};
