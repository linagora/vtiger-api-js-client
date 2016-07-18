'use strict';

var expect = require('chai').expect,
client = require('../../../dist/vtiger-client');

describe('The Users class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.Users();
      }).to.throw(Error);
    });

    it('should copy data to this.data if defined', function() {
      expect(new client.Users('fakeData').data).to.deep.equal('fakeData');
    });
  });

  describe('The checkData method', function() {

    it('should throw an Error (missing mandatory fileds', function() {
      expect(function() {
        new client.Users({user_name: '', user_password: 'assigned_user_id', confirm_password: 'confirm_password', last_name: 'last_name', roleid: 'roleid', email1: 'email1', is_owner: 'is_owner'}).checkData('create');
      }).to.throw(Error);
    });

    it('should not throw an Error (all mandatory fields filled)', function() {
      expect(
        new client.Users({user_name: 'user_name', user_password: 'assigned_user_id', confirm_password: 'confirm_password', last_name: 'last_name', roleid: 'roleid', email1: 'email1', is_owner: 'is_owner'}).checkData('create')
      ).to.equal(true);
    });

  });
});
