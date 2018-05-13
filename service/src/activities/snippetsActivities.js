const { validatePayload } = require('./activityHelpers');
const { groupForSnippetNotFound } = require('../errors');

const groupForSnippetExists = async (groupID, groupsOrm) => {
  const group = await groupsOrm.getSingle(groupID);
  if (!group) {
    const error = Error(groupForSnippetNotFound.message);
    error.status = groupForSnippetNotFound.status;
    throw error;
  }
  return true;
};

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { snippetsDao, groupsDao } = Dao;

  const createNew = async (payload) => {
    const validPayload = validatePayload(getResourceBody(payload), JoiSchema);
    if (await groupForSnippetExists(validPayload.group, groupsDao)) {
      return snippetsDao.create(validPayload);
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
