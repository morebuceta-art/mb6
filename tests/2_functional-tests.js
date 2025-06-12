const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { assert } = chai;
chai.use(chaiHttp);

const Browser = require('zombie');
Browser.site = 'http://0.0.0.0:3000';

suite('Functional Tests', function () {

  test('Test GET /hello with no name', function (done) {
    chai
      .request(server)
      .get('/hello')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'hello Guest');
        done();
      });
  });

  test('Test GET /hello with your name', function (done) {
    chai
      .request(server)
      .get('/hello?name=Julian')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'hello Julian');
        done();
      });
  });

  test('Send {surname: "Colombo"}', function (done) {
    chai
      .request(server)
      .put('/travellers')
      .send({ surname: 'Colombo' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.name, 'Cristoforo');
        assert.equal(res.body.surname, 'Colombo');
        done();
      });
  });

  test('Send {surname: "da Verrazzano"}', function (done) {
    chai
      .request(server)
      .put('/travellers')
      .send({ surname: 'da Verrazzano' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.name, 'Giovanni');
        assert.equal(res.body.surname, 'da Verrazzano');
        done();
      });
  });

});

suite('Functional Tests with Zombie.js', function () {
  const browser = new Browser();

  suiteSetup(function (done) {
    browser.visit('/', done);
  });

  test('GET /hello with no name shows "hello Guest"', function (done) {
    browser.visit('/hello', function () {
      assert.equal(browser.status, 200);
      assert.include(browser.text('body'), 'hello Guest');
      done();
    });
  });

  test('GET /hello with name=Julian shows "hello Julian"', function (done) {
    browser.visit('/hello?name=Julian', function () {
      assert.equal(browser.status, 200);
      assert.include(browser.text('body'), 'hello Julian');
      done();
    });
  });

  test('Submit surname "Colombo" and check response in spans', function (done) {
    browser
      .fill('surname', 'Colombo')
      .pressButton('submit', function () {
        assert.equal(browser.status, 200);
        assert.equal(browser.text('#name'), 'Cristoforo');
        assert.equal(browser.text('#surname'), 'Colombo');
        done();
      });
  });

  test('Submit surname "da Verrazzano" and check response in spans', function (done) {
    browser
      .fill('surname', 'da Verrazzano')
      .pressButton('submit', function () {
        assert.equal(browser.status, 200);
        assert.equal(browser.text('#name'), 'Giovanni');
        assert.equal(browser.text('#surname'), 'da Verrazzano');
        done();
      });
  });

});
