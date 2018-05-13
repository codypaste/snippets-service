const should = require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Getting groups GET /groups', () => {
  it('Should get created group by id GET /groups/:id', async () => {
    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload);

    postResponse.statusCode.should.be.equal(201);

    const createdGroup = postResponse.body;
    const { _id } = createdGroup;

    const getResponse = await groupsTestHelpers
      .getResource()
      .getByID(_id);
    getResponse.statusCode.should.be.equal(200);
    getResponse.body.should.be.deepEqual(createdGroup);
  });
});
