const {
  validateBody,
  validateIDFormat,
  validateAndPatch,
} = require('./activityHelpers');
const {
  groupForSnippetNotFound,
  entityNotFound,
} = require('../errors');

const groupForSnippetExists = async (groupID, groupsOrm) => {
  const group = await groupsOrm.getSingle(groupID);
  if (!group) {
    throw groupForSnippetNotFound;
  }
  return true;
};

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { snippetsDao, groupsDao } = Dao;

  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);
    if (await groupForSnippetExists(validBody.group, groupsDao)) {
      return snippetsDao.create(validBody);
    }
  };

  const getSingle = async (resourceId) => {
    const validID = validateIDFormat(resourceId);
    const snippet = await snippetsDao.getSingle(validID);
    if (!snippet) {
      throw entityNotFound('snippet', resourceId);
    }
    return snippet;
  };

  const deleteSingle = async resourceId => snippetsDao.deleteSingle(resourceId);

  const updateWithPatch = async (resourceId, patchPayload) => {
    const snippetToPatch = await getSingle(resourceId);
    const patchedSnippet = validateAndPatch(patchPayload, snippetToPatch);
    return snippetsDao.updateById(resourceId, patchedSnippet);
  };

  const search = async ({
    groupId,
    title,
    creationDate,
    author,
  }) => {
    // TBD
    const records = await snippetsDao
      .searchByParam(
        groupId,
        title,
        creationDate,
        author,
      );
  };
  return {
    createNew,
    getSingle,
    deleteSingle,
    updateWithPatch,
    search,
  };
};
