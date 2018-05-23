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

  it('Should return ExpirationDateError while trying to get group which has expired', async () => {
    // given
    groupCreationPayload.expirationDatetime = '2000-12-12';

    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload);

    postResponse.statusCode.should.be.equal(201);

    const createdGroup = postResponse.body;
    const { _id } = createdGroup;

    // when
    const getResponse = await groupsTestHelpers
      .getResource()
      .getByID(_id);

    // then
    getResponse.statusCode.should.be.equal(423);
    getResponse.error.text.should.be.equal(`group with id ${_id} has expired`);
  });

  it('Should return 404 error when group does not exist', async () => {
    const nonExistingGroupID = '5af7690a2cc2e10062e047a8';

    const getResponse = await groupsTestHelpers
      .getResource()
      .getByID(nonExistingGroupID);
    getResponse.statusCode.should.be.equal(404);
    getResponse.error.text.should.be.equal(`group with id ${nonExistingGroupID} not found`);
  });

});
