const request = require('supertest');

const logger = require('../../src/utils/logger');

const helpers = ({ host, path, contentType }) => {

  const createResource = () => ({
    post: async (payload) => {
      logger.info('createResource.post', { host, path, contentType, payload });
      return request(host)
        .post(path)
        .set('Content-Type', contentType)
        .send(payload);
    },
  });

  const getResource = () => ({
    getByID: async (id) => {
      logger.info('getResource.getByID', { host, path, contentType, id });
      return request(host)
        .get(`${path}/${id}`)
        .set('Content-Type', contentType);
    },
  });

  const searchForResource = () => ({
    post: async (searchPayload) => {
      logger.info('searchForResource.post', { host, path, contentType, searchPayload });
      return request(host)
        .post(path)
        .set('Content-Type', contentType)
        .send(searchPayload);
    },
  });

  const tryToCreateAndExpectError = async (payload, statusCode = 422) => {
    const response = await createResource().post(payload);
    response.statusCode.should.be.equal(statusCode);
    return response;
  };

  const createAndExpectSuccess = async (payload) => {
    const response = await createResource().post(payload);
    response.statusCode.should.be.equal(201);
    return response;
  };

  return {
    createResource,
    getResource,
    tryToCreateAndExpectError,
    createAndExpectSuccess,
    searchForResource,
  };
};

module.exports = { helpers };
