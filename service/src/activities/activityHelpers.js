const joi = require('joi');
const Errors = require('../errors');

const validateBody = (input, JoiSchema) => {
  const schemaValidationError = (joi.validate(input, JoiSchema)).error;
  if (schemaValidationError) {
    const error = Error(schemaValidationError);
    error.status = 422;
    throw error;
  }
  return input;
};

const validateIDFormat = (id) => {
  // Regex matching mongo ObjectID
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw Errors.badRequestFormat('ObjectID', id);
  }
  return id;
};

module.exports = {
  validateBody,
  validateIDFormat,
};
