const should = require('should');
const _ = require('lodash');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const { snippetCreationPayload } = require('../../payloads/snippetPayloads');
const snippetsTestHelpers = require('../../helpers/helpersFactory').snippetsHelpers;
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

const prepareGroupForSnippet = async () => {
  const createdGroupRes = await groupsTestHelpers
    .createResource()
    .post(groupCreationPayload);
  createdGroupRes.statusCode.should.be.equal(201);

  return createdGroupRes;
};

describe('Creating snippet POST /snippets', () => {
  it('Should create new snippet', async () => {
    const createdGroupRes = await prepareGroupForSnippet();

    const { _id: groupID } = createdGroupRes.body;
    const snippetPayload = snippetCreationPayload(groupID);
    const createdSnippetRes = await snippetsTestHelpers
      .createResource()
      .post(snippetPayload);
    createdSnippetRes.statusCode.should.be.equal(201);
    should.exist(createdSnippetRes.body);
  });

  it('Should not create snippet if mandatory parameter is missing', async () => {

    const mandatoryParameters = ['snippet', 'group', 'snippetName'];

    const createdGroupRes = await prepareGroupForSnippet();
    const { _id: groupID } = createdGroupRes.body;

    const requestPromisses = mandatoryParameters.map((param) => {
      const snippetPayload = _.omit(snippetCreationPayload(groupID), param);
      return snippetsTestHelpers.tryToCreateAndExpectError(snippetPayload, 422);
    });
    await Promise.all(requestPromisses);
  });

  it('Should not create new snippet when provided group does not exist', async () => {
    // it has to be mongo ObjectId type
    const nonExistingGroupID = '5af7690a2cc2e10062e047a8';
    const snippetPayload = snippetCreationPayload(nonExistingGroupID);
    const createdSnippetRes = await snippetsTestHelpers
      .createResource()
      .post(snippetPayload);
    createdSnippetRes.statusCode.should.be.equal(404);
    createdSnippetRes.error.text.should.be.equal('Group provided for this snippet does not exist');
  });

  it('Should not create new snippet when group is not provided', async () => {
    const snippetPayload = _.omit(snippetCreationPayload(), 'group');
    const createdSnippetRes = await snippetsTestHelpers
      .createResource()
      .post(snippetPayload);
    createdSnippetRes.statusCode.should.be.equal(422);
    should.exists(createdSnippetRes.error);
  });
});
