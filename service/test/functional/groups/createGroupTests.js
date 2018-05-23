const should = require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Creating groups POST /groups', () => {
  it('Should create new group with valid payload', async () => {
    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload);

    postResponse.statusCode.should.be.equal(201);
    should.exist(postResponse.body);
    should.exist(postResponse.body.createdAt);
    should.exist(postResponse.body.isPublic);
    should.exist(postResponse.body.sharedTo);
    should.exist(postResponse.body._id);
    should.exist(postResponse.body.title);
    should.exist(postResponse.body.lastModifiedTimestamp);
  });
});
