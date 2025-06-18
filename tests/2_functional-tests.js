const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);
const assert = chai.assert;

describe('Functional Tests', function() {
  this.timeout(5000);

  // Test 1: Convertir entrada válida (10L)
  it('Convert valid input such as 10L: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: 'L',
          returnNum: 2.64172,
          returnUnit: 'gal',
          string: '10 liters converts to 2.64172 gallons'
        });
        done();
      });
  });

  // Test 2: Convertir entrada inválida (32g)
  it('Convert invalid input such as 32g: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  // Test 3: Convertir número inválido (3/7.2/4kg)
  it('Convert invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  // Test 4: Convertir número y unidad inválidos (3/7.2/4kilomegagram)
  it('Convert invalid number and unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  // Test 5: Convertir sin número (kg)
  it('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: 'kg',
          returnNum: 2.20462,
          returnUnit: 'lbs',
          string: '1 kilograms converts to 2.20462 pounds'
        });
        done();
      });
  });
});





