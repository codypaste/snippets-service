const should = require('should');

const {
  preparePatchPayload,
} = require('../../helpers/commons');
const { groupCreationPayload } = require('../../payloads/groupPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Update group PATCH /groups/:id', () => {
  it('Should change group to private and password for protection', async () => {
    // given
    const changeIsPublic = preparePatchPayload('isPublic', false);
    const addPassword = preparePatchPayload('password', 'P@$$W0RD', 'add');
    const patchPayload = [changeIsPublic, addPassword];

    const { _id: groupId } = (await groupsTestHelpers
      .createAndExpectSuccess(groupCreationPayload())).body;

    // when
    const patchedGroup = await groupsTestHelpers
      .updateResource()
      .patch(groupId, patchPayload);

    // then
    patchedGroup.statusCode.should.be.equal(204);
    const updatedGroup = (await groupsTestHelpers
      .getResource()
      .getByID(groupId)).body;
    updatedGroup.isPublic.should.be.equal(false);
    updatedGroup.should.not.have.property('password');
  });
});
