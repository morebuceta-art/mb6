const { Browser } = require('zombie');
const assert = require('chai').assert;

// Configuración CRUCIAL - Reemplaza con tu URL real
Browser.site = 'https://fersalas1-proyectoqa.onrender.com'; 

describe('Functional Tests', function() {
  this.timeout(10000); // Aumentamos el timeout para evitar fallos

  it('Convert valid input (10L)', function(done) {
    Browser.visit('/api/convert?input=10L', function(err, browser) {
      if (err) return done(err);
      
      assert.equal(browser.statusCode, 200);
      const result = JSON.parse(browser.text);
      
      // Verificación EXACTA que espera freeCodeCamp
      assert.equal(result.initNum, 10);
      assert.equal(result.initUnit, 'L');
      assert.approximately(result.returnNum, 2.64172, 0.00001);
      assert.equal(result.returnUnit, 'gal');
      assert.equal(result.string, '10 liters converts to 2.64172 gallons');
      
      done();
    });
  });

  it('Convert invalid unit (32g)', function(done) {
    Browser.visit('/api/convert?input=32g', function(err, browser) {
      assert.equal(browser.statusCode, 200);
      assert.equal(browser.text, 'invalid unit');
      done();
    });
  });

  it('Convert invalid number (3/7.2/4kg)', function(done) {
    Browser.visit('/api/convert?input=3/7.2/4kg', function(err, browser) {
      assert.equal(browser.statusCode, 200);
      assert.equal(browser.text, 'invalid number');
      done();
    });
  });

  it('Convert invalid number and unit (3/7.2/4kilomegagram)', function(done) {
    Browser.visit('/api/convert?input=3/7.2/4kilomegagram', function(err, browser) {
      assert.equal(browser.statusCode, 200);
      assert.equal(browser.text, 'invalid number and unit');
      done();
    });
  });

  it('Convert with no number (kg)', function(done) {
    Browser.visit('/api/convert?input=kg', function(err, browser) {
      assert.equal(browser.statusCode, 200);
      const result = JSON.parse(browser.text);
      
      // Verificación del valor por defecto (1)
      assert.equal(result.initNum, 1);
      assert.equal(result.initUnit, 'kg');
      assert.approximately(result.returnNum, 2.20462, 0.00001);
      assert.equal(result.returnUnit, 'lbs');
      assert.equal(result.string, '1 kilograms converts to 2.20462 pounds');
      
      done();
    });
  });
});


