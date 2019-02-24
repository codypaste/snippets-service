const should = require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const { snippetCreationPayload } = require('../../payloads/snippetPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;
const snippetsTestHelpers = require('../../helpers/helpersFactory')
  .snippetsHelpers;
const groupsSearchHelpers = require('../../helpers/helpersFactory')
  .groupsSearchHelpers;

const prepareSnippetsForGroup = async (groupId, numOfSnippets) => {
  const requests = [];
  for (let i = 1; i <= numOfSnippets; i += 1) {
    const snippetPayload = snippetCreationPayload(groupId);
    requests.push(snippetsTestHelpers.createAndExpectSuccess(snippetPayload));
  }
  return Promise.all(requests);
};

describe('searching groups POST /groups/_search', () => {
  it('Should return group with all snippets, which belong to it', async () => {
    // given
    const createdGroup = (await groupsTestHelpers.createAndExpectSuccess(
      groupCreationPayload(),
    )).body;
    const { id } = createdGroup;

    const snippetsAmount = 4;
    await prepareSnippetsForGroup(id, snippetsAmount);

    // when
    const searchPayload = { groupId: id };
    const searchResponse = await groupsSearchHelpers
      .searchForResource()
      .post(searchPayload);

    // then
    searchResponse.statusCode.should.be.equal(200);
    searchResponse.body.should.have.property('group');
    searchResponse.body.should.have.property('snippets');
    searchResponse.body.group.should.not.have.property('password');
    searchResponse.body.snippets.should.have.length(snippetsAmount);
  });

  it('Should return ExpirationDateError and no snippets while trying to search for group which has expired', async () => {
    // given
    const groupPayload = groupCreationPayload();
    groupPayload.expirationDatetime = '2000-12-12';

    const createdGroup = (await groupsTestHelpers.createAndExpectSuccess(
      groupPayload,
    )).body;
    const { id } = createdGroup;

    const snippetsAmount = 4;
    await prepareSnippetsForGroup(id, snippetsAmount);

    // when
    const searchPayload = { groupId: id };
    const searchResponse = await groupsSearchHelpers
      .searchForResource()
      .post(searchPayload);

    // then
    searchResponse.status.should.be.equal(423);
    should.not.exist(searchResponse.body.snippets);
    should.not.exist(searchResponse.body.group);
    searchResponse.error.text.should.be.equal(
      `group with id ${id} has expired`,
    );
  });

  it('Should return error when group does not exist', async () => {
    // given
    const nonExistingGroupID = '5af7690a2cc2e10062e047a8';

    // when
    const searchPayload = { groupId: nonExistingGroupID };
    const searchResponse = await groupsSearchHelpers
      .searchForResource()
      .post(searchPayload);

    // then
    searchResponse.statusCode.should.be.equal(404);
    searchResponse.should.have.property('error');
    searchResponse.error.text.should.be.equals(
      `group with id ${nonExistingGroupID} not found`,
    );
  });

  it('Should return 401 unauthorized error when password for private group is not provided', async () => {
    // given
    const testPassword = 'P@$$w0rD';
    const groupPayload = Object.assign(
      groupCreationPayload(),
      { isPublic: false },
      { password: testPassword },
    );

    const createdGroup = (await groupsTestHelpers.createAndExpectSuccess(
      groupPayload,
    )).body;
    const { id } = createdGroup;

    // when
    const searchPayload = { groupId: id };
    const searchResponse = await groupsSearchHelpers
      .searchForResource()
      .post(searchPayload);

    // then
    searchResponse.status.should.be.equal(401);
    should.not.exist(searchResponse.body.snippets);
    should.not.exist(searchResponse.body.group);
    searchResponse.error.text.should.be.equal(
      `unauthorized for group with id ${id}`,
    );
  });

  it('Should return 401 unauthorized error when provided invalid password for private group', async () => {
    // given
    const testPassword = 'P@$$w0rD';
    const groupPayload = Object.assign(
      groupCreationPayload(),
      { isPublic: false },
      { password: testPassword },
    );

    const createdGroup = (await groupsTestHelpers.createAndExpectSuccess(
      groupPayload,
    )).body;
    const { id } = createdGroup;

    // when
    const searchPayload = { groupId: id, password: 'InvalidP@$$w0rD' };
    const searchResponse = await groupsSearchHelpers
      .searchForResource()
      .post(searchPayload);

    // then
    searchResponse.status.should.be.equal(401);
    should.not.exist(searchResponse.body.snippets);
    should.not.exist(searchResponse.body.group);
    searchResponse.error.text.should.be.equal(
      `unauthorized for group with id ${id}`,
    );
  });

  it('Should return group with all snippets, which belong to it when password for private group is correct', async () => {
    // given
    const testPassword = 'P@$$w0rD';
    const groupPayload = Object.assign(
      groupCreationPayload(),
      { isPublic: false },
      { password: testPassword },
    );

    const createdGroup = (await groupsTestHelpers.createAndExpectSuccess(
      groupPayload,
    )).body;
    const { id } = createdGroup;

    const snippetsAmount = 4;
    await prepareSnippetsForGroup(id, snippetsAmount);

    // when
    const searchPayload = { groupId: id, password: testPassword };
    const searchResponse = await groupsSearchHelpers
      .searchForResource()
      .post(searchPayload);

    // then
    searchResponse.status.should.be.equal(200);
    searchResponse.body.should.have.property('snippets');
    searchResponse.body.should.have.property('group');
    searchResponse.body.snippets.should.have.length(snippetsAmount);
  });
});
