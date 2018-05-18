const {
  validateBody,
  validateIDFormat,
} = require('./activityHelpers');
const Errors = require('../errors');

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { groupsDao, snippetsDao } = Dao;

  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);
    return groupsDao.create(validBody);
  };

  const getSingle = async (resourceId) => {
    const validID = validateIDFormat(resourceId);
    return groupsDao.getSingle(validID);
  };

  const deleteSingle = async resourceId => groupsDao.deleteSingle(resourceId);

  const searchAndGetAllSnippets = async ({ groupId }) => {
    const foundGroup = await groupsDao.getSingle(groupId);
    if (!foundGroup) { throw Errors.entityNotFound('Group', groupId); }
    const snippetsFromGroup = await snippetsDao.findByGroup(groupId);
    return {
      group: foundGroup,
      snippets: snippetsFromGroup,
      snippetsAmount: snippetsFromGroup.length,
    };
  };

  return {
    createNew,
    getSingle,
    deleteSingle,
    searchAndGetAllSnippets,
  };
};
