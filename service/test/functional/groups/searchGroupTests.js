const should = require('should');

const { groupCreationPayload } = require('../../payloads/groupPayloads');
const { snippetCreationPayload } = require('../../payloads/snippetPayloads');
const groupsTestHelpers = require('../../helpers/helpersFactory').groupsHelpers;
const snippetsTestHelpers = require('../../helpers/helpersFactory').snippetsHelpers;
const groupsSearchHelpers = require('../../helpers/helpersFactory').groupsSearchHelpers;

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
    const createdGroup = (await groupsTestHelpers
      .createAndExpectSuccess(groupCreationPayload)).body;
    const { _id } = createdGroup;

    const snippetsAmount = 4;
    await prepareSnippetsForGroup(_id, snippetsAmount);

    // when
    const searchPayload = { groupId: _id };
    const searchResponse = await groupsSearchHelpers
      .searchForResource()
      .post(searchPayload);

    // then
    searchResponse.statusCode.should.be.equal(200);
    should.exist(searchResponse.body.snippets);
    should.exist(searchResponse.body.group);
    should.exist(searchResponse.body.snippetsAmount);
    searchResponse.body.snippetsAmount.should.be.equal(snippetsAmount);
    searchResponse.body.snippets.forEach((snippet) => {
      snippet.group.should.be.equal(_id);
    });
  });
})
;
