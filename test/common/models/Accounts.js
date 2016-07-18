'use strict';

var expect = require('chai').expect,
client = require('../../../dist/vtiger-client');

describe('The Account class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.Accounts();
      }).to.throw(Error);
    });

    it('should copy data to this.data if defined', function() {
      var data = {accountname: 'accountNameTest', assigned_user_id: '2'};

      expect(new client.Accounts(data).data).to.deep.equal(data);
    });
  });

  describe('The checkData method', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.Accounts({accountname: '', assigned_user_id: '2', optionnalContent: 'test'}).checkData('create');
      }).to.throw(Error);
    });

    it('should not throw an Error (all mandatory fields filled)', function() {
      expect(
        new client.Accounts({accountname: 'accountname', assigned_user_id: '2', optionnalContent: 'test'}).checkData('create')
      ).to.equal(true);
    });

  });
});
