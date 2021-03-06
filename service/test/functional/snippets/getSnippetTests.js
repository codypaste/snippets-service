require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const { snippetCreationPayload } = require('../../payloads/snippetPayloads');
const snippetsTestHelpers = require('../../helpers/helpersFactory')
  .snippetsHelpers;
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

const prepareGroupForSnippet = async () => {
  const createdGroupRes = await groupsTestHelpers
    .createResource()
    .post(groupCreationPayload());
  createdGroupRes.statusCode.should.be.equal(201);

  return createdGroupRes;
};

describe('Getting snippet GET /snippets', () => {
  it('Should get created snippet GET /snippets/:id', async () => {
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
  });

  it('Should return 404 error when snippet does not exist', async () => {
    const nonExistingSnippetID = '5af7690a2cc2e10062e047a8';

    const getResponse = await snippetsTestHelpers
      .getResource()
      .getByID(nonExistingSnippetID);
    getResponse.statusCode.should.be.equal(404);
    getResponse.error.text.should.be.equal(
      `snippet with id ${nonExistingSnippetID} not found`,
    );
  });
});
