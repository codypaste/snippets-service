require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Getting groups GET /groups', () => {
  it('Should get created group by id GET /groups/:id', async () => {
    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload());

    postResponse.statusCode.should.be.equal(201);

    const createdGroup = postResponse.body;
    const { id } = createdGroup;

    const getResponse = await groupsTestHelpers.getResource().getByID(id);
    getResponse.statusCode.should.be.equal(200);
    getResponse.body.should.be.deepEqual(createdGroup);
    getResponse.body.should.not.have.property('password');
  });

  it('Should return ExpirationDateError while trying to get group which has expired', async () => {
    // given
    const groupPayload = groupCreationPayload();
    groupPayload.expirationDatetime = '2000-12-12';

    const postResponse = await groupsTestHelpers
      .createResource()
      .post(groupPayload);
    postResponse.statusCode.should.be.equal(201);

    const createdGroup = postResponse.body;
    const { id } = createdGroup;

    // when
    const getResponse = await groupsTestHelpers.getResource().getByID(id);

    // then
    getResponse.statusCode.should.be.equal(423);
    getResponse.error.text.should.be.equal(`group with id ${id} has expired`);
  });

  it('Should return 404 error when group does not exist', async () => {
    const nonExistingGroupID = '5af7690a2cc2e10062e047a8';

    const getResponse = await groupsTestHelpers
      .getResource()
      .getByID(nonExistingGroupID);
    getResponse.statusCode.should.be.equal(404);
    getResponse.error.text.should.be.equal(
      `group with id ${nonExistingGroupID} not found`,
    );
  });
});
