'use strict';

module.exports = class Accounts{
  constructor(data) {
    this.type = 'Accounts';
    this.mandatory = {
      create: ['accountname', 'assigned_user_id']
    };
    this.data = data;
  }
};
