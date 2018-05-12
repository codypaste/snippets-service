const should = require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const { snippetCreationPayload } = require('../../payloads/snippetPayloads');
const snippetsTestHelpers = require('../../helpers/helpersFactory').snippetsHelpers;
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;

describe('Creating snippet POST /snippets', () => {
  it('Should create new snippet', async () => {
    const createdGroupRes = await groupsTestHelpers
      .createResource()
      .post(groupCreationPayload);
    createdGroupRes.statusCode.should.be.equal(201);

    const { _id: groupID } = createdGroupRes.body;
    const snippetPayload = snippetCreationPayload(groupID);
    const createdSnippetRes = await snippetsTestHelpers
      .createResource()
      .post(snippetPayload);
    createdSnippetRes.statusCode.should.be.equal(201);
    should.exist(createdSnippetRes.body);
  });
});
