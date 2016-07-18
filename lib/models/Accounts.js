'use strict';

import Utils from '../Utils.js';

module.exports = class Accounts{
  constructor(data) {
    this.type = 'Accounts';
    this.mandatory = {
      create: ['accountname', 'assigned_user_id'],
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
