'use strict';

var expect = require('chai').expect,
client = require('../../../dist/vtiger-client');

describe('The CompanyDetails class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.CompanyDetails();
      }).to.throw(Error);
    });

    it('should copy data to this.data if defined', function() {
      expect(new client.CompanyDetails('fakeData').data).to.deep.equal('fakeData');
    });
  });

  describe('The checkData method', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.CompanyDetails({organizationname: {}}).checkData('create');
      }).to.throw(Error);
    });

    it('should not throw an Error (all mandatory fields filled)', function() {
      expect(
        new client.CompanyDetails({organizationname: 'organizationname'}).checkData('create')
      ).to.equal(true);
    });

  });
});
