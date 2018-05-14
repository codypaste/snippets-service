const { validateBody } = require('./activityHelpers');
const { groupForSnippetNotFound } = require('../errors');

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

  const getSingle = async resourceId => snippetsDao.getSingle(resourceId);

  const deleteSingle = async resourceId => snippetsDao.deleteSingle(resourceId);

  // TODO
  const search = async payload => payload;
  return {
    createNew,
    getSingle,
    deleteSingle,
    search,
  };
};
