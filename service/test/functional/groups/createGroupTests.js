const should = require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Creating groups POST /groups', () => {
  it('Should create new groups and return its unique id', async () => {
    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload);

    postResponse.statusCode.should.be.equal(201);
    should.exist(postResponse.body);
  });
});
