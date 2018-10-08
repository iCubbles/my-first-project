/* global describe,it,before,after,beforeEach,afterEach */
'use strict';

describe('<currency-converter>', function () {
  this.timeout(70000);
  var currencyConverter;
  var makeRequestStub;
  var vals = {
    init: {
      base: 'EUR',
      foreignCurrency: 'USD',
      date: '2018-01-01',
      conversion: 1
    },
    set: {
      base: 'COP',
      foreignCurrency: 'EUR',
      date: '2018-07-07',
      conversion: 2
    }
  }
  before(function (done) {
    // Select component
    currencyConverter = document.querySelector('currency-converter');
    var rootNode = document.querySelector('[cubx-core-crc]');
    // Wait until the component is ready, but has not been initialized
    rootNode.addEventListener('cifInitReady', function () {
      // Mock sendQuery since it makes Ajax requests
      makeRequestStub = sinon.stub(currencyConverter, 'makeRequest', function (url, callback) {
        var data = {};
        var values;
        switch (currencyConverter.getBase()) {
          case vals.init.base:
            values = vals.init;
            break;
          case vals.set.base:
            values = vals.set;
            break;
          default:
            converted = null;
        }
        // Return data as API will do it
        var conversion = {};
        conversion[values.date] = values.conversion
        data[values.base + '_' + values.foreignCurrency] = {
          val: conversion
        };
        callback(data);
      });
      done();
    });
  });

  after(function () {
    makeRequestStub.restore();
  });

  describe('should have initial values set in manifest', function () {
    it('should set the value of "foreignCurrency" slot = "' + vals.init.foreignCurrency + '"', function () {
      expect(currencyConverter.getForeignCurrency()).to.be.equal(vals.init.foreignCurrency);
    });
    it('should have the initial value of "date" slot = "' + vals.init.date + '"', function () {
      expect(currencyConverter.getDate()).to.be.equal(vals.init.date);
    });
    it('should have the initial value of "base" slot = "' + vals.init.base + '"', function () {
      expect(currencyConverter.getBase()).to.be.equal(vals.init.base);
    });
    it('should make the request with the initial values and set ', function () {
      expect(makeRequestStub.calledOnce).to.be.equal(true);
      expect(currencyConverter.getConversion()).to.be.equal(vals.init.conversion);
    });
  });

  describe('should set slots values correctly', function () {
    it('should have the initial value of "foreignCurrency" slot = "' + vals.set.foreignCurrency + '"', function () {
      currencyConverter.setForeignCurrency(vals.set.foreignCurrency)
      expect(currencyConverter.getForeignCurrency()).to.be.equal(vals.set.foreignCurrency);
    });
    it('should have the initial value of "date" slot = "' + vals.set.date + '"', function () {
      currencyConverter.setDate(vals.set.date)
      expect(currencyConverter.getDate()).to.be.equal(vals.set.date);
    });
    it('should have the initial value of "base" slot = "' + vals.set.base + '"', function () {
      currencyConverter.setBase(vals.set.base)
      expect(currencyConverter.getBase()).to.be.equal(vals.set.base);
    });
    it('should make the request with the initial values and set ', function () {
      currencyConverter.sendQuery();
      expect(currencyConverter.getConversion()).to.be.equal(vals.set.conversion);
    });
  });
});
