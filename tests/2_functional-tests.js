const chai = require('chai');
const assert = chai.assert;
const Browser = require('zombie');
const server = require('../server');

Browser.site = 'http://0.0.0.0:3000';

suite('Functional Tests with Zombie.js', function() {
  this.timeout(10000); // Aumentamos el timeout para pruebas de navegador

  const browser = new Browser();

  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  test('should have a working "site" property', function() {
    assert.isNotNull(browser.site);
  });

  suite('"Famous Italian Explorers" form', function() {
    test('Submit the surname "Colombo" in the HTML form', function(done) {
      browser.fill('surname', 'Colombo').then(() => {
        return browser.pressButton('submit');
      }).then(() => {
        browser.assert.success();
        browser.assert.text('span#name', 'Cristoforo');
        browser.assert.text('span#surname', 'Colombo');
        browser.assert.element('span#dates', 1);
        done();
      }).catch(done);
    });

    test('Submit the surname "Vespucci" in the HTML form', function(done) {
      browser.fill('surname', 'Vespucci').then(() => {
        return browser.pressButton('submit');
      }).then(() => {
        browser.assert.success();
        browser.assert.text('span#name', 'Amerigo');
        browser.assert.text('span#surname', 'Vespucci');
        browser.assert.element('span#dates', 1);
        done();
      }).catch(done);
    });
  });

  suite('GET /hello', function() {
    test('should respond with "hello Guest" when no name parameter', function(done) {
      browser.visit('/hello', function() {
        browser.assert.success();
        browser.assert.text('body', 'hello Guest');
        done();
      });
    });

    test('should respond with "hello Julian" when name=Julian', function(done) {
      browser.visit('/hello?name=Julian', function() {
        browser.assert.success();
        browser.assert.text('body', 'hello Julian');
        done();
      });
    });
  });
});






