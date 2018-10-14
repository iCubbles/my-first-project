/* global describe,it,before,after,beforeEach,afterEach */
'use strict';

describe('<currency-converter>', function () {
  this.timeout(70000);
  var currencyConverter;
  var makeRequestStub;
  var expectedVals = {
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
  };
  before(function (done) {
    // Select component
    currencyConverter = document.querySelector('currency-converter');
    var rootNode = document.querySelector('[cubx-core-crc]');

    // Wait until the component is ready
    rootNode.addEventListener('cifInitReady', function () {
      // Wrap sendQuery since it makes Ajax requests
      makeRequestStub = sinon.stub(currencyConverter, 'makeRequest', function (url, callback) {
        var data = {};
        var values;
        switch (currencyConverter.getBase()) {
          case expectedVals.init.base:
            values = expectedVals.init;
            break;
          case expectedVals.set.base:
            values = expectedVals.set;
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
    it('should set the value of "foreignCurrency" slot = "' + expectedVals.init.foreignCurrency + '"', function () {
      expect(currencyConverter.getForeignCurrency()).to.be.equal(expectedVals.init.foreignCurrency);
    });
    it('should have the initial value of "date" slot = "' + expectedVals.init.date + '"', function () {
      expect(currencyConverter.getDate()).to.be.equal(expectedVals.init.date);
    });
    it('should have the initial value of "base" slot = "' + expectedVals.init.base + '"', function () {
      expect(currencyConverter.getBase()).to.be.equal(expectedVals.init.base);
    });
    it('should make the request with the initial values and set ', function () {
      expect(makeRequestStub.calledOnce).to.be.equal(true);
      expect(currencyConverter.getConversion()).to.be.equal(expectedVals.init.conversion);
    });
  });

  describe('should set slots values correctly', function () {
    before(function () {
      currencyConverter.setForeignCurrency(expectedVals.set.foreignCurrency);
      currencyConverter.setDate(expectedVals.set.date);
      currencyConverter.setBase(expectedVals.set.base);
      currencyConverter.sendQuery();
    });
    it('should have the initial value of "foreignCurrency" slot = "' + expectedVals.set.foreignCurrency + '"', function () {
      expect(currencyConverter.getForeignCurrency()).to.be.equal(expectedVals.set.foreignCurrency);
    });
    it('should have the initial value of "date" slot = "' + expectedVals.set.date + '"', function () {
      expect(currencyConverter.getDate()).to.be.equal(expectedVals.set.date);
    });
    it('should have the initial value of "base" slot = "' + expectedVals.set.base + '"', function () {
      expect(currencyConverter.getBase()).to.be.equal(expectedVals.set.base);
    });
    it('should make the request with the initial values and set ', function () {
      expect(currencyConverter.getConversion()).to.be.equal(expectedVals.set.conversion);
    });
  });
});
