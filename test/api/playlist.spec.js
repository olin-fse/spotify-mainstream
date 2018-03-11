const request = require('supertest');
const app = require('../../app');
const chai = require('chai');

afterAll(() => {
  app.db.destroy();
});

// Helper to check types
expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});

test('/api/v1/healthz', function(done) {
  request(app)
    .get('/api/v1/healthz')
    .expect(200, done);
});

test('/api/v1/get-users', function(done) {
  request(app)
    .get('/api/v1/get-users')
    .expect(200)
    .then(res => {
      expect(res.body).toBeType("array");
      done();
    })
});