const {
  validateBody,
  validateIDFormat,
} = require('./activityHelpers');
const { entityNotFound } = require('../errors');

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { groupsDao, snippetsDao } = Dao;

  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);
    return groupsDao.create(validBody);
  };

  const getSingle = async (resourceId) => {
    const validID = validateIDFormat(resourceId);
    const group = await groupsDao.getSingle(validID);
    if (!group) {
      throw entityNotFound('group', resourceId);
    }
    return group;
  };

  const deleteSingle = async resourceId => groupsDao.deleteSingle(resourceId);

  const searchAndGetAllSnippets = async ({ groupId }) => {
    const foundGroup = await groupsDao.getSingle(groupId);
    if (!foundGroup) {
      throw entityNotFound('Group', groupId);
    }
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
