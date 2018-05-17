const { validateBody } = require('./activityHelpers');

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { groupsDao, snippetsDao } = Dao;

  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);
    return groupsDao.create(validBody);
  };

  const getSingle = async resourceId => groupsDao.getSingle(resourceId);

  const deleteSingle = async resourceId => groupsDao.deleteSingle(resourceId);

  const searchAndGetAllSnippets = async ({ groupId }) => {
    const foundGroup = await groupsDao.findById(groupId);
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
