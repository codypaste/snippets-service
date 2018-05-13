const { validatePayload } = require('./activityHelpers');

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { groupsDao } = Dao;

  const createNew = async (payload) => {
    const validPayload = validatePayload(getResourceBody(payload), JoiSchema);
    return groupsDao.create(validPayload);
  };

  const getSingle = async resourceId => groupsDao.getSingle(resourceId);

  const deleteSingle = async resourceId => groupsDao.deleteSingle(resourceId);

  // TODO
  const search = async payload => payload;

  return {
    createNew,
    getSingle,
    deleteSingle,
    search,
  };
};
