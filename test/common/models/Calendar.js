'use strict';

var expect = require('chai').expect,
client = require('../../../dist/vtiger-client');

describe('The Calendar class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.Calendar();
      }).to.throw(Error);
    });

    it('should copy data to this.data if defined', function() {
      expect(new client.Calendar('fakeData').data).to.deep.equal('fakeData');
    });
  });

  describe('The checkData method', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.Calendar({subject: '', assigned_user_id: '2', date_start: 'date_start', due_date: 'due_date', taskstatus: 'taskstatus'}).checkData('create');
      }).to.throw(Error);
    });

    it('should not throw an Error (all mandatory fields filled)', function() {
      expect(
        new client.Calendar({subject: 'subject', assigned_user_id: '2', date_start: 'date_start', due_date: 'due_date', taskstatus: 'taskstatus'}).checkData('create')
      ).to.equal(true);
    });

  });
});
