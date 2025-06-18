const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { Browser } = require('zombie');

Browser.site = 'https://fersalas1-proyectoqa.onrender.com';

chai.use(chaiHttp);
const assert = chai.assert;

describe('Functional Tests', function() {
  this.timeout(5000);

  it('Convert valid input such as 10L: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 2.64172, 0.00001);
        assert.equal(res.body.returnUnit, 'gal');
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
        done();
      });
  });

  it('Convert invalid input such as 32g: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  it('Convert invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  it('Convert invalid number and unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  it('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(app)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.20462, 0.00001);
        assert.equal(res.body.returnUnit, 'lbs');
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        done();
      });
  });
});



