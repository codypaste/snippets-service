const { validateBody } = require('./activityHelpers');

module.exports = ({ Dao, JoiSchema, getResourceBody }) => {

  const { groupsDao } = Dao;

  const createNew = async (payload) => {
    const validBody = validateBody(getResourceBody(payload), JoiSchema);
    return groupsDao.create(validBody);
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
