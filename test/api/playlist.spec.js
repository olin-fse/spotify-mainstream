const request = require('supertest');
const app = require('../../app');

afterAll(() => {
  app.db.destroy();
});

test('/api/v1/healthz', function(done) {
  request(app)
    .get('/api/v1/healthz')
    .expect(200, done);
});