'use strict';

import Utils from '../Utils.js';

module.exports = class CompanyDetails{
  constructor(data) {
    this.type = 'CompanyDetails';
    this.mandatory = {
      create: ['organizationname'],
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
