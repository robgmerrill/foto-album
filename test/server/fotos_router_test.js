const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const Foto = require(__dirname + '/../../models/foto');

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/foto_app_test';
const backendServer = require(__dirname + '/../../lib/server');
const testPort = 3000;

describe('Fotos router', () => {
  before(() => {
    this.server = backendServer(testPort);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      this.server.close();
      mongoose.disconnect();
      done();
    });
  });

  it('should be able to retrieve all fotos', (done) => {
    request('localhost:' + testPort)
      .get('/api/fotos')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should be able to post an foto', (done) => {
    request('localhost:' + testPort)
      .post('/api/fotos')
      .send({ url: 'testurl' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.url).to.eql('testurl');
        expect(res.body).to.have.property('_id');
        done();
      });
  });
});
