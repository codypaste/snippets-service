const { validatePayload } = require('./activityHelpers');

module.exports = ({ OrmHelpers, JoiSchema, getResourceBody }) => {

  const createNew = async (payload) => {
    const validPayload = validatePayload(getResourceBody(payload), JoiSchema);
    return OrmHelpers.create(validPayload);
  };

  const getSingle = async resourceId => OrmHelpers.getSingle(resourceId);

  const deleteSingle = async resourceId => OrmHelpers.deleteSingle(resourceId);

  // TODO
  const search = async payload => payload;

  return {
    createNew,
    getSingle,
    deleteSingle,
    search,
  };
};
