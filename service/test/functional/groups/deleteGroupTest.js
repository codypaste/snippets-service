require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const { snippetCreationPayload } = require('../../payloads/snippetPayloads');
const snippetsTestHelpers = require('../../helpers/helpersFactory').snippetsHelpers;
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

const prepareGroupForSnippet = async () => {
  const createdGroupRes = await groupsTestHelpers
    .createResource()
    .post(groupCreationPayload());
  createdGroupRes.statusCode.should.be.equal(201);

  return createdGroupRes;
};

describe('Deleting snippets DELETE /groups', () => {
  it('Should delete created snippets performing DELETE on /groups/:id', async () => {
    const createdGroupRes = await prepareGroupForSnippet();

    const { id: groupID } = createdGroupRes.body;
    const snippetPayload = snippetCreationPayload(groupID);
    const createdSnippetRes = await snippetsTestHelpers
      .createResource()
      .post(snippetPayload);
    createdSnippetRes.statusCode.should.be.equal(201);

    const { id: snippetID } = createdSnippetRes.body;

    const snippetGetRes = await snippetsTestHelpers
      .getResource()
      .getByID(snippetID);

    snippetGetRes.statusCode.should.be.equal(200);

    const deleteRes = await groupsTestHelpers.deleteResource(groupID);
    deleteRes.statusCode.should.be.equal(204);

    const getDeletedGroupRes = await groupsTestHelpers.getResource().getByID(groupID);
    getDeletedGroupRes.statusCode.should.be.equal(404);

    const getDeletedSnippetRes = await snippetsTestHelpers.getResource().getByID(snippetID);
    getDeletedSnippetRes.statusCode.should.be.equal(404);
  });

  it('Should return 404 error when snippet does not exist', async () => {
    const nonExistingSnippetID = '5af7690a2cc2e10062e047a8';

    const getResponse = await snippetsTestHelpers
      .deleteResource(nonExistingSnippetID);
    getResponse.statusCode.should.be.equal(404);
  });
});
