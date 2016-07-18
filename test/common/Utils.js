'use strict';

var expect = require('chai').expect,
  client = require('../../dist/vtiger-client');

describe('The Utils class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new client.Utils();
      }).to.throw(Error);
    });

  });

  describe('The isDefined static method', function() {

    it('should return false for undefined', function() {
      expect(client.Utils.isDefined(undefined)).to.equal(false);
    });

    it('should return false for null', function() {
      expect(client.Utils.isDefined(null)).to.equal(false);
    });

    it('should return true for zero', function() {
      expect(client.Utils.isDefined(0)).to.equal(true);
    });

    it('should return true for false', function() {
      expect(client.Utils.isDefined(false)).to.equal(true);
    });

    it('should return true for empty string', function() {
      expect(client.Utils.isDefined('')).to.equal(true);
    });

    it('should return true for empty array', function() {
      expect(client.Utils.isDefined([])).to.equal(true);
    });

    it('should return true for object', function() {
      expect(client.Utils.isDefined({})).to.equal(true);
    });
  });

  describe('The isArrayNotEmpty static method', function() {

    it('should return false for undefined', function() {
      expect(client.Utils.isArrayNotEmpty(undefined)).to.equal(false);
    });

    it('should return false for null', function() {
      expect(client.Utils.isArrayNotEmpty(null)).to.equal(false);
    });

    it('should return false for {}', function() {
      expect(client.Utils.isArrayNotEmpty({})).to.equal(false);
    });

    it('should return false for []', function() {
      expect(client.Utils.isArrayNotEmpty([])).to.equal(false);
    });

    it('should return true for [\'test\']', function() {
      expect(client.Utils.isArrayNotEmpty(['test'])).to.equal(true);
    });

  });

  describe('The isObjectEmpty static method', function() {

    it('should return false for undefined', function() {
      expect(client.Utils.isObjectEmpty(undefined)).to.equal(false);
    });

    it('should return false for null', function() {
      expect(client.Utils.isObjectEmpty(null)).to.equal(false);
    });

    it('should return false for {}', function() {
      expect(client.Utils.isObjectEmpty({})).to.equal(false);
    });

    it('should return false for []', function() {
      expect(client.Utils.isObjectEmpty([])).to.equal(false);
    });

    it('should return false for [\'test\']', function() {
      expect(client.Utils.isObjectEmpty(['test'])).to.equal(false);
    });

    it('should return true for {test: \'test\'}', function() {
      expect(client.Utils.isObjectEmpty({test: 'test'})).to.equal(true);
    });

  });

  describe('The isNotEmpty static method', function() {

    it('should return false for undefined', function() {
      expect(client.Utils.isNotEmpty(undefined)).to.equal(false);
    });

    it('should return false for null', function() {
      expect(client.Utils.isNotEmpty(null)).to.equal(false);
    });

    it('should return false for empty string', function() {
      expect(client.Utils.isNotEmpty('')).to.equal(false);
    });

    it('should return false for empty array', function() {
      expect(client.Utils.isNotEmpty([])).to.equal(false);
    });

    it('should return false for empty object', function() {
      expect(client.Utils.isNotEmpty({})).to.equal(false);
    });

    it('should return true for object', function() {
      expect(client.Utils.isNotEmpty({test: 'coucou'})).to.equal(true);
    });

    it('should return true for [\'test\']', function() {
      expect(client.Utils.isNotEmpty(['test'])).to.equal(true);
    });

    it('should return true for zero', function() {
      expect(client.Utils.isNotEmpty(0)).to.equal(true);
    });

    it('should return true for false', function() {
      expect(client.Utils.isNotEmpty(false)).to.equal(true);
    });

    it('should return true for true', function() {
      expect(client.Utils.isNotEmpty(true)).to.equal(true);
    });

  });

  describe('The assertRequiredParameterIsPresent static method', function() {

    it('should not throw an Error if the parameter is defined', function() {
      expect(client.Utils.assertRequiredParameterIsPresent({})).to.deep.equal({});
    });

    it('should not throw an Error if the parameter is false', function() {
      expect(client.Utils.assertRequiredParameterIsPresent(false, 'parameter')).to.equal(false);
    });

    it('should not throw an Error if the parameter is zero', function() {
      expect(client.Utils.assertRequiredParameterIsPresent(0, 'parameter')).to.equal(0);
    });

    it('should not throw an Error if the parameter is empty string', function() {
      expect(client.Utils.assertRequiredParameterIsPresent('', 'parameter')).to.equal('');
    });

    it('should throw an Error if the parameter is null', function() {
      expect(function() {
        client.Utils.assertRequiredParameterIsPresent(null, 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is undefined', function() {
      expect(function() {
        client.Utils.assertRequiredParameterIsPresent();
      }).to.throw(Error);
    });
  });

  describe('The assertRequiredParameterIsNotEmpty static method', function() {

    it('should throw an Error if the parameter is {}', function() {
      expect(function() {
        client.Utils.assertRequiredParameterIsNotEmpty({}, 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is []', function() {
      expect(function() {
        client.Utils.assertRequiredParameterIsNotEmpty([], 'parameter');
      }).to.throw(Error);
    });

    it('should not throw an Error if the parameter is false', function() {
      expect(client.Utils.assertRequiredParameterIsNotEmpty(false, 'parameter')).to.equal(false);
    });

    it('should not throw an Error if the parameter is zero', function() {
      expect(client.Utils.assertRequiredParameterIsNotEmpty(0, 'parameter')).to.equal(0);
    });

    it('should throw an Error if the parameter is empty string', function() {
      expect(function() {
        client.Utils.assertRequiredParameterIsNotEmpty('', 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is null', function() {
      expect(function() {
        client.Utils.assertRequiredParameterIsNotEmpty(null, 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is undefined', function() {
      expect(function() {
        client.Utils.assertRequiredParameterIsNotEmpty();
      }).to.throw(Error);
    });
  });

});
