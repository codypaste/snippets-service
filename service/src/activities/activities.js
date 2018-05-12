const joi = require('joi');

const inputValidationError = (input, JoiSchema) => (joi.validate(input, JoiSchema)).error;

module.exports = ({ MongooseModel, JoiSchema, getResourceBody }) => {

  const createNew = async (payload) => {
    const body = getResourceBody(payload);

    const schemaValidationError = inputValidationError(body, JoiSchema);
    if (schemaValidationError !== null) {
      const error = Error(schemaValidationError);
      error.status = 422;
      throw new Error(schemaValidationError);
    }

    const DBModel = MongooseModel();
    return new DBModel(body).save();
  };

  const getSingle = async (resourceId) => {
    const dbModel = MongooseModel();
    return dbModel.findById(resourceId);
  };

  const deleteSingle = async (resourceId) => {
    const dbModel = MongooseModel();
    return dbModel.find({ id: resourceId }).remove().exec();
  };

  // TODO
  const search = async payload => payload;

  return {
    createNew,
    getSingle,
    deleteSingle,
    search,
  };
};
