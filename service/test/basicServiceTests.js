const request = require('supertest');

const helpers = require('./helpers');

it('application should be up and running', async () => {
  await (request(helpers.getApplicationURL())
    .get('/')
    .expect(200));
});
