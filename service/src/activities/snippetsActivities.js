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

module.exports = ({ OrmHelpers, JoiSchema, getResourceBody }) => {

  const { snippetsOrm, groupsOrm } = OrmHelpers;

  const createNew = async (payload) => {
    const validPayload = validatePayload(getResourceBody(payload), JoiSchema);
    if (await groupForSnippetExists(validPayload.group, groupsOrm)) {
      return snippetsOrm.create(validPayload);
    }
  };

  const getSingle = async resourceId => snippetsOrm.getSingle(resourceId);

  const deleteSingle = async resourceId => snippetsOrm.deleteSingle(resourceId);

  // TODO
  const search = async payload => payload;
  return {
    createNew,
    getSingle,
    deleteSingle,
    search,
  };
};
