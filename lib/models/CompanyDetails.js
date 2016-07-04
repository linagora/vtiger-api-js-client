'use strict';

module.exports = class CompanyDetails{
  constructor(data) {
    this.type = 'CompanyDetails';
    this.mandatory = {
      create: []
    };
    this.data = data;
  }
};
