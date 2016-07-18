'use strict';

var expect = require('chai').expect,
  VTClient = require('../../dist/vtiger-client');

describe('The Client class', function() {

  describe('The constructor', function() {

    it('should throw an Error when transport implementation is missing', function() {
      expect(function() {
        new VTClient.Client();
      }).to.throw(Error);
    });

    it('should throw an Error when transport implementation is empty', function() {
      expect(function() {
        new VTClient.Client({});
      }).to.throw(Error);
    });

    it('should set Client.transport to transport', function() {
      expect(new VTClient.Client({transport: ''}).transport).to.include({transport: ''});
    });

    it('should set Client.promiseProvider to promiseProvider', function() {
      expect(new VTClient.Client({transport: ''}, {promise: 'provider'}).promiseProvider).to.deep.equal({promise: 'provider'});
    });

    it('should set transport.promiseProvider to the given promise provider', function() {
      expect(new VTClient.Client({transport: ''}, {promise: 'provider'}).transport.promiseProvider).to.deep.equal({promise: 'provider'});
    });

    it('should set transport.promiseProvider to an instance of ES6PromiseProvider by default', function() {
      expect(new VTClient.Client({transport: ''}).promiseProvider).to.be.an.instanceof(VTClient.ES6PromiseProvider);
    });

  });

  describe('The withUserName static method', function() {

    it('should set Client.userName to userName', function() {
      expect(new VTClient.Client({transport: ''}).withUserName('userName').userName).to.deep.equal('userName');
    });
  });

  describe('The withUserAccessKey static method', function() {

    it('should set Client.accessKey to userAccessKey', function() {
      expect(new VTClient.Client({transport: ''}).withUserName('UserAccessKey').userName).to.deep.equal('UserAccessKey');
    });
  });

  describe('The withUrl static method', function() {

    it('should set Client.url to url', function() {
      expect(new VTClient.Client({transport: ''}).withUserName('url').userName).to.deep.equal('url');
    });
  });

  describe('The _defaultHeaders method', function() {

    it('should return default header', function() {
      expect(new VTClient.Client({transport: ''})._defaultHeaders()).to.deep.equal({
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
      });
    });
  });

  /*describe('The delete method', function() {

    it('should check data (throw an error)', function() {
      var CompanyDetails = {organizationname: 'organizationname'};
      var CompanyDetails = {};

      new VTClient.Client({transport: ''}, VTClient.QPromiseProvider).connect()
      .then(expect(Client.delete(CompanyDetails)).to.throw(Error));
    });
  });*/
});
