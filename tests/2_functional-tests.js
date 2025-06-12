const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); 

const { assert } = chai;

chai.use(chaiHttp);

suite('Functional Tests', function () {

  // #1
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

  // #2
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

  // #3
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

  // #4
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

