const should = require('should');
const _ = require('lodash');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

// TODO

describe('Creating groups POST /groups', () => {
  it('Should return authorization error while trying to access protected group without token', async () => {
    const postResponse = await groupsTestHelpers
      .createAndExpectSuccess(groupCreationPayload());

    throw Error('Not implemented exception');
  });

});
