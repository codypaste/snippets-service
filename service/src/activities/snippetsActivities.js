const Promise = require('bluebird');
const fastChunkString = require('fast-chunk-string');

const { validateBody } = require('./activityHelpers');
const { entityNotFound, groupForSnippetNotFound } = require('../errors');

const ensureGroup = async (groupsDao, groupId) => {
  const group = await groupsDao.getSingle(groupId);

  if (!group) {
    throw groupForSnippetNotFound;
  }

  return true;
};

module.exports = ({
  dao,
  groupsDao,
  snippetChunksDao,
  JoiSchema,
  getResourceBody,
}) => {
  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);

    const groupId = validBody.group;

    await ensureGroup(groupsDao, groupId);

    validBody.group = {
      connect: {
        id: groupId,
      },
    };

    const snippetValue = validBody.snippet;

    delete validBody.snippet;
    const snippet = await dao.create(validBody);

    const chunked = fastChunkString(snippetValue, {
      size: 64000,
      unicodeAware: false,
    });

    await Promise.map(chunked, (chunk) => {
      const obj = {
        value: chunk,
        snippet: {
          connect: {
            id: snippet.id,
          },
        },
      };

      return snippetChunksDao.create(obj);
    });

    return snippet;
  };

  const getSingle = async (resourceId) => {
    const snippet = await dao.getSingle(resourceId);
    if (!snippet) {
      throw entityNotFound('snippet', resourceId);
    }
    return snippet;
  };

  const deleteSingle = async () => {};

  return {
    createNew,
    getSingle,
    deleteSingle,
  };
};
