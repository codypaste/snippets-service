const should = require('should');
const _ = require('lodash');

const {
  prepareGroupForSnippet,
  preparePatchPayload,
} = require('../../helpers/commons');
const { snippetCreationPayload } = require('../../payloads/snippetPayloads');
const snippetsTestHelpers = require('../../helpers/helpersFactory').snippetsHelpers;

describe('Updating snippet PATCH /snippets/:id', () => {
  it('Should patch existing snippet', async () => {
    // given
    const { _id: groupID } = (await prepareGroupForSnippet()).body;
    const snippetPayload = snippetCreationPayload(groupID);
    const newSnippetVal = 'patched snippet value';
    const patchPayload = preparePatchPayload('snippet', newSnippetVal);

    // when
    const { _id: snippetID } = (await snippetsTestHelpers
      .createAndExpectSuccess(snippetPayload)).body;

    const patchedSnippet = await snippetsTestHelpers
      .updateResource()
      .patch(snippetID, [patchPayload]);

    // then
    patchedSnippet.statusCode.should.be.equal(204);
    const updatedSnippet = (await snippetsTestHelpers
      .getResource()
      .getByID(snippetID)).body;
    updatedSnippet.snippet.should.be.equal(newSnippetVal);
  });

  it('Should update \'updatedAt\' after patching snippet', async () => {
    // given
    const { _id: groupID } = (await prepareGroupForSnippet()).body;
    const snippetPayload = snippetCreationPayload(groupID);
    const newSnippetVal = 'patched snippet value';
    const patchPayload = preparePatchPayload('snippet', newSnippetVal);

    // when
    const {
      _id: snippetID,
      lastModifiedTimestamp: lastModifiedBefore,
    } = (await snippetsTestHelpers
      .createAndExpectSuccess(snippetPayload)).body;

    const patchedSnippet = await snippetsTestHelpers
      .updateResource()
      .patch(snippetID, [patchPayload]);

    // then
    patchedSnippet.statusCode.should.be.equal(204);
    const {
      lastModifiedTimestamp: lastModifiedAfter,
    } = (await snippetsTestHelpers
      .getResource()
      .getByID(snippetID)).body;

    lastModifiedBefore.should.be.not.equal(lastModifiedAfter);
  });

  it('Should return an error while trying to patch non existing snippet', async () => {
    // given
    const newSnippetVal = 'patched snippet value';
    const patchPayload = preparePatchPayload('snippet', newSnippetVal);

    const nonExistingSnippetID = '5af7690a2cc2e10062e047a8';

    // when
    const patchedSnippetRes = await snippetsTestHelpers
      .updateResource()
      .patch(nonExistingSnippetID, [patchPayload]);

    // then
    patchedSnippetRes.statusCode.should.be.equal(404);
    patchedSnippetRes.should.have.property('error');
    patchedSnippetRes.error.text.should.be.equal(`snippet with id ${nonExistingSnippetID} not found`);
  });

  it('Should return an error while trying to patch with wrong payload', async () => {
    // given
    const { _id: groupID } = (await prepareGroupForSnippet()).body;
    const snippetPayload = snippetCreationPayload(groupID);
    const wrongPatchPayload = { value: 'Update snippet pls' };

    const { _id: snippetID } = (await snippetsTestHelpers
      .createAndExpectSuccess(snippetPayload)).body;

    // when
    const patchedSnippetRes = await snippetsTestHelpers
      .updateResource()
      .patch(snippetID, wrongPatchPayload);

    // then
    patchedSnippetRes.statusCode.should.be.equal(400);
    patchedSnippetRes.should.have.property('error');
  });
});
