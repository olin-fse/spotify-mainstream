const request = require('supertest');

const app = require('../../server');

let agent;

beforeAll(function() {
  agent = request(app);
});

afterAll(function() {
  app.close();
});

test('/api/v1/healthz', function(done) {
  request(app)
    .get('/api/v1/healthz')
    .expect(200, done);
});