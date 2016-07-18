'use strict';

var expect = require('chai').expect,
client = require('../../../dist/vtiger-client');

describe('The Contacts class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.Contacts();
      }).to.throw(Error);
    });

    it('should copy data to this.data if defined', function() {
      expect(new client.Contacts('fakeData').data).to.deep.equal('fakeData');
    });
  });

  describe('The checkData method', function() {

    it('should throw an Error (missing mandatory fileds', function() {
      expect(function() {
        new client.Contacts({lastname: '', assigned_user_id: 'assigned_user_id'}).checkData('create');
      }).to.throw(Error);
    });

    it('should not throw an Error (all mandatory fields filled)', function() {
      expect(
        new client.Contacts({lastname: 'lastname', assigned_user_id: 'assigned_user_id'}).checkData('create')
      ).to.equal(true);
    });

  });
});
