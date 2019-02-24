const groupsTestHelpers = require('../helpers/helpersFactory').groupsHelpers;
const { groupCreationPayload } = require('../payloads/groupPayloads');

const prepareGroupForSnippet = async () => {
  const createdGroupRes = await groupsTestHelpers
    .createResource()
    .post(groupCreationPayload());
  createdGroupRes.statusCode.should.be.equal(201);

  return createdGroupRes;
};

module.exports = {
  prepareGroupForSnippet,
};
