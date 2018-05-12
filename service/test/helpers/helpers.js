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

  return {
    createResource,
    getResource,
  };
};

module.exports = { helpers };
