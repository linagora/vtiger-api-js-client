'use strict';

import Utils from '../Utils.js';

module.exports = class Calendar{
  constructor(data) {
    this.type = 'Calendar';
    this.mandatory = {
      create: ['subject', 'assigned_user_id', 'date_start', 'due_date', 'taskstatus'],
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
