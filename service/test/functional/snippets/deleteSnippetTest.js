require('should');

const snippetsTestHelpers = require('../../helpers/helpersFactory').snippetsHelpers;

describe('Deleting snippets DELETE /snippets', () => {
  it('Should return 404 error when deleting snippet which does not exist', async () => {
    const nonExistingSnippetID = '5af7690a2cc2e10062e047a8';

    const getResponse = await snippetsTestHelpers
      .deleteResource(nonExistingSnippetID);
    getResponse.statusCode.should.be.equal(404);
  });
});
