const should = require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Creating groups POST /groups', () => {
  it('Should create new group with valid payload', async () => {
    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload());

    postResponse.statusCode.should.be.equal(201);
    should.exist(postResponse.body);
    should.exist(postResponse.body.createdAt);
    should.exist(postResponse.body.isPublic);
    should.exist(postResponse.body.sharedTo);
    should.exist(postResponse.body._id);
    should.exist(postResponse.body.title);
    should.exist(postResponse.body.lastModifiedTimestamp);
    postResponse.body.should.have.property('expirationDatetime');
  });

  it('Should not create group when isPublic is set to false and password is missing', async () => {
    const invalidPayload = Object.assign(groupCreationPayload(), { isPublic: false });
    const postResponse = await groupsTestHelpers
      .createResource()
      .post(invalidPayload);

    postResponse.statusCode.should.be.equal(422);
  });

  it('Should create group when isPublic is set to false and password is provided', async () => {
    const validPayload = Object.assign(groupCreationPayload(), { isPublic: false }, { password: 'p@$$w0rD' });
    const postResponse = await groupsTestHelpers
      .createAndExpectSuccess(validPayload);

    postResponse.body.should.not.have.property('password');
  });
});
