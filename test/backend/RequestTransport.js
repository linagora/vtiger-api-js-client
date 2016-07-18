'use strict';

var expect = require('chai').expect,
    client = require('./../../dist/vtiger-client'),
    mockery = require('mockery');

function newTransport() {
  return new client.RequestTransport(new client.QPromiseProvider());
}

describe('The RequestTransport class', function() {

  beforeEach(function() {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  afterEach(function() {
    mockery.disable();
  });

  describe('The post method', function() {

    it('should reject the promise when an error occurs', function(done) {
      mockery.registerMock('request', function(options, callback) {
        callback(new Error('Failed'));
      });

      newTransport().post('').then(null, function() { done(); });
    });

    it('should reject the promise when status code is not 200 nor 201', function(done) {
      mockery.registerMock('request', function(options, callback) {
        callback(null, {
          statusCode: 400
        });
      });

      newTransport().post('').then(null, function() { done(); });
    });

    it('should resolve the promise when status code is 200, returning the body', function(done) {
      mockery.registerMock('request', function(options, callback) {
        callback(null, {
          statusCode: 200
        }, 'Success !');
      });

      newTransport().post('').then(function(data) {
        expect(data).to.equal('Success !');

        done();
      });
    });

    it('should resolve the promise when status code is 201, returning the body', function(done) {
      mockery.registerMock('request', function(options, callback) {
        callback(null, {
          statusCode: 201
        }, 'Accepted !');
      });

      newTransport().post('').then(function(data) {
        expect(data).to.equal('Accepted !');

        done();
      });
    });

    it('should build a correct options object, and pass it to request', function() {
      mockery.registerMock('request', function(options) {
        expect(options).to.deep.equal({
          method: 'POST',
          url: 'https://client.open-paas.org',
          headers: {
            Authorization: 'SuperSecretToken'
          },
          body: {
            a: 'b',
            c: 0
          },
          json: true
        });
      });

      newTransport().post('https://client.open-paas.org', {
        Authorization: 'SuperSecretToken'
      }, {
        a: 'b',
        c: 0
      });
    });

  });

});
